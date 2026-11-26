# Frontend Developer · Semi Senior [frontend-semi-senior] (framework)
El salto a semi senior: TypeScript, el modelo mental de React, estado y datos del servidor, testing, herramientas de build, rendimiento (Core Web Vitals) y seguridad web.

Archivos: modules/frontend-semi-senior/{module.yaml,glossary.yaml,topics/*.md,lab/*.yaml,tools/*.yaml}
Contexto para IA por subtema: .index/ctx/frontend-semi-senior/<subtema>.md (+ _catalogo.md)

## Subtemas
- typescript-practico (lenguaje-y-modelo): TypeScript práctico — Tipos que aportan: inferencia, uniones y estrechamiento, genéricos, tipos de utilidad, unknown frente a any y validar en el borde (zod). [términos: api,estrechamiento,generico,props,typescript,union-discriminada,unknown,zod] [lab: 6 preguntas]
- react-modelo-mental (lenguaje-y-modelo): El modelo mental de React — UI = f(estado): renderizado, props y estado, inmutabilidad, keys en listas y qué provoca un re-render. [términos: context,dom,key,props,re-render,react,reconciliacion] [lab: 6 preguntas] [tools: decision:donde-va-el-estado]
- efectos-y-sincronizacion (lenguaje-y-modelo): Efectos: sincronizar con el exterior — useEffect sirve para sincronizar con sistemas externos, no para derivar datos; dependencias, limpieza y cuándo no necesitas un efecto. [términos: closure-obsoleta,datos-del-servidor,props,react,useeffect] [lab: 6 preguntas]
- estado-y-datos-del-servidor (datos-y-calidad): Estado de la UI y datos del servidor — Distinguir estado local, compartido y datos del servidor; caché, revalidación, estados de carga y por qué no meterlo todo en un store global. [términos: actualizacion-optimista,context,datos-del-servidor,revalidacion] [lab: 6 preguntas] [tools: decision:donde-va-el-estado]
- testing-frontend (datos-y-calidad): Testing en frontend — Probar comportamiento como lo usa una persona (Testing Library), qué cubrir con unitarios, integración y extremo a extremo, y tests que no se rompen al refactorizar. [términos: ci,lector-de-pantalla,lighthouse,msw,regresion-visual,test-de-extremo-a-extremo,testing-library] [lab: 6 preguntas] [tools: comparador:comparar-tests]
- build-y-bundling (datos-y-calidad): Build, bundling y módulos — Qué hace el bundler (Vite, esbuild, Rollup): módulos ES, tree shaking, code splitting, carga diferida y medir el peso del bundle. [términos: bundler,ci,code-splitting,inp,lcp,modulos-es,source-map,tree-shaking,typescript,useeffect] [lab: 6 preguntas] [tools: calculadora:presupuesto-js]
- core-web-vitals (rendimiento-y-seguridad): Core Web Vitals: LCP, INP y CLS — Las tres métricas de experiencia (umbrales en el percentil 75), qué las causa y cómo mejorarlas; INP sustituyó a FID en 2024. [términos: cls,core-web-vitals,crux,fid,hilo-principal,inp,latencia,lcp,lighthouse,percentil-75,re-render,tarea-larga] [lab: 6 preguntas, sims clasificar:que-metrica-empeora] [tools: calculadora:presupuesto-js]
- seguridad-web (rendimiento-y-seguridad): Seguridad web para frontend — XSS y cómo lo evitan los frameworks, CSP, CSRF y cookies SameSite, CORS, dónde guardar tokens y dependencias vulnerables. [términos: api,cors,csp,csrf,dompurify,react,sri,xss] [lab: 6 preguntas]
- accesibilidad-avanzada (rendimiento-y-seguridad): Accesibilidad avanzada: ARIA y foco — Patrones accesibles (diálogo, menú, pestañas), gestión del foco en SPA, regiones live y probar con lectores de pantalla. [términos: apg,aria,foco,lector-de-pantalla,region-live,roving-tabindex,spa,testing-library] [lab: 6 preguntas]

## Herramientas del curso (3)
comparador:comparar-tests, decision:donde-va-el-estado, calculadora:presupuesto-js

## Glosario propio (45)
actualizacion-optimista, apg, bundler, closure-obsoleta, cls, code-splitting, context, core-web-vitals, crux, csp, csrf, datos-del-servidor, dompurify, estrechamiento, fid, generico, httponly, inp, key, lcp, lighthouse, modulos-es, msw, percentil-75, props, re-render, react, reconciliacion, region-live, regresion-visual, revalidacion, roving-tabindex, samesite, source-map, spa, sri, tarea-larga, test-de-extremo-a-extremo, testing-library, tree-shaking, typescript, union-discriminada, unknown, useeffect, zod

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
