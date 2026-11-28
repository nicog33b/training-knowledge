# tasks.md — registro de avance

Fuente de verdad de qué se hizo y qué sigue. Lo mantiene el agente (ver CLAUDE.md): al terminar algo, muévelo a **Hecho** con la fecha; al descubrir trabajo, añádelo a **Pendiente**.

**Formato:** `- [ ] T-NNN título — nota breve · decisión: <id> · deps: T-NNN`
Estados: `[ ]` pendiente · `[~]` en curso · `[x]` hecho · `[!]` bloqueado (di por qué). IDs correlativos, nunca se reutilizan. Si una tarea nace de evidencia, enlaza la decisión de `research/decisions/`.

## En curso

_(nada)_

## Pendiente

### Prioridad 1: capa de práctica (lo que más rinde según la evidencia)
- [ ] T-010 Contrato de ítems de práctica en `packages/contracts` — tipos: recuerdo, opción múltiple con explicación por opción, escenario, comparación de confundibles, pregunta previa, autoexplicación, ejemplo resuelto con pasos retirados · decisión: practica-de-recuperacion
- [ ] T-011 Formato de archivo de ítems por subtema (p. ej. `modules/<id>/items/<subtema>.yaml`) y validación en `loadAll` · deps: T-010
- [ ] T-012 Generar ítems de práctica para `aws-saa` (42 subtemas), empezando por los de servicios confundibles (SQS/SNS/Kinesis, EBS/EFS/FSx) · deps: T-011
- [ ] T-013 Plantilla fija de subtema: pregunta previa → explicación segmentada → ejemplo resuelto → contraste → comprobación → autoexplicación · decisión: ejemplos-resueltos-simulacion-y-problema-previo, estrategias-generativas-autoexplicacion-y-ensenar
- [ ] T-014 Reglas en `pnpm validate`: subtema `done` exige ≥N ítems, ≥1 escenario y explicación en cada opción · deps: T-011 · decisión: practica-de-recuperacion
- [ ] T-015 Paquete `packages/practice`: planificador FSRS (retención objetivo, fecha de examen) — decidir librería vs implementación propia · decisión: repeticion-espaciada-fsrs · deps: T-010
- [ ] T-016 Sesiones que intercalan conceptos confundibles (usar `see` del glosario + pares por módulo) · decisión: intercalar-conceptos-confundibles · deps: T-015
- [ ] T-017 Confianza antes de responder + panel `/progreso` con retención estimada y calibración · decisión: feedback-explicativo-y-calibracion · deps: T-015

### Prioridad 2
- [~] T-020 Modo simulación por `kind` — laboratorios predecir→observar→explicar ya existen (T-050); falta examen cronometrado para `certification`: examen cronometrado (certification), laboratorios predecir→ejecutar→explicar (framework) · decisión: ejemplos-resueltos-simulacion-y-problema-previo · deps: T-011
- [ ] T-021 Actividades generativas en UI: mapa conceptual propio y "explícalo a otro" con aviso previo · decisión: estrategias-generativas-autoexplicacion-y-ensenar
- [ ] T-022 Aviso en `validate` de subtemas largos sin segmentar · decisión: diseno-de-contenido-sin-ruido
- [x] T-023 Tutor IA con guardrails — CLI (T-053) y chat web (T-068) (pistas, sin respuesta directa) — decidir si se construye o solo se documenta el patrón · decisión: tutor-ia-con-restricciones · deps: T-015

### Verificación de evidencia (deuda de investigación)
- [ ] T-030 Leer texto completo de las fuentes `secondary`/`abstract` que sostienen decisiones de confianza alta: pan-rickard-2018, cepeda-2008, rawson-dunlosky-successive-relearning, yang-2021 y subir `verified` a `full-text`
- [ ] T-031 Reemplazar `expertise-reversal-wikipedia` por Kalyuga et al. 2003/2007 · decisión: ejemplos-resueltos-simulacion-y-problema-previo
- [ ] T-032 Confirmar título/autores de pan-carpenter-2023, kestin-2025, bastani-2025 y kobayashi-2024 (se infirieron de resúmenes)
- [ ] T-033 Investigar y guardar fuente de hipercorrección y de feedback elaborado vs solo corrección (wisniewski-2020 moderadores) · decisión: feedback-explicativo-y-calibracion
- [ ] T-034 Verificar el benchmark FSRS vs SM-2 en el repo open-spaced-repetition antes de prometer ahorro de repasos · decisión: repeticion-espaciada-fsrs
- [ ] T-035 Revisar las 12 decisiones (`status: proposed`) con el dueño del repo y pasar a `accepted` las ratificadas

### Laboratorio e IA (decisiones: simulaciones-por-primitivas-y-recetas, correccion-ia-solo-formativa-con-checklist, preguntas-sugeridas-y-contexto-minimo)
- [ ] T-060 Medir el acuerdo del corrector IA con un humano: corregir a mano ~30 explicaciones de las sims y comparar antes de activar la corrección con IA · decisión: correccion-ia-solo-formativa-con-checklist
- [ ] T-061 Corrección IA formativa de la explicación libre (`tk grade` o en web): marcar ideas de la rúbrica presentes/ausentes + una pista; nunca cuenta como acierto · deps: T-060
- [ ] T-063 Primitivas nuevas cuando haya recetas que las pidan: `ordenar-pasos`, `encontrar-el-error` · decisión: simulaciones-por-primitivas-y-recetas
- [ ] T-064 Nivel 2 de costo: generar una receta nueva con modelo barato, validarla con `checkLab` y cachearla en `lab/` · deps: T-063
- [ ] T-065 Leer el texto completo de alfieri-2011 (el PDF no se pudo leer) y de moore-herzog-perkins-2013; confirmar título de myers-hausman-rhodes-2023
- [ ] T-066 Verificar precios de anthropic-pricing-docs y openai-pricing-docs en las páginas en vivo antes de presupuestar (tabla `PRICES` de `packages/llm`)
- [ ] T-069 Probar el chat con la API real (clave en `.env`) y medir costo/caché por turno; ajustar `MAX_USER_TURNS` y longitud de respuesta · deps: T-068
- [ ] T-070 Respuestas en streaming en el chat (hoy se espera la respuesta completa) · deps: T-069
- [ ] T-071 Tope de gasto diario en `tutor-api` (hoy solo límite de 30 preguntas/min); puede usar `.data/gasto.json` (gasto por día) · deps: T-069
- [ ] T-074 Probar el chat con ChatGPT real (gpt-6-luna) y comparar calidad de respuestas con Haiku 5.5 en 10 preguntas sugeridas · decisión: proveedores-llm-y-contador-de-gasto · deps: T-069
- [ ] T-075 Contrastar el contador de gasto con el gasto que factura el proveedor (Admin API: Anthropic `/v1/organizations/analytics/cost`, OpenAI `/v1/organization/costs`) para detectar desvíos de la tabla de precios — opcional y con clave Admin aparte, nunca la del tutor
- [ ] T-076 Fijar equivalencias verificadas para Gemini (modelo y precio) si se va a usar · decisión: proveedores-llm-y-contador-de-gasto
- [ ] T-080 Probar el menú de selección en móvil real (iOS/Android: convivencia con el menú nativo de copiar) y en Firefox/Safari
- [ ] T-082 Revisar preguntas generadas con IA (`.data/preguntas/`) y pasar las buenas al curso con `tk lab import`; quizá un comando `tk lab promote` · deps: T-081
- [ ] T-083 Usar las marcas Sí / Más o menos / No de la práctica (hoy en localStorage) como entrada del planificador FSRS · deps: T-015, T-081
- [ ] T-086 Leer el texto completo de rello-pielot-marcos-2016, wallace-2022-individuated (el PDF no se pudo leer), schneider-2018-signaling y brom-2018-emotional-design (falta URL verificada del original) y subir `verified` · decisión: tipografia-y-medidas-de-lectura, color-con-funcion-y-contraste
- [ ] T-087 Prueba corta de velocidad de lectura (≈1 min, 3 fuentes) para recomendar fuente a cada alumno en vez de dejarlo a la preferencia, que no predice la velocidad · decisión: tipografia-y-medidas-de-lectura · deps: T-085
- [ ] T-088 Revisar contraste de `term.css` (subrayado de glosario) y del chat con los tokens nuevos; comprobar 1.4.12 (espaciado amplio) en móvil · deps: T-085
- [ ] T-077 Menú del header: añadir entradas (búsqueda, curso actual) cuando haga falta, sin pasar de una línea fina
- [ ] T-067 Registrar qué preguntas sugeridas se usan y si cambian los aciertos, para validar la decisión · decisión: preguntas-sugeridas-y-contexto-minimo

### Plataforma de estudio (2026-11-26)
- [ ] T-099 Verificar en texto completo las 19 fuentes nuevas (todas `secondary`): autores de metr-2025-ai-devs y anthropic-building-agents, URL de fiorella-zhang-2018-drawing, URL oficial de OWASP; subir `verified` · decisión: accesibilidad-con-evidencia, ingenieria-con-ia-verificar-antes-que-confiar
- [ ] T-104 Aviso en `validate` para subtemas con < 3 negritas (esquema y huecos quedan pobres) · decisión: vistas-de-estudio-generadas
- [ ] T-105 Revisión semestral de los cursos de IA y frontend (herramientas, métricas y prácticas cambian rápido); próxima: 2027-05 · decisión: ingenieria-con-ia-verificar-antes-que-confiar
- [ ] T-106 Medir uso de herramientas y vistas de estudio (qué se abre, cuánto se completa) para validar las decisiones · deps: T-100
- [ ] T-107 Backend real de cuentas (auth, sincronizar progreso entre dispositivos) para sustituir el perfil local de presentación · deps: T-100
- [ ] T-108 Constructores nuevos cuando haya cursos que los pidan: `linea-de-tiempo`, `ordenar-pasos` (compartible con T-063) · decisión: herramientas-por-curso-con-constructores
- [ ] T-109 Pasar el planificador provisional a FSRS reutilizando la misma firma `review()` · deps: T-015, T-096
- [ ] T-110 Probar la lectura en voz alta en Safari/iOS y Android y el modo foco con lector de pantalla · deps: T-097

### Contenido
- [ ] T-040 Completar el módulo `next-cache` (1 subtema, 0 hechos)
- [ ] T-090 Leer el texto completo de norris-ortega-2000 y spada-tomita-2010 (solo vistos de forma secundaria; la red bloqueó los DOI) y buscar una fuente sobre contraste L1 (español→inglés) · decisión: gramatica-explicita-con-contraste-l1
- [ ] T-091 Basic English · Level 2: estilo indirecto, gerundio vs infinitivo, preposiciones, phrasal verbs frecuentes, comparativos, relativos · deps: T-089
- [ ] T-092 Primitiva `ordenar-pasos` o `completar-hueco` para practicar producción (escribir la forma del verbo) en english-basic-1; hoy solo hay clasificar y predecir · decisión: simulaciones-por-primitivas-y-recetas

## Hecho

- [x] T-111 2026-11-28 Web mobile first — CSS base = móvil y `min-width` restaura tablet/escritorio como antes (header, chat, lab, tablas desplazables, textareas a 16px en móvil sin zoom iOS)
- [x] T-112 2026-11-28 Mobile first también en `Tool`, `AuthShell`, `StudyModes` y `perfil` (ya no queda ningún `max-width` en la web); capturas idénticas a las anteriores en tablet y escritorio (601–1280 px); arregla el botón de pregunta previa de `StudyModes`, que en móvil seguía empujado a la derecha porque la regla base pisaba la del media query
- [x] T-093 2026-11-26 Investigación: 19 fuentes nuevas (texto a voz, filtros de color, Bionic Reading, dibujo generativo, productividad con IA —Copilot, METR, DORA 2025—, migraciones de Google, pautas Human-AI de Microsoft, agentes y contexto de Anthropic, MCP, RAG —Lewis, contextual retrieval, lost in the middle, Ragas—, OWASP LLM, INP, ofertas de SpaceX) y 6 decisiones `proposed`: accesibilidad-con-evidencia, vistas-de-estudio-generadas, herramientas-por-curso-con-constructores, ingenieria-con-ia-verificar-antes-que-confiar, rag-hibrido-con-reranking-y-evals, frontend-ruta-por-niveles
- [x] T-094 2026-11-26 Herramientas por curso con constructores comunes: contrato `ToolSpec` (calculadora, decision, checklist, comparador, plantilla), paquete `packages/tools` (validación semántica + ejecución en navegador), `Tool.astro`, página `/<curso>/herramientas/`, herramientas al final de sus subtemas, `tk tool list|new|import`, índice con `tools`; funciones seguras (min, max, ceil, round…) en el mini-lenguaje de `@tk/sims` · decisión: herramientas-por-curso-con-constructores
- [x] T-095 2026-11-26 Vistas de estudio para cualquier curso (`packages/views` + `StudyModes.astro`): Leer · Esquema · Mapa (Mermaid) + Haz tu mapa · Tarjetas · Huecos · Explícalo · Pregunta previa; mapa del curso `/<curso>/mapa/`; «Hazlo diagrama» en el chat (Mermaid) · decisión: vistas-de-estudio-generadas
- [x] T-096 2026-11-26 Repaso espaciado provisional (`packages/practice`, cajas con intervalos 1-3-7-16-35-80 días e intercalado): marcas del lab y de las tarjetas alimentan `/<curso>/repaso/` y `/<curso>/tarjetas/` · decisión: repeticion-espaciada-fsrs (FSRS sigue en T-015)
- [x] T-097 2026-11-26 Panel de accesibilidad: pestañas Lectura/Visión/Atención/Voz, perfiles (Dislexia, Baja visión, Concentración), ancho de línea, alto contraste, enlaces/foco muy visibles, interfaz grande, modo foco, reducir movimiento, glosario discreto, lectura en voz alta con velocidad y voz, Alt+A, enlace «Saltar al contenido»; tooltips del glosario ya no ensanchan la página en móvil · decisión: accesibilidad-con-evidencia
- [x] T-098 2026-11-26 Menú de selección rediseñado: píldora con iconos y etiquetas, definición del glosario al instante, crear tarjeta de repaso, escuchar, copiar con fuente, «Hazlo diagrama», preguntas del curso plegables, navegación con flechas y Alt+S
- [x] T-100 2026-11-26 Entrar / registro / perfil (solo presentación, datos en el navegador, la contraseña no se guarda): perfil con progreso por curso, ajustes de lectura, exportar y borrar datos; avatar en el header
- [x] T-101 2026-11-26 Rutas de aprendizaje (`paths/*.yaml`, contrato `LearningPath`, `level` en módulos), página `/rutas/` y portada nueva
- [x] T-102 2026-11-26 Cursos nuevos: `ia-en-aplicaciones` (11 subtemas), `rag` (11), `ingenieria-con-ia-pro` (11), `frontend-junior` (10), `frontend-semi-senior` (9), `frontend-senior` (8): 360 preguntas con respuesta, 12 simulaciones, 20 herramientas, ~260 términos de glosario · decisiones: ingenieria-con-ia-verificar-antes-que-confiar, rag-hibrido-con-reranking-y-evals, frontend-ruta-por-niveles
- [x] T-103 2026-11-26 Herramientas también en cursos existentes: comparador de mensajería y asistente de almacenamiento (aws-saa), «¿Qué tiempo verbal uso?» y constructor de frases (english-basic-1); `CHANGELOG.md` creado

- [x] T-089 2026-11-23 Módulo `english-basic-1` (Basic English · Level 1): 21 subtemas en 7 secciones (bases → mapa tiempo × aspecto y equivalencias con el español → presente, pasado, imperfecto en inglés, perfectos, futuro, marcadores → modales, condicionales, pasiva, artículos), 126 preguntas con respuesta, 21 simulaciones y 50 términos de glosario · decisión: gramatica-explicita-con-contraste-l1

- [x] T-084 2026-11-16 Investigación de tipografía, tamaño, medida, color, contraste y polaridad: 19 fuentes y 3 decisiones `proposed` (tipografia-y-medidas-de-lectura, sin-tipografias-milagro, color-con-funcion-y-contraste)
- [x] T-085 2026-11-16 Aplicado a la web: texto de estudio a 19 px, medida 68ch, interlineado 1,65; tokens de color con contraste ≥4,5:1 en claro y oscuro (antes el ámbar/verde/cian claros daban 3,2–3,7); botón "Aa" en el header (fuente Sistema/Literata/Atkinson Hyperlegible servidas desde el sitio, tamaño 15–26 px, espaciado amplio de WCAG 1.4.12, tema Auto/Claro/Oscuro) guardado por navegador y aplicado antes de pintar · decisión: tipografia-y-medidas-de-lectura, color-con-funcion-y-contraste, sin-tipografias-milagro

- [x] T-081 2026-11-15 Práctica con respuestas escritas: campo `a` en `LabQuestion`; `validate` exige ≥6 preguntas con respuesta en subtemas `done`; 259 preguntas con respuesta en `aws-saa` (6–7 por subtema) y 3 en `next-cache`; tarjetas en `Lab.astro` (intentar → ver respuesta → Sí/Más o menos/No, progreso, filtros "Sin responder"/"A repasar"/por tipo, "Profundizar con el tutor"); botón "Generar 3 preguntas" (`generateQuestions` en `@tk/tutor`, `GET/POST /preguntas` en tutor-api, guardadas y reutilizadas gratis); el menú de selección lleva a la tarjeta en vez de gastar IA; rediseño visual del lab · decisión: practica-de-recuperacion, preguntas-sugeridas-y-contexto-minimo

- [x] T-050 2026-11-15 Simulaciones por primitivas + recetas: contratos `LabFile`/`SimSpec`, paquete `packages/sims` (reglas seguras, validación de cobertura, corrección determinista) y componente `Lab.astro` (predecir→observar→explicar con checklist; clasificar) · decisión: simulaciones-por-primitivas-y-recetas
- [x] T-051 2026-11-15 Preguntas sugeridas por subtema y `tk lab import`; `validate` exige ≥3 en subtemas `done` · decisión: preguntas-sugeridas-y-contexto-minimo
- [x] T-052 2026-11-15 Contexto mínimo para IA en el índice: `.index/ctx/<módulo>/_catalogo.md` + `<subtema>.md` (cuerpo + resumen de requires/uses + glosario usado), regenerado con cada cambio de contenido
- [x] T-053 2026-11-15 Paquete `packages/tutor` + `tk ask`: Haiku 5.5, prefijo cacheado, herramienta `leer_subtema` con tope de 3 lecturas, reglas de tutor con pistas; tests con cliente falso · decisión: tutor-ia-con-restricciones
- [x] T-054 2026-11-15 Lab de `aws-saa`: 140 preguntas en 42 subtemas y 14 simulaciones (SQS, Kinesis, Lambda, DR, ELB, Route 53, S3, RDS, VPC, EC2, almacenamiento, bases de datos, seguridad); `next-cache`: 3 preguntas
- [x] T-072 2026-11-15 Paquete `packages/llm`: proveedores Claude, ChatGPT, Gemini, Ollama y compatibles; modelo por función y nivel (Haiku 5.5 ↔ gpt-6-luna, Sonnet 5.5 ↔ gpt-6.1-sol, Opus 5.5 ↔ gpt-6-astra); adaptador Chat Completions; precios; `tk ask --provider`; selector de modelo en el chat; conversación portable entre proveedores · decisión: proveedores-llm-intercambiables-y-saldo-estimado
- [x] T-073 2026-11-15 Header discreto (34 px, se esconde al bajar) con saldo estimado por proveedor · decisión: proveedores-llm-intercambiables-y-saldo-estimado (reemplazada)
- [x] T-079 2026-11-15 Menú propio al seleccionar texto (`SelectionMenu.astro`): "¿Qué es «X»?" (selección corta), Explícame esto, Dame un ejemplo, ¿Por qué?, Pregúntame, Preguntar… (adjunta y deja escribir) + hasta 3 preguntas del laboratorio relacionadas (palabras de la selección y del título de su sección, ponderadas por rareza en la página); todo va al chat con el fragmento citado · decisión: preguntas-sugeridas-y-contexto-minimo
- [x] T-078 2026-11-15 Contador de gasto en lugar de saldo: cada respuesta suma tokens × precio del modelo que respondió, por modelo y por día; header "hoy · mes" + panel con hoy/mes/total y fila por modelo con su precio; `tk gasto [--reset]`, `GET /gasto`, `POST /gasto/reset` · decisión: proveedores-llm-y-contador-de-gasto
- [x] T-068 2026-11-15 Chat flotante contextual: `chat()` de varios turnos en `@tk/tutor` (historial append-only validado, fragmento seleccionado, portada sin subtema), servidor `apps/tutor-api` (CORS, límites, modo `--fake`), `Chat.astro` en todas las páginas de curso, preguntas sugeridas → chat; tests de tutor y handler · decisión: preguntas-sugeridas-y-contexto-minimo
- [x] T-055 2026-11-15 Investigación: 11 fuentes (descubrimiento guiado, PhET, POE, comparación de casos, corrección con LLM, preguntas generadas por alumnos, precios) y 3 decisiones `proposed`

- [x] T-001 2026-11-15 Investigación de ciencia del aprendizaje (retrieval, espaciado, intercalado, ejemplos, simulación, feedback, multimedia, IA) con 30 fuentes
- [x] T-002 2026-11-15 Harness de evidencia: contratos `Source`/`Decision`, paquete `packages/research` (carga, validación, búsqueda, índice) y tests
- [x] T-003 2026-11-15 CLI: `tk source add|import`, `tk decision new`, `tk research find|status`; `index` y `validate` incluyen la evidencia
- [x] T-004 2026-11-15 Indexación: `.index/research.{json,md}`, conteo en `root.json` y decisiones aplicables dentro de cada `.index/<módulo>.md`
- [x] T-005 2026-11-15 Carga inicial de 30 fuentes y 9 decisiones en `research/` (todas `proposed`)
- [x] T-006 2026-11-15 `tasks.md` y protocolo de evidencia/tareas en CLAUDE.md
