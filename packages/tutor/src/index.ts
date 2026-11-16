/**
 * Tutor IA barato con contexto mínimo, en modo pregunta suelta (CLI) o chat (web).
 * Decisiones: research/decisions/preguntas-sugeridas-y-contexto-minimo.md,
 *             tutor-ia-con-restricciones.md, correccion-ia-solo-formativa-con-checklist.md
 *
 * Prompt = [reglas + catálogo del curso]  ← prefijo idéntico para todo el curso (cacheado)
 *        + [contexto del subtema]          ← cacheado por subtema (se omite en páginas de curso)
 *        + historial (solo crece por el final → también se cachea, top-level cache_control)
 *        + pregunta del alumno (+ fragmento que tenía seleccionado en la página)
 * La IA pide otros subtemas con la herramienta `leer_subtema` solo si los necesita; lo leído
 * queda en el historial, así que no se vuelve a pedir en turnos siguientes.
 *
 * No importa ningún SDK: recibe un cliente con la forma de `client.messages.create` de Anthropic
 * (formato canónico). @tk/llm crea ese cliente para Claude, ChatGPT o servidores compatibles,
 * así el historial sirve con cualquier proveedor y se testea sin red ni costo.
 */
import type { LoadedModule } from '@tk/content';
import { buildCourseCatalog, buildTopicContext } from '@tk/indexer';
import { modelFor, type LlmClient } from '@tk/llm';

/** Modelo de Claude para la función tutor (equivalentes en otros proveedores: @tk/llm FUNCTIONS/PROVIDERS). */
export const DEFAULT_MODEL = modelFor('anthropic', 'tutor', {})!;
/** Tope de lecturas de subtemas por turno: evita que "leer todo" anule el ahorro. */
export const MAX_EXTRA_TOPICS = 3;
/** Tope de turnos por conversación: el historial no se recorta (rompería el caché), se empieza otra. */
export const MAX_USER_TURNS = 20;
export const MAX_QUESTION_CHARS = 2000;
export const MAX_SELECTION_CHARS = 1200;
const MAX_HISTORY_CHARS = 120_000;
const MAX_TOOL_CHARS = 6000;

export const TUTOR_RULES = `Eres el tutor de un curso y acompañas al alumno mientras lee una página del curso. Reglas:
1. Responde en español, breve (≤ 200 palabras salvo que pidan detalle), apoyándote en el contexto del subtema que está leyendo. Es una conversación: puedes referirte a lo ya hablado.
2. Si el alumno pide resolver un ejercicio o simulación, no des la respuesta directa: da una pista y pídele que prediga o explique primero.
3. Termina con UNA pregunta corta que lo obligue a recuperar o aplicar lo explicado (salvo que solo salude o agradezca).
4. Si necesitas otro subtema del catálogo para responder bien, usa leer_subtema (máximo ${MAX_EXTRA_TOPICS} por respuesta). No lo uses para lo que ya está en el contexto o en la conversación.
5. Si algo no está en el contexto ni en el curso, dilo y responde con cautela; no inventes cifras ni límites de servicios.
6. Si la pregunta no tiene que ver con el curso, redirígela amablemente al tema.`;

export const TOOLS = [
  {
    name: 'leer_subtema',
    description:
      'Devuelve el contenido completo de otro subtema del mismo curso. Úsalo solo si la pregunta necesita un concepto que no está en el subtema actual ni en la conversación. El id debe estar en el catálogo.',
    input_schema: {
      type: 'object' as const,
      properties: { id: { type: 'string', description: 'id del subtema (kebab-case) tal como aparece en el catálogo' } },
      required: ['id'],
    },
  },
];

export type TutorClient = LlmClient;

export interface TutorRequest {
  model: string;
  max_tokens: number;
  system: { type: 'text'; text: string; cache_control?: { type: 'ephemeral' } }[];
  tools: typeof TOOLS;
  cache_control: { type: 'ephemeral' };
  messages: any[];
}

/** Bloque fijo de "dónde está el alumno" cuando no hay subtema (portada del curso, glosario). */
const courseOnly = (m: LoadedModule) =>
  `# El alumno está en la portada del curso ${m.manifest.title} [${m.manifest.id}]\nNo hay un subtema abierto: usa el catálogo y leer_subtema si hace falta.`;

/**
 * Arma la petición. `topicId` undefined = página de curso. `history` es el historial
 * devuelto en turnos anteriores (append-only); `userTurn` el mensaje nuevo ya armado.
 */
export function buildTutorRequest(m: LoadedModule, topicId: string | undefined, userTurn: string, model = DEFAULT_MODEL, history: any[] = []): TutorRequest {
  return {
    model,
    max_tokens: 1024,
    system: [
      { type: 'text', text: `${TUTOR_RULES}\n\n${buildCourseCatalog(m)}`, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: topicId ? buildTopicContext(m, topicId) : courseOnly(m), cache_control: { type: 'ephemeral' } },
    ],
    tools: TOOLS,
    // Caché automático del historial: el breakpoint avanza con la conversación (3 de 4 slots).
    cache_control: { type: 'ephemeral' },
    messages: [...history, { role: 'user', content: userTurn }],
  };
}

/** Mensaje del alumno, con el fragmento de la página que tenía seleccionado si lo hay. */
export function composeUserTurn(question: string, selection?: string): string {
  const q = question.trim().slice(0, MAX_QUESTION_CHARS);
  const sel = selection?.replace(/\s+/g, ' ').trim().slice(0, MAX_SELECTION_CHARS);
  return sel ? `[Fragmento de la página que el alumno tiene seleccionado: «${sel}»]\n\n${q}` : q;
}

/** Ejecuta la herramienta. Valida el id contra el curso: el input del modelo no es confiable. */
export function runTool(m: LoadedModule, currentTopic: string | undefined, name: string, input: any): { text: string; topic?: string; error?: boolean } {
  if (name !== 'leer_subtema') return { text: `herramienta desconocida: ${name}`, error: true };
  const id = typeof input?.id === 'string' ? input.id : '';
  if (id === currentTopic) return { text: 'Ese es el subtema actual: ya está en el contexto.', error: true };
  const t = m.topics.find((x) => x.id === id);
  if (!t) return { text: `No existe el subtema "${id}". Usa un id del catálogo.`, error: true };
  const body = t.body.trim();
  return { text: `# ${t.title}\n${t.summary}\n\n${body.length > MAX_TOOL_CHARS ? body.slice(0, MAX_TOOL_CHARS) + '\n…(recortado)' : body}`, topic: id };
}

/** Subtemas ya leídos en turnos anteriores (para no releerlos). */
function readInHistory(history: any[]): string[] {
  const ids: string[] = [];
  for (const msg of history)
    if (msg.role === 'assistant' && Array.isArray(msg.content))
      for (const b of msg.content) if (b.type === 'tool_use' && typeof b.input?.id === 'string') ids.push(b.input.id);
  return ids;
}

/**
 * Valida el historial que manda el navegador (no confiable): forma de la API,
 * alternancia user/assistant, solo bloques text/tool_use/tool_result y tamaño acotado.
 */
export function checkHistory(raw: unknown): { ok: true; history: any[] } | { ok: false; error: string } {
  if (raw === undefined || raw === null) return { ok: true, history: [] };
  if (!Array.isArray(raw)) return { ok: false, error: 'history debe ser una lista' };
  if (JSON.stringify(raw).length > MAX_HISTORY_CHARS) return { ok: false, error: 'conversación demasiado larga: empieza una nueva' };
  const okBlock = (b: any) =>
    b && typeof b === 'object' &&
    ((b.type === 'text' && typeof b.text === 'string') ||
      (b.type === 'tool_use' && typeof b.id === 'string' && b.name === 'leer_subtema') ||
      (b.type === 'tool_result' && typeof b.tool_use_id === 'string' && typeof b.content === 'string'));
  let userTurns = 0;
  for (let i = 0; i < raw.length; i++) {
    const msg: any = raw[i];
    const expected = i % 2 === 0 ? 'user' : 'assistant';
    if (msg?.role !== expected) return { ok: false, error: `history[${i}]: se esperaba role ${expected}` };
    const c = msg.content;
    if (!(typeof c === 'string' || (Array.isArray(c) && c.length > 0 && c.every(okBlock)))) return { ok: false, error: `history[${i}]: contenido inválido` };
    if (expected === 'user' && typeof c === 'string') userTurns++;
  }
  if (raw.length % 2 !== 0) return { ok: false, error: 'history debe terminar en una respuesta del tutor' };
  if (userTurns >= MAX_USER_TURNS) return { ok: false, error: `límite de ${MAX_USER_TURNS} preguntas por conversación: empieza una nueva` };
  return { ok: true, history: raw };
}

export interface TutorAnswer {
  text: string;
  /** subtemas extra que la IA decidió leer en este turno. */
  read: string[];
  usage: { input: number; output: number; cacheRead: number; cacheWrite: number };
  stop: string | null;
  /** historial completo tras este turno: el cliente lo devuelve tal cual en el siguiente. */
  messages: any[];
}

/** Un turno de chat. `history` debe venir de un turno anterior (ver checkHistory). */
export async function chat(
  client: TutorClient,
  m: LoadedModule,
  topicId: string | undefined,
  history: any[],
  question: string,
  opts: { model?: string; selection?: string } = {},
): Promise<TutorAnswer> {
  const req = buildTutorRequest(m, topicId, composeUserTurn(question, opts.selection), opts.model, history);
  const read: string[] = [];
  const already = new Set(readInHistory(history));
  let lookups = 0; // cuenta TODA llamada a herramienta (también repetidas o erróneas)
  const usage = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };
  const messages = [...req.messages];
  for (let turn = 0; turn < MAX_EXTRA_TOPICS + 2; turn++) {
    // Al agotar el cupo se prohíbe usar herramientas: debe responder con lo que tiene.
    const exhausted = lookups >= MAX_EXTRA_TOPICS;
    const res = await client.messages.create({ ...req, ...(exhausted ? { tool_choice: { type: 'none' } } : {}), messages: [...messages] });
    usage.input += res.usage?.input_tokens ?? 0;
    usage.output += res.usage?.output_tokens ?? 0;
    usage.cacheRead += res.usage?.cache_read_input_tokens ?? 0;
    usage.cacheWrite += res.usage?.cache_creation_input_tokens ?? 0;
    const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
    const calls = res.content.filter((b) => b.type === 'tool_use');
    if (res.stop_reason !== 'tool_use' || !calls.length) {
      // Solo se guardan bloques de texto de la respuesta final (lo que checkHistory acepta).
      messages.push({ role: 'assistant', content: [{ type: 'text', text: text || '(sin respuesta)' }] });
      return { text, read, usage, stop: res.stop_reason, messages };
    }
    messages.push({ role: 'assistant', content: res.content.filter((b) => b.type === 'text' || b.type === 'tool_use').map(slim) });
    messages.push({
      role: 'user',
      content: calls.map((c) => {
        const id = c.input?.id;
        const r =
          lookups++ >= MAX_EXTRA_TOPICS ? { text: 'Cupo de subtemas agotado: responde con lo que tienes.', error: true }
          : read.includes(id) || already.has(id) ? { text: 'Ya leíste ese subtema: está más arriba en la conversación.', error: true }
          : runTool(m, topicId, c.name, c.input);
        if ('topic' in r && r.topic) read.push(r.topic);
        return { type: 'tool_result', tool_use_id: c.id, content: r.text, ...(r.error ? { is_error: true } : {}) };
      }),
    });
  }
  messages.push({ role: 'assistant', content: [{ type: 'text', text: '(sin respuesta final)' }] });
  return { text: '(sin respuesta final: demasiadas vueltas)', read, usage, stop: 'max_turns', messages };
}

/** Deja en el historial solo los campos que la API necesita (sin metadatos del SDK). */
function slim(b: any) {
  return b.type === 'text' ? { type: 'text', text: b.text } : { type: 'tool_use', id: b.id, name: b.name, input: b.input };
}

/** Pregunta suelta (CLI): un chat sin historial. */
export function ask(client: TutorClient, m: LoadedModule, topicId: string, question: string, opts: { model?: string } = {}) {
  return chat(client, m, topicId, [], question, opts);
}


// ───────── Generar preguntas nuevas (botón del lab; cuesta tokens) ─────────
// Mismo contexto mínimo que el chat (catálogo + subtema), salida JSON validada con el contrato
// LabQuestion y respuesta obligatoria: el alumno practica igual que con las preguntas escritas.

export const MAX_GENERATE = 5;
const KINDS = ['por-que', 'que-pasa-si', 'comparar', 'aplicar', 'error-comun'] as const;

export const GENERATOR_RULES = `Eres el GENERADOR DE PREGUNTAS de práctica de un curso. Con el contenido del subtema que se te da:
1. Escribe preguntas NUEVAS que obliguen a recuperar, razonar o aplicar (no definiciones de memoria). Varía el tipo: por-que, que-pasa-si, comparar, aplicar, error-comun.
2. Cada pregunta trae su respuesta modelo en español: 40–90 palabras, concreta, con la razón de fondo; puedes usar \`código\` y **negrita**. Sin listas largas ni títulos.
3. Básate en el subtema y en el catálogo del curso. No inventes cifras, límites ni nombres de servicios que no estén en el contexto; si dudas, no hagas esa pregunta.
4. No repitas ni parafrasees las preguntas que ya existen.
5. Responde SOLO con JSON válido, sin texto alrededor: {"preguntas":[{"q":"…","kind":"por-que","a":"…"}]}`;

export interface GeneratedQuestion { q: string; kind: (typeof KINDS)[number]; a: string }

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Extrae y valida las preguntas del texto del modelo (tolera ```json y texto alrededor). Descarta repetidas. */
export function parseGenerated(text: string, existing: string[] = []): GeneratedQuestion[] {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) return [];
  let raw: any;
  try {
    raw = JSON.parse(text.slice(start, end + 1));
  } catch {
    return [];
  }
  const seen = new Set(existing.map(norm));
  const out: GeneratedQuestion[] = [];
  for (const x of Array.isArray(raw?.preguntas) ? raw.preguntas : []) {
    const q = typeof x?.q === 'string' ? x.q.trim() : '';
    const a = typeof x?.a === 'string' ? x.a.trim() : '';
    if (q.length < 8 || q.length > 400 || a.length < 20 || a.length > 2000 || !KINDS.includes(x?.kind) || seen.has(norm(q))) continue;
    seen.add(norm(q));
    out.push({ q, kind: x.kind, a });
  }
  return out;
}

export function buildGenerateRequest(m: LoadedModule, topicId: string, count: number, existing: string[], model = DEFAULT_MODEL) {
  return {
    model,
    max_tokens: 400 + count * 260,
    system: [
      { type: 'text' as const, text: `${GENERATOR_RULES}\n\n${buildCourseCatalog(m)}`, cache_control: { type: 'ephemeral' as const } },
      { type: 'text' as const, text: buildTopicContext(m, topicId), cache_control: { type: 'ephemeral' as const } },
    ],
    messages: [{
      role: 'user' as const,
      content: `Genera ${count} preguntas nuevas con su respuesta.${existing.length ? `\nYa existen (no las repitas):\n${existing.map((q) => `- ${q}`).join('\n')}` : ''}`,
    }],
  };
}

/** Genera `count` preguntas nuevas del subtema con su respuesta. `existing`: todas las que el alumno ya tiene. */
export async function generateQuestions(
  client: TutorClient,
  m: LoadedModule,
  topicId: string,
  opts: { model?: string; count?: number; existing?: string[] } = {},
): Promise<{ questions: GeneratedQuestion[]; usage: TutorAnswer['usage'] }> {
  if (!m.topics.some((t) => t.id === topicId)) throw new Error(`subtema inexistente: ${m.manifest.id}/${topicId}`);
  const count = Math.max(1, Math.min(MAX_GENERATE, opts.count ?? 3));
  const existing = opts.existing ?? m.topics.find((t) => t.id === topicId)!.lab.questions.map((q) => q.q);
  const res = await client.messages.create(buildGenerateRequest(m, topicId, count, existing, opts.model));
  const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
  const usage = {
    input: res.usage?.input_tokens ?? 0,
    output: res.usage?.output_tokens ?? 0,
    cacheRead: res.usage?.cache_read_input_tokens ?? 0,
    cacheWrite: res.usage?.cache_creation_input_tokens ?? 0,
  };
  return { questions: parseGenerated(text, existing).slice(0, count), usage };
}
