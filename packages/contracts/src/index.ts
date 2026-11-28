/**
 * CONTRATOS: única fuente de verdad de las formas de datos del sistema.
 * Todo paquete/app/módulo habla en estos tipos; nadie importa internals de otro.
 */
import { z } from 'zod';

export const Slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'debe ser kebab-case');

/** Convierte un término a id estable ("Cache Busting" -> "cache-busting"). */
export function termId(term: string): string {
  return term
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ───────── Módulo (un sistema de aprendizaje) ─────────
export const ModuleKind = z.enum(['certification', 'topic', 'framework', 'other']);

export const ModuleManifest = z
  .object({
    id: Slug,
    title: z.string().min(1),
    summary: z.string().min(1).max(240),
    kind: ModuleKind.default('topic'),
    locale: z.string().default('es'),
    tags: z.array(z.string()).default([]),
    /** ids de OTROS módulos cuyo glosario se hereda (además del compartido). */
    glossaries: z.array(Slug).default([]),
    /** nivel orientativo del curso (para rutas y para la portada). */
    level: z.enum(['inicial', 'intermedio', 'avanzado', 'experto']).optional(),
  })
  .strict();
export type ModuleManifest = z.infer<typeof ModuleManifest>;

// ───────── Subtema ─────────
export const TopicStatus = z.enum(['todo', 'draft', 'done']);
export type TopicStatus = z.infer<typeof TopicStatus>;

export const TopicFrontmatter = z
  .object({
    title: z.string().min(1),
    summary: z.string().min(1).max(240),
    order: z.number().default(0),
    requires: z.array(Slug).default([]),
    /** sección del outline a la que pertenece (opcional). */
    section: Slug.optional(),
    /** todo = andamiaje sin contenido; draft = incompleto; done = listo. */
    status: TopicStatus.default('done'),
  })
  .strict();
export type TopicFrontmatter = z.infer<typeof TopicFrontmatter>;

// ───────── Outline (plan de un módulo: secciones + subtemas previstos) ─────────
export const OutlineTopic = z.object({ id: Slug, title: z.string().min(1), summary: z.string().min(1).max(240) }).strict();
export const OutlineSection = z
  .object({ id: Slug, title: z.string().min(1), topics: z.array(OutlineTopic).default([]) })
  .strict();
export const Outline = z.object({ sections: z.array(OutlineSection).default([]) }).strict();
export type Outline = z.infer<typeof Outline>;

// ───────── Glosario ─────────
export const GlossaryTerm = z
  .object({
    term: z.string().min(1),
    aliases: z.array(z.string()).default([]),
    definition: z.string().min(1),
    see: z.array(z.string()).default([]),
  })
  .strict();
export type GlossaryTerm = z.infer<typeof GlossaryTerm>;
export const GlossaryFile = z.array(GlossaryTerm).default([]);

// ───────── Lab por subtema: preguntas sugeridas + recetas de simulación ─────────
// modules/<id>/lab/<subtema>.yaml. Ver research/decisions/simulaciones-por-primitivas-y-recetas.md
// y preguntas-sugeridas-y-contexto-minimo.md.
export const QuestionKind = z.enum(['por-que', 'que-pasa-si', 'comparar', 'aplicar', 'error-comun']);
export const LabQuestion = z
  .object({
    q: z.string().min(8),
    kind: QuestionKind,
    /** respuesta escrita del curso (markdown corto): el alumno la ve tras intentar responder, sin gastar IA. */
    a: z.string().min(20).optional(),
    /** otros subtemas que la respuesta necesita (el tutor los recibe en contexto). */
    uses: z.array(Slug).default([]),
  })
  .strict();
export type LabQuestion = z.infer<typeof LabQuestion>;

/** Lista de ideas verificables (checklist), no criterios evaluativos. */
const Rubric = z.array(z.string().min(3)).min(1);
const SimBase = { id: Slug, title: z.string().min(1) };

export const SimParam = z
  .object({
    id: z.string().regex(/^[a-z_][a-z0-9_]*$/, 'snake_case'),
    label: z.string().min(1),
    min: z.number(),
    max: z.number(),
    step: z.number().positive().default(1),
    default: z.number(),
    unit: z.string().optional(),
  })
  .strict()
  .refine((p) => p.min < p.max && p.default >= p.min && p.default <= p.max, 'min < max y min ≤ default ≤ max');

export const PredictObserveSim = z
  .object({
    ...SimBase,
    type: z.literal('predecir-observar'),
    context: z.string().min(1),
    params: z.array(SimParam).min(1),
    predict: z.object({
      question: z.string().min(1),
      options: z.array(z.object({ id: Slug, label: z.string().min(1) }).strict()).min(2),
    }).strict(),
    /** la primera regla que se cumple define el resultado. */
    outcomes: z.array(z.object({ when: z.string().min(1), answer: Slug, show: z.string().min(1) }).strict()).min(2),
    explain: z.object({ prompt: z.string().min(1), rubric: Rubric }).strict(),
  })
  .strict();

export const ClassifySim = z
  .object({
    ...SimBase,
    type: z.literal('clasificar'),
    prompt: z.string().min(1),
    categories: z.array(z.object({ id: Slug, label: z.string().min(1) }).strict()).min(2),
    items: z.array(z.object({ text: z.string().min(1), category: Slug, why: z.string().min(1) }).strict()).min(3),
  })
  .strict();

export const SimSpec = z.discriminatedUnion('type', [PredictObserveSim, ClassifySim]);
export type SimSpec = z.infer<typeof SimSpec>;
export type PredictObserveSim = z.infer<typeof PredictObserveSim>;
export type ClassifySim = z.infer<typeof ClassifySim>;

export const LabFile = z
  .object({
    questions: z.array(LabQuestion).default([]),
    sims: z.array(SimSpec).default([]),
  })
  .strict();
export type LabFile = z.infer<typeof LabFile>;

// ───────── Herramientas por curso: constructores comunes + configuración del curso ─────────
// modules/<id>/tools/<herramienta>.yaml. El CONSTRUCTOR (builder) es general; la configuración es del curso.
// Ver research/decisions/herramientas-por-curso-con-constructores.md. Un constructor nuevo =
// esquema aquí + validación en packages/tools + render en apps/web/src/components/Tool.astro.
const ToolBase = {
  id: Slug,
  title: z.string().min(1),
  /** para qué sirve (una o dos frases). */
  summary: z.string().min(1).max(280),
  /** subtemas donde se muestra la herramienta (al final de la página). */
  topics: z.array(Slug).default([]),
};
const VarId = z.string().regex(/^[a-z_][a-z0-9_]*$/, 'snake_case');

export const CalcInput = z.discriminatedUnion('type', [
  z.object({ id: VarId, label: z.string().min(1), type: z.literal('number'), min: z.number(), max: z.number(), step: z.number().positive().default(1), default: z.number(), unit: z.string().optional(), hint: z.string().optional() }).strict(),
  z.object({ id: VarId, label: z.string().min(1), type: z.literal('select'), options: z.array(z.object({ label: z.string().min(1), value: z.number() }).strict()).min(2), default: z.number(), hint: z.string().optional() }).strict(),
]);
export const CalculatorTool = z
  .object({
    ...ToolBase,
    builder: z.literal('calculadora'),
    inputs: z.array(CalcInput).min(1),
    /** expresiones del mini-lenguaje seguro de @tk/sims (variables = ids de inputs u outputs anteriores). */
    outputs: z.array(z.object({ id: VarId, label: z.string().min(1), expr: z.string().min(1), unit: z.string().optional(), decimals: z.number().int().min(0).max(6).default(0), main: z.boolean().default(false) }).strict()).min(1),
    /** avisos condicionales: la primera o todas las que cumplan `when`. */
    notes: z.array(z.object({ when: z.string().min(1), text: z.string().min(1), tone: z.enum(['info', 'ok', 'warn']).default('info') }).strict()).default([]),
  })
  .strict();

export const DecisionTool = z
  .object({
    ...ToolBase,
    builder: z.literal('decision'),
    start: Slug,
    nodes: z.array(z.object({ id: Slug, question: z.string().min(1), help: z.string().optional(), options: z.array(z.object({ label: z.string().min(1), next: Slug.optional(), result: Slug.optional() }).strict()).min(2) }).strict()).min(1),
    results: z.array(z.object({ id: Slug, title: z.string().min(1), why: z.string().min(1), watch: z.string().optional(), see: z.array(Slug).default([]) }).strict()).min(2),
  })
  .strict();

export const ChecklistTool = z
  .object({
    ...ToolBase,
    builder: z.literal('checklist'),
    groups: z.array(z.object({ title: z.string().min(1), items: z.array(z.object({ text: z.string().min(1), why: z.string().optional() }).strict()).min(1) }).strict()).min(1),
  })
  .strict();

export const CompareTool = z
  .object({
    ...ToolBase,
    builder: z.literal('comparador'),
    options: z.array(z.object({ id: Slug, label: z.string().min(1) }).strict()).min(2),
    /** cada fila = un criterio; `values` en el mismo orden que `options`. */
    rows: z.array(z.object({ criterion: z.string().min(1), values: z.array(z.string()).min(2), group: z.string().optional() }).strict()).min(2),
  })
  .strict();

export const TemplateTool = z
  .object({
    ...ToolBase,
    builder: z.literal('plantilla'),
    fields: z.array(z.object({ id: VarId, label: z.string().min(1), kind: z.enum(['text', 'textarea', 'select']).default('text'), placeholder: z.string().optional(), options: z.array(z.string()).optional(), default: z.string().optional() }).strict()).min(1),
    /** texto con {{campo}}; las líneas con un campo vacío se omiten. */
    template: z.string().min(1),
  })
  .strict();

export const ToolSpec = z.discriminatedUnion('builder', [CalculatorTool, DecisionTool, ChecklistTool, CompareTool, TemplateTool]);
export type ToolSpec = z.infer<typeof ToolSpec>;
export type CalculatorTool = z.infer<typeof CalculatorTool>;
export type DecisionTool = z.infer<typeof DecisionTool>;
export type ChecklistTool = z.infer<typeof ChecklistTool>;
export type CompareTool = z.infer<typeof CompareTool>;
export type TemplateTool = z.infer<typeof TemplateTool>;
export const TOOL_BUILDERS = ['calculadora', 'decision', 'checklist', 'comparador', 'plantilla'] as const;

// ───────── Rutas de aprendizaje: varios cursos encadenados (paths/<id>.yaml) ─────────
export const LearningPath = z
  .object({
    id: Slug,
    title: z.string().min(1),
    summary: z.string().min(1).max(280),
    steps: z.array(z.object({ module: Slug, goal: z.string().min(1) }).strict()).min(1),
  })
  .strict();
export type LearningPath = z.infer<typeof LearningPath>;

// ───────── Índices generados (lo que leen agentes y UIs) ─────────
export const TopicIndexEntry = z.object({
  id: Slug,
  title: z.string(),
  summary: z.string(),
  order: z.number(),
  requires: z.array(z.string()),
  section: z.string().optional(),
  status: TopicStatus,
  words: z.number(),
  headings: z.array(z.string()),
  /** ids de términos del glosario usados en este subtema (carga selectiva). */
  terms: z.array(z.string()),
  /** nº de preguntas sugeridas y simulaciones en lab/<subtema>.yaml. */
  questions: z.number().default(0),
  sims: z.array(z.string()).default([]),
  /** herramientas del curso asociadas a este subtema ("<builder>:<id>"). */
  tools: z.array(z.string()).default([]),
});
export type TopicIndexEntry = z.infer<typeof TopicIndexEntry>;

export const ModuleIndex = z.object({
  id: Slug,
  title: z.string(),
  summary: z.string(),
  kind: ModuleKind,
  tags: z.array(z.string()),
  topics: z.array(TopicIndexEntry),
  sections: z.array(z.object({ id: z.string(), title: z.string(), topics: z.array(z.string()) })),
  /** ids de términos propios del módulo. */
  ownTerms: z.array(z.string()),
  /** herramientas del curso ("<builder>:<id>"). */
  tools: z.array(z.string()).default([]),
});
export type ModuleIndex = z.infer<typeof ModuleIndex>;

// ───────── Evidencia: fuentes y decisiones (research/) ─────────
// Una FUENTE es un dato externo que usamos; una DECISIÓN es lo que construimos gracias a ella.
// Regla: solo se guarda una fuente si respalda (o puede respaldar) una decisión.
export const SourceKind = z.enum([
  'meta-analysis',
  'systematic-review',
  'review',
  'rct',
  'experiment',
  'theory',
  'docs',
  'other',
]);
/** Cuánto verificamos la fuente: texto completo > solo abstract/página oficial > resumen de terceros. */
export const Verification = z.enum(['full-text', 'abstract', 'secondary']);
export type Verification = z.infer<typeof Verification>;
const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'usar AAAA-MM-DD');

export const Source = z
  .object({
    id: Slug,
    title: z.string().min(1),
    authors: z.array(z.string()).default([]),
    year: z.number().int().optional(),
    venue: z.string().optional(),
    url: z.string().url(),
    kind: SourceKind,
    verified: Verification,
    retrieved: IsoDate,
    /** por qué nos importa (una frase). */
    summary: z.string().min(1).max(240),
    /** datos concretos extraídos (cifras, condiciones). Cada uno autosuficiente. */
    facts: z.array(z.string().min(1)).min(1),
    /** límites, conflictos entre fuentes, lo que NO se pudo verificar. */
    caveats: z.array(z.string()).default([]),
  })
  .strict();
export type Source = z.infer<typeof Source>;

export const DecisionStatus = z.enum(['proposed', 'accepted', 'superseded']);
export const Confidence = z.enum(['high', 'medium', 'low']);
export const Decision = z
  .object({
    title: z.string().min(1),
    summary: z.string().min(1).max(240),
    status: DecisionStatus.default('proposed'),
    /** high exige al menos una fuente verificada más allá de resúmenes de terceros. */
    confidence: Confidence,
    date: IsoDate,
    sources: z.array(Slug).min(1),
    /** 'all' | 'module:<id>' | 'package:<nombre>' | 'app:<nombre>' */
    affects: z.array(z.string()).default([]),
    supersededBy: Slug.optional(),
  })
  .strict();
export type Decision = z.infer<typeof Decision>;

export const ResearchIndex = z.object({
  sources: z.array(
    z.object({
      id: Slug,
      title: z.string(),
      year: z.number().optional(),
      kind: SourceKind,
      verified: Verification,
      summary: z.string(),
    }),
  ),
  decisions: z.array(
    z.object({
      id: Slug,
      title: z.string(),
      summary: z.string(),
      status: DecisionStatus,
      confidence: Confidence,
      date: z.string(),
      sources: z.array(z.string()),
      affects: z.array(z.string()),
    }),
  ),
});
export type ResearchIndex = z.infer<typeof ResearchIndex>;

/** Puerto de evidencia (desacopla el almacenamiento, igual que ContentSource). */
export interface RawSource {
  /** nombre de archivo sin extensión. */
  id: string;
  data: unknown;
}
export interface ResearchSource {
  listSources(): Promise<RawSource[]>;
  /** decisiones: frontmatter + cuerpo markdown. */
  listDecisions(): Promise<RawTopic[]>;
}

export const RootIndex = z.object({
  version: z.literal(1),
  sharedTerms: z.number(),
  research: z.object({ sources: z.number(), decisions: z.number() }).optional(),
  modules: z.array(
    z.object({
      id: Slug,
      title: z.string(),
      summary: z.string(),
      kind: ModuleKind,
      topics: z.number(),
      done: z.number(),
      planned: z.number(),
      terms: z.number(),
      tools: z.number().default(0),
    }),
  ),
  paths: z.array(z.object({ id: Slug, title: z.string(), modules: z.array(z.string()) })).default([]),
});
export type RootIndex = z.infer<typeof RootIndex>;

// ───────── Puerto de contenido (para desacoplar el almacenamiento) ─────────
export interface RawTopic {
  id: string;
  frontmatter: unknown;
  body: string;
}

export interface ContentSource {
  listModuleIds(): Promise<string[]>;
  readManifest(moduleId: string): Promise<unknown>;
  /** moduleId "_shared" = glosario compartido. */
  readGlossary(moduleId: string): Promise<unknown>;
  listTopics(moduleId: string): Promise<RawTopic[]>;
  /** outline.yaml del módulo (undefined si no existe). */
  readOutline(moduleId: string): Promise<unknown>;
  /** lab/<subtema>.yaml del módulo (opcional en adaptadores). */
  listLabs?(moduleId: string): Promise<RawSource[]>;
  /** tools/<herramienta>.yaml del módulo (opcional). */
  listTools?(moduleId: string): Promise<RawSource[]>;
  /** paths/<ruta>.yaml (opcional). */
  listPaths?(): Promise<RawSource[]>;
}

export const SHARED = '_shared';

export interface Issue {
  where: string;
  message: string;
}
