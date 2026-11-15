/**
 * Capa de proveedores LLM: Claude (SDK de Anthropic) y ChatGPT / compatibles (Chat Completions).
 * Todo cliente tiene la forma de `client.messages.create` de Anthropic (formato canónico).
 */
import { PROVIDERS, availability, baseURLFor, type LlmFunction, type ProviderId } from './models.ts';
import { openAICompatClient } from './openai.ts';

export * from './models.ts';
export * from './ledger.ts';
export { fromOpenAIResponse, openAICompatClient, toOpenAIMessages } from './openai.ts';

/** Carga <root>/.env si existe (sin avisos si no). Las variables ya definidas ganan. */
export function loadDotEnv(root: string) {
  try {
    process.loadEnvFile(`${root}/.env`);
  } catch {}
}

export interface LlmClient {
  messages: { create(params: any): Promise<{ content: any[]; stop_reason: string | null; usage?: any }> };
}

/** Crea el cliente de un proveedor para una función, o explica qué falta configurar. */
export async function createClient(provider: ProviderId, fn: LlmFunction, env: Record<string, string | undefined> = process.env): Promise<{ client: LlmClient; model: string }> {
  const p = PROVIDERS[provider];
  if (!p) throw new Error(`proveedor desconocido: ${provider}`);
  const a = availability(provider, fn, env);
  if (!a.ok) throw new Error(`${p.label}: ${a.why}`);
  if (p.kind === 'anthropic') {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    return { client: new Anthropic({ apiKey: env[p.keyEnv!] }) as unknown as LlmClient, model: a.model };
  }
  return {
    client: openAICompatClient({
      baseURL: baseURLFor(provider, env)!,
      apiKey: p.keyEnv ? env[p.keyEnv] : 'ollama', // Ollama local pide una clave cualquiera
      tokenParam: p.tokenParam,
      // reasoning_effort es propio de los modelos de OpenAI; con <ID>_MODEL personalizado se puede quitar.
      extra: env[`${provider.toUpperCase()}_NO_EXTRA`] ? undefined : p.extra,
      toolChoiceNone: p.toolChoiceNone,
    }),
    model: a.model,
  };
}
