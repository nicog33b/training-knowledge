import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ToolSpec } from '@tk/contracts';
import { checkTool, computeCalc, renderTemplate, walkDecision } from '../src/index.ts';

const calc = ToolSpec.parse({
  id: 'costo', title: 'Costo', summary: 'x', builder: 'calculadora',
  inputs: [
    { id: 'docs', label: 'Docs', type: 'number', min: 1, max: 1000, default: 100 },
    { id: 'chunk', label: 'Chunk', type: 'select', options: [{ label: '256', value: 256 }, { label: '512', value: 512 }], default: 512 },
  ],
  outputs: [
    { id: 'tokens', label: 'Tokens', expr: 'docs * 2000' },
    { id: 'chunks', label: 'Chunks', expr: 'ceil(tokens / chunk)', main: true },
  ],
  notes: [{ when: 'chunks > 300', text: 'muchos', tone: 'warn' }],
});

test('calculadora: salidas encadenadas y funciones', () => {
  const r = computeCalc(calc as any, { docs: 100, chunk: 512 });
  assert.equal(r.outputs[1].value, Math.ceil(200000 / 512));
  assert.equal(r.notes.length, 1);
  assert.deepEqual(checkTool(calc, new Set()), []);
});

test('calculadora: variable no definida', () => {
  const bad = { ...(calc as any), outputs: [{ id: 'x', label: 'x', expr: 'y + 1', decimals: 0, main: false }] };
  assert.match(checkTool(bad, new Set()).join(), /variable "y"/);
});

const dec = ToolSpec.parse({
  id: 'que-usar', title: 'Qué usar', summary: 'x', builder: 'decision', start: 'a',
  nodes: [
    { id: 'a', question: '¿Cambia seguido?', options: [{ label: 'Sí', next: 'b' }, { label: 'No', result: 'prompt' }] },
    { id: 'b', question: '¿Es mucho?', options: [{ label: 'Sí', result: 'rag' }, { label: 'No', result: 'prompt' }] },
  ],
  results: [{ id: 'rag', title: 'RAG', why: 'x' }, { id: 'prompt', title: 'Prompt', why: 'y' }],
});

test('decisión: recorrido y validación', () => {
  assert.deepEqual(checkTool(dec, new Set()), []);
  const w = walkDecision(dec as any, [0, 0]);
  assert.equal(w.result?.id, 'rag');
  assert.equal(w.path.length, 2);
  const cyc = { ...(dec as any), nodes: [{ id: 'a', question: 'q', options: [{ label: 'x', next: 'a' }, { label: 'y', result: 'rag' }] }] };
  const errs = checkTool(cyc, new Set()).join();
  assert.match(errs, /ciclo/);
  assert.match(errs, /prompt" inalcanzable/);
});

test('plantilla: omite líneas vacías y valida campos', () => {
  const t = ToolSpec.parse({ id: 'p', title: 'P', summary: 'x', builder: 'plantilla', fields: [{ id: 'goal', label: 'Meta' }, { id: 'extra', label: 'Extra' }], template: 'Meta: {{goal}}\nExtra: {{extra}}' });
  assert.equal(renderTemplate(t as any, { goal: 'hola' }), 'Meta: hola');
  assert.deepEqual(checkTool(t, new Set()), []);
  const bad = { ...(t as any), template: '{{nope}}' };
  assert.match(checkTool(bad, new Set()).join(), /nope/);
});

test('comparador: columnas', () => {
  const t = { id: 'c', title: 'C', summary: 'x', builder: 'comparador', topics: [], options: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }, { id: 'c', label: 'C' }], rows: [{ criterion: 'x', values: ['1', '2', '3'] }, { criterion: 'y', values: ['1', '2'] }] } as any;
  assert.match(checkTool(t, new Set()).join(), /2 valores para 3/);
});
