import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMatcher, findTerms, rehypeGlossary, stripCode } from '../src/index.ts';

const terms = [
  { term: 'Cache', aliases: ['caché'], definition: 'Almacén temporal.', see: [] },
  { term: 'Cache Busting', aliases: [], definition: 'Invalidar por URL.', see: [] },
];

test('prefiere el término más largo y respeta límites de palabra', () => {
  const m = buildMatcher(terms);
  const ids = findTerms('El cache busting y el cacheable no cuentan, pero Cache sí', m).map((h) => h.id);
  assert.deepEqual(ids, ['cache-busting', 'cache']);
});

test('stripCode ignora código', () => {
  assert.equal(findTerms(stripCode('`cache` y ```\ncache\n```'), buildMatcher(terms)).length, 0);
});

test('rehype envuelve la primera aparición y salta <code>', () => {
  const tree: any = {
    type: 'root',
    children: [
      { type: 'element', tagName: 'p', children: [{ type: 'text', value: 'un cache y otro cache' }] },
      { type: 'element', tagName: 'code', children: [{ type: 'text', value: 'cache' }] },
    ],
  };
  const file = { data: {} as Record<string, unknown> };
  rehypeGlossary({ terms })(tree, file);
  const spans = tree.children[0].children.filter((c: any) => c.tagName === 'span');
  assert.equal(spans.length, 1);
  assert.equal(tree.children[1].children[0].type, 'text');
  assert.deepEqual(file.data.glossaryUsed, ['cache']);
});
