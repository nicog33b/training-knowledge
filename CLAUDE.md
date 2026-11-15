# training-knowledge — harness

Monorepo de sistemas de aprendizaje. Cada **módulo** = un tema (certificación AWS, caché de Next…) con **subtemas** y **glosario**.

## Protocolo de contexto (ahorra tokens — respétalo)
1. Empieza SIEMPRE en `.index/root.json` (mapa de módulos). No listes `modules/` a ciegas.
2. Para trabajar en un módulo lee solo `.index/<id>.md` (subtemas, requisitos, términos usados).
3. Lee un subtema (`modules/<id>/topics/<t>.md`) solo si vas a editarlo/usarlo.
4. Glosario: no leas `glossary.yaml` completo; el índice del subtema lista los ids de términos que usa.
5. Tras cualquier cambio de contenido: `pnpm index` (regenera `.index/`). Antes de terminar: `pnpm validate`.
6. Para saber QUÉ se decidió y POR QUÉ (diseño de cursos, mecánicas de práctica, etc.) lee `.index/research.md`. Para qué sigue, `tasks.md`.

## Protocolo de evidencia (OBLIGATORIO al investigar)
Toda decisión de diseño que se apoye en información externa debe quedar trazable en `research/`. Si el usuario pide investigar algo, o vas a buscar en internet para decidir algo:
1. **Antes**: `pnpm tk research find <texto>`. Si ya hay fuente/decisión, úsala; no repitas la búsqueda salvo que esté `secondary` y la decisión importe.
2. **Durante**: anota qué fuente leíste y cuánto (`verified`: `full-text` > `abstract` > `secondary`). Nunca marques `full-text` si solo viste un resumen o un snippet de búsqueda.
3. **Después**: guarda SOLO lo que aporta a construir algo:
   - `pnpm tk source add <id> --title --url --kind --verified --summary --fact "dato con cifra y condición" [--caveat "..."]` (o `tk source import` con YAML para varias). Cada `--fact` debe ser autosuficiente (cifra + condición); pon en `caveats` lo que no se pudo verificar, conflictos entre fuentes y cifras que vienen de terceros.
   - `pnpm tk decision new <id> --title --summary --source a,b --confidence high|medium|low --affects all,module:<id>,package:<n>` y completa el cuerpo (Decisión / Por qué / Límites). `high` exige ≥1 fuente no `secondary`. Las decisiones nuevas nacen `proposed`; solo el dueño las pasa a `accepted`.
   - No guardes fuentes que no respaldan ninguna decisión (`validate` avisa de huérfanas). No copies textos largos: datos y enlace.
4. Verifica las URLs que cites (una vez se enlazó un artículo equivocado). Si no puedes confirmar título/autores, dilo en `caveats`.
5. Añade/actualiza la tarea en `tasks.md`, luego `pnpm index` y `pnpm validate`.
6. Si un dato nuevo contradice una decisión: no la edites en silencio; crea la nueva decisión y marca la anterior `status: superseded` + `supersededBy`.

## Protocolo de tareas (`tasks.md`)
- Es el registro de avance. Al empezar algo: `[~]`; al terminar: muévelo a **Hecho** con fecha; al descubrir trabajo: añade `T-NNN` en **Pendiente** (IDs correlativos, nunca reutilizar).
- Enlaza la decisión que originó la tarea (`decisión: <id>`) y sus dependencias.
- Actualízalo en la misma sesión en que ocurre el cambio, no después.

## Comandos (nunca crees archivos de módulo a mano si hay comando)
- `pnpm tk new module <id> --title T --summary S [--kind certification|topic|framework|other]`
- `pnpm tk new topic <módulo> <id> --title T --summary S [--order N]`
- `pnpm tk glossary add <módulo|_shared> "Término" --def "..." [--alias a,b] [--see x]`
- `pnpm tk plan sync <módulo>` — crea andamiaje (status: todo) de cada subtema de `modules/<id>/outline.yaml`
- `pnpm tk fill <módulo> <bundle.md>` — rellena varios subtemas desde un bundle (`<!-- topic: id -->` + cuerpo) y los marca `done`
- `pnpm tk glossary import <módulo|_shared> <archivo.yaml>` — alta masiva de términos (no pisa existentes)
- `pnpm tk lab import <módulo> <bundle.yaml>` — preguntas sugeridas + simulaciones por subtema (mapa `<subtema>: {questions, sims}`; fusiona sin duplicar)
- `pnpm tk ask <módulo> <subtema> "pregunta" [--provider anthropic|openai|gemini|ollama|compatible] [--dry] [--model]` — tutor IA con contexto mínimo (`--dry` muestra el prompt sin gastar; real requiere clave en `.env`)
- `pnpm tk gasto [--reset]` — gasto de IA medido por esta app: hoy, mes, total y por modelo con su precio (`.data/gasto.json`; precios en `PRICES` de `packages/llm`)
- `pnpm tk status [módulo]` — progreso por sección
- Evidencia: `pnpm tk research find <texto>` · `research status` · `source add` · `source import <yaml>` · `decision new` (ver Protocolo de evidencia)
- `pnpm index` · `pnpm validate` · `pnpm test`
- `pnpm dev` — web (4321) + tutor (4322, con los proveedores que tengan clave en `.env`: Claude, ChatGPT, Gemini, Ollama, compatibles; ver `.env.example`) · `pnpm dev:fake` — igual pero el tutor responde sin IA (probar UI gratis)

## Flujo para un curso nuevo
1. `tk new module` → escribir `outline.yaml` (secciones + subtemas) → `tk plan sync`.
2. Escribir bundles de contenido + YAML de glosario → `tk fill` + `tk glossary import`.
3. Escribir el bundle de lab (preguntas sugeridas de cada subtema + simulaciones donde haya conceptos confundibles o parámetros) → `tk lab import`.
   Se hace AL CREAR el curso (con la suscripción, costo 0 en uso), no al vuelo con la API.
4. `tk status` hasta 100 %, `pnpm validate`, ver panel en `/progreso` (`pnpm dev`).
   Frontmatter nuevo: `section` (id del outline) y `status` (todo|draft|done; done exige ≥60 palabras y ≥3 preguntas en el lab).
   Cada comando que cambia contenido regenera `.index/`, incluido el contexto para IA de cada subtema (`.index/ctx/<módulo>/`).

## Reglas de contenido
- Todo tecnicismo debe existir en un glosario (`shared/glossary.yaml` = común a todos; `modules/<id>/glossary.yaml` = propio).
  La UI subraya automáticamente los términos y muestra la definición al pasar el mouse; no hay que marcarlos en el markdown.
  Si escribes un tecnicismo nuevo → `tk glossary add`. Término genérico y reutilizable → `_shared`.
- Un módulo puede heredar el glosario de otro con `glossaries: [otro-modulo]` en `module.yaml`.
- Lab: `lab/<subtema>.yaml` con `questions` (kind: por-que|que-pasa-si|comparar|aplicar|error-comun; `uses: [subtema]` si la respuesta necesita otro) y `sims`.
  Simulaciones = **recetas** de primitivas fijas, nunca HTML: `predecir-observar` (params + predicción + `outcomes` con reglas `when` + checklist `rubric`) y `clasificar` (categorías + items con `why`).
  Las reglas `when` usan un mini-lenguaje seguro (variables de `params`, + - * / %, comparaciones, && || !); `validate` comprueba variables, cobertura (pon un `when: "1"` final) y que haya algo que predecir.
  Rúbricas = ideas concretas verificables ("menciona ChangeMessageVisibility"), no criterios vagos. Ver `research/decisions/simulaciones-por-primitivas-y-recetas.md`.
  Una primitiva nueva (p. ej. ordenar pasos) = esquema en `contracts` + validación en `sims` + render en `apps/web/src/components/Lab.astro`.
- Subtemas: `topics/<id>.md` con frontmatter (`title`, `summary` ≤240, `order`, `requires`). Resumen conciso: el índice lo usa como contexto.

## Arquitectura (desacoplada; dependencias solo hacia abajo)
```
contracts  ← schemas zod + tipos + puerto ContentSource (NO depende de nada)
glossary   ← motor de detección + plugin rehype (agnóstico de framework)
content    ← adaptador FS del puerto + loadAll() + validación
research   ← evidencia: fuentes + decisiones (research/), validación, búsqueda e índice
sims       ← evaluador de reglas seguro + validación semántica de recetas + corrección determinista
indexer    ← genera .index/ (root.json, <id>.json, <id>.md, research.{json,md}, ctx/<id>/{_catalogo,<subtema>}.md)
llm        ← proveedores (Claude SDK; ChatGPT/compatibles vía Chat Completions), modelo por FUNCIÓN y nivel, precios, contador de gasto
tutor      ← tutor IA barato: catálogo del curso (prefijo cacheado) + contexto del subtema + herramienta leer_subtema
render     ← markdown → HTML con términos subrayados (+ term.css)
cli (tk)   ← harness de scaffolding
apps/web   ← vista Astro (una de muchas posibles; solo consume content+render) + chat flotante que habla con tutor-api
apps/tutor-api ← servidor local (127.0.0.1) del chat: valida, llama a @tk/tutor; la clave nunca llega al navegador
```
- Cambiar una forma de datos = cambiar `packages/contracts` primero.
- Nueva función con IA = añadirla a `FUNCTIONS` de `packages/llm/src/models.ts` con su nivel (rapido|equilibrado|potente) y pedir el modelo con `modelFor(proveedor, función)`; nunca nombres de modelo sueltos en el código. Formato interno de mensajes = el de Anthropic; el adaptador traduce a OpenAI.
- Nuevas vistas (CLI de quiz, app móvil, etc.) = nueva carpeta en `apps/` o `packages/` que consume contratos; no toques los demás.
- Nuevos tipos de módulo con lógica propia (quiz, flashcards): paquete nuevo `packages/<feature>` que lea `ModuleIndex`/`LoadedModule`.
- Node 24 ejecuta TypeScript directo: imports relativos con extensión `.ts`, sin enums ni `namespace`.
