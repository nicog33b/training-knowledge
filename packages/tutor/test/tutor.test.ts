import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { LoadedModule } from '@tk/content';
import { costOf } from '@tk/llm';
import { MAX_EXTRA_TOPICS, ask, buildTutorRequest, runTool, type TutorClient } from '../src/index.ts';

const topic = (id: string, body: string, extra: Partial<LoadedModule['topics'][number]> = {}) => ({
  id, title: id.toUpperCase(), summary: `resumen ${id}`, order: 0, requires: [], status: 'done' as const, body,
  lab: { questions: [], sims: [] }, ...extra,
});

const m: LoadedModule = {
  manifest: { id: 'aws', title: 'AWS', summary: 's', kind: 'certification', locale: 'es', tags: [], glossaries: [] },
  outline: { sections: [] },
  ownGlossary: [],
  glossary: [{ term: 'Visibility Timeout', aliases: [], definition: 'Tiempo invisible.', see: [] }],
  topics: [
    topic('sqs', '## SQS\n\nEl Visibility Timeout evita doble proceso.', {
      lab: { questions: [{ q: '¿En qué se diferencia de SNS?', kind: 'comparar', uses: ['sns'] }], sims: [] },
    }),
    topic('sns', '## SNS\n\n### Fan-out\nPub/sub push.'),
    topic('kinesis', '## Kinesis\n\nStreams.'),
  ],
};

test('prompt: catálogo cacheado + contexto mínimo del subtema', () => {
  const req = buildTutorRequest(m, 'sqs', '¿qué es?');
  assert.equal(req.system.length, 2);
  assert.ok(req.system.every((s) => s.cache_control));
  assert.match(req.system[0].text, /- kinesis: KINESIS — resumen kinesis/); // catálogo, sin cuerpos
  assert.doesNotMatch(req.system[0].text, /Streams\./);
  const ctx = req.system[1].text;
  assert.match(ctx, /evita doble proceso/); // cuerpo propio
  assert.match(ctx, /- sns: SNS — resumen sns \[secciones: SNS · Fan-out\]/); // uses → solo resumen
  assert.doesNotMatch(ctx, /Pub\/sub push/);
  assert.doesNotMatch(ctx, /kinesis/); // no relacionado: fuera
  assert.match(ctx, /Visibility Timeout: Tiempo invisible/); // glosario usado
});

test('herramienta: valida ids y no relee el actual', () => {
  assert.equal(runTool(m, 'sqs', 'leer_subtema', { id: 'sns' }).topic, 'sns');
  assert.ok(runTool(m, 'sqs', 'leer_subtema', { id: 'sqs' }).error);
  assert.ok(runTool(m, 'sqs', 'leer_subtema', { id: '../../etc' }).error);
  assert.ok(runTool(m, 'sqs', 'borrar', {}).error);
});

/** Cliente falso: pide subtemas según un guion y luego responde. */
function fake(script: string[]): TutorClient & { calls: any[] } {
  const calls: any[] = [];
  return {
    calls,
    messages: {
      async create(p: any) {
        calls.push(p);
        const id = script[calls.length - 1];
        if (id && p.tool_choice?.type !== 'none')
          return { stop_reason: 'tool_use', content: [{ type: 'tool_use', id: `t${calls.length}`, name: 'leer_subtema', input: { id } }], usage: { input_tokens: 10, output_tokens: 5, cache_read_input_tokens: 100 } };
        return { stop_reason: 'end_turn', content: [{ type: 'text', text: 'Respuesta. ¿Y tú qué crees?' }], usage: { input_tokens: 10, output_tokens: 20 } };
      },
    },
  };
}

test('bucle: lee un subtema extra bajo demanda y responde', async () => {
  const c = fake(['sns']);
  const r = await ask(c, m, 'sqs', '¿SQS o SNS?');
  assert.deepEqual(r.read, ['sns']);
  assert.match(r.text, /Respuesta/);
  assert.equal(c.calls.length, 2);
  const last = c.calls[1].messages.at(-1).content[0];
  assert.equal(last.type, 'tool_result');
  assert.match(last.content, /Pub\/sub push/);
  assert.equal(r.usage.cacheRead, 100);
  assert.ok(costOf('anthropic', 'claude-haiku-5-5', r.usage)! > 0);
});

test('bucle: tope de lecturas extra y luego prohíbe herramientas', async () => {
  const c = fake(['sns', 'kinesis', 'sns', 'kinesis', 'sns']);
  const r = await ask(c, m, 'sqs', 'todo');
  assert.ok(r.read.length <= MAX_EXTRA_TOPICS);
  assert.equal(r.stop, 'end_turn');
  assert.equal(c.calls.at(-1).tool_choice?.type, 'none');
});

// ───────── chat (varios turnos) ─────────
import { chat, checkHistory, composeUserTurn, MAX_USER_TURNS } from '../src/index.ts';

test('chat: el historial solo crece por el final y lo leído no se relee', async () => {
  const c1 = fake(['sns']);
  const t1 = await chat(c1, m, 'sqs', [], '¿SQS o SNS?');
  assert.equal(t1.messages.length, 4); // user, assistant(tool_use), user(tool_result), assistant(text)
  assert.ok(checkHistory(t1.messages).ok);
  const c2 = fake(['sns']); // intenta releer sns
  const t2 = await chat(c2, m, 'sqs', t1.messages, '¿y con FIFO?');
  assert.deepEqual(t2.messages.slice(0, 4), t1.messages); // prefijo intacto → caché
  assert.equal(c2.calls[0].messages.length, 5);
  assert.deepEqual(t2.read, []);
  assert.match(t2.messages[6].content[0].content, /Ya leíste/); // [4] pregunta, [5] tool_use, [6] tool_result
  assert.deepEqual(c2.calls[0].cache_control, { type: 'ephemeral' });
});

test('chat: página de curso sin subtema y fragmento seleccionado', async () => {
  const c = fake([]);
  await chat(c, m, undefined, [], 'explica esto', { selection: '  Pub/sub\n push ' });
  assert.match(c.calls[0].system[1].text, /portada del curso AWS/);
  assert.equal(c.calls[0].messages[0].content, '[Fragmento de la página que el alumno tiene seleccionado: «Pub/sub push»]\n\nexplica esto');
  assert.equal(composeUserTurn('hola'), 'hola');
});

test('checkHistory: rechaza historiales manipulados o demasiado largos', () => {
  assert.equal(checkHistory('x' as any).ok, false);
  assert.equal(checkHistory([{ role: 'assistant', content: 'hola' }]).ok, false);
  assert.equal(checkHistory([{ role: 'user', content: 'a' }]).ok, false); // termina en user
  assert.equal(checkHistory([{ role: 'user', content: 'a' }, { role: 'assistant', content: [{ type: 'image', source: {} }] }]).ok, false);
  assert.equal(checkHistory([{ role: 'user', content: 'a' }, { role: 'assistant', content: [{ type: 'tool_use', id: 'x', name: 'bash', input: {} }] }]).ok, false);
  assert.equal(checkHistory([{ role: 'user', content: 'x'.repeat(130_000) }, { role: 'assistant', content: 'b' }]).ok, false);
  const long = Array.from({ length: MAX_USER_TURNS }, () => [{ role: 'user', content: 'q' }, { role: 'assistant', content: 'r' }]).flat();
  assert.match((checkHistory(long) as any).error, /empieza una nueva/);
  assert.ok(checkHistory(undefined).ok);
});
