/**
 * Lógica de los endpoints, sin HTTP (testeable). El navegador nunca ve las claves.
 *   POST /chat   { module, topic?, question, selection?, history?, provider? }
 *                → { text, read, messages, usage, cost, provider, model } | { error }
 *   GET  /preguntas?module&topic → preguntas generadas con IA antes (gratis: se leen del disco)
 *   POST /preguntas { module, topic, count?, provider? } → genera más (cuesta) y las guarda
 *   GET  /gasto  → gasto de IA (hoy, mes, total y por modelo con su precio)
 *   POST /gasto/reset → pone el contador a cero
 */
import type { Loaded } from '@tk/content';
import { costOf, modelName, summarize, type Ledger, type LlmClient, type ProviderId, type Usage } from '@tk/llm';
import { MAX_GENERATE, MAX_QUESTION_CHARS, chat, checkHistory, generateQuestions, type GeneratedQuestion } from '@tk/tutor';

export interface ProviderSlot { client: LlmClient; model: string; label: string }

export interface Deps {
  load(): Promise<Loaded>;
  /** proveedores listos (vacío = ninguna clave configurada). El primero es el predeterminado. */
  providers: Map<ProviderId, ProviderSlot>;
  /** registra el gasto de un turno: tokens y costo del modelo que respondió (no se llama en modo prueba). */
  onSpend?(provider: ProviderId, model: string, usage: Usage, usd: number | null): Promise<unknown> | void;
  /** preguntas generadas por subtema (el servidor las guarda en .data/preguntas/). */
  store?: QuestionStore;
}

export interface StoredQuestion extends GeneratedQuestion { at: string; model: string }
export interface QuestionStore {
  read(mod: string, topic: string): Promise<StoredQuestion[]>;
  write(mod: string, topic: string, list: StoredQuestion[]): Promise<void>;
}

export type Reply = { status: number; body: any };
const fail = (status: number, error: string): Reply => ({ status, body: { error } });

export async function handleChat(raw: any, deps: Deps): Promise<Reply> {
  if (!raw || typeof raw !== 'object') return fail(400, 'cuerpo JSON inválido');
  const { module: mod, topic, question, selection, history, provider } = raw;
  if (typeof mod !== 'string' || (topic !== undefined && topic !== null && typeof topic !== 'string')) return fail(400, 'module/topic inválidos');
  if (typeof question !== 'string' || !question.trim()) return fail(400, 'falta la pregunta');
  if (question.length > MAX_QUESTION_CHARS) return fail(400, `pregunta demasiado larga (máx. ${MAX_QUESTION_CHARS} caracteres)`);
  if (selection !== undefined && selection !== null && typeof selection !== 'string') return fail(400, 'selection inválida');
  const h = checkHistory(history);
  if (!h.ok) return fail(400, h.error);

  const data = await deps.load();
  const m = data.modules.find((x) => x.manifest.id === mod);
  if (!m) return fail(404, `curso inexistente: ${mod}`);
  const topicId = topic || undefined;
  if (topicId && !m.topics.some((t) => t.id === topicId)) return fail(404, `subtema inexistente: ${mod}/${topicId}`);

  if (!deps.providers.size)
    return fail(503, 'El tutor no tiene ninguna clave. Pon ANTHROPIC_API_KEY u OPENAI_API_KEY en .env (ver .env.example) o usa "pnpm dev:fake" para probar sin costo.');
  const pid = (provider ?? deps.providers.keys().next().value) as ProviderId;
  const slot = deps.providers.get(pid);
  if (!slot) return fail(400, `proveedor no disponible: ${String(provider)} (disponibles: ${[...deps.providers.keys()].join(', ')})`);

  try {
    const ans = await chat(slot.client, m, topicId, h.history, question, { model: slot.model, selection: selection ?? undefined });
    const cost = costOf(pid, slot.model, ans.usage);
    await deps.onSpend?.(pid, slot.model, ans.usage, cost);
    return { status: 200, body: { text: ans.text, read: ans.read, messages: ans.messages, usage: ans.usage, cost, provider: pid, model: slot.model, name: modelName(slot.model) } };
  } catch (e: any) {
    return providerError(slot.label, e);
  }
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** Tope de preguntas generadas guardadas por subtema (evita crecer sin límite). */
export const MAX_STORED = 60;

async function findTopic(deps: Deps, mod: unknown, topic: unknown) {
  if (typeof mod !== 'string' || typeof topic !== 'string' || !SLUG.test(mod) || !SLUG.test(topic)) return { error: fail(400, 'module/topic inválidos') };
  const m = (await deps.load()).modules.find((x) => x.manifest.id === mod);
  if (!m) return { error: fail(404, `curso inexistente: ${mod}`) };
  if (!m.topics.some((t) => t.id === topic)) return { error: fail(404, `subtema inexistente: ${mod}/${topic}`) };
  return { m, topic };
}

/** Preguntas generadas antes para este subtema (leerlas no cuesta nada). */
export async function handleListGenerated(mod: unknown, topic: unknown, deps: Deps): Promise<Reply> {
  const f = await findTopic(deps, mod, topic);
  if (f.error) return f.error;
  return { status: 200, body: { questions: deps.store ? await deps.store.read(f.m.manifest.id, f.topic) : [] } };
}

/** Genera preguntas nuevas (con respuesta) evitando las del curso y las ya generadas; las guarda. */
export async function handleGenerate(raw: any, deps: Deps): Promise<Reply> {
  if (!raw || typeof raw !== 'object') return fail(400, 'cuerpo JSON inválido');
  const f = await findTopic(deps, raw.module, raw.topic);
  if (f.error) return f.error;
  const count = raw.count === undefined ? 3 : Number(raw.count);
  if (!Number.isInteger(count) || count < 1 || count > MAX_GENERATE) return fail(400, `count debe ser 1–${MAX_GENERATE}`);
  if (!deps.providers.size)
    return fail(503, 'Generar preguntas usa IA y no hay ninguna clave. Pon ANTHROPIC_API_KEY u OPENAI_API_KEY en .env (ver .env.example) o usa "pnpm dev:fake".');
  const pid = (raw.provider ?? deps.providers.keys().next().value) as ProviderId;
  const slot = deps.providers.get(pid);
  if (!slot) return fail(400, `proveedor no disponible: ${String(raw.provider)}`);
  const mod = f.m.manifest.id;
  const stored = deps.store ? await deps.store.read(mod, f.topic) : [];
  if (stored.length >= MAX_STORED) return fail(409, `Este subtema ya tiene ${stored.length} preguntas generadas (máx. ${MAX_STORED}).`);
  const lab = f.m.topics.find((t) => t.id === f.topic)!.lab.questions.map((q) => q.q);
  try {
    const g = await generateQuestions(slot.client, f.m, f.topic, { model: slot.model, count, existing: [...lab, ...stored.map((q) => q.q)] });
    const cost = costOf(pid, slot.model, g.usage);
    await deps.onSpend?.(pid, slot.model, g.usage, cost);
    const at = new Date().toISOString();
    const added: StoredQuestion[] = g.questions.map((q) => ({ ...q, at, model: slot.model }));
    const all = [...stored, ...added];
    if (added.length) await deps.store?.write(mod, f.topic, all);
    return {
      status: 200,
      body: {
        added, questions: all, cost, usage: g.usage, provider: pid, model: slot.model, name: modelName(slot.model),
        ...(added.length ? {} : { error: 'La IA no devolvió preguntas válidas; prueba otra vez.' }),
      },
    };
  } catch (e: any) {
    return providerError(slot.label, e);
  }
}

function providerError(label: string, e: any): Reply {
  const status = typeof e?.status === 'number' ? e.status : 502;
  if (status === 429) return fail(429, `${label} está limitando peticiones o no tiene saldo; espera o revisa la facturación.`);
  if (status === 401 || status === 403) return fail(502, `${label} rechazó la clave (${status}). Revísala en .env.`);
  return fail(502, `Error de ${label}: ${e?.message ?? e}`);
}

/** Gasto para el header: hoy, mes, total y cada modelo (usado o disponible) con su precio. */
export function spendView(ledger: Ledger, providers: Map<ProviderId, ProviderSlot>, now = new Date()) {
  const available = [...providers].filter(([, s]) => s.model !== 'prueba').map(([provider, s]) => ({ provider, model: s.model }));
  return {
    nota: 'Gasto de IA medido por esta app (tokens de cada respuesta × precio del modelo). No es el saldo de tu cuenta.',
    ...summarize(ledger, available, now),
  };
}

/** Cliente de prueba (pnpm dev:fake): no llama a ninguna API, describe el contexto recibido. */
export const fakeClient: LlmClient = {
  messages: {
    async create(p: any) {
      if (String(p.system?.[0]?.text ?? '').startsWith('Eres el GENERADOR')) {
        const n = Number(/Genera (\d+)/.exec(p.messages[0].content)?.[1] ?? 3);
        const stamp = Date.now().toString(36);
        const preguntas = Array.from({ length: n }, (_, i) => ({
          q: `(modo prueba) ¿Pregunta generada ${stamp}-${i + 1} sobre este subtema?`,
          kind: 'aplicar',
          a: '(modo prueba, sin IA) Aquí iría una respuesta modelo de 40–90 palabras con la razón de fondo.',
        }));
        return { stop_reason: 'end_turn', content: [{ type: 'text', text: JSON.stringify({ preguntas }) }], usage: { input_tokens: 0, output_tokens: 0 } };
      }
      const ctx = p.system?.[1]?.text?.split('\n')[0] ?? '';
      const last = p.messages.at(-1)?.content;
      const userTurns = p.messages.filter((x: any) => x.role === 'user' && typeof x.content === 'string').length;
      return {
        stop_reason: 'end_turn',
        content: [{ type: 'text', text: `(modo prueba, sin IA) Contexto: **${ctx.replace(/^# /, '')}**. Mensaje ${userTurns} de la conversación: «${String(last).slice(0, 160)}». ¿Qué crees tú que pasa?` }],
        usage: { input_tokens: 0, output_tokens: 0 },
      };
    },
  },
};
