# Frontend Developer · Senior [frontend-senior] (framework)
Criterio de senior: estrategias de renderizado, arquitectura frontend y design systems, observabilidad, rendimiento a escala, decisiones técnicas documentadas y liderazgo técnico.

Archivos: modules/frontend-senior/{module.yaml,glossary.yaml,topics/*.md,lab/*.yaml,tools/*.yaml}
Contexto para IA por subtema: .index/ctx/frontend-senior/<subtema>.md (+ _catalogo.md)

## Subtemas
- estrategias-de-renderizado (arquitectura): Estrategias de renderizado — CSR, SSR, SSG, ISR, streaming, hidratación, islas y Server Components: qué gana y qué cuesta cada una, y cómo elegir por página. [términos: cdn,csr,hidratacion,inp,islas,isr,lcp,re-render,revalidacion,seo,server-components,ssg,ssr,streaming-ssr,ttfb] [lab: 6 preguntas, sims clasificar:estrategia-por-pagina] [tools: comparador:comparar-renderizado,decision:elegir-renderizado]
- arquitectura-frontend (arquitectura): Arquitectura frontend a escala — Organizar por dominio, límites entre módulos, monorepos, contratos y cuándo (casi nunca) compensan los microfrontends. [términos: api,ci,conflicto,design-system,http,microfrontends,monolito-modular,zod] [lab: 6 preguntas]
- design-systems (arquitectura): Design systems — Tokens, componentes accesibles, documentación, versionado y gobierno: el producto interno que hace consistente y rápido a todo el equipo. [términos: api,aria,codemod,design-system,foco,props,tokens-de-diseno,versionado-semantico] [lab: 6 preguntas]
- rendimiento-a-escala (produccion): Rendimiento a escala — Presupuestos de rendimiento, RUM, perfilado del hilo principal, caché y CDN, y una cultura que evita que la web se degrade con cada release. [términos: cdn,ci,cls,code-splitting,hilo-principal,inp,islas,lcp,lighthouse,percentil-75,pr,presupuesto-de-rendimiento,react,rum,server-components,tarea-larga] [lab: 6 preguntas] [tools: checklist:lanzamiento-seguro]
- observabilidad-frontend (produccion): Observabilidad en el frontend — Errores con contexto y source maps, RUM, logs de eventos, feature flags y lanzamientos graduales para detectar y revertir problemas rápido. [términos: api,breadcrumbs,core-web-vitals,despliegue-gradual,error-boundary,feature-flag,promesa,rum,source-map] [lab: 6 preguntas] [tools: checklist:lanzamiento-seguro]
- decisiones-y-adr (liderazgo): Decisiones técnicas y ADR — Cómo decidir con compromisos explícitos, documentar en Architecture Decision Records y revisar decisiones cuando cambia el contexto. [términos: adr,pr,repositorio] [lab: 6 preguntas] [tools: plantilla:adr]
- liderazgo-tecnico (liderazgo): Liderazgo técnico sin cargo — Revisiones de código que enseñan, mentoría, estimación con incertidumbre, deuda técnica negociada y hacer crecer al equipo. [términos: api,deuda-tecnica,pr,promesa,spike] [lab: 6 preguntas]
- system-design-frontend (liderazgo): System design de frontend — Cómo abordar el diseño de un sistema frontend (feed, autocompletar, editor): requisitos, modelo de datos, API, estado, rendimiento, accesibilidad y fallos. [términos: apg,api,code-splitting,conflicto,csr,datos-del-servidor,debounce,foco,lector-de-pantalla,paginacion-por-cursor,sse,ssr,virtualizacion,websocket,xss] [lab: 6 preguntas] [tools: decision:elegir-renderizado]

## Herramientas del curso (4)
plantilla:adr, comparador:comparar-renderizado, decision:elegir-renderizado, checklist:lanzamiento-seguro

## Glosario propio (31)
adr, breadcrumbs, cdn, codemod, csr, design-system, despliegue-gradual, deuda-tecnica, error-boundary, feature-flag, hidratacion, islas, isr, microfrontends, monolito-modular, normalizar, paginacion-por-cursor, presupuesto-de-rendimiento, rum, server-components, spike, sse, ssg, ssr, stale-while-revalidate, streaming-ssr, tokens-de-diseno, ttfb, versionado-semantico, virtualizacion, websocket

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
