/**
 * Genera índices compactos para que agentes (y UIs) lean poco:
 *   .index/root.json          -> mapa de todos los módulos (empezar siempre aquí)
 *   .index/<modulo>.json      -> subtemas + términos usados por subtema
 *   .index/<modulo>.md        -> CONTEXT compacto listo para pegar en un prompt
 *   .index/research.{json,md} -> fuentes + decisiones (evidencia); el .md de cada módulo
 *                                incluye las decisiones que le aplican
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { termId, type ModuleIndex, type RootIndex } from '@tk/contracts';
import { wordCount, type Loaded, type LoadedModule } from '@tk/content';
import { buildMatcher, findTerms, stripCode } from '@tk/glossary';
import { buildResearchIndex, decisionsFor, type LoadedResearch } from '@tk/research';

export interface BuiltIndex {
  root: RootIndex;
  modules: Record<string, ModuleIndex>;
  contexts: Record<string, string>;
  /** prefijo común por curso para el tutor IA (.index/ctx/<módulo>/_catalogo.md). */
  catalogs: Record<string, string>;
  /** contexto mínimo por subtema (.index/ctx/<módulo>/<subtema>.md). */
  topicContexts: Record<string, Record<string, string>>;
  research?: ReturnType<typeof buildResearchIndex>;
}

export function buildIndex(data: Loaded, research?: LoadedResearch): BuiltIndex {
  const modules: Record<string, ModuleIndex> = {};
  const contexts: Record<string, string> = {};
  const catalogs: Record<string, string> = {};
  const topicContexts: Record<string, Record<string, string>> = {};

  for (const m of data.modules) {
    const matcher = buildMatcher(m.glossary);
    const topics = m.topics.map((t) => ({
      id: t.id,
      title: t.title,
      summary: t.summary,
      order: t.order,
      requires: t.requires,
      section: t.section,
      status: t.status,
      words: wordCount(t.body),
      headings: [...t.body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((h) => h[1].trim()),
      terms: [...new Set(findTerms(stripCode(t.body), matcher).map((h) => h.id))].sort(),
      questions: t.lab.questions.length,
      sims: t.lab.sims.map((s) => `${s.type}:${s.id}`),
      tools: m.tools.filter((x) => x.topics.includes(t.id)).map((x) => `${x.builder}:${x.id}`),
    }));
    const idx: ModuleIndex = {
      id: m.manifest.id,
      title: m.manifest.title,
      summary: m.manifest.summary,
      kind: m.manifest.kind,
      tags: m.manifest.tags,
      topics,
      sections: m.outline.sections.map((s) => ({ id: s.id, title: s.title, topics: s.topics.map((t) => t.id) })),
      ownTerms: m.ownGlossary.map((t) => termId(t.term)).sort(),
      tools: m.tools.map((x) => `${x.builder}:${x.id}`),
    };
    modules[idx.id] = idx;
    contexts[idx.id] = renderContext(idx, research ? decisionsFor(research, idx.id) : []);
    catalogs[idx.id] = buildCourseCatalog(m);
    topicContexts[idx.id] = Object.fromEntries(m.topics.map((t) => [t.id, buildTopicContext(m, t.id)]));
  }

  const root: RootIndex = {
    version: 1,
    sharedTerms: data.shared.length,
    ...(research ? { research: { sources: research.sources.length, decisions: research.decisions.length } } : {}),
    modules: Object.values(modules).map((m) => ({
      id: m.id,
      title: m.title,
      summary: m.summary,
      kind: m.kind,
      topics: m.topics.length,
      done: m.topics.filter((t) => t.status === 'done').length,
      planned: Math.max(m.sections.reduce((n, s) => n + s.topics.length, 0), m.topics.length),
      terms: m.ownTerms.length,
      tools: m.tools.length,
    })),
    paths: (data.paths ?? []).map((p) => ({ id: p.id, title: p.title, modules: p.steps.map((s) => s.module) })),
  };
  return { root, modules, contexts, catalogs, topicContexts, research: research && buildResearchIndex(research) };
}

// ───────── Contexto para la IA (decisión: preguntas-sugeridas-y-contexto-minimo) ─────────
/**
 * Catálogo del curso: igual para todos los subtemas del módulo, así que es el prefijo
 * cacheable del prompt. Permite a la IA saber QUÉ existe sin leerlo.
 */
export function buildCourseCatalog(m: LoadedModule): string {
  const sec = new Map(m.outline.sections.map((s) => [s.id, s.title]));
  return [
    `# Catálogo del curso ${m.manifest.title} [${m.manifest.id}]`,
    m.manifest.summary,
    'Subtemas (id: título — resumen). Pide uno con leer_subtema solo si la pregunta lo necesita.',
    ...m.topics.map((t) => `- ${t.id}${t.section ? ` (${sec.get(t.section) ?? t.section})` : ''}: ${t.title} — ${t.summary}`),
    '',
  ].join('\n');
}

/**
 * Contexto de UN subtema: cuerpo completo + lo mínimo de los subtemas de los que depende
 * (requires y `uses` de sus preguntas: solo resumen y encabezados) + glosario que usa.
 */
export function buildTopicContext(m: LoadedModule, topicId: string): string {
  const t = m.topics.find((x) => x.id === topicId);
  if (!t) throw new Error(`subtema inexistente: ${m.manifest.id}/${topicId}`);
  const byId = new Map(m.topics.map((x) => [x.id, x]));
  const related = [...new Set([...t.requires, ...t.lab.questions.flatMap((q) => q.uses)])].filter((id) => id !== t.id && byId.has(id));
  const matcher = buildMatcher(m.glossary);
  const termIds = new Set(findTerms(stripCode(t.body), matcher).map((h) => h.id));
  const terms = m.glossary.filter((g) => termIds.has(termId(g.term)));
  const out = [
    `# Subtema: ${t.title} [${m.manifest.id}/${t.id}]`,
    t.summary,
    '',
    t.body.trim(),
    '',
  ];
  if (related.length) {
    out.push('## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)');
    for (const id of related) {
      const r = byId.get(id)!;
      const heads = [...r.body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((h) => h[1].trim());
      out.push(`- ${id}: ${r.title} — ${r.summary}${heads.length ? ` [secciones: ${heads.join(' · ')}]` : ''}`);
    }
    out.push('');
  }
  if (terms.length) out.push('## Glosario usado', ...terms.map((g) => `- ${g.term}: ${g.definition}`), '');
  if (t.lab.questions.length) out.push('## Preguntas sugeridas al alumno', ...t.lab.questions.map((q) => `- (${q.kind}) ${q.q}`), '');
  if (t.lab.sims.length) out.push('## Simulaciones del subtema', ...t.lab.sims.map((s) => `- ${s.type}: ${s.title}`), '');
  const tools = m.tools.filter((x) => x.topics.includes(t.id));
  if (tools.length) out.push('## Herramientas del curso en este subtema', ...tools.map((x) => `- ${x.builder}: ${x.title} — ${x.summary}`), '');
  return out.join('\n');
}

function renderContext(m: ModuleIndex, decisions: { id: string; status: string; confidence: string; title: string }[]): string {
  const lines = [
    `# ${m.title} [${m.id}] (${m.kind})`,
    m.summary,
    '',
    `Archivos: modules/${m.id}/{module.yaml,glossary.yaml,topics/*.md,lab/*.yaml,tools/*.yaml}`,
    `Contexto para IA por subtema: .index/ctx/${m.id}/<subtema>.md (+ _catalogo.md)`,
    '',
    '## Subtemas',
    ...m.topics.map(
      (t) =>
        `- ${t.id}${t.section ? ` (${t.section})` : ''}: ${t.title} — ${t.summary}` +
        (t.status !== 'done' ? ` {${t.status}}` : '') +
        (t.requires.length ? ` [req: ${t.requires.join(',')}]` : '') +
        (t.terms.length ? ` [términos: ${t.terms.join(',')}]` : '') +
        (t.questions || t.sims.length ? ` [lab: ${t.questions} preguntas${t.sims.length ? `, sims ${t.sims.join(',')}` : ''}]` : '') +
        (t.tools.length ? ` [tools: ${t.tools.join(',')}]` : ''),
    ),
    '',
    ...(m.tools.length ? [`## Herramientas del curso (${m.tools.length})`, m.tools.join(', '), ''] : []),
    `## Glosario propio (${m.ownTerms.length})`,
    m.ownTerms.join(', ') || '(vacío)',
    '',
    ...(decisions.length
      ? [
          '## Decisiones de diseño aplicables (resumen en .index/research.md; razonamiento en research/decisions/<id>.md)',
          ...decisions.map((d) => `- ${d.id} [${d.status}·${d.confidence}]: ${d.title}`),
          '',
        ]
      : []),
  ];
  return lines.join('\n');
}

export async function writeIndex(built: BuiltIndex, outDir: string) {
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'root.json'), JSON.stringify(built.root, null, 2) + '\n');
  if (built.research) {
    await writeFile(join(outDir, 'research.json'), JSON.stringify(built.research.json, null, 2) + '\n');
    await writeFile(join(outDir, 'research.md'), built.research.md);
  }
  await rm(join(outDir, 'ctx'), { recursive: true, force: true }); // sin contextos de subtemas borrados
  for (const [id, idx] of Object.entries(built.modules)) {
    await writeFile(join(outDir, `${id}.json`), JSON.stringify(idx, null, 2) + '\n');
    await writeFile(join(outDir, `${id}.md`), built.contexts[id]);
    const ctxDir = join(outDir, 'ctx', id);
    await mkdir(ctxDir, { recursive: true });
    await writeFile(join(ctxDir, '_catalogo.md'), built.catalogs[id]);
    for (const [t, ctx] of Object.entries(built.topicContexts[id])) await writeFile(join(ctxDir, `${t}.md`), ctx);
  }
}
