# Frontend Developer · Junior [frontend-junior] (framework)
Lo que un frontend junior debe dominar para trabajar en un equipo: HTML semántico, CSS de maquetación, JavaScript del navegador, asincronía, HTTP, Git y accesibilidad básica.

Archivos: modules/frontend-junior/{module.yaml,glossary.yaml,topics/*.md,lab/*.yaml,tools/*.yaml}
Contexto para IA por subtema: .index/ctx/frontend-junior/<subtema>.md (+ _catalogo.md)

## Subtemas
- html-semantico (web-base): HTML semántico — Elegir el elemento por su significado (header, nav, main, button, label…): accesibilidad, SEO y comportamiento gratis del navegador. [términos: arbol-de-accesibilidad,aria,html-semantico,landmark,lector-de-pantalla,seo] [lab: 6 preguntas] [tools: checklist:checklist-junior-pr]
- cascada-y-especificidad (web-base): La cascada, la especificidad y el box model — Por qué un estilo gana a otro (origen, especificidad, orden), herencia, box-sizing y cómo evitar guerras de !important. [términos: box-model,cascada,especificidad] [lab: 6 preguntas]
- flexbox-y-grid (web-base): Maquetación con Flexbox y Grid — Flexbox para una dimensión, Grid para dos; alinear, repartir espacio y plantillas sin hacks. [términos: flexbox,grid,media-query] [lab: 6 preguntas] [tools: decision:flex-o-grid]
- responsive (web-base): Diseño responsive — Mobile first, viewport, unidades relativas, media queries y container queries, imágenes adaptables. [términos: container-query,flexbox,grid,media-query,mobile-first] [lab: 6 preguntas]
- javascript-esencial (javascript): JavaScript esencial: valores, ámbito y closures — Tipos y comparación, let/const, ámbito de bloque, funciones como valores, closures y referencias frente a copias. [términos: ambito,closure] [lab: 6 preguntas]
- dom-y-eventos (javascript): DOM y eventos — Seleccionar y modificar el DOM, escuchar eventos, propagación y delegación, y no bloquear el hilo principal. [términos: delegacion-de-eventos,dom,hilo-principal,web-worker,xss] [lab: 6 preguntas]
- asincronia-y-event-loop (javascript): Asincronía: event loop, promesas y async/await — Cómo JavaScript hace varias cosas con un solo hilo: pila, cola de tareas y microtareas; promesas, async/await y manejo de errores. [términos: async-await,event-loop,microtarea,promesa] [lab: 6 preguntas, sims clasificar:tarea-o-microtarea]
- http-y-fetch (javascript): HTTP y fetch — Métodos, códigos de estado, cabeceras y JSON; consumir una API con fetch, manejar errores, estados de carga y CORS a nivel básico. [términos: codigo-de-estado,cors,debounce,fetch,http,json,mismo-origen] [lab: 6 preguntas, sims clasificar:que-codigo-es]
- git-y-colaboracion (oficio): Git y colaboración — Commits pequeños con buenos mensajes, ramas, pull requests, resolver conflictos y revisar código de otros. [términos: commit,conflicto,git,pr,rama] [lab: 6 preguntas] [tools: checklist:checklist-junior-pr]
- accesibilidad-basica (oficio): Accesibilidad básica (WCAG 2.2) — Teclado, foco visible, textos alternativos, contraste, formularios con label y probar con lector de pantalla: lo mínimo que todo junior debe cumplir. [términos: aria,contraste,foco,lector-de-pantalla,wcag] [lab: 6 preguntas, sims clasificar:criterio-wcag] [tools: checklist:checklist-junior-pr,calculadora:contraste]

## Herramientas del curso (3)
checklist:checklist-junior-pr, calculadora:contraste, decision:flex-o-grid

## Glosario propio (41)
abortcontroller, ambito, arbol-de-accesibilidad, aria, async-await, box-model, cascada, closure, codigo-de-estado, commit, conflicto, container-query, contraste, cors, debounce, delegacion-de-eventos, dom, especificidad, event-loop, fetch, flexbox, foco, git, grid, hilo-principal, html-semantico, landmark, lector-de-pantalla, media-query, microtarea, mismo-origen, mobile-first, promesa, rama, rem, seo, srcset, viewport, wcag, web-worker, xss

## Decisiones de diseño aplicables (resumen en .index/research.md; razonamiento en research/decisions/<id>.md)
- accesibilidad-con-evidencia [proposed·medium]: Menú de accesibilidad: solo opciones con evidencia o derecho de acceso
- color-con-funcion-y-contraste [proposed·medium]: Color para señalar y contrastar, no por psicología del color
- descartar-tecnicas-de-baja-evidencia [proposed·high]: No basar el producto en releer, subrayar, estilos de aprendizaje ni gamificación de puntos
- diseno-de-contenido-sin-ruido [proposed·medium]: Explicaciones segmentadas, coherentes y sin detalles decorativos
- ejemplos-resueltos-simulacion-y-problema-previo [proposed·medium]: Ejemplos resueltos con andamiaje que se retira, comparación de casos y simulaciones
- estrategias-generativas-autoexplicacion-y-ensenar [proposed·medium]: Cierre de subtema con autoexplicación, mapa propio y "explícalo a otro"
- feedback-explicativo-y-calibracion [proposed·medium]: Feedback que explica y medición de calibración, no de "sensación"
- frontend-ruta-por-niveles [proposed·low]: Ruta frontend junior → semi senior → senior con tareas completas y métricas actuales
- herramientas-por-curso-con-constructores [proposed·low]: Herramientas propias de cada curso creadas con constructores comunes
- intercalar-conceptos-confundibles [proposed·medium]: Intercalar solo conceptos parecidos y confundibles
- practica-de-recuperacion [proposed·high]: Cada subtema termina en práctica de recuperación con feedback
- preguntas-sugeridas-y-contexto-minimo [proposed·medium]: Preguntas sugeridas por subtema y contexto mínimo para la IA
- proveedores-llm-y-contador-de-gasto [proposed·medium]: Proveedores LLM intercambiables por función y contador de gasto por modelo
- repeticion-espaciada-fsrs [proposed·high]: Repaso espaciado con planificador FSRS y relearning sucesivo
- simulaciones-por-primitivas-y-recetas [proposed·medium]: Simulaciones como primitivas fijas + recetas declarativas por subtema
- sin-tipografias-milagro [proposed·high]: Nada de fuentes difíciles ni fuentes para dislexia como truco de aprendizaje
- tipografia-y-medidas-de-lectura [proposed·medium]: Tipografía de lectura: tamaño generoso, línea de ~65 caracteres y ajustes por persona
- vistas-de-estudio-generadas [proposed·medium]: Vistas de estudio generadas del mismo contenido: esquema, mapa, tarjetas, huecos, explícalo y pregunta previa
