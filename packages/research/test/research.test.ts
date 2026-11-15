import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { RawSource, RawTopic, ResearchSource } from '@tk/contracts';
import { buildResearchIndex, decisionsFor, findResearch, loadResearch } from '../src/index.ts';

const src = (id: string, verified = 'abstract') => ({
  id,
  title: `Fuente ${id}`,
  url: 'https://example.com/x',
  kind: 'meta-analysis',
  verified,
  retrieved: '2026-11-15',
  summary: 'Resumen.',
  facts: ['g = 0.5'],
});
const dec = (id: string, fm: Record<string, unknown>, body = 'cuerpo '.repeat(50)): RawTopic => ({
  id,
  frontmatter: { title: id, summary: 's', confidence: 'medium', date: '2026-11-15', sources: ['a'], ...fm },
  body,
});
const mk = (sources: RawSource[], decisions: RawTopic[]): ResearchSource => ({
  listSources: async () => sources,
  listDecisions: async () => decisions,
});

test('caso válido: sin errores, y avisa de fuentes huérfanas', async () => {
  const r = await loadResearch(mk([{ id: 'a', data: src('a') }, { id: 'b', data: src('b') }], [dec('d', {})]));
  assert.deepEqual(r.issues, []);
  assert.equal(r.warnings.length, 1);
  assert.match(r.warnings[0].where, /sources\/b$/);
});

test('rechaza fuente inexistente y id distinto del archivo', async () => {
  const r = await loadResearch(mk([{ id: 'a', data: src('otro') }], [dec('d', { sources: ['zzz'] })]));
  const msgs = r.issues.map((i) => i.message).join('|');
  assert.match(msgs, /!= archivo/);
  assert.match(msgs, /fuente inexistente "zzz"/);
});

test('confidence=high exige una fuente mejor que secondary', async () => {
  const only2nd = await loadResearch(mk([{ id: 'a', data: src('a', 'secondary') }], [dec('d', { confidence: 'high' })]));
  assert.match(only2nd.issues[0].message, /confidence=high/);
  const ok = await loadResearch(mk([{ id: 'a', data: src('a', 'abstract') }], [dec('d', { confidence: 'high' })]));
  assert.deepEqual(ok.issues, []);
});

test('affects se valida contra los módulos existentes', async () => {
  const r = await loadResearch(mk([{ id: 'a', data: src('a') }], [dec('d', { affects: ['module:nope', 'cosa'] })]), ['aws-saa']);
  assert.equal(r.issues.length, 2);
});

test('accepted exige cuerpo; superseded exige supersededBy', async () => {
  const r = await loadResearch(mk([{ id: 'a', data: src('a') }], [dec('d', { status: 'accepted' }, 'corto'), dec('e', { status: 'superseded' })]));
  const msgs = r.issues.map((i) => i.message).join('|');
  assert.match(msgs, /<40 palabras/);
  assert.match(msgs, /supersededBy/);
});

test('un YAML roto se reporta como problema, no como excepción', async () => {
  const r = await loadResearch(
    mk([{ id: 'a', data: { $yamlError: 'Nested mappings are not allowed' } }], [{ id: 'd', frontmatter: { $yamlError: 'boom' }, body: '' }]),
  );
  assert.equal(r.issues.length, 2);
  assert.match(r.issues[0].message, /YAML inválido/);
});

test('decisionsFor, findResearch e índice', async () => {
  const r = await loadResearch(
    mk([{ id: 'a', data: src('a') }], [dec('todas', { affects: ['all'] }), dec('solo-saa', { affects: ['module:aws-saa'] }), dec('otro', { affects: ['package:x'] })]),
    ['aws-saa', 'next-cache'],
  );
  assert.deepEqual(decisionsFor(r, 'aws-saa').map((d) => d.id), ['todas', 'solo-saa']);
  assert.deepEqual(decisionsFor(r, 'next-cache').map((d) => d.id), ['todas']);
  assert.equal(findResearch(r, 'g = 0.5').sources.length, 1);
  assert.equal(findResearch(r, 'inexistente').sources.length, 0);
  assert.equal(findResearch(r, 'RESUMEN').sources.length, 1); // sin distinguir mayúsculas
  assert.equal(findResearch(r, 'resúmen').sources.length, 1); // ni tildes
  assert.match(buildResearchIndex(r).md, /## Decisiones \(3\)/);
});
