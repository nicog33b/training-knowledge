/**
 * Primitivas de simulación: validación semántica de recetas (lo que zod no puede ver)
 * y corrección determinista. La UI (apps/web) usa `./rule` para ejecutar en el navegador.
 * Decisión: research/decisions/simulaciones-por-primitivas-y-recetas.md
 */
import type { ClassifySim, LabFile, PredictObserveSim, SimSpec } from '@tk/contracts';
import { evalRule, parseRule, pickOutcome, ruleVars } from './rule.ts';

export { evalRule, parseRule, pickOutcome, ruleVars } from './rule.ts';

/** Valores de prueba de un parámetro: extremos, default y punto medio. */
function samples(p: { min: number; max: number; default: number; step: number }) {
  return [...new Set([p.min, p.max, p.default, Math.round((p.min + p.max) / 2 / p.step) * p.step])];
}

function checkPredict(s: PredictObserveSim): string[] {
  const errs: string[] = [];
  const params = new Set(s.params.map((p) => p.id));
  const options = new Set(s.predict.options.map((o) => o.id));
  if (params.size !== s.params.length) errs.push('params con id repetido');
  for (const o of s.outcomes) {
    try {
      for (const v of ruleVars(parseRule(o.when))) if (!params.has(v)) errs.push(`when "${o.when}": variable "${v}" no declarada en params`);
    } catch (e: any) {
      errs.push(`when "${o.when}": ${e.message}`);
    }
    if (!options.has(o.answer)) errs.push(`answer "${o.answer}" no es una opción de predict`);
  }
  if (errs.length) return errs;
  // Cobertura: con cualquier combinación de valores de muestra debe haber resultado.
  let combos: Record<string, number>[] = [{}];
  for (const p of s.params) combos = combos.flatMap((c) => samples(p).map((v) => ({ ...c, [p.id]: v })));
  const uncovered = combos.find((c) => !pickOutcome(s.outcomes, c));
  if (uncovered) return [`ningún outcome cubre ${JSON.stringify(uncovered)} (añade un caso por defecto, p. ej. when: "1")`];
  const answers = new Set(combos.map((c) => pickOutcome(s.outcomes, c)!.answer));
  if (answers.size < 2) errs.push('todas las combinaciones dan la misma respuesta: no hay nada que predecir');
  return errs;
}

function checkClassify(s: ClassifySim): string[] {
  const cats = new Set(s.categories.map((c) => c.id));
  const errs = s.items.filter((i) => !cats.has(i.category)).map((i) => `item "${i.text}": categoría inexistente "${i.category}"`);
  for (const c of cats) if (!s.items.some((i) => i.category === c)) errs.push(`categoría "${c}" sin ningún item`);
  return errs;
}

/** Errores semánticos de un lab. `topicIds`: subtemas del módulo (para `uses`). */
export function checkLab(lab: LabFile, topicIds: Set<string>): string[] {
  const errs: string[] = [];
  const seen = new Set<string>();
  for (const s of lab.sims) {
    if (seen.has(s.id)) errs.push(`sim "${s.id}" repetida`);
    seen.add(s.id);
    const e = s.type === 'predecir-observar' ? checkPredict(s) : checkClassify(s);
    errs.push(...e.map((m) => `sim ${s.id}: ${m}`));
  }
  for (const q of lab.questions) for (const u of q.uses) if (!topicIds.has(u)) errs.push(`pregunta "${q.q.slice(0, 40)}…": uses inexistente "${u}"`);
  return errs;
}

// ───────── Corrección determinista (nivel 0 de costo) ─────────
export function gradePrediction(s: PredictObserveSim, vars: Record<string, number>, predicted: string) {
  const o = pickOutcome(s.outcomes, vars);
  return { correct: o?.answer === predicted, outcome: o };
}

export function gradeClassification(s: ClassifySim, answers: Record<number, string>) {
  const results = s.items.map((it, i) => ({ item: it, chosen: answers[i], correct: answers[i] === it.category }));
  return { score: results.filter((r) => r.correct).length, total: s.items.length, results };
}

/**
 * Autoevaluación contra la checklist sin IA: busca coincidencias literales aproximadas.
 * Es solo una ayuda; el alumno marca cada idea (decisión correccion-ia-solo-formativa-con-checklist).
 */
export function roughChecklist(rubric: string[], answer: string) {
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const a = norm(answer);
  return rubric.map((idea) => {
    const keys = norm(idea).split(/[^a-z0-9]+/).filter((w) => w.length > 4);
    return { idea, hit: keys.length > 0 && keys.some((k) => a.includes(k)) };
  });
}

export type { SimSpec };
