/**
 * Carga + validación de contenido contra los contratos.
 * `FsContentSource` es solo un adaptador: se puede reemplazar por otro ContentSource.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import {
  GlossaryFile,
  LabFile,
  LearningPath,
  ToolSpec,
  Outline,
  ModuleManifest,
  SHARED,
  TopicFrontmatter,
  termId,
  type ContentSource,
  type GlossaryTerm,
  type Issue,
  type RawSource,
  type RawTopic,
} from '@tk/contracts';
import { checkLab } from '@tk/sims';
import { checkTool } from '@tk/tools';

// ───────── Adaptador de filesystem ─────────
export class FsContentSource implements ContentSource {
  private root: string;
  constructor(root: string) {
    this.root = root;
  }

  private async yaml(path: string, fallback: unknown = undefined) {
    try {
      return parseYaml(await readFile(path, 'utf8'));
    } catch (e: any) {
      if (e.code === 'ENOENT' && fallback !== undefined) return fallback;
      throw e;
    }
  }

  async listModuleIds() {
    const entries = await readdir(join(this.root, 'modules'), { withFileTypes: true });
    return entries.filter((e) => e.isDirectory() && !e.name.startsWith('_')).map((e) => e.name).sort();
  }
  readManifest(id: string) {
    return this.yaml(join(this.root, 'modules', id, 'module.yaml'));
  }
  readOutline(id: string) {
    return this.yaml(join(this.root, 'modules', id, 'outline.yaml'), null);
  }
  readGlossary(id: string) {
    const p = id === SHARED ? join(this.root, 'shared', 'glossary.yaml') : join(this.root, 'modules', id, 'glossary.yaml');
    return this.yaml(p, []);
  }
  listLabs(id: string) {
    return this.yamlDir(join(this.root, 'modules', id, 'lab'));
  }
  listTools(id: string) {
    return this.yamlDir(join(this.root, 'modules', id, 'tools'));
  }
  listPaths() {
    return this.yamlDir(join(this.root, 'paths'));
  }
  /** Todos los .yaml de una carpeta; un YAML roto se devuelve como { $yamlError } para reportarlo. */
  private async yamlDir(dir: string): Promise<RawSource[]> {
    let files: string[] = [];
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.yaml')).sort();
    } catch {}
    return Promise.all(
      files.map(async (f) => {
        let data: unknown;
        try {
          data = parseYaml(await readFile(join(dir, f), 'utf8'));
        } catch (e: any) {
          data = { $yamlError: String(e?.message ?? e).split('\n')[0] };
        }
        return { id: f.replace(/\.yaml$/, ''), data };
      }),
    );
  }
  async listTopics(id: string): Promise<RawTopic[]> {
    const dir = join(this.root, 'modules', id, 'topics');
    let files: string[] = [];
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.md')).sort();
    } catch {}
    return Promise.all(
      files.map(async (f) => {
        const raw = await readFile(join(dir, f), 'utf8');
        const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
        return { id: f.replace(/\.md$/, ''), frontmatter: m ? parseYaml(m[1]) : {}, body: m ? m[2] : raw };
      }),
    );
  }
}

// ───────── Modelo cargado ─────────
export interface LoadedTopic extends TopicFrontmatter {
  id: string;
  body: string;
  /** preguntas sugeridas + simulaciones (modules/<id>/lab/<subtema>.yaml). */
  lab: LabFile;
}
export type { ToolSpec, LearningPath };
export interface LoadedModule {
  /** herramientas propias del curso (modules/<id>/tools/*.yaml). */
  tools: ToolSpec[];
  manifest: ModuleManifest;
  topics: LoadedTopic[];
  outline: Outline;
  /** glosario propio */
  ownGlossary: GlossaryTerm[];
  /** compartido + importados + propio (el propio gana). Es lo que se usa al renderizar. */
  glossary: GlossaryTerm[];
}
export interface Loaded {
  shared: GlossaryTerm[];
  modules: LoadedModule[];
  /** rutas de aprendizaje (paths/*.yaml) */
  paths: LearningPath[];
  issues: Issue[];
}

export async function loadAll(source: ContentSource): Promise<Loaded> {
  const issues: Issue[] = [];
  const bad = (where: string, message: string) => issues.push({ where, message });

  const parseGlossary = async (id: string) => {
    const r = GlossaryFile.safeParse(await source.readGlossary(id));
    if (!r.success) {
      bad(`${id}/glossary`, r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
      return [] as GlossaryTerm[];
    }
    const seen = new Set<string>();
    for (const t of r.data) {
      const tid = termId(t.term);
      if (seen.has(tid)) bad(`${id}/glossary`, `término duplicado: "${t.term}"`);
      seen.add(tid);
    }
    return r.data;
  };

  const shared = await parseGlossary(SHARED);
  const base: { manifest: ModuleManifest; topics: LoadedTopic[]; own: GlossaryTerm[]; outline: Outline; tools: ToolSpec[] }[] = [];

  for (const dir of await source.listModuleIds()) {
    const mf = ModuleManifest.safeParse(await source.readManifest(dir));
    if (!mf.success) {
      bad(`${dir}/module.yaml`, mf.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
      continue;
    }
    if (mf.data.id !== dir) bad(`${dir}/module.yaml`, `id "${mf.data.id}" != carpeta "${dir}"`);
    const topics: LoadedTopic[] = [];
    for (const t of await source.listTopics(dir)) {
      const fm = TopicFrontmatter.safeParse(t.frontmatter);
      if (!fm.success) {
        bad(`${dir}/topics/${t.id}`, fm.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
        continue;
      }
      topics.push({ ...fm.data, id: t.id, body: t.body, lab: { questions: [], sims: [] } });
    }
    const topicIds = new Set(topics.map((t) => t.id));
    for (const raw of (await source.listLabs?.(dir)) ?? []) {
      const where = `${dir}/lab/${raw.id}`;
      const ye = (raw.data as any)?.$yamlError;
      if (ye) {
        bad(where, `YAML inválido: ${ye} (¿falta entrecomillar un texto con ":"?)`);
        continue;
      }
      const lab = LabFile.safeParse(raw.data ?? {});
      if (!lab.success) {
        bad(where, lab.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
        continue;
      }
      const topic = topics.find((t) => t.id === raw.id);
      if (!topic) {
        bad(where, `no hay subtema "${raw.id}" para este lab`);
        continue;
      }
      checkLab(lab.data, topicIds).forEach((m) => bad(where, m));
      topic.lab = lab.data;
    }
    topics.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
    const tools: ToolSpec[] = [];
    for (const raw of (await source.listTools?.(dir)) ?? []) {
      const where = `${dir}/tools/${raw.id}`;
      const ye = (raw.data as any)?.$yamlError;
      if (ye) { bad(where, `YAML inválido: ${ye}`); continue; }
      const r = ToolSpec.safeParse(raw.data ?? {});
      if (!r.success) { bad(where, r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')); continue; }
      if (r.data.id !== raw.id) bad(where, `id "${r.data.id}" != archivo "${raw.id}"`);
      checkTool(r.data, topicIds).forEach((m) => bad(where, m));
      tools.push(r.data);
    }
    const ol = Outline.safeParse((await source.readOutline(dir)) ?? {});
    if (!ol.success) bad(`${dir}/outline.yaml`, ol.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
    base.push({ manifest: mf.data, topics, own: await parseGlossary(dir), outline: ol.success ? ol.data : { sections: [] }, tools });
  }

  const byId = new Map(base.map((b) => [b.manifest.id, b]));
  const modules: LoadedModule[] = base.map((b) => {
    const merged = new Map<string, GlossaryTerm>();
    const add = (ts: GlossaryTerm[]) => ts.forEach((t) => merged.set(termId(t.term), t));
    add(shared);
    for (const imp of b.manifest.glossaries) {
      const other = byId.get(imp);
      if (!other) bad(`${b.manifest.id}/module.yaml`, `glossaries: módulo inexistente "${imp}"`);
      else add(other.own);
    }
    add(b.own);

    const topicIds = new Set(b.topics.map((t) => t.id));
    for (const t of b.topics)
      for (const r of t.requires)
        if (!topicIds.has(r)) bad(`${b.manifest.id}/topics/${t.id}`, `requires: subtema inexistente "${r}"`);
    for (const t of b.own)
      for (const s of t.see)
        if (!merged.has(termId(s))) bad(`${b.manifest.id}/glossary`, `"${t.term}" -> see: "${s}" no existe`);

    const sectionIds = new Set(b.outline.sections.map((s) => s.id));
    for (const t of b.topics) {
      if (t.section && sectionIds.size && !sectionIds.has(t.section))
        bad(`${b.manifest.id}/topics/${t.id}`, `section inexistente en outline: "${t.section}"`);
      if (t.status === 'done' && wordCount(t.body) < 60)
        bad(`${b.manifest.id}/topics/${t.id}`, `status=done pero el cuerpo tiene <60 palabras (¿es andamiaje?)`);
      if (t.status === 'done' && t.lab.questions.length < MIN_QUESTIONS)
        bad(`${b.manifest.id}/topics/${t.id}`, `status=done exige ≥${MIN_QUESTIONS} preguntas sugeridas en lab/${t.id}.yaml (tk lab import)`);
      const sinRespuesta = t.lab.questions.filter((q) => !q.a).length;
      if (t.status === 'done' && sinRespuesta)
        bad(`${b.manifest.id}/lab/${t.id}`, `status=done exige respuesta escrita (a:) en cada pregunta; faltan ${sinRespuesta}`);
    }
    return { manifest: b.manifest, topics: b.topics, outline: b.outline, ownGlossary: b.own, glossary: [...merged.values()], tools: b.tools };
  });

  const paths: LearningPath[] = [];
  for (const raw of (await source.listPaths?.()) ?? []) {
    const where = `paths/${raw.id}`;
    const r = LearningPath.safeParse(raw.data ?? {});
    if (!r.success) { bad(where, (raw.data as any)?.$yamlError ?? r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')); continue; }
    if (r.data.id !== raw.id) bad(where, `id "${r.data.id}" != archivo "${raw.id}"`);
    for (const st of r.data.steps) if (!byId.has(st.module)) bad(where, `módulo inexistente "${st.module}"`);
    paths.push(r.data);
  }

  return { shared, modules, paths, issues };
}

/** Decisión preguntas-sugeridas-y-contexto-minimo: todo subtema terminado trae preguntas con su respuesta. */
export const MIN_QUESTIONS = 6;

export const wordCount =(md: string) => (md.match(/[\p{L}\p{N}]+/gu) ?? []).length;
