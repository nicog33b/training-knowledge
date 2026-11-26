/**
 * Ejecución de herramientas (sin dependencias de Node: la usa el navegador).
 * El constructor es común; la configuración (CalculatorTool, TemplateTool…) viene del curso.
 */
import type { CalculatorTool, DecisionTool, TemplateTool } from '@tk/contracts';
import { evalRule, parseRule } from '@tk/sims/rule';

/** Calcula las salidas en orden (cada salida puede usar inputs y salidas anteriores). */
export function computeCalc(tool: Pick<CalculatorTool, 'inputs' | 'outputs' | 'notes'>, values: Record<string, number>) {
  const vars: Record<string, number> = {};
  for (const i of tool.inputs) vars[i.id] = values[i.id] ?? i.default;
  const outputs = tool.outputs.map((o) => {
    let v = NaN;
    try { v = evalRule(parseRule(o.expr), vars); } catch {}
    vars[o.id] = v;
    return { ...o, value: v, text: formatNumber(v, o.decimals) };
  });
  const notes = tool.notes.filter((n) => { try { return !!evalRule(parseRule(n.when), vars); } catch { return false; } });
  return { outputs, notes, vars };
}

export function formatNumber(v: number, decimals = 0) {
  if (!Number.isFinite(v)) return '—';
  return v.toLocaleString('es', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Rellena {{campo}}; omite las líneas cuyo campo quedó vacío. */
export function renderTemplate(tool: Pick<TemplateTool, 'template'>, values: Record<string, string>) {
  return tool.template
    .split('\n')
    .flatMap((line) => {
      const ids = [...line.matchAll(/\{\{\s*([a-z_][a-z0-9_]*)\s*\}\}/g)].map((m) => m[1]);
      if (ids.length && ids.every((id) => !(values[id] ?? '').trim())) return [];
      return [line.replace(/\{\{\s*([a-z_][a-z0-9_]*)\s*\}\}/g, (_, id) => (values[id] ?? '').trim() || `[${id}]`)];
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Recorre el asistente: devuelve el nodo actual o el resultado según las elecciones (índices de opción). */
export function walkDecision(tool: Pick<DecisionTool, 'start' | 'nodes' | 'results'>, choices: number[]) {
  const nodes = new Map(tool.nodes.map((n) => [n.id, n]));
  const path: { question: string; answer: string }[] = [];
  let node = nodes.get(tool.start);
  for (const c of choices) {
    if (!node) break;
    const opt = node.options[c];
    if (!opt) break;
    path.push({ question: node.question, answer: opt.label });
    if (opt.result) return { path, result: tool.results.find((r) => r.id === opt.result) };
    node = opt.next ? nodes.get(opt.next) : undefined;
  }
  return { path, node };
}
