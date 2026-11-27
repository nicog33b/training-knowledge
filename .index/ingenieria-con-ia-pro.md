# Ingeniería de software con IA · nivel pro [ingenieria-con-ia-pro] (topic)
Cómo trabajan con IA los equipos de ingeniería que lo documentan (Google, Microsoft, Anthropic; SpaceX solo lo público): contexto, specs, agentes, verificación, métricas y gobierno.

Archivos: modules/ingenieria-con-ia-pro/{module.yaml,glossary.yaml,topics/*.md,lab/*.yaml,tools/*.yaml}
Contexto para IA por subtema: .index/ctx/ingenieria-con-ia-pro/<subtema>.md (+ _catalogo.md)

## Subtemas
- productividad-medida (evidencia): Productividad con IA: lo que se ha medido — Los resultados que hay que conocer: Copilot 55,8 % más rápido en una tarea nueva, METR 19 % más lento en repos maduros, DORA 2025 (la IA amplifica). Cómo medir en tu equipo. [términos: agente,dora,ensayo-controlado-aleatorizado,http,pr,repositorio,throughput] [lab: 6 preguntas] [tools: calculadora:capacidad-revision]
- como-funciona-un-agente-de-codigo (evidencia): Cómo funciona un agente de código — El bucle leer-pensar-actuar-verificar, las herramientas (leer, buscar, editar, ejecutar), el contexto que consume y por qué falla. [términos: agente,agente-de-codigo,context-rot,linter,llm,repositorio,subagente] [lab: 6 preguntas]
- context-engineering (contexto): Context engineering en un repositorio — Archivos de instrucciones (CLAUDE.md, AGENTS.md), índices, convenciones y recuperación justo a tiempo: darle al agente el contexto mínimo de alta señal. [términos: agente,claude-md,compactar,context-engineering,repositorio] [lab: 6 preguntas] [tools: plantilla:instrucciones-repo]
- specs-antes-que-codigo (contexto): Specs antes que código — Desarrollo guiado por especificaciones: requisitos, plan y tareas pequeñas y verificables antes de pedir código; el humano decide el qué, el agente propone el cómo. [términos: agente,criterios-de-aceptacion,pr,spec-driven-development] [lab: 6 preguntas] [tools: plantilla:spec-para-agente]
- explorar-planificar-implementar-verificar (flujo): Explorar → planificar → implementar → verificar — El ciclo que usan los equipos con agentes: entender antes de tocar, plan revisable, cambios pequeños y verificación automática en cada paso. [términos: agente,agente-de-codigo,ci,linter,pr,repositorio,subagente] [lab: 6 preguntas, sims clasificar:fase-del-ciclo] [tools: plantilla:spec-para-agente]
- tests-como-oraculo (flujo): Tests como oráculo: TDD con agentes — Los tests le dicen al agente cuándo terminó: escribirlos antes, que fallen, implementar hasta verde y no dejar que el agente toque el oráculo. [términos: agente,criterios-de-aceptacion,eval,linter,oraculo,tdd,teaching-to-the-test] [lab: 6 preguntas] [tools: checklist:revisar-pr-ia]
- revisar-codigo-generado (flujo): Revisar código generado por IA — Qué mirar en un PR de un agente: seguridad, dependencias inventadas, tests débiles, duplicación y mantenibilidad; la responsabilidad sigue siendo humana. [términos: agente,analisis-estatico,linter,pr,repositorio,slopsquatting] [lab: 6 preguntas] [tools: checklist:revisar-pr-ia]
- migraciones-a-escala (escala): Migraciones a escala con LLM (caso Google) — Cómo Google migra miles de archivos con LLM: buscar los sitios, generar cambios, validar con build y tests, y revisión humana; qué porcentaje hizo el modelo. [términos: agente,analisis-estatico,api,linter,llm,migracion-de-codigo,monorepo,pr,prompt] [lab: 6 preguntas]
- agentes-en-paralelo (escala): Agentes en paralelo y subagentes — Varias tareas a la vez con worktrees y entornos aislados, subagentes para explorar sin ensuciar el contexto y cuándo paralelizar no compensa. [términos: agente,pr,repositorio,sandbox,subagente,worktree] [lab: 6 preguntas] [tools: calculadora:capacidad-revision]
- gobierno-y-seguridad (organizacion): Gobierno: permisos, sandbox, secretos y métricas — Modos de permiso, entornos aislados, secretos fuera del alcance del agente, auditoría y métricas de equipo (DORA) para adoptar IA sin perder estabilidad. [términos: agente,ci,dora,inyeccion-de-prompt,minimo-privilegio,modos-de-permiso,pr,prompt,repositorio,sandbox,token] [lab: 6 preguntas]
- practicas-por-empresa (organizacion): Qué hacen Google, Microsoft, Anthropic y SpaceX — Lo publicado por cada empresa sobre trabajar con IA, con su fuente y su límite; y lo que NO se sabe (SpaceX solo tiene ofertas de empleo públicas). [términos: agente,context-engineering,dora,ensayo-controlado-aleatorizado,guardarrail,llm,mcp,migracion-de-codigo,monorepo,pr,rag,workflow] [lab: 6 preguntas]

## Herramientas del curso (4)
calculadora:capacidad-revision, plantilla:instrucciones-repo, checklist:revisar-pr-ia, plantilla:spec-para-agente

## Glosario propio (21)
agente-de-codigo, analisis-estatico, claude-md, compactar, context-engineering, criterios-de-aceptacion, dora, ensayo-controlado-aleatorizado, linter, migracion-de-codigo, modos-de-permiso, monorepo, oraculo, sandbox, slopsquatting, spec-driven-development, subagente, tdd, teaching-to-the-test, throughput, worktree

## Decisiones de diseño aplicables (resumen en .index/research.md; razonamiento en research/decisions/<id>.md)
- accesibilidad-con-evidencia [proposed·medium]: Menú de accesibilidad: solo opciones con evidencia o derecho de acceso
- color-con-funcion-y-contraste [proposed·medium]: Color para señalar y contrastar, no por psicología del color
- descartar-tecnicas-de-baja-evidencia [proposed·high]: No basar el producto en releer, subrayar, estilos de aprendizaje ni gamificación de puntos
- diseno-de-contenido-sin-ruido [proposed·medium]: Explicaciones segmentadas, coherentes y sin detalles decorativos
- ejemplos-resueltos-simulacion-y-problema-previo [proposed·medium]: Ejemplos resueltos con andamiaje que se retira, comparación de casos y simulaciones
- estrategias-generativas-autoexplicacion-y-ensenar [proposed·medium]: Cierre de subtema con autoexplicación, mapa propio y "explícalo a otro"
- feedback-explicativo-y-calibracion [proposed·medium]: Feedback que explica y medición de calibración, no de "sensación"
- herramientas-por-curso-con-constructores [proposed·low]: Herramientas propias de cada curso creadas con constructores comunes
- ingenieria-con-ia-verificar-antes-que-confiar [proposed·medium]: Cursos de IA para desarrolladores: verificación, contexto y medición antes que confianza
- intercalar-conceptos-confundibles [proposed·medium]: Intercalar solo conceptos parecidos y confundibles
- practica-de-recuperacion [proposed·high]: Cada subtema termina en práctica de recuperación con feedback
- preguntas-sugeridas-y-contexto-minimo [proposed·medium]: Preguntas sugeridas por subtema y contexto mínimo para la IA
- proveedores-llm-y-contador-de-gasto [proposed·medium]: Proveedores LLM intercambiables por función y contador de gasto por modelo
- repeticion-espaciada-fsrs [proposed·high]: Repaso espaciado con planificador FSRS y relearning sucesivo
- simulaciones-por-primitivas-y-recetas [proposed·medium]: Simulaciones como primitivas fijas + recetas declarativas por subtema
- sin-tipografias-milagro [proposed·high]: Nada de fuentes difíciles ni fuentes para dislexia como truco de aprendizaje
- tipografia-y-medidas-de-lectura [proposed·medium]: Tipografía de lectura: tamaño generoso, línea de ~65 caracteres y ajustes por persona
- vistas-de-estudio-generadas [proposed·medium]: Vistas de estudio generadas del mismo contenido: esquema, mapa, tarjetas, huecos, explícalo y pregunta previa
