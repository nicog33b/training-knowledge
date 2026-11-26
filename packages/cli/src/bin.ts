#!/usr/bin/env node
/**
 * tk — harness CLI.
 *   tk new module <id> --title T --summary S [--kind certification|topic|framework|other]
 *   tk new topic <module> <id> --title T --summary S [--order N]
 *   tk glossary add <module|_shared> "<término>" --def "..." [--alias a,b] [--see x,y]
 *   tk index        regenera .index/
 *   tk validate     valida todo contra los contratos
 */
import { cp, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { parse as parseYaml, stringify as yamlStringify } from 'yaml';
import { Confidence, DecisionStatus, GlossaryFile, LabFile, ModuleKind, TOOL_BUILDERS, ToolSpec, SHARED, Slug, Source, SourceKind, Verification, termId } from '@tk/contracts';
import { FsContentSource, loadAll } from '@tk/content';
import { BUILDERS, checkTool } from '@tk/tools';
import { buildIndex, writeIndex } from '@tk/indexer';
import { FsResearchSource, findResearch, loadResearch } from '@tk/research';
import { ask, buildTutorRequest } from '@tk/tutor';
import { PROVIDERS, PROVIDER_IDS, addUsage, availableProviders, costOf, createClient, loadDotEnv, modelFor, readLedger, resetLedger, summarize, type ProviderId } from '@tk/llm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
loadDotEnv(ROOT); // claves de API para tk ask (ver .env.example)
const exists = (p: string) => access(p).then(() => true, () => false);
const die = (msg: string): never => {
  console.error(`✖ ${msg}`);
  process.exit(1);
};

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    title: { type: 'string' },
    summary: { type: 'string' },
    kind: { type: 'string' },
    order: { type: 'string' },
    def: { type: 'string' },
    alias: { type: 'string' },
    see: { type: 'string' },
    // evidencia (research/)
    url: { type: 'string' },
    verified: { type: 'string' },
    year: { type: 'string' },
    authors: { type: 'string' },
    venue: { type: 'string' },
    fact: { type: 'string', multiple: true },
    caveat: { type: 'string', multiple: true },
    source: { type: 'string' },
    affects: { type: 'string' },
    confidence: { type: 'string' },
    status: { type: 'string' },
    // tutor
    model: { type: 'string' },
    provider: { type: 'string' },
    reset: { type: 'boolean' },
    dry: { type: 'boolean' },
    // herramientas y módulos
    builder: { type: 'string' },
    level: { type: 'string' },
    topics: { type: 'string' },
  },
});
const [cmd, sub, ...rest] = positionals;

const list = (s?: string) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : []);
const today = () => new Date().toISOString().slice(0, 10);

/** Carga contenido + evidencia (la evidencia valida `affects: module:<id>` contra los módulos). */
async function loadEverything() {
  const data = await loadAll(new FsContentSource(ROOT));
  const research = await loadResearch(new FsResearchSource(ROOT), data.modules.map((m) => m.manifest.id));
  return { data, research, issues: [...data.issues, ...research.issues] };
}

async function reindex() {
  const { data, research, issues } = await loadEverything();
  if (issues.length) return report(issues);
  research.warnings.forEach((w) => console.warn(`⚠ ${w.where}: ${w.message}`));
  await writeIndex(buildIndex(data, research), join(ROOT, '.index'));
  console.log(`✔ índice regenerado (${data.modules.length} módulos · ${research.sources.length} fuentes · ${research.decisions.length} decisiones)`);
}
function report(issues: { where: string; message: string }[]): never {
  issues.forEach((i) => console.error(`✖ ${i.where}: ${i.message}`));
  return die(`${issues.length} problema(s)`);
}

switch (cmd === 'status' || cmd === 'fill' || cmd === 'ask' || cmd === 'gasto' ? cmd : `${cmd} ${sub}`) {
  case 'new module': {
    const [id] = rest;
    if (!Slug.safeParse(id).success) die('id inválido (kebab-case)');
    if (!values.title || !values.summary) die('requiere --title y --summary');
    const kind = ModuleKind.safeParse(values.kind ?? 'topic');
    if (!kind.success) die('kind inválido');
    const dest = join(ROOT, 'modules', id);
    if (await exists(dest)) die(`ya existe modules/${id}`);
    await cp(join(ROOT, 'templates', 'module'), dest, { recursive: true });
    await writeFile(
      join(dest, 'module.yaml'),
      yamlStringify({ id, title: values.title, summary: values.summary, kind: kind.data!, locale: 'es', tags: [], glossaries: [], ...(values.level ? { level: values.level } : {}) }),
    );
    console.log(`✔ modules/${id} creado`);
    await reindex();
    break;
  }
  case 'new topic': {
    const [mod, id] = rest;
    if (!mod || !Slug.safeParse(id).success) die('uso: tk new topic <módulo> <id> --title --summary');
    if (!values.title || !values.summary) die('requiere --title y --summary');
    const dir = join(ROOT, 'modules', mod, 'topics');
    if (!(await exists(join(ROOT, 'modules', mod)))) die(`módulo inexistente: ${mod}`);
    const file = join(dir, `${id}.md`);
    if (await exists(file)) die(`ya existe ${id}`);
    await mkdir(dir, { recursive: true });
    const fm = yamlStringify({ title: values.title, summary: values.summary, order: Number(values.order ?? 0), requires: [] });
    await writeFile(file, `---\n${fm}---\n\n## ${values.title}\n\nContenido aquí.\n`);
    console.log(`✔ ${mod}/topics/${id}.md creado`);
    await reindex();
    break;
  }
  case 'glossary add': {
    const [target, term] = rest;
    if (!target || !term || !values.def) die('uso: tk glossary add <módulo|_shared> "término" --def "..."');
    const file = target === SHARED ? join(ROOT, 'shared', 'glossary.yaml') : join(ROOT, 'modules', target, 'glossary.yaml');
    const current = ((await exists(file)) ? parseYaml(await readFile(file, 'utf8')) : []) ?? [];
    if (current.some((t: any) => termId(t.term) === termId(term))) die(`"${term}" ya existe en ${target}`);
    current.push({ term, aliases: list(values.alias), definition: values.def, see: list(values.see) });
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, yamlStringify(current));
    console.log(`✔ "${term}" añadido a ${target}`);
    await reindex();
    break;
  }
  case 'index undefined':
    await reindex();
    break;
  case 'validate undefined': {
    const { data, research, issues } = await loadEverything();
    research.warnings.forEach((w) => console.warn(`⚠ ${w.where}: ${w.message}`));
    if (issues.length) report(issues);
    console.log(`✔ ${data.modules.length} módulos válidos · ${research.sources.length} fuentes · ${research.decisions.length} decisiones`);
    break;
  }
  case 'source add': {
    // tk source add <id> --title T --url U --kind K --verified V --summary S --fact "..." [--fact ...] [--year N] [--authors "a,b"] [--venue V] [--caveat "..."]
    const [id] = rest;
    if (!Slug.safeParse(id).success) die('uso: tk source add <id-kebab> --title --url --kind --verified --summary --fact "..."');
    const candidate = {
      id,
      title: values.title,
      authors: list(values.authors),
      ...(values.year ? { year: Number(values.year) } : {}),
      ...(values.venue ? { venue: values.venue } : {}),
      url: values.url,
      kind: values.kind,
      verified: values.verified,
      retrieved: today(),
      summary: values.summary,
      facts: values.fact ?? [],
      caveats: values.caveat ?? [],
    };
    const r = Source.safeParse(candidate);
    if (!r.success) die(r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') + `\n  kind: ${SourceKind.options.join('|')} · verified: ${Verification.options.join('|')}`);
    const file = join(ROOT, 'research', 'sources', `${id}.yaml`);
    if (await exists(file)) die(`ya existe research/sources/${id}.yaml (edítalo a mano para ampliar datos)`);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, yamlStringify(r.data!));
    console.log(`✔ fuente ${id} guardada (ahora cítala desde una decisión: tk decision new)`);
    await reindex();
    break;
  }
  case 'source import': {
    // tk source import <archivo.yaml>: lista de fuentes; crea una por archivo, sin pisar existentes.
    const [path] = rest;
    if (!path) die('uso: tk source import <archivo.yaml>');
    const incoming: unknown = parseYaml(await readFile(resolve(path), 'utf8'));
    if (!Array.isArray(incoming)) die('el archivo debe ser una lista YAML de fuentes');
    let added = 0, skipped = 0;
    const errors: string[] = [];
    for (const item of incoming as any[]) {
      const r = Source.safeParse(item);
      if (!r.success) {
        errors.push(`${item?.id ?? '?'}: ${r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
        continue;
      }
      const file = join(ROOT, 'research', 'sources', `${r.data.id}.yaml`);
      if (await exists(file)) { skipped++; continue; }
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, yamlStringify(r.data));
      added++;
    }
    errors.forEach((e) => console.error(`✖ ${e}`));
    console.log(`✔ ${added} fuentes añadidas (${skipped} ya existían, ${errors.length} inválidas)`);
    if (errors.length) process.exitCode = 1;
    await reindex();
    break;
  }
  case 'decision new': {
    // tk decision new <id> --title T --summary S --source a,b --confidence high|medium|low [--affects all,module:x] [--status proposed|accepted]
    const [id] = rest;
    const sources = list(values.source);
    if (!Slug.safeParse(id).success || !values.title || !values.summary || !sources.length)
      die('uso: tk decision new <id> --title --summary --source <id,id> --confidence <high|medium|low> [--affects all,module:x] [--status]');
    const conf = Confidence.safeParse(values.confidence);
    if (!conf.success) die(`--confidence: ${Confidence.options.join('|')}`);
    const status = DecisionStatus.safeParse(values.status ?? 'proposed');
    if (!status.success) die(`--status: ${DecisionStatus.options.join('|')}`);
    const file = join(ROOT, 'research', 'decisions', `${id}.md`);
    if (await exists(file)) die(`ya existe research/decisions/${id}.md`);
    await mkdir(dirname(file), { recursive: true });
    const fm = yamlStringify({ title: values.title, summary: values.summary, status: status.data!, confidence: conf.data!, date: today(), sources, affects: list(values.affects) });
    await writeFile(file, `---\n${fm}---\n\n## Decisión\n\nPENDIENTE\n\n## Por qué (evidencia)\n\nPENDIENTE: qué datos de las fuentes lo sostienen.\n\n## Límites y qué no sabemos\n\nPENDIENTE\n`);
    console.log(`✔ research/decisions/${id}.md creado: completa el cuerpo (Decisión / Por qué / Límites)`);
    await reindex();
    break;
  }
  case 'research find': {
    // Búsqueda previa a investigar: ¿ya tenemos esto?
    const q = [sub === 'find' ? '' : sub, ...rest].join(' ').trim();
    if (!q) die('uso: tk research find <texto>');
    const { research } = await loadEverything();
    const hit = findResearch(research, q);
    if (!hit.sources.length && !hit.decisions.length) console.log(`(sin resultados para "${q}": investiga y guarda con tk source add)`);
    hit.decisions.forEach((d) => console.log(`decisión ${d.id} [${d.status}·${d.confidence}] ${d.summary}`));
    hit.sources.forEach((s) => console.log(`fuente   ${s.id} (${s.verified}): ${s.summary}`));
    break;
  }
  case 'research status': {
    const { research, issues } = await loadEverything();
    const by = (k: string) => research.sources.filter((s) => s.verified === k).length;
    console.log(`fuentes: ${research.sources.length} (full-text ${by('full-text')} · abstract ${by('abstract')} · secondary ${by('secondary')})`);
    console.log(`decisiones: ${research.decisions.length} (${research.decisions.filter((d) => d.status === 'accepted').length} accepted · ${research.decisions.filter((d) => d.status === 'proposed').length} proposed)`);
    research.warnings.forEach((w) => console.warn(`⚠ ${w.where}: ${w.message}`));
    issues.forEach((i) => console.error(`✖ ${i.where}: ${i.message}`));
    break;
  }
  case 'tool list': {
    // tk tool list [módulo]: constructores disponibles y herramientas de cada curso.
    console.log('Constructores (comunes a todos los cursos):');
    for (const [b, d] of Object.entries(BUILDERS)) console.log(`  ${b.padEnd(12)} ${d}`);
    const data = await loadAll(new FsContentSource(ROOT));
    for (const m of data.modules.filter((x) => !rest[0] || x.manifest.id === rest[0])) {
      if (!m.tools.length) continue;
      console.log(`\n${m.manifest.id}:`);
      for (const t of m.tools) console.log(`  ${t.builder.padEnd(12)} ${t.id} — ${t.title}${t.topics.length ? ` [${t.topics.join(', ')}]` : ''}`);
    }
    break;
  }
  case 'tool new': {
    // tk tool new <módulo> <id> --builder <b> --title T --summary S [--topics a,b]: andamiaje válido del constructor.
    const [mod, id] = rest;
    const b = values.builder as (typeof TOOL_BUILDERS)[number];
    if (!mod || !Slug.safeParse(id).success || !TOOL_BUILDERS.includes(b) || !values.title || !values.summary)
      die(`uso: tk tool new <módulo> <id> --builder ${TOOL_BUILDERS.join('|')} --title T --summary S [--topics a,b]`);
    const file = join(ROOT, 'modules', mod, 'tools', `${id}.yaml`);
    if (!(await exists(join(ROOT, 'modules', mod)))) die(`módulo inexistente: ${mod}`);
    if (await exists(file)) die(`ya existe tools/${id}.yaml`);
    const base = { id, title: values.title, summary: values.summary, topics: list(values.topics), builder: b };
    const scaffold: Record<string, object> = {
      calculadora: { inputs: [{ id: 'cantidad', label: 'Cantidad', type: 'number', min: 1, max: 100, step: 1, default: 10 }], outputs: [{ id: 'doble', label: 'Doble', expr: 'cantidad * 2', main: true }], notes: [{ when: 'doble > 100', text: 'Valor alto', tone: 'warn' }] },
      decision: { start: 'p1', nodes: [{ id: 'p1', question: '¿Pregunta?', options: [{ label: 'Sí', result: 'a' }, { label: 'No', result: 'b' }] }], results: [{ id: 'a', title: 'Opción A', why: 'Porque…' }, { id: 'b', title: 'Opción B', why: 'Porque…' }] },
      checklist: { groups: [{ title: 'Grupo', items: [{ text: 'Punto verificable', why: 'Por qué importa' }] }] },
      comparador: { options: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }], rows: [{ criterion: 'Criterio 1', values: ['…', '…'] }, { criterion: 'Criterio 2', values: ['…', '…'] }] },
      plantilla: { fields: [{ id: 'objetivo', label: 'Objetivo', kind: 'text' }], template: 'Objetivo: {{objetivo}}' },
    };
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, yamlStringify({ ...base, ...scaffold[b] }));
    console.log(`✔ modules/${mod}/tools/${id}.yaml creado (constructor ${b}); edítalo y corre pnpm validate`);
    await reindex();
    break;
  }
  case 'tool import': {
    // tk tool import <módulo> <bundle.yaml>: lista de herramientas; crea/reemplaza tools/<id>.yaml tras validar.
    const [mod, path] = rest;
    if (!mod || !path) die('uso: tk tool import <módulo> <bundle.yaml>');
    const incoming: unknown = parseYaml(await readFile(resolve(path), 'utf8'));
    if (!Array.isArray(incoming)) die('el bundle debe ser una lista YAML de herramientas');
    const data = await loadAll(new FsContentSource(ROOT));
    const m = data.modules.find((x) => x.manifest.id === mod) ?? die(`módulo inexistente: ${mod}`);
    const topicIds = new Set(m.topics.map((t) => t.id));
    const errors: string[] = [];
    let n = 0;
    for (const raw of incoming as any[]) {
      const r = ToolSpec.safeParse(raw);
      if (!r.success) { errors.push(`${raw?.id ?? '?'}: ${r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`); continue; }
      const e = checkTool(r.data, topicIds);
      if (e.length) { errors.push(...e.map((x) => `${r.data.id}: ${x}`)); continue; }
      const file = join(ROOT, 'modules', mod, 'tools', `${r.data.id}.yaml`);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, yamlStringify(raw));
      n++;
    }
    errors.forEach((e) => console.error(`✖ ${e}`));
    console.log(`✔ ${n} herramientas guardadas en ${mod} (${errors.length} con errores)`);
    if (errors.length) process.exitCode = 1;
    await reindex();
    break;
  }
  case 'lab import': {
    // tk lab import <módulo> <bundle.yaml>: mapa { <subtema>: { questions: [...], sims: [...] } }.
    // Fusiona en modules/<m>/lab/<subtema>.yaml: una pregunta con el mismo texto se actualiza (p. ej. para
    // añadirle la respuesta `a`), no se duplica; las sims con el mismo id no se pisan.
    const [mod, path] = rest;
    if (!mod || !path) die('uso: tk lab import <módulo> <bundle.yaml>');
    const bundle: any = parseYaml(await readFile(resolve(path), 'utf8'));
    if (!bundle || typeof bundle !== 'object' || Array.isArray(bundle)) die('el bundle debe ser un mapa subtema -> { questions, sims }');
    const data = await loadAll(new FsContentSource(ROOT));
    const m = data.modules.find((x) => x.manifest.id === mod) ?? die(`módulo inexistente: ${mod}`);
    const errors: string[] = [];
    let q = 0, s = 0, upd = 0;
    for (const [topic, raw] of Object.entries(bundle)) {
      const t = m.topics.find((x) => x.id === topic);
      if (!t) { errors.push(`${topic}: subtema inexistente`); continue; }
      const inc = LabFile.safeParse(raw ?? {});
      if (!inc.success) { errors.push(`${topic}: ${inc.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`); continue; }
      const merged = { questions: [...t.lab.questions], sims: [...t.lab.sims] };
      for (const nq of inc.data.questions) {
        const i = merged.questions.findIndex((x) => x.q === nq.q);
        if (i < 0) { merged.questions.push(nq); q++; }
        else {
          const old = merged.questions[i];
          merged.questions[i] = { ...old, ...nq, uses: nq.uses.length ? nq.uses : old.uses, a: nq.a ?? old.a };
          upd++;
        }
      }
      for (const ns of inc.data.sims) if (!merged.sims.some((x) => x.id === ns.id)) { merged.sims.push(ns); s++; }
      const file = join(ROOT, 'modules', mod, 'lab', `${topic}.yaml`);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, yamlStringify(merged, { lineWidth: 0 }));
    }
    errors.forEach((e) => console.error(`✖ ${e}`));
    console.log(`✔ ${q} preguntas y ${s} simulaciones añadidas a ${mod}; ${upd} preguntas actualizadas`);
    if (errors.length) process.exitCode = 1;
    await reindex();
    break;
  }
  case 'ask': {
    // tk ask <módulo> <subtema> "pregunta" [--provider anthropic|openai|gemini|ollama|compatible] [--model M] [--dry]
    // Tutor con contexto mínimo; --dry muestra el prompt y su tamaño sin llamar a la API.
    const [mod, topic, ...q] = [sub, ...rest];
    const question = q.join(' ').trim();
    if (!mod || !topic || !question) die('uso: tk ask <módulo> <subtema> "pregunta" [--provider openai] [--model M] [--dry]');
    const data = await loadAll(new FsContentSource(ROOT));
    if (data.issues.length) report(data.issues);
    const m = data.modules.find((x) => x.manifest.id === mod) ?? die(`módulo inexistente: ${mod}`);
    if (!m.topics.some((t) => t.id === topic)) die(`subtema inexistente: ${mod}/${topic}`);
    const ready = availableProviders('tutor');
    const pid = (values.provider ?? ready[0]?.id ?? 'anthropic') as ProviderId;
    if (!PROVIDER_IDS.includes(pid)) die(`--provider: ${PROVIDER_IDS.join('|')}`);
    const model = values.model ?? modelFor(pid, 'tutor');
    if (values.dry) {
      const req = buildTutorRequest(m, topic, question, model);
      const chars = req.system.reduce((n, s) => n + s.text.length, 0);
      req.system.forEach((s, i) => console.log(`── system[${i}] (${s.text.length} car.)\n${s.text}\n`));
      console.log(`── ~${Math.round(chars / 4)} tokens de contexto (estimación 4 car./token) · ${PROVIDERS[pid].label} · modelo ${model ?? '(falta configurar)'}`);
      break;
    }
    const llm = await createClient(pid, 'tutor', { ...process.env, ...(values.model ? { [`${pid.toUpperCase()}_MODEL`]: values.model } : {}) }).catch((e) =>
      die(`${e.message}. Configura .env (ver .env.example); la API se paga por token aparte de la suscripción. Usa --dry para ver el prompt.`),
    );
    const ans = await ask(llm.client, m, topic, question, { model: llm.model });
    const cost = costOf(pid, llm.model, ans.usage);
    await addUsage(ROOT, pid, llm.model, ans.usage, cost);
    console.log(ans.text);
    console.log(`\n── ${PROVIDERS[pid].label} ${llm.model} · leyó: ${ans.read.join(', ') || '(solo el subtema)'} · tokens in ${ans.usage.input} / out ${ans.usage.output} / caché leído ${ans.usage.cacheRead} · ${cost === null ? 'precio desconocido' : `~$${cost.toFixed(5)}`}`);
    break;
  }
  case 'gasto': {
    // tk gasto            → gasto de IA (hoy, mes, total y por modelo con su precio)
    // tk gasto --reset    → pone el contador a cero
    const ledger = values.reset ? await resetLedger(ROOT) : await readLedger(ROOT);
    const available = availableProviders('tutor').map((p) => ({ provider: p.id, model: p.model }));
    const s = summarize(ledger, available);
    const usd = (n: number) => `$${n < 0.01 && n > 0 ? n.toFixed(4) : n.toFixed(2)}`;
    console.log(`gasto de IA · hoy ${usd(s.hoy)} · este mes ${usd(s.mes)} · total ${usd(s.total)} (desde ${s.desde.slice(0, 10)})`);
    if (!s.modelos.length) console.log('  sin modelos usados ni configurados (ver .env.example)');
    for (const m of s.modelos)
      console.log(
        `  ${m.name.padEnd(18)} ${m.providerLabel.padEnd(16)} ${m.price ? `$${m.price.input}/$${m.price.output} por M` : 'precio desconocido'}`.padEnd(66) +
          ` · ${m.turnos} resp. · ${m.tokens} tokens · ${usd(m.usd)}${m.sinPrecio ? ` · ${m.sinPrecio} sin precio` : ''}`,
      );
    console.log('(medido por esta app: tokens de cada respuesta × precio del modelo; no es el saldo de la cuenta)');
    break;
  }
  case 'plan sync': {
    // Crea andamiaje (status: todo) para cada subtema del outline que aún no exista.
    const [mod] = rest;
    if (!mod) die('uso: tk plan sync <módulo>');
    const data = await loadAll(new FsContentSource(ROOT));
    const m = data.modules.find((x) => x.manifest.id === mod) ?? die(`módulo inexistente: ${mod}`);
    const have = new Set(m.topics.map((t) => t.id));
    const dir = join(ROOT, 'modules', mod, 'topics');
    await mkdir(dir, { recursive: true });
    let n = 0, order = 0;
    for (const sec of m.outline.sections)
      for (const t of sec.topics) {
        order++;
        if (have.has(t.id)) continue;
        const fm = yamlStringify({ title: t.title, summary: t.summary, order, section: sec.id, status: 'todo', requires: [] });
        await writeFile(join(dir, `${t.id}.md`), `---
${fm}---

## ${t.title}

PENDIENTE
`);
        n++;
      }
    console.log(`✔ ${n} subtemas andamiados`);
    await reindex();
    break;
  }
  case 'status': {
    const data = await loadAll(new FsContentSource(ROOT));
    const only = sub;
    for (const m of data.modules.filter((x) => !only || x.manifest.id === only)) {
      const done = m.topics.filter((t) => t.status === 'done').length;
      console.log(`
${m.manifest.id}: ${done}/${m.topics.length} listos · ${m.ownGlossary.length} términos propios`);
      for (const sec of m.outline.sections) {
        const ts = sec.topics.map((o) => m.topics.find((t) => t.id === o.id));
        const d = ts.filter((t) => t?.status === 'done').length;
        console.log(`  ${d === ts.length ? '✔' : '·'} ${sec.id} ${d}/${ts.length}` + (d < ts.length ? '  pendiente: ' + sec.topics.filter((o, i) => ts[i]?.status !== 'done').map((o) => o.id).join(', ') : ''));
      }
    }
    break;
  }
  case 'fill': {
    // tk fill <módulo> <bundle.md>: bundle con secciones "<!-- topic: id -->" + cuerpo.
    // Conserva el frontmatter del andamiaje y marca status=done.
    const [mod, path] = [sub, rest[0]];
    if (!mod || !path) die('uso: tk fill <módulo> <bundle.md>');
    const raw = await readFile(resolve(path), 'utf8');
    const parts = raw.split(/^<!--\s*topic:\s*([a-z0-9-]+)\s*-->\s*$/m);
    let n = 0;
    for (let i = 1; i < parts.length; i += 2) {
      const id = parts[i];
      const body = parts[i + 1].trim();
      const file = join(ROOT, 'modules', mod, 'topics', `${id}.md`);
      if (!(await exists(file))) {
        console.error(`✖ ${id}: no existe (¿tk plan sync?)`);
        continue;
      }
      const m = (await readFile(file, 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const fm = parseYaml(m![1]);
      fm.status = 'done';
      await writeFile(file, `---\n${yamlStringify(fm)}---\n\n${body}\n`);
      n++;
    }
    console.log(`✔ ${n} subtemas rellenados`);
    await reindex();
    break;
  }
  case 'glossary import': {
    // tk glossary import <módulo|_shared> <archivo.yaml>: fusiona sin pisar términos existentes.
    const [target, path] = rest;
    if (!target || !path) die('uso: tk glossary import <módulo|_shared> <archivo.yaml>');
    const incoming = GlossaryFile.parse(parseYaml(await readFile(resolve(path), 'utf8')));
    const file = target === SHARED ? join(ROOT, 'shared', 'glossary.yaml') : join(ROOT, 'modules', target, 'glossary.yaml');
    const current: any[] = ((await exists(file)) ? parseYaml(await readFile(file, 'utf8')) : []) ?? [];
    const seen = new Set(current.map((t) => termId(t.term)));
    let added = 0;
    for (const t of incoming) if (!seen.has(termId(t.term))) { seen.add(termId(t.term)); current.push(t); added++; }
    await writeFile(file, yamlStringify(current));
    console.log(`✔ ${added} términos añadidos a ${target} (${incoming.length - added} ya existían)`);
    await reindex();
    break;
  }
  default:
    console.log(
      'tk plan sync <módulo>\ntk fill <módulo> <bundle.md>\ntk status [módulo]\ntk glossary import <módulo|_shared> <archivo.yaml>\n' +
      'tk research find <texto>   (ANTES de investigar)\ntk research status\ntk source add <id> --title --url --kind --verified --summary --fact "..." [--year --authors --venue --caveat]\ntk source import <archivo.yaml>\ntk decision new <id> --title --summary --source a,b --confidence high|medium|low [--affects all,module:x] [--status]\n' +
      'tk ask <módulo> <subtema> "pregunta" [--provider anthropic|openai|gemini|ollama|compatible] [--model] [--dry]\n' +
      'tk gasto [--reset]   (gasto de IA por modelo: hoy, mes, total)\n' +
      'tk lab import <módulo> <bundle.yaml>   (preguntas sugeridas + simulaciones por subtema)\n' +
      'tk tool list [módulo]   (constructores y herramientas)\ntk tool new <módulo> <id> --builder calculadora|decision|checklist|comparador|plantilla --title --summary [--topics a,b]\ntk tool import <módulo> <bundle.yaml>\n' +
      'tk new module <id> --title --summary [--kind] [--level inicial|intermedio|avanzado|experto]\ntk new topic <módulo> <id> --title --summary [--order]\ntk glossary add <módulo|_shared> "término" --def "..." [--alias a,b] [--see x]\ntk index\ntk validate',
    );
}
