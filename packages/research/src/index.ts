/**
 * Evidencia del repo: fuentes (research/sources/*.yaml) y decisiones (research/decisions/*.md).
 * Valida contra los contratos y genera el índice compacto que leen los agentes.
 * `FsResearchSource` es solo un adaptador del puerto ResearchSource.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import {
  Decision,
  Source,
  type Issue,
  type RawSource,
  type RawTopic,
  type ResearchIndex,
  type ResearchSource,
} from '@tk/contracts';

const YAML_ERROR = '$yamlError';
/** Un YAML roto no debe tumbar el CLI con un stack trace: se convierte en un problema legible. */
function safeYaml(text: string): unknown {
  try {
    return parseYaml(text);
  } catch (e: any) {
    return { [YAML_ERROR]: String(e?.message ?? e).split('\n')[0] };
  }
}
const yamlError = (v: unknown): string | undefined => (v && typeof v === 'object' ? (v as any)[YAML_ERROR] : undefined);

// ───────── Adaptador de filesystem ─────────
export class FsResearchSource implements ResearchSource {
  private dir: string;
  constructor(root: string) {
    this.dir = join(root, 'research');
  }
  private async files(sub: string, ext: string) {
    try {
      return (await readdir(join(this.dir, sub))).filter((f) => f.endsWith(ext)).sort();
    } catch {
      return [];
    }
  }
  async listSources(): Promise<RawSource[]> {
    return Promise.all(
      (await this.files('sources', '.yaml')).map(async (f) => ({
        id: f.replace(/\.yaml$/, ''),
        data: safeYaml(await readFile(join(this.dir, 'sources', f), 'utf8')),
      })),
    );
  }
  async listDecisions(): Promise<RawTopic[]> {
    return Promise.all(
      (await this.files('decisions', '.md')).map(async (f) => {
        const raw = await readFile(join(this.dir, 'decisions', f), 'utf8');
        const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
        return { id: f.replace(/\.md$/, ''), frontmatter: m ? safeYaml(m[1]) : {}, body: m ? m[2] : raw };
      }),
    );
  }
}

// ───────── Modelo cargado ─────────
export interface LoadedDecision extends Decision {
  id: string;
  body: string;
}
export interface LoadedResearch {
  sources: Source[];
  decisions: LoadedDecision[];
  /** errores: rompen `validate`. */
  issues: Issue[];
  /** avisos: se muestran pero no rompen (p. ej. fuentes huérfanas). */
  warnings: Issue[];
}

const words = (md: string) => (md.match(/[\p{L}\p{N}]+/gu) ?? []).length;
const fmt = (e: { issues: { path: PropertyKey[]; message: string }[] }) =>
  e.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');

/** `moduleIds`: módulos existentes, para validar `affects: module:<id>`. */
export async function loadResearch(source: ResearchSource, moduleIds: string[] = []): Promise<LoadedResearch> {
  const issues: Issue[] = [];
  const warnings: Issue[] = [];
  const bad = (where: string, message: string) => issues.push({ where, message });

  const sources: Source[] = [];
  for (const raw of await source.listSources()) {
    const ye = yamlError(raw.data);
    if (ye) {
      bad(`research/sources/${raw.id}`, `YAML inválido: ${ye} (¿falta entrecomillar un texto con ":"?)`);
      continue;
    }
    const r = Source.safeParse(raw.data);
    if (!r.success) {
      bad(`research/sources/${raw.id}`, fmt(r.error));
      continue;
    }
    if (r.data.id !== raw.id) bad(`research/sources/${raw.id}`, `id "${r.data.id}" != archivo "${raw.id}"`);
    sources.push(r.data);
  }
  const byId = new Map(sources.map((s) => [s.id, s]));

  const decisions: LoadedDecision[] = [];
  for (const raw of await source.listDecisions()) {
    const where = `research/decisions/${raw.id}`;
    const ye = yamlError(raw.frontmatter);
    if (ye) {
      bad(where, `YAML inválido en el frontmatter: ${ye} (¿falta entrecomillar un texto con ":"?)`);
      continue;
    }
    const fm = Decision.safeParse(raw.frontmatter);
    if (!fm.success) {
      bad(where, fmt(fm.error));
      continue;
    }
    decisions.push({ ...fm.data, id: raw.id, body: raw.body });
  }
  const decById = new Set(decisions.map((d) => d.id));
  const modules = new Set(moduleIds);

  const cited = new Set<string>();
  for (const d of decisions) {
    const where = `research/decisions/${d.id}`;
    for (const s of d.sources) {
      cited.add(s);
      if (!byId.has(s)) bad(where, `sources: fuente inexistente "${s}"`);
    }
    if (d.confidence === 'high' && !d.sources.some((s) => byId.get(s) && byId.get(s)!.verified !== 'secondary'))
      bad(where, 'confidence=high exige ≥1 fuente con verified distinto de "secondary"');
    if (d.status === 'accepted' && words(d.body) < 40) bad(where, 'status=accepted pero el cuerpo tiene <40 palabras');
    if (d.status === 'superseded' && !d.supersededBy) bad(where, 'status=superseded requiere supersededBy');
    if (d.supersededBy && !decById.has(d.supersededBy)) bad(where, `supersededBy: decisión inexistente "${d.supersededBy}"`);
    for (const a of d.affects) {
      const m = a.match(/^(module|package|app):(.+)$/);
      if (a !== 'all' && !m) bad(where, `affects inválido "${a}" (all | module:<id> | package:<n> | app:<n>)`);
      else if (m?.[1] === 'module' && !modules.has(m[2])) bad(where, `affects: módulo inexistente "${m[2]}"`);
    }
  }
  for (const s of sources)
    if (!cited.has(s.id)) warnings.push({ where: `research/sources/${s.id}`, message: 'fuente huérfana: ninguna decisión la cita (¿ruido o decisión pendiente?)' });

  return { sources, decisions, issues, warnings };
}

// ───────── Consultas ─────────
/** Decisiones vigentes que aplican a un módulo (afectan a `all` o a `module:<id>`). */
export function decisionsFor(r: LoadedResearch, moduleId: string): LoadedDecision[] {
  return r.decisions.filter(
    (d) => d.status !== 'superseded' && (d.affects.includes('all') || d.affects.includes(`module:${moduleId}`)),
  );
}

/** Búsqueda simple por términos (todos deben aparecer) en título, resumen y datos. */
export function findResearch(r: LoadedResearch, query: string) {
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const terms = norm(query).split(/\s+/).filter(Boolean);
  const hit = (text: string) => terms.every((t) => norm(text).includes(t));
  return {
    sources: r.sources.filter((s) => hit([s.id, s.title, s.summary, ...s.facts, ...s.caveats].join(' '))),
    decisions: r.decisions.filter((d) => hit([d.id, d.title, d.summary, d.body].join(' '))),
  };
}

// ───────── Índice ─────────
export function buildResearchIndex(r: LoadedResearch): { json: ResearchIndex; md: string } {
  const json: ResearchIndex = {
    sources: r.sources.map((s) => ({ id: s.id, title: s.title, year: s.year, kind: s.kind, verified: s.verified, summary: s.summary })),
    decisions: r.decisions.map((d) => ({
      id: d.id,
      title: d.title,
      summary: d.summary,
      status: d.status,
      confidence: d.confidence,
      date: d.date,
      sources: d.sources,
      affects: d.affects,
    })),
  };
  const md = [
    '# Evidencia y decisiones (research/)',
    'ANTES de investigar algo, busca aquí (`pnpm tk research find <texto>`). Datos completos: research/sources/<id>.yaml; razonamiento: research/decisions/<id>.md.',
    'verified: full-text > abstract > secondary (resumen de terceros, citar con cautela).',
    '',
    `## Decisiones (${json.decisions.length})`,
    ...json.decisions.map(
      (d) => `- ${d.id} [${d.status}·${d.confidence}] ${d.title} — ${d.summary} {fuentes: ${d.sources.join(',')}} {afecta: ${d.affects.join(',') || '—'}}`,
    ),
    '',
    `## Fuentes (${json.sources.length})`,
    ...json.sources.map((s) => `- ${s.id} (${s.year ?? 's/f'}·${s.kind}·${s.verified}): ${s.summary}`),
    '',
  ].join('\n');
  return { json, md };
}
