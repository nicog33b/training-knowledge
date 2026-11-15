/**
 * Lógica de los endpoints, sin HTTP (testeable). El navegador nunca ve las claves.
 *   POST /chat   { module, topic?, question, selection?, history?, provider? }
 *                → { text, read, messages, usage, cost, provider, model } | { error }
 *   GET  /gasto  → gasto de IA (hoy, mes, total y por modelo con su precio)
 *   POST /gasto/reset → pone el contador a cero
 */
import type { Loaded } from '@tk/content';
import { costOf, modelName, summarize, type Ledger, type LlmClient, type ProviderId, type Usage } from '@tk/llm';
import { MAX_QUESTION_CHARS, chat, checkHistory } from '@tk/tutor';

export interface ProviderSlot { client: LlmClient; model: string; label: string }

export interface Deps {
  load(): Promise<Loaded>;
  /** proveedores listos (vacío = ninguna clave configurada). El primero es el predeterminado. */
  providers: Map<ProviderId, ProviderSlot>;
  /** registra el gasto de un turno: tokens y costo del modelo que respondió (no se llama en modo prueba). */
  onSpend?(provider: ProviderId, model: string, usage: Usage, usd: number | null): Promise<unknown> | void;
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
    const status = typeof e?.status === 'number' ? e.status : 502;
    if (status === 429) return fail(429, `${slot.label} está limitando peticiones o no tiene saldo; espera o revisa la facturación.`);
    if (status === 401 || status === 403) return fail(502, `${slot.label} rechazó la clave (${status}). Revísala en .env.`);
    return fail(502, `Error de ${slot.label}: ${e?.message ?? e}`);
  }
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
