/**
 * Proveedores de LLM, modelo equivalente por función y precios.
 * Decisión: research/decisions/proveedores-llm-y-contador-de-gasto.md
 * Precios: research/sources/anthropic-pricing-docs.yaml y openai-pricing-docs.yaml (USD por millón de tokens).
 */

/** Nivel de modelo. Cada función del sistema pide un nivel, no un modelo concreto. */
export type Role = 'rapido' | 'equilibrado' | 'potente';

/** Qué nivel usa cada funcionalidad (las marcadas "futuro" aún no existen: tasks.md T-061, T-064). */
export const FUNCTIONS = {
  tutor: 'rapido',
  'generar-preguntas': 'rapido', // botón "generar más preguntas" del lab (cada una con su respuesta)
  corregir: 'rapido', // futuro: corrección formativa de explicaciones
  'generar-receta': 'rapido', // futuro: receta nueva de una primitiva existente
  'sim-a-medida': 'potente', // futuro: simulación HTML excepcional, revisada
} as const satisfies Record<string, Role>;
export type LlmFunction = keyof typeof FUNCTIONS;

export type ProviderId = 'anthropic' | 'openai' | 'gemini' | 'ollama' | 'compatible';

export interface ProviderPreset {
  id: ProviderId;
  label: string;
  kind: 'anthropic' | 'openai-compat';
  /** variable de entorno con la clave (ausente = no hace falta, p. ej. Ollama local). */
  keyEnv?: string;
  baseURL?: string;
  /** variable que sobrescribe (o define) la URL base. */
  baseURLEnv?: string;
  /** nombre del parámetro de tope de salida en Chat Completions. */
  tokenParam?: 'max_tokens' | 'max_completion_tokens';
  /** campos extra fijos de la petición. */
  extra?: Record<string, unknown>;
  /** ¿acepta tool_choice: "none"? Si no, se omite y el tutor lo resuelve con el mensaje de cupo agotado. */
  toolChoiceNone?: boolean;
  /** modelos verificados por nivel; los que falten deben darse por entorno (<ID>_MODEL). */
  models: Partial<Record<Role, string>>;
  /** sin costo por token (modelo local). */
  free?: boolean;
}

export const PROVIDERS: Record<ProviderId, ProviderPreset> = {
  anthropic: {
    id: 'anthropic', label: 'Claude', kind: 'anthropic', keyEnv: 'ANTHROPIC_API_KEY',
    models: { rapido: 'claude-haiku-5-5', equilibrado: 'claude-sonnet-5-5', potente: 'claude-opus-5-5' },
  },
  openai: {
    id: 'openai', label: 'ChatGPT', kind: 'openai-compat', keyEnv: 'OPENAI_API_KEY',
    baseURL: 'https://api.openai.com/v1', baseURLEnv: 'OPENAI_BASE_URL', tokenParam: 'max_completion_tokens',
    // gpt-6-luna solo admite function calling en Chat Completions con reasoning_effort "none".
    extra: { reasoning_effort: 'none' }, toolChoiceNone: true,
    models: { rapido: 'gpt-6-luna', equilibrado: 'gpt-6.1-sol', potente: 'gpt-6-astra' },
  },
  gemini: {
    id: 'gemini', label: 'Gemini', kind: 'openai-compat', keyEnv: 'GEMINI_API_KEY',
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai', tokenParam: 'max_tokens', toolChoiceNone: false,
    models: {}, // sin equivalencias verificadas: GEMINI_MODEL obligatorio
  },
  ollama: {
    id: 'ollama', label: 'Ollama (local)', kind: 'openai-compat', baseURL: 'http://localhost:11434/v1', baseURLEnv: 'OLLAMA_BASE_URL',
    tokenParam: 'max_tokens', toolChoiceNone: false, free: true, models: {}, // OLLAMA_MODEL obligatorio
  },
  compatible: {
    id: 'compatible', label: 'Compatible OpenAI', kind: 'openai-compat', keyEnv: 'COMPAT_API_KEY', baseURLEnv: 'COMPAT_BASE_URL',
    tokenParam: 'max_tokens', toolChoiceNone: false, models: {}, // OpenRouter, Groq, DeepSeek, LM Studio…: COMPAT_BASE_URL + COMPAT_MODEL
  },
};
export const PROVIDER_IDS = Object.keys(PROVIDERS) as ProviderId[];

export interface Price { input: number; output: number; cacheRead: number; cacheWrite?: number }
/** USD por millón de tokens (contexto corto). Verificar antes de presupuestar (tasks.md T-066). */
export const PRICES: Record<string, Price> = {
  'claude-haiku-5-5': { input: 0.1, output: 0.5, cacheRead: 0.01, cacheWrite: 0.125 },
  'claude-sonnet-5-5': { input: 2, output: 10, cacheRead: 0.1, cacheWrite: 2.5 },
  'claude-opus-5-5': { input: 4, output: 20, cacheRead: 0.4, cacheWrite: 5 },
  'claude-fable-5-2': { input: 8, output: 40, cacheRead: 0.8, cacheWrite: 10 },
  'gpt-6-luna': { input: 0.1, output: 0.5, cacheRead: 0.01, cacheWrite: 0.125 },
  'gpt-6.1-sol': { input: 2, output: 10, cacheRead: 0.1 },
  'gpt-6.1-terra': { input: 1, output: 5, cacheRead: 0.05 },
  'gpt-6-astra': { input: 10, output: 50, cacheRead: 1 },
  'gpt-5-nano': { input: 0.05, output: 0.4, cacheRead: 0.005 },
  'gpt-5-mini': { input: 0.25, output: 2, cacheRead: 0.025 },
};

/** Nombre legible para el contador ("claude-haiku-5-5" → "Claude Haiku 5.5"). */
const MODEL_NAMES: Record<string, string> = {
  'claude-haiku-5-5': 'Claude Haiku 5.5',
  'claude-sonnet-5-5': 'Claude Sonnet 5.5',
  'claude-opus-5-5': 'Claude Opus 5.5',
  'claude-fable-5-2': 'Claude Fable 5.2',
  'gpt-6-luna': 'GPT-6 Luna',
  'gpt-6.1-sol': 'GPT-6.1 Sol',
  'gpt-6.1-terra': 'GPT-6.1 Terra',
  'gpt-6-astra': 'GPT-6 Astra',
  'gpt-5-nano': 'GPT-5 nano',
  'gpt-5-mini': 'GPT-5 mini',
};
export const modelName = (id: string) => MODEL_NAMES[id] ?? id;

type Env = Record<string, string | undefined>;
const envName = (p: ProviderId) => p.toUpperCase();

/** Modelo para una función: <ID>_MODEL_<NIVEL> > <ID>_MODEL (solo nivel rápido) > preset. */
export function modelFor(provider: ProviderId, fn: LlmFunction, env: Env = process.env): string | undefined {
  const role = FUNCTIONS[fn];
  const P = envName(provider);
  return env[`${P}_MODEL_${role.toUpperCase()}`] || (role === 'rapido' ? env[`${P}_MODEL`] : undefined) || PROVIDERS[provider].models[role];
}

export function baseURLFor(provider: ProviderId, env: Env = process.env): string | undefined {
  const p = PROVIDERS[provider];
  return ((p.baseURLEnv && env[p.baseURLEnv]) || p.baseURL)?.replace(/\/+$/, '');
}

/** ¿Está configurado para usarse en una función? Devuelve el motivo si no. */
export function availability(provider: ProviderId, fn: LlmFunction, env: Env = process.env): { ok: true; model: string } | { ok: false; why: string } {
  const p = PROVIDERS[provider];
  if (p.keyEnv && !env[p.keyEnv]) return { ok: false, why: `falta ${p.keyEnv}` };
  if (p.kind === 'openai-compat' && !baseURLFor(provider, env)) return { ok: false, why: `falta ${p.baseURLEnv}` };
  const model = modelFor(provider, fn, env);
  if (!model) return { ok: false, why: `falta ${envName(provider)}_MODEL` };
  return { ok: true, model };
}

/** Proveedores listos para una función, en el orden de PROVIDERS (el primero es el predeterminado). */
export function availableProviders(fn: LlmFunction, env: Env = process.env) {
  const preferred = env.TUTOR_PROVIDER as ProviderId | undefined;
  const list = PROVIDER_IDS.flatMap((id) => {
    const a = availability(id, fn, env);
    return a.ok ? [{ id, label: PROVIDERS[id].label, model: a.model }] : [];
  });
  return preferred ? [...list.filter((x) => x.id === preferred), ...list.filter((x) => x.id !== preferred)] : list;
}

export interface Usage { input: number; output: number; cacheRead: number; cacheWrite: number }

/**
 * Costo en USD de un uso. null = precio desconocido (modelo sin tabla y sin <ID>_PRICE_IN/OUT).
 * Para Claude, `input` excluye lo cacheado; el adaptador OpenAI lo normaliza igual.
 */
export function costOf(provider: ProviderId, model: string, u: Usage, env: Env = process.env): number | null {
  if (PROVIDERS[provider].free) return 0;
  const P = envName(provider);
  const custom = env[`${P}_PRICE_IN`] && env[`${P}_PRICE_OUT`]
    ? { input: Number(env[`${P}_PRICE_IN`]), output: Number(env[`${P}_PRICE_OUT`]), cacheRead: Number(env[`${P}_PRICE_IN`]) } : undefined;
  const p = PRICES[model] ?? custom;
  if (!p) return null;
  return (u.input * p.input + u.output * p.output + u.cacheRead * p.cacheRead + u.cacheWrite * (p.cacheWrite ?? p.input)) / 1e6;
}
