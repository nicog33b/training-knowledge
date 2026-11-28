import { test } from 'node:test';
import assert from 'node:assert/strict';
import { interleave, review, sessionOrder } from '../src/index.ts';

test('review: sí sube de caja, no reinicia y vuelve pronto', () => {
  const now = 0;
  let c = review(undefined, 'si', now);
  assert.equal(c.box, 1);
  assert.equal(c.due, 86_400_000);
  c = review(c, 'si', now);
  assert.equal(c.box, 2);
  c = review(c, 'no', now);
  assert.equal(c.box, 0);
  assert.equal(c.due, 600_000);
  assert.equal(c.lapses, 1);
});

test('interleave: no repite grupo seguido si puede', () => {
  const r = interleave([{ group: 'a' }, { group: 'a' }, { group: 'b' }, { group: 'b' }]);
  assert.deepEqual(r.map((x) => x.group), ['a', 'b', 'a', 'b']);
});

test('sessionOrder: vencidas antes que nuevas', () => {
  const items = [{ key: 'n', group: 'x' }, { key: 'd', group: 'y' }];
  const r = sessionOrder(items, { d: { box: 1, due: 5, last: 0, reps: 1, lapses: 0 } }, 10);
  assert.equal(r[0].key, 'd');
});
