/**
 * Herramientas por curso: validación semántica de lo que zod no ve (variables de expresiones,
 * caminos del asistente, columnas del comparador, campos de la plantilla).
 * Decisión: research/decisions/herramientas-por-curso-con-constructores.md
 */
import { TOOL_BUILDERS, type ToolSpec } from '@tk/contracts';
import { parseRule, ruleVars } from '@tk/sims/rule';

export { computeCalc, formatNumber, renderTemplate, walkDecision } from './run.ts';

export const BUILDERS: Record<(typeof TOOL_BUILDERS)[number], string> = {
  calculadora: 'Entradas numéricas o de selección → resultados calculados con expresiones seguras y avisos condicionales.',
  decision: 'Asistente de preguntas encadenadas que termina en una recomendación con su porqué.',
  checklist: 'Lista verificable por grupos, con el porqué de cada punto y progreso guardado.',
  comparador: 'Matriz opciones × criterios, con filtro y resaltado de diferencias.',
  plantilla: 'Campos que rellena el alumno → texto generado listo para copiar.',
};

function exprErrors(where: string, src: string, known: Set<string>): string[] {
  try {
    return [...ruleVars(parseRule(src))].filter((v) => !known.has(v)).map((v) => `${where} "${src}": variable "${v}" no definida antes`);
  } catch (e: any) {
    return [`${where} "${src}": ${e.message}`];
  }
}

/** Errores semánticos de una herramienta. `topicIds`: subtemas del módulo. */
export function checkTool(t: ToolSpec, topicIds: Set<string>): string[] {
  const errs = t.topics.filter((x) => !topicIds.has(x)).map((x) => `topics: subtema inexistente "${x}"`);
  switch (t.builder) {
    case 'calculadora': {
      const known = new Set<string>();
      for (const i of t.inputs) {
        if (known.has(i.id)) errs.push(`input "${i.id}" repetido`);
        known.add(i.id);
        if (i.type === 'number' && !(i.min < i.max && i.default >= i.min && i.default <= i.max)) errs.push(`input "${i.id}": exige min < max y min ≤ default ≤ max`);
        if (i.type === 'select' && !i.options.some((o) => o.value === i.default)) errs.push(`input "${i.id}": default no es el valor de ninguna opción`);
      }
      for (const o of t.outputs) {
        errs.push(...exprErrors(`output ${o.id}`, o.expr, known));
        if (known.has(o.id)) errs.push(`output "${o.id}" repite un id`);
        known.add(o.id);
      }
      for (const n of t.notes) errs.push(...exprErrors('note', n.when, known));
      break;
    }
    case 'decision': {
      const ids = new Set(t.nodes.map((n) => n.id));
      const results = new Set(t.results.map((r) => r.id));
      if (!ids.has(t.start)) errs.push(`start "${t.start}" no es un nodo`);
      const reachedResults = new Set<string>();
      const seen = new Set<string>();
      // DFS con detección de ciclos.
      const visit = (id: string, stack: Set<string>) => {
        if (stack.has(id)) return errs.push(`ciclo en el asistente: vuelve a "${id}"`);
        if (seen.has(id)) return;
        seen.add(id);
        const n = t.nodes.find((x) => x.id === id);
        if (!n) return;
        stack.add(id);
        n.options.forEach((o, k) => {
          if (!!o.next === !!o.result) errs.push(`nodo ${n.id}, opción ${k + 1}: debe tener next O result (uno solo)`);
          if (o.next && !ids.has(o.next)) errs.push(`nodo ${n.id}: next "${o.next}" no existe`);
          if (o.result && !results.has(o.result)) errs.push(`nodo ${n.id}: result "${o.result}" no existe`);
          if (o.result) reachedResults.add(o.result);
          if (o.next) visit(o.next, stack);
        });
        stack.delete(id);
      };
      visit(t.start, new Set());
      for (const n of t.nodes) if (!seen.has(n.id)) errs.push(`nodo "${n.id}" inalcanzable desde start`);
      for (const r of t.results) {
        if (!reachedResults.has(r.id)) errs.push(`resultado "${r.id}" inalcanzable`);
        for (const s of r.see) if (!topicIds.has(s)) errs.push(`resultado ${r.id}: see "${s}" no es un subtema`);
      }
      break;
    }
    case 'comparador':
      t.rows.forEach((r) => { if (r.values.length !== t.options.length) errs.push(`fila "${r.criterion}": ${r.values.length} valores para ${t.options.length} opciones`); });
      break;
    case 'plantilla': {
      const fields = new Set(t.fields.map((f) => f.id));
      for (const m of t.template.matchAll(/\{\{\s*([^}]*?)\s*\}\}/g)) if (!fields.has(m[1])) errs.push(`template: campo "{{${m[1]}}}" no declarado en fields`);
      for (const f of t.fields) {
        if (!t.template.includes(`{{${f.id}}}`) && !new RegExp(`\\{\\{\\s*${f.id}\\s*\\}\\}`).test(t.template)) errs.push(`campo "${f.id}" no se usa en template`);
        if (f.kind === 'select' && !f.options?.length) errs.push(`campo "${f.id}": select sin options`);
      }
      break;
    }
    case 'checklist':
      break;
  }
  return errs;
}
