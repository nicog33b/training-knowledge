import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { FsContentSource, loadAll } from '@tk/content';
import { addUsage, openAICompatClient, readLedger, resetLedger, type ProviderId, type Usage } from '@tk/llm';
import { fakeClient, handleChat, spendView, type ProviderSlot } from '../src/handler.ts';

const ROOT = resolve(import.meta.dirname, '../../..');
const data = loadAll(new FsContentSource(ROOT));

/** ChatGPT simulado: el adaptador real de OpenAI con un fetch falso. */
const openaiBodies: any[] = [];
const fakeOpenAI = openAICompatClient({
  baseURL: 'https://api.openai.test/v1',
  apiKey: 'sk-test',
  tokenParam: 'max_completion_tokens',
  extra: { reasoning_effort: 'none' },
  toolChoiceNone: true,
  fetch: (async (_url: string, init: any) => {
    openaiBodies.push(JSON.parse(init.body));
    return new Response(JSON.stringify({
      choices: [{ finish_reason: 'stop', message: { role: 'assistant', content: 'Respuesta de ChatGPT.' } }],
      usage: { prompt_tokens: 3000, completion_tokens: 100, prompt_tokens_details: { cached_tokens: 2000 } },
    }), { status: 200 });
  }) as any,
});

const providers = new Map<ProviderId, ProviderSlot>([
  ['anthropic', { client: fakeClient, model: 'claude-haiku-5-5', label: 'Claude' }],
  ['openai', { client: fakeOpenAI, model: 'gpt-6-luna', label: 'ChatGPT' }],
]);
const spent: [string, string, number | null][] = [];
const deps = { load: () => data, providers, onSpend: (p: ProviderId, model: string, _u: Usage, usd: number | null) => void spent.push([p, model, usd]) };

test('chat de dos turnos con contexto del subtema real (proveedor predeterminado)', async () => {
  const r1 = await handleChat({ module: 'aws-saa', topic: 'sqs', question: '¿por qué duplica?' }, deps);
  assert.equal(r1.status, 200);
  assert.equal(r1.body.provider, 'anthropic');
  assert.match(r1.body.text, /Subtema: SQS \[aws-saa\/sqs\]/);
  const r2 = await handleChat({ module: 'aws-saa', topic: 'sqs', question: '¿y FIFO?', history: r1.body.messages }, deps);
  assert.match(r2.body.text, /Mensaje 2/);
  assert.equal(r2.body.messages.length, 4);
});

test('misma conversación continúa con ChatGPT: traduce formato, usa gpt-6-luna y registra gasto', async () => {
  const r1 = await handleChat({ module: 'aws-saa', topic: 'sqs', question: 'hola' }, deps);
  const r2 = await handleChat({ module: 'aws-saa', topic: 'sqs', question: '¿y en ChatGPT?', history: r1.body.messages, provider: 'openai' }, deps);
  assert.equal(r2.status, 200);
  assert.equal(r2.body.text, 'Respuesta de ChatGPT.');
  assert.equal(r2.body.model, 'gpt-6-luna');
  const body = openaiBodies.at(-1);
  assert.equal(body.model, 'gpt-6-luna');
  assert.equal(body.max_completion_tokens, 1024);
  assert.equal(body.reasoning_effort, 'none');
  assert.equal(body.messages[0].role, 'system');
  assert.match(body.messages[1].content, /Subtema: SQS/);
  assert.deepEqual(body.messages.slice(2).map((m: any) => m.role), ['user', 'assistant', 'user']);
  assert.equal(body.tools[0].function.name, 'leer_subtema');
  // 1000 sin caché × $0.10 + 2000 cacheados × $0.01 + 100 salida × $0.50 (por millón)
  assert.equal(r2.body.cost.toFixed(8), ((1000 * 0.1 + 2000 * 0.01 + 100 * 0.5) / 1e6).toFixed(8));
  assert.deepEqual(spent.at(-1), ['openai', 'gpt-6-luna', r2.body.cost]);
  assert.equal(r2.body.name, 'GPT-6 Luna');
});

test('valida entrada, proveedor y falta de claves', async () => {
  assert.equal((await handleChat({ module: 'aws-saa', topic: 'no-existe', question: 'x' }, deps)).status, 404);
  assert.equal((await handleChat({ module: 'nada', question: 'x' }, deps)).status, 404);
  assert.equal((await handleChat({ module: 'aws-saa', question: '  ' }, deps)).status, 400);
  assert.equal((await handleChat({ module: 'aws-saa', question: 'x'.repeat(2001) }, deps)).status, 400);
  assert.equal((await handleChat({ module: 'aws-saa', question: 'x', history: [{ role: 'assistant', content: 'y' }] }, deps)).status, 400);
  assert.match((await handleChat({ module: 'aws-saa', question: 'x', provider: 'gemini' }, deps)).body.error, /no disponible/);
  const r = await handleChat({ module: 'aws-saa', question: 'hola' }, { load: () => data, providers: new Map() });
  assert.equal(r.status, 503);
  assert.match(r.body.error, /OPENAI_API_KEY/);
});

test('contador de gasto: por modelo, hoy, mes y total; reinicio', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'tk-gasto-'));
  const u = (input: number, output: number): Usage => ({ input, output, cacheRead: 0, cacheWrite: 0 });
  const now = new Date(2026, 10, 15, 12);
  await Promise.all([
    addUsage(dir, 'anthropic', 'claude-opus-5-5', u(1000, 500), 0.25, now),
    addUsage(dir, 'anthropic', 'claude-opus-5-5', u(1000, 500), 0.5, now),
    addUsage(dir, 'openai', 'gpt-6-luna', u(2000, 100), 0.01, new Date(2026, 10, 2)), // este mes, otro día
    addUsage(dir, 'openai', 'gpt-6-luna', u(10, 10), 1, new Date(2026, 9, 30)), // mes pasado
    addUsage(dir, 'compatible', 'mi-modelo', u(50, 50), null, now), // sin precio: cuenta tokens
  ]);
  const v = spendView(await readLedger(dir), providers, now);
  assert.equal(v.hoy, 0.75);
  assert.equal(v.mes, 0.76);
  assert.equal(v.total, 1.76);
  const opus = v.modelos.find((m) => m.model === 'claude-opus-5-5')!;
  assert.deepEqual([opus.name, opus.turnos, opus.tokens, opus.usd, opus.price?.input], ['Claude Opus 5.5', 2, 3000, 0.75, 4]);
  const raro = v.modelos.find((m) => m.model === 'mi-modelo')!;
  assert.deepEqual([raro.sinPrecio, raro.price, raro.tokens], [1, null, 100]);
  // los disponibles aparecen aunque no se hayan usado, con su precio
  const haiku = v.modelos.find((m) => m.model === 'claude-haiku-5-5')!;
  assert.deepEqual([haiku.usado, haiku.price?.output], [false, 0.5]);
  assert.equal(v.modelos[0].model, 'gpt-6-luna'); // ordenado por gasto
  const r = spendView(await resetLedger(dir), providers, now);
  assert.deepEqual([r.total, r.hoy, r.modelos.every((m) => !m.usado)], [0, 0, true]);
});
