import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cloze, clozeMatch, courseGraph, mindmap, outline, textToMindmap } from '../src/index.ts';

const md = `## SQS

Una **cola** desacopla productores y consumidores.

### Visibilidad

Tras leer un mensaje, el **visibility timeout** lo oculta a otros consumidores durante un tiempo.

- Si no se borra a tiempo, vuelve a la cola.

\`\`\`js
const x = **no**;
\`\`\`
`;

test('outline: título, secciones e ideas en negrita', () => {
  const o = outline(md);
  assert.equal(o.title, 'SQS');
  assert.deepEqual(o.points, ['cola']);
  assert.equal(o.children[0].title, 'Visibilidad');
  assert.deepEqual(o.children[0].points, ['visibility timeout']);
});

test('mindmap: Mermaid válido y sin caracteres peligrosos', () => {
  const m = mindmap(outline(md));
  assert.match(m, /^mindmap\n {2}root\(\(SQS\)\)/);
  assert.ok(m.includes('visibility timeout'));
});

test('cloze: oculta la negrita, ignora código', () => {
  const c = cloze(md);
  assert.equal(c.length, 2);
  assert.equal(c[1].answer, 'visibility timeout');
  assert.ok(c[1].prompt.includes('_____'));
  assert.ok(clozeMatch('Visibility Timeout', 'visibility timeout'));
  assert.ok(clozeMatch('visibilty timeout', 'visibility timeout'));
  assert.ok(!clozeMatch('cola', 'visibility timeout'));
});

test('courseGraph: grupos y requisitos', () => {
  const g = courseGraph({ sections: [{ id: 'a', title: 'A', topics: [{ id: 'x-1', title: 'X' }, { id: 'y', title: 'Y (2)' }] }], requires: { y: ['x-1'] } });
  assert.ok(g.includes('t_x_1 --> t_y'));
  assert.ok(!g.includes('(2)'));
});

test('textToMindmap: sangrías → jerarquía', () => {
  const m = textToMindmap('RAG\n  Recuperar\n    BM25\n  Generar');
  assert.equal(m, 'mindmap\n  root((RAG))\n    Recuperar\n      BM25\n    Generar');
  assert.equal(textToMindmap(''), '');
});
