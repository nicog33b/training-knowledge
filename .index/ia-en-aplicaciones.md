# IA dentro de aplicaciones · conceptos complejos [ia-en-aplicaciones] (topic)
Los conceptos que hay que entender para meter un LLM en un producto: tokens y contexto, muestreo, salidas estructuradas, herramientas, agentes, caché, costos, evals, seguridad y MCP.

Archivos: modules/ia-en-aplicaciones/{module.yaml,glossary.yaml,topics/*.md,lab/*.yaml,tools/*.yaml}
Contexto para IA por subtema: .index/ctx/ia-en-aplicaciones/<subtema>.md (+ _catalogo.md)

## Subtemas
- tokens-y-contexto (fundamentos): Tokens y ventana de contexto — Qué es un token, por qué todo se cobra y se limita en tokens, qué cabe en la ventana de contexto y por qué más contexto no siempre es mejor (context rot). [términos: context-rot,latencia,llm,prompt-de-sistema,rag,token,ventana-de-contexto] [lab: 6 preguntas] [tools: calculadora:costo-conversacion]
- muestreo-y-determinismo (fundamentos): Muestreo: temperatura, top-p y determinismo — Cómo elige el modelo el siguiente token, qué cambian temperatura y top-p, por qué la misma entrada da salidas distintas y cómo diseñar para eso. [términos: eval,muestreo,temperatura,token,top-p] [lab: 6 preguntas, sims clasificar:temperatura-por-tarea]
- prompts-de-sistema (fundamentos): Prompt de sistema e instrucciones — Roles (system, user, assistant), cómo escribir instrucciones a la altura justa, ejemplos (few-shot) y separar datos de instrucciones. [términos: delimitadores,eval,few-shot,inyeccion-de-prompt,pr,prompt,prompt-de-sistema,repositorio] [lab: 6 preguntas]
- salidas-estructuradas (integracion): Salidas estructuradas (JSON Schema) — Pedir JSON válido contra un esquema, validarlo siempre en el código y qué hacer cuando falla; por qué el formato estructurado no garantiza contenido correcto. [términos: alucinacion,decodificador,json,json-schema,salida-estructurada,token] [lab: 6 preguntas]
- uso-de-herramientas (integracion): Uso de herramientas (tool use / function calling) — El modelo no ejecuta nada: propone llamadas a funciones que tu código ejecuta. Diseño de herramientas, bucle de llamadas y errores típicos. [términos: inyeccion-de-prompt,json,minimo-privilegio,uso-de-herramientas] [lab: 6 preguntas] [tools: decision:que-patron-usar]
- agentes-y-workflows (integracion): Workflows y agentes — Workflows (caminos fijos en código) frente a agentes (el modelo decide el siguiente paso); patrones comunes y cuándo compensa cada uno. [términos: agente,eval,evaluador-optimizador,latencia,llm,orquestador-trabajadores,prompt,repositorio,sistema-agentico,workflow] [lab: 6 preguntas] [tools: decision:que-patron-usar]
- mcp (integracion): MCP: Model Context Protocol — Estándar abierto para conectar asistentes con herramientas y datos mediante servidores; qué expone un servidor (herramientas, recursos, prompts) y sus riesgos. [términos: agente,http,mcp,minimo-privilegio,prompt,token] [lab: 6 preguntas]
- costos-latencia-y-cache (produccion): Costos, latencia y caché de prompts — Cómo se calcula el costo por petición, qué pesa en la latencia, el caché de prefijos y cómo elegir modelo por función. [términos: agente,cache-de-prompts,eval,latencia,prompt-de-sistema,token,ttft] [lab: 6 preguntas, sims predecir-observar:compensa-cache] [tools: calculadora:costo-conversacion]
- streaming-y-ux (produccion): Streaming y experiencia de usuario con IA — Mostrar la respuesta mientras se genera, comunicar incertidumbre, permitir corregir y las pautas de interacción humano-IA de Microsoft. [términos: api,eval,json,streaming,token] [lab: 6 preguntas] [tools: checklist:lanzar-feature-ia]
- evals (produccion): Evals: medir una app con LLM — Conjuntos de prueba, métricas deterministas y LLM como juez, regresiones al cambiar prompt o modelo; por qué sin evals no hay ingeniería. [términos: ci,eval,llm,llm-como-juez,prompt,rubrica] [lab: 6 preguntas] [tools: checklist:lanzar-feature-ia]
- seguridad-y-guardrails (produccion): Seguridad: inyección de prompt y guardarraíles — Inyección directa e indirecta (OWASP LLM01), fuga de datos, mínimo privilegio en herramientas y confirmación humana para acciones con efecto. [términos: agencia-excesiva,delimitadores,guardarrail,inyeccion-de-prompt,minimo-privilegio,owasp-top-10-para-llm,prompt,prompt-de-sistema,rag] [lab: 6 preguntas, sims clasificar:inyeccion-o-no] [tools: checklist:lanzar-feature-ia]

## Herramientas del curso (3)
calculadora:costo-conversacion, checklist:lanzar-feature-ia, decision:que-patron-usar

## Glosario propio (32)
agencia-excesiva, agente, alucinacion, cache-de-prompts, context-rot, decodificador, delimitadores, eval, evaluador-optimizador, few-shot, guardarrail, inyeccion-de-prompt, json-schema, llm-como-juez, mcp, minimo-privilegio, muestreo, orquestador-trabajadores, owasp-top-10-para-llm, prompt-de-sistema, rag, rubrica, salida-estructurada, sistema-agentico, streaming, temperatura, token, top-p, ttft, uso-de-herramientas, ventana-de-contexto, workflow

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
