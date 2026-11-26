# Catálogo del curso RAG · Generación aumentada por recuperación [rag]
Cómo construir, medir y operar sistemas RAG: embeddings, chunking, índices vectoriales, búsqueda híbrida, reranking, prompts con citas, evaluación por etapas y seguridad.
Subtemas (id: título — resumen). Pide uno con leer_subtema solo si la pregunta lo necesita.
- que-es-rag (1 · Qué es RAG y cuándo usarlo): Qué es RAG y cuándo conviene — Recuperar antes de generar: qué problema resuelve, el pipeline completo y cuándo elegir RAG, fine-tuning o simplemente contexto largo.
- embeddings-y-similitud (1 · Qué es RAG y cuándo usarlo): Embeddings y similitud — Cómo un modelo convierte texto en vectores, qué mide la similitud coseno, por qué funciona para significado y dónde falla (nombres, códigos, negaciones).
- ingesta-y-chunking (2 · Preparar e indexar los documentos): Ingesta y chunking — Extraer texto limpio, partirlo en fragmentos (tamaño, solapamiento, por estructura) y guardar metadatos; el chunking decide más calidad que el modelo.
- indices-vectoriales (2 · Preparar e indexar los documentos): Índices vectoriales y búsqueda aproximada — Búsqueda exacta frente a ANN (HNSW, IVF), el compromiso recall-latencia-memoria y los filtros por metadatos.
- busqueda-hibrida (3 · Recuperar lo relevante): Búsqueda híbrida: BM25 + embeddings — Por qué combinar búsqueda léxica y semántica, cómo fusionar rankings con RRF y qué aporta el contexto añadido a cada chunk.
- reranking (3 · Recuperar lo relevante): Reranking con cross-encoders — Recuperar muchos candidatos baratos y reordenarlos con un modelo que lee consulta y fragmento juntos; costo, latencia y ganancia.
- transformar-consultas (3 · Recuperar lo relevante): Transformar la consulta — Reescritura, multi-consulta, HyDE y descomposición: adaptar la pregunta del usuario al índice cuando las palabras no coinciden.
- prompt-con-citas (4 · Generar con fuentes y medir): Construir el prompt: orden, citas y «no lo sé» — Cuántos fragmentos mandar, en qué orden (lost in the middle), cómo pedir citas verificables y cuándo responder que no hay información.
- evaluacion-rag (4 · Generar con fuentes y medir): Evaluar RAG por etapas — Medir la recuperación (recall@k, MRR) y la generación (fidelidad, relevancia) por separado; conjuntos de prueba y jueces automáticos.
- rag-en-produccion (5 · RAG en producción): Operar RAG: frescura, permisos, costo y seguridad — Reindexar cuando cambian los documentos, permisos por documento, caché, costos y la inyección indirecta que llega por los documentos.
- rag-agentico (5 · RAG en producción): RAG agéntico y GraphRAG — Cuando una sola búsqueda no basta: el modelo decide qué buscar en varios pasos, o se navega un grafo de entidades; beneficios y costo.
