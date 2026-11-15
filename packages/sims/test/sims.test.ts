import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LabFile } from '@tk/contracts';
import { checkLab, evalRule, gradeClassification, gradePrediction, parseRule, roughChecklist } from '../src/index.ts';

const ev = (s: string, v: Record<string, number> = {}) => evalRule(parseRule(s), v);

test('reglas: aritmética, precedencia y lógica', () => {
  assert.equal(ev('1 + 2 * 3'), 7);
  assert.equal(ev('(1 + 2) * 3'), 9);
  assert.equal(ev('a > 10 && b <= 2', { a: 11, b: 2 }), 1);
  assert.equal(ev('!(a > 10) || b == 3', { a: 11, b: 2 }), 0);
  assert.equal(ev('-a + 5', { a: 2 }), 3);
  assert.equal(ev('a % 4', { a: 10 }), 2);
});

test('reglas: rechaza código y variables desconocidas', () => {
  assert.throws(() => parseRule('process.exit()'));
  assert.throws(() => parseRule('a = 1'));
  assert.throws(() => parseRule('(a > 1'));
  assert.throws(() => ev('x > 1', {}), /desconocida/);
});

const predict = {
  id: 'vis', title: 'Visibilidad', type: 'predecir-observar', context: 'c',
  params: [
    { id: 'proceso', label: 'Proceso', min: 1, max: 120, default: 20 },
    { id: 'timeout', label: 'Timeout', min: 0, max: 60, default: 30 },
  ],
  predict: { question: '¿Qué pasa?', options: [{ id: 'una', label: 'Una vez' }, { id: 'doble', label: 'Dos veces' }] },
  outcomes: [
    { when: 'proceso > timeout', answer: 'doble', show: 'Se reprocesa' },
    { when: '1', answer: 'una', show: 'Ok' },
  ],
  explain: { prompt: '¿Por qué?', rubric: ['menciona visibility timeout'] },
};

test('lab válido pasa; corrección determinista', () => {
  const lab = LabFile.parse({ questions: [{ q: '¿Por qué hay duplicados?', kind: 'por-que', uses: ['sns'] }], sims: [predict] });
  assert.deepEqual(checkLab(lab, new Set(['sqs', 'sns'])), []);
  const s = lab.sims[0] as any;
  assert.equal(gradePrediction(s, { proceso: 40, timeout: 30 }, 'doble').correct, true);
  assert.equal(gradePrediction(s, { proceso: 10, timeout: 30 }, 'doble').correct, false);
});

test('lab: detecta variables no declaradas, respuestas inválidas, huecos y uses rotos', () => {
  const bad = LabFile.parse({
    questions: [{ q: '¿Qué pasa si...?', kind: 'que-pasa-si', uses: ['no-existe'] }],
    sims: [{ ...predict, outcomes: [{ when: 'retries > 2', answer: 'nada', show: 'x' }, { when: 'proceso > 500', answer: 'una', show: 'y' }] }],
  });
  const errs = checkLab(bad, new Set(['sqs'])).join('\n');
  assert.match(errs, /"retries" no declarada/);
  assert.match(errs, /answer "nada"/);
  assert.match(errs, /uses inexistente "no-existe"/);
  const gap = LabFile.parse({ sims: [{ ...predict, outcomes: [{ when: 'proceso > timeout', answer: 'doble', show: 'x' }, { when: 'proceso < 5', answer: 'una', show: 'y' }] }] });
  assert.match(checkLab(gap, new Set()).join('\n'), /ningún outcome cubre/);
  const flat = LabFile.parse({ sims: [{ ...predict, outcomes: [{ when: '1', answer: 'una', show: 'x' }, { when: '0', answer: 'doble', show: 'y' }] }] });
  assert.match(checkLab(flat, new Set()).join('\n'), /nada que predecir/);
});

test('clasificar: categorías sin items y corrección', () => {
  const lab = LabFile.parse({
    sims: [{
      id: 'cls', title: 'T', type: 'clasificar', prompt: 'p',
      categories: [{ id: 'sqs', label: 'SQS' }, { id: 'sns', label: 'SNS' }, { id: 'kinesis', label: 'Kinesis' }],
      items: [
        { text: 'a', category: 'sqs', why: 'w' },
        { text: 'b', category: 'sns', why: 'w' },
        { text: 'c', category: 'sqs', why: 'w' },
      ],
    }],
  });
  assert.match(checkLab(lab, new Set()).join('\n'), /"kinesis" sin ningún item/);
  const g = gradeClassification(lab.sims[0] as any, { 0: 'sqs', 1: 'sqs', 2: 'sqs' });
  assert.equal(g.score, 2);
});

test('checklist aproximada sin IA', () => {
  const r = roughChecklist(['Menciona ChangeMessageVisibility', 'Habla de idempotencia'], 'Usaría changemessagevisibility para extenderlo');
  assert.deepEqual(r.map((x) => x.hit), [true, false]);
});
