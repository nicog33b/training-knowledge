/**
 * Adaptador OpenAI Chat Completions (ChatGPT y servidores compatibles: Gemini, Ollama, OpenRouter…).
 * Expone la misma forma que `client.messages.create` de Anthropic, que es el formato canónico
 * del sistema: el historial se guarda siempre así, por eso una conversación puede cambiar de proveedor.
 * Sin SDK: solo fetch, para funcionar con cualquier servidor compatible.
 */
export interface CompatOptions {
  baseURL: string;
  apiKey?: string;
  tokenParam?: 'max_tokens' | 'max_completion_tokens';
  extra?: Record<string, unknown>;
  toolChoiceNone?: boolean;
  fetch?: typeof fetch;
}

type Block = { type: string; [k: string]: any };

/** Formato canónico (Anthropic) → mensajes de Chat Completions. */
export function toOpenAIMessages(system: { text: string }[] | string | undefined, messages: any[]) {
  const out: any[] = [];
  const sys = typeof system === 'string' ? [{ text: system }] : system ?? [];
  for (const s of sys) out.push({ role: 'system', content: s.text });
  for (const m of messages) {
    if (typeof m.content === 'string') {
      out.push({ role: m.role, content: m.content });
      continue;
    }
    const blocks: Block[] = m.content;
    const text = blocks.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    if (m.role === 'assistant') {
      const calls = blocks.filter((b) => b.type === 'tool_use');
      out.push({
        role: 'assistant',
        content: text || null,
        ...(calls.length ? { tool_calls: calls.map((c) => ({ id: c.id, type: 'function', function: { name: c.name, arguments: JSON.stringify(c.input ?? {}) } })) } : {}),
      });
    } else {
      for (const r of blocks.filter((b) => b.type === 'tool_result'))
        out.push({ role: 'tool', tool_call_id: r.tool_use_id, content: typeof r.content === 'string' ? r.content : JSON.stringify(r.content) });
      if (text) out.push({ role: 'user', content: text });
    }
  }
  return out;
}

/** Respuesta de Chat Completions → forma canónica { content, stop_reason, usage }. */
export function fromOpenAIResponse(j: any) {
  const ch = j?.choices?.[0];
  const msg = ch?.message ?? {};
  const content: Block[] = [];
  const text = Array.isArray(msg.content) ? msg.content.map((p: any) => p?.text ?? '').join('') : msg.content;
  if (text) content.push({ type: 'text', text });
  (msg.tool_calls ?? []).forEach((tc: any, i: number) => {
    let input: unknown = {};
    try {
      input = JSON.parse(tc.function?.arguments || '{}');
    } catch {}
    // Algunos servidores compatibles no mandan id: se genera uno estable.
    content.push({ type: 'tool_use', id: tc.id || `call_${i}`, name: tc.function?.name, input });
  });
  const hasCalls = content.some((b) => b.type === 'tool_use');
  const stop_reason = hasCalls || ch?.finish_reason === 'tool_calls' ? 'tool_use' : ch?.finish_reason === 'length' ? 'max_tokens' : 'end_turn';
  const prompt = j?.usage?.prompt_tokens ?? 0;
  const cached = j?.usage?.prompt_tokens_details?.cached_tokens ?? 0;
  return {
    content,
    stop_reason,
    usage: { input_tokens: prompt - cached, output_tokens: j?.usage?.completion_tokens ?? 0, cache_read_input_tokens: cached, cache_creation_input_tokens: 0 },
  };
}

export function openAICompatClient(o: CompatOptions) {
  const doFetch = o.fetch ?? fetch;
  return {
    messages: {
      async create(p: any) {
        const body: Record<string, unknown> = {
          model: p.model,
          messages: toOpenAIMessages(p.system, p.messages),
          [o.tokenParam ?? 'max_tokens']: p.max_tokens,
          ...(o.extra ?? {}),
        };
        if (p.tools?.length)
          body.tools = p.tools.map((t: any) => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.input_schema } }));
        if (p.tool_choice?.type === 'none' && o.toolChoiceNone) body.tool_choice = 'none';
        // Los cache_control de Anthropic se ignoran: OpenAI cachea prefijos ≥1024 tokens solo.
        const res = await doFetch(`${o.baseURL}/chat/completions`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...(o.apiKey ? { authorization: `Bearer ${o.apiKey}` } : {}) },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const detail = (await res.text().catch(() => '')).slice(0, 300);
          throw Object.assign(new Error(`${res.status} ${detail}`), { status: res.status });
        }
        return fromOpenAIResponse(await res.json());
      },
    },
  };
}
