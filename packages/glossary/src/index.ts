/**
 * Motor de glosario, agnóstico de framework.
 *  - buildMatcher/findTerms: detección sobre texto plano (usado por el indexer).
 *  - rehypeGlossary: plugin rehype que subraya términos (usado por el render).
 */
import { termId, type GlossaryTerm } from '@tk/contracts';

export interface Matcher {
  regex: RegExp | null;
  /** superficie en minúsculas -> definición completa */
  bySurface: Map<string, GlossaryTerm & { id: string }>;
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function buildMatcher(terms: GlossaryTerm[]): Matcher {
  const bySurface = new Map<string, GlossaryTerm & { id: string }>();
  for (const t of terms) {
    const entry = { ...t, id: termId(t.term) };
    for (const s of [t.term, ...t.aliases]) bySurface.set(s.toLocaleLowerCase(), entry);
  }
  const surfaces = [...bySurface.keys()].sort((a, b) => b.length - a.length);
  if (surfaces.length === 0) return { regex: null, bySurface };
  const body = surfaces.map(esc).join('|');
  const regex = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${body})(?![\\p{L}\\p{N}_])`, 'giu');
  return { regex, bySurface };
}

export interface Hit {
  id: string;
  surface: string;
  index: number;
}

export function findTerms(text: string, m: Matcher): Hit[] {
  if (!m.regex) return [];
  const hits: Hit[] = [];
  for (const match of text.matchAll(m.regex)) {
    const entry = m.bySurface.get(match[0].toLocaleLowerCase());
    if (entry) hits.push({ id: entry.id, surface: match[0], index: match.index! });
  }
  return hits;
}

/** Quita bloques/inline de código de markdown antes de detectar términos. */
export function stripCode(md: string): string {
  return md.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`\n]*`/g, ' ');
}

// ───────── rehype (hast mínimo, sin dependencias) ─────────
interface HNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HNode[];
}

const SKIP = new Set(['pre', 'code', 'a', 'abbr', 'script', 'style', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

export interface RehypeGlossaryOptions {
  terms: GlossaryTerm[];
  /** 'first' = solo la primera aparición por documento (default); 'all' = todas. */
  mode?: 'first' | 'all';
}

export function rehypeGlossary(options: RehypeGlossaryOptions) {
  const matcher = buildMatcher(options.terms);
  const mode = options.mode ?? 'first';
  return (tree: HNode, file?: { data: Record<string, unknown> }) => {
    const seen = new Set<string>();
    const walk = (node: HNode) => {
      if (!node.children) return;
      if (node.type === 'element' && node.tagName && SKIP.has(node.tagName)) return;
      const out: HNode[] = [];
      for (const child of node.children) {
        if (child.type === 'text' && child.value && matcher.regex) {
          out.push(...split(child.value));
        } else {
          walk(child);
          out.push(child);
        }
      }
      node.children = out;
    };
    const split = (text: string): HNode[] => {
      const parts: HNode[] = [];
      let last = 0;
      for (const hit of findTerms(text, matcher)) {
        if (mode === 'first' && seen.has(hit.id)) continue;
        seen.add(hit.id);
        const entry = matcher.bySurface.get(hit.surface.toLocaleLowerCase())!;
        if (hit.index > last) parts.push({ type: 'text', value: text.slice(last, hit.index) });
        parts.push({
          type: 'element',
          tagName: 'span',
          properties: { className: ['tk-term'], tabIndex: 0, dataTerm: entry.id, dataDef: entry.definition },
          children: [{ type: 'text', value: hit.surface }],
        });
        last = hit.index + hit.surface.length;
      }
      if (last === 0) return [{ type: 'text', value: text }];
      if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
      return parts;
    };
    walk(tree);
    if (file) file.data.glossaryUsed = [...seen];
  };
}
