# RAG · Generación aumentada por recuperación [rag] (topic)
Cómo construir, medir y operar sistemas RAG: embeddings, chunking, índices vectoriales, búsqueda híbrida, reranking, prompts con citas, evaluación por etapas y seguridad.

Archivos: modules/rag/{module.yaml,glossary.yaml,topics/*.md,lab/*.yaml,tools/*.yaml}
Contexto para IA por subtema: .index/ctx/rag/<subtema>.md (+ _catalogo.md)

## Subtemas
- que-es-rag (fundamentos): Qué es RAG y cuándo conviene — Recuperar antes de generar: qué problema resuelve, el pipeline completo y cuándo elegir RAG, fine-tuning o simplemente contexto largo. [términos: alucinacion,busqueda-hibrida,cache-de-prompts,chunk,embedding,fine-tuning,llm,metadatos,prompt,rag,reranking] [lab: 6 preguntas] [tools: decision:rag-o-no]
- embeddings-y-similitud (fundamentos): Embeddings y similitud — Cómo un modelo convierte texto en vectores, qué mide la similitud coseno, por qué funciona para significado y dónde falla (nombres, códigos, negaciones). [términos: bm25,busqueda-densa,chunk,embedding,latencia,similitud-coseno] [lab: 6 preguntas]
- ingesta-y-chunking (indexar): Ingesta y chunking — Extraer texto limpio, partirlo en fragmentos (tamaño, solapamiento, por estructura) y guardar metadatos; el chunking decide más calidad que el modelo. [términos: bm25,chunk,chunking,contextual-retrieval,embedding,eval,metadatos,padre-hijo,prompt,rag,solapamiento,token,top-k] [lab: 6 preguntas] [tools: calculadora:dimensionar-indice]
- indices-vectoriales (indexar): Índices vectoriales y búsqueda aproximada — Búsqueda exacta frente a ANN (HNSW, IVF), el compromiso recall-latencia-memoria y los filtros por metadatos. [términos: ann,busqueda-hibrida,chunk,cuantizacion,hnsw,ivf,latencia,metadatos,recall-k] [lab: 6 preguntas] [tools: calculadora:dimensionar-indice]
- busqueda-hibrida (recuperar): Búsqueda híbrida: BM25 + embeddings — Por qué combinar búsqueda léxica y semántica, cómo fusionar rankings con RRF y qué aporta el contexto añadido a cada chunk. [términos: bm25,busqueda-hibrida,cache-de-prompts,chunk,contextual-retrieval,embedding,llm,reranking,rrf,similitud-coseno,top-k] [lab: 6 preguntas, sims clasificar:lexica-o-semantica]
- reranking (recuperar): Reranking con cross-encoders — Recuperar muchos candidatos baratos y reordenarlos con un modelo que lee consulta y fragmento juntos; costo, latencia y ganancia. [términos: bi-encoder,busqueda-hibrida,contextual-retrieval,cross-encoder,embedding,latencia,llm,prompt,recall-k,reranking] [lab: 6 preguntas]
- transformar-consultas (recuperar): Transformar la consulta — Reescritura, multi-consulta, HyDE y descomposición: adaptar la pregunta del usuario al índice cuando las palabras no coinciden. [términos: embedding,eval,hyde,latencia,llm,metadatos,multi-consulta,recall-k,rrf] [lab: 6 preguntas]
- prompt-con-citas (generar-y-medir): Construir el prompt: orden, citas y «no lo sé» — Cuántos fragmentos mandar, en qué orden (lost in the middle), cómo pedir citas verificables y cuándo responder que no hay información. [términos: chunk,delimitadores,eval,inyeccion-de-prompt,lost-in-the-middle,prompt,rag,reranking] [lab: 6 preguntas] [tools: calculadora:dimensionar-indice]
- evaluacion-rag (generar-y-medir): Evaluar RAG por etapas — Medir la recuperación (recall@k, MRR) y la generación (fidelidad, relevancia) por separado; conjuntos de prueba y jueces automáticos. [términos: alucinacion,chunking,ci,embedding,fidelidad,llm,llm-como-juez,mrr,precision-k,prompt,rag,ragas,recall-k,reranking,top-k] [lab: 6 preguntas, sims predecir-observar:donde-falla-el-rag] [tools: checklist:diagnostico-rag]
- rag-en-produccion (produccion): Operar RAG: frescura, permisos, costo y seguridad — Reindexar cuando cambian los documentos, permisos por documento, caché, costos y la inyección indirecta que llega por los documentos. [términos: cache-de-prompts,chunk,delimitadores,embedding,envenenamiento,eval,inyeccion-de-prompt,latencia,metadatos,prompt,rag,reranking,token] [lab: 6 preguntas] [tools: checklist:diagnostico-rag]
- rag-agentico (produccion): RAG agéntico y GraphRAG — Cuando una sola búsqueda no basta: el modelo decide qué buscar en varios pasos, o se navega un grafo de entidades; beneficios y costo. [términos: agente,busqueda-hibrida,chunking,eval,graphrag,latencia,llm,prompt,rag,rag-agentico,reranking,token] [lab: 6 preguntas]

## Herramientas del curso (3)
checklist:diagnostico-rag, calculadora:dimensionar-indice, decision:rag-o-no

## Glosario propio (32)
ann, bi-encoder, bm25, busqueda-densa, busqueda-hibrida, chunk, chunking, contextual-retrieval, cross-encoder, cuantizacion, embedding, envenenamiento, fidelidad, fine-tuning, graphrag, hnsw, hyde, ivf, lost-in-the-middle, metadatos, mrr, multi-consulta, padre-hijo, precision-k, rag-agentico, ragas, recall-k, reranking, rrf, similitud-coseno, solapamiento, top-k

## Decisiones de diseño aplicables (resumen en .index/research.md; razonamiento en research/decisions/<id>.md)
- accesibilidad-con-evidencia [proposed·medium]: Menú de accesibilidad: solo opciones con evidencia o derecho de acceso
- color-con-funcion-y-contraste [proposed·medium]: Color para señalar y contrastar, no por psicología del color
- descartar-tecnicas-de-baja-evidencia [proposed·high]: No basar el producto en releer, subrayar, estilos de aprendizaje ni gamificación de puntos
- diseno-de-contenido-sin-ruido [proposed·medium]: Explicaciones segmentadas, coherentes y sin detalles decorativos
- ejemplos-resueltos-simulacion-y-problema-previo [proposed·medium]: Ejemplos resueltos con andamiaje que se retira, comparación de casos y simulaciones
- estrategias-generativas-autoexplicacion-y-ensenar [proposed·medium]: Cierre de subtema con autoexplicación, mapa propio y "explícalo a otro"
- feedback-explicativo-y-calibracion [proposed·medium]: Feedback que explica y medición de calibración, no de "sensación"
- herramientas-por-curso-con-constructores [proposed·low]: Herramientas propias de cada curso creadas con constructores comunes
- intercalar-conceptos-confundibles [proposed·medium]: Intercalar solo conceptos parecidos y confundibles
- practica-de-recuperacion [proposed·high]: Cada subtema termina en práctica de recuperación con feedback
- preguntas-sugeridas-y-contexto-minimo [proposed·medium]: Preguntas sugeridas por subtema y contexto mínimo para la IA
- proveedores-llm-y-contador-de-gasto [proposed·medium]: Proveedores LLM intercambiables por función y contador de gasto por modelo
- rag-hibrido-con-reranking-y-evals [proposed·medium]: RAG: recuperación híbrida + reranking, contexto corto y bien ordenado, y evaluación por etapas
- repeticion-espaciada-fsrs [proposed·high]: Repaso espaciado con planificador FSRS y relearning sucesivo
- simulaciones-por-primitivas-y-recetas [proposed·medium]: Simulaciones como primitivas fijas + recetas declarativas por subtema
- sin-tipografias-milagro [proposed·high]: Nada de fuentes difíciles ni fuentes para dislexia como truco de aprendizaje
- tipografia-y-medidas-de-lectura [proposed·medium]: Tipografía de lectura: tamaño generoso, línea de ~65 caracteres y ajustes por persona
- vistas-de-estudio-generadas [proposed·medium]: Vistas de estudio generadas del mismo contenido: esquema, mapa, tarjetas, huecos, explícalo y pregunta previa
