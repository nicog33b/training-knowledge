/**
 * Vistas de estudio: transforman el markdown de CUALQUIER subtema (y la estructura de cualquier curso)
 * en otras formas de estudiar, sin IA y sin dependencias (corre en Node y en el navegador).
 *   outline()      → árbol de títulos + ideas clave (negritas, primeras frases de lista)
 *   mindmap()      → diagrama Mermaid "mindmap" del subtema
 *   courseGraph()  → diagrama Mermaid "flowchart" del curso (secciones, subtemas, requisitos)
 *   cloze()        → frases con la idea en negrita oculta (completar huecos)
 *   textToMindmap()→ el alumno escribe su mapa con sangrías y se convierte en diagrama
 * Decisión: research/decisions/vistas-de-estudio-generadas.md
 */

export interface OutlineNode {
  title: string;
  level: number;
  /** ideas clave de la sección (frases en negrita o ítems de lista cortos). */
  points: string[];
  children: OutlineNode[];
}

const stripMd = (s: string) =>
  s
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/** Quita bloques de código y tablas: no aportan ideas al esquema. */
function prose(md: string) {
  return md.replace(/```[\s\S]*?```/g, '').replace(/^\|.*\|\s*$/gm, '');
}

/** Frases en negrita, sin repetir, en orden de aparición. */
export function boldPhrases(md: string): string[] {
  const out: string[] = [];
  for (const m of prose(md).matchAll(/\*\*([^*\n]{2,80})\*\*/g)) {
    const t = stripMd(m[1]).replace(/[:.,;]+$/, '');
    if (t.length >= 2 && !out.some((x) => x.toLowerCase() === t.toLowerCase())) out.push(t);
  }
  return out;
}

export function outline(md: string, title = ''): OutlineNode {
  const root: OutlineNode = { title, level: 1, points: [], children: [] };
  const stack: OutlineNode[] = [root];
  let buf = '';
  let sawHeading = false;
  const flush = () => {
    const node = stack[stack.length - 1];
    for (const p of boldPhrases(buf)) if (!node.points.includes(p)) node.points.push(p);
    if (!node.points.length) {
      // Sin negritas: usar ítems de lista cortos como ideas.
      for (const m of buf.matchAll(/^\s*(?:[-*]|\d+\.)\s+(.{3,90})$/gm)) {
        const t = stripMd(m[1]).replace(/[:.]$/, '');
        if (t.length <= 70 && node.points.length < 5) node.points.push(t);
      }
    }
    buf = '';
  };
  for (const line of prose(md).split('\n')) {
    const h = line.match(/^(#{2,4})\s+(.+)$/);
    if (!h) { buf += line + '\n'; continue; }
    flush();
    const level = h[1].length;
    const t = stripMd(h[2]);
    // El primer h2 antes de cualquier otra sección es el título real del tema: se funde con la raíz.
    if (level === 2 && (!root.title || (!root.children.length && !sawHeading))) { root.title = t; sawHeading = true; continue; }
    sawHeading = true;
    if (level === 2 && stripMd(h[2]).toLowerCase() === root.title.toLowerCase()) continue;
    const node: OutlineNode = { title: t, level, points: [], children: [] };
    while (stack.length > 1 && stack[stack.length - 1].level >= level) stack.pop();
    stack[stack.length - 1].children.push(node);
    stack.push(node);
  }
  flush();
  return root;
}

/** Texto seguro para un nodo Mermaid (sin caracteres que abren formas). */
export const mmText = (s: string, max = 60) => {
  const t = s.replace(/["`()[\]{}<>#;|]/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max - 1) + '…' : t;
};

export function mindmap(node: OutlineNode, opts: { maxPoints?: number } = {}): string {
  const maxPoints = opts.maxPoints ?? 4;
  const lines = ['mindmap', `  root((${mmText(node.title || 'Tema', 40)}))`];
  const walk = (n: OutlineNode, depth: number) => {
    const pad = '  '.repeat(depth);
    for (const p of n.points.slice(0, maxPoints)) lines.push(`${pad}${mmText(p, 48)}`);
    for (const c of n.children) {
      lines.push(`${pad}${mmText(c.title, 48)}`);
      walk(c, depth + 1);
    }
  };
  walk(node, 2);
  return lines.join('\n');
}

export interface CourseShape {
  sections: { id: string; title: string; topics: { id: string; title: string }[] }[];
  requires: Record<string, string[]>;
}

/** Diagrama del curso: secciones como grupos, subtemas como nodos y flechas de requisitos. */
export function courseGraph(c: CourseShape, opts: { highlight?: string } = {}): string {
  const id = (t: string) => 't_' + t.replace(/-/g, '_');
  const lines = ['flowchart TB'];
  const all = new Set(c.sections.flatMap((s) => s.topics.map((t) => t.id)));
  for (const s of c.sections) {
    lines.push(`  subgraph ${'s_' + s.id.replace(/-/g, '_')}["${mmText(s.title, 50)}"]`);
    lines.push('    direction TB');
    for (const t of s.topics) lines.push(`    ${id(t.id)}["${mmText(t.title, 44)}"]`);
    lines.push('  end');
  }
  // Orden dentro de la sección (línea punteada) cuando no hay requisitos explícitos.
  for (const s of c.sections)
    for (let i = 1; i < s.topics.length; i++)
      if (!(c.requires[s.topics[i].id] ?? []).length) lines.push(`  ${id(s.topics[i - 1].id)} -.-> ${id(s.topics[i].id)}`);
  for (const [t, reqs] of Object.entries(c.requires))
    for (const r of reqs) if (all.has(r) && all.has(t)) lines.push(`  ${id(r)} --> ${id(t)}`);
  if (opts.highlight && all.has(opts.highlight)) lines.push(`  style ${id(opts.highlight)} stroke-width:3px`);
  return lines.join('\n');
}

export interface ClozeItem {
  /** frase con "_____" en lugar de la idea. */
  prompt: string;
  answer: string;
  /** título de la sección donde está la frase (da contexto cuando la frase empieza por el hueco). */
  context: string;
}

/** Frases (de párrafos o listas) que contienen una negrita: la negrita se oculta. */
export function cloze(md: string, max = 12): ClozeItem[] {
  const out: ClozeItem[] = [];
  const seen = new Set<string>();
  // Frases con la sección a la que pertenecen: separar por punto final o salto de línea.
  const sentences: { s: string; ctx: string }[] = [];
  let ctx = '';
  for (const line of prose(md).split('\n')) {
    const h = line.match(/^#{1,6}\s+(.+)$/);
    if (h) { ctx = stripMd(h[1]); continue; }
    for (const part of line.split(/(?<=[.!?])\s+/)) {
      const s = part.replace(/^\s*(?:[-*]|\d+\.)\s+/, '').trim();
      if (s) sentences.push({ s, ctx });
    }
  }
  for (const { s, ctx: context } of sentences) {
    const m = s.match(/\*\*([^*\n]{2,60})\*\*/);
    if (!m) continue;
    const answer = stripMd(m[1]).replace(/[:.,;]+$/, '');
    const key = answer.toLowerCase();
    if (seen.has(key) || answer.split(' ').length > 6) continue;
    const prompt = stripMd(s.replace(m[0], '⟦⟧')).replace('⟦⟧', '_____');
    if (stripMd(prompt).length < 25) continue;
    seen.add(key);
    out.push({ prompt, answer, context });
    if (out.length >= max) break;
  }
  return out;
}

/** Compara la respuesta del alumno con la esperada (sin tildes, mayúsculas ni artículos sueltos). */
export function clozeMatch(given: string, expected: string): boolean {
  const n = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\b(el|la|los|las|un|una|the|a|an)\b/g, ' ').replace(/\s+/g, ' ').trim();
  const g = n(given), e = n(expected);
  if (!g) return false;
  if (g === e) return true;
  // Tolerancia: 1 error cada 6 letras (erratas), solo si la palabra es larga.
  return e.length >= 6 && levenshtein(g, e) <= Math.floor(e.length / 6);
}

function levenshtein(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

/**
 * Mapa propio del alumno: una idea por línea, la sangría (2 espacios o tab) indica jerarquía.
 * La primera línea sin sangría es la raíz. Devuelve Mermaid mindmap.
 */
export function textToMindmap(src: string): string {
  const rows = src
    .split('\n')
    .map((l) => l.replace(/\t/g, '  ').replace(/\s+$/, ''))
    .filter((l) => l.trim() && !/^\s*$/.test(l))
    .map((l) => ({ depth: Math.floor((l.match(/^ */)![0].length) / 2), text: mmText(l.trim().replace(/^[-*•]\s*/, ''), 60) }))
    .filter((r) => r.text);
  if (!rows.length) return '';
  const lines = ['mindmap', `  root((${rows[0].text}))`];
  let prev = 0;
  for (const r of rows.slice(1)) {
    const depth = Math.min(Math.max(r.depth, 1), prev + 1);
    lines.push(`${'  '.repeat(depth + 1)}${r.text}`);
    prev = depth;
  }
  return lines.join('\n');
}

/** Primera versión de "Haz tu mapa": el esquema del subtema como texto con sangrías, para editar. */
export function outlineToText(node: OutlineNode): string {
  const lines = [node.title];
  const walk = (n: OutlineNode, d: number) => {
    for (const c of n.children) {
      lines.push('  '.repeat(d) + c.title);
      walk(c, d + 1);
    }
  };
  walk(node, 1);
  return lines.join('\n');
}
