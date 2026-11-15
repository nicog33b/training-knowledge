import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FUNCTIONS, PRICES, PROVIDERS, availability, availableProviders, costOf, fromOpenAIResponse, modelFor, toOpenAIMessages } from '../src/index.ts';

test('modelo equivalente por función y proveedor', () => {
  assert.equal(modelFor('anthropic', 'tutor', {}), 'claude-haiku-5-5');
  assert.equal(modelFor('openai', 'tutor', {}), 'gpt-6-luna');
  assert.equal(modelFor('openai', 'sim-a-medida', {}), 'gpt-6-astra');
  assert.equal(modelFor('anthropic', 'sim-a-medida', {}), 'claude-opus-5-5');
  assert.equal(modelFor('openai', 'tutor', { OPENAI_MODEL: 'gpt-5-mini' }), 'gpt-5-mini');
  assert.equal(modelFor('openai', 'sim-a-medida', { OPENAI_MODEL: 'x' }), 'gpt-6-astra'); // _MODEL solo cambia el nivel rápido
  assert.equal(modelFor('openai', 'sim-a-medida', { OPENAI_MODEL_POTENTE: 'gpt-6.1-sol' }), 'gpt-6.1-sol');
  assert.equal(modelFor('gemini', 'tutor', {}), undefined);
  // Todo nivel usado por una función tiene modelo y precio en los proveedores verificados.
  for (const role of new Set(Object.values(FUNCTIONS)))
    for (const p of ['anthropic', 'openai'] as const) assert.ok(PRICES[PROVIDERS[p].models[role]!], `${p}/${role}`);
});

test('equivalentes al mismo precio en el nivel rápido y equilibrado', () => {
  assert.deepEqual(
    [PRICES['claude-haiku-5-5'].input, PRICES['claude-haiku-5-5'].output],
    [PRICES['gpt-6-luna'].input, PRICES['gpt-6-luna'].output],
  );
  assert.deepEqual(
    [PRICES['claude-sonnet-5-5'].input, PRICES['claude-sonnet-5-5'].output],
    [PRICES['gpt-6.1-sol'].input, PRICES['gpt-6.1-sol'].output],
  );
});

test('disponibilidad según entorno y preferencia', () => {
  assert.deepEqual(availability('openai', 'tutor', {}), { ok: false, why: 'falta OPENAI_API_KEY' });
  assert.deepEqual(availability('ollama', 'tutor', {}), { ok: false, why: 'falta OLLAMA_MODEL' });
  assert.deepEqual(availability('compatible', 'tutor', { COMPAT_API_KEY: 'k', COMPAT_MODEL: 'm' }), { ok: false, why: 'falta COMPAT_BASE_URL' });
  const env = { ANTHROPIC_API_KEY: 'a', OPENAI_API_KEY: 'b', OLLAMA_MODEL: 'llama3.2', TUTOR_PROVIDER: 'openai' };
  assert.deepEqual(availableProviders('tutor', env).map((p) => p.id), ['openai', 'anthropic', 'ollama']);
});

test('costo: tabla, local gratis, precio por entorno y desconocido', () => {
  const u = { input: 1_000_000, output: 1_000_000, cacheRead: 0, cacheWrite: 0 };
  assert.equal(costOf('openai', 'gpt-6-luna', u, {}), 0.6);
  assert.equal(costOf('ollama', 'llama3.2', u, {}), 0);
  assert.equal(costOf('gemini', 'gemini-x', u, {}), null);
  assert.equal(costOf('gemini', 'gemini-x', u, { GEMINI_PRICE_IN: '1', GEMINI_PRICE_OUT: '2' }), 3);
});

test('traducción a Chat Completions: sistema, tool_use y tool_result', () => {
  const msgs = toOpenAIMessages([{ text: 'reglas' }, { text: 'subtema' }], [
    { role: 'user', content: '¿SQS o SNS?' },
    { role: 'assistant', content: [{ type: 'text', text: 'Miro SNS.' }, { type: 'tool_use', id: 'toolu_1', name: 'leer_subtema', input: { id: 'sns' } }] },
    { role: 'user', content: [{ type: 'tool_result', tool_use_id: 'toolu_1', content: '# SNS' }] },
    { role: 'assistant', content: [{ type: 'text', text: 'Respuesta.' }] },
  ]);
  assert.deepEqual(msgs, [
    { role: 'system', content: 'reglas' },
    { role: 'system', content: 'subtema' },
    { role: 'user', content: '¿SQS o SNS?' },
    { role: 'assistant', content: 'Miro SNS.', tool_calls: [{ id: 'toolu_1', type: 'function', function: { name: 'leer_subtema', arguments: '{"id":"sns"}' } }] },
    { role: 'tool', tool_call_id: 'toolu_1', content: '# SNS' },
    { role: 'assistant', content: 'Respuesta.' },
  ]);
});

test('respuesta de Chat Completions a formato canónico', () => {
  const r = fromOpenAIResponse({
    choices: [{ finish_reason: 'tool_calls', message: { content: null, tool_calls: [{ id: 'call_9', function: { name: 'leer_subtema', arguments: '{"id":"sns"}' } }, { function: { name: 'leer_subtema', arguments: 'no-json' } }] } }],
    usage: { prompt_tokens: 50, completion_tokens: 5, prompt_tokens_details: { cached_tokens: 20 } },
  });
  assert.equal(r.stop_reason, 'tool_use');
  assert.deepEqual(r.content, [
    { type: 'tool_use', id: 'call_9', name: 'leer_subtema', input: { id: 'sns' } },
    { type: 'tool_use', id: 'call_1', name: 'leer_subtema', input: {} },
  ]);
  assert.deepEqual(r.usage, { input_tokens: 30, output_tokens: 5, cache_read_input_tokens: 20, cache_creation_input_tokens: 0 });
  assert.equal(fromOpenAIResponse({ choices: [{ finish_reason: 'length', message: { content: 'cortado' } }] }).stop_reason, 'max_tokens');
});
