# Subtema: Qué es RAG y cuándo conviene [rag/que-es-rag]
Recuperar antes de generar: qué problema resuelve, el pipeline completo y cuándo elegir RAG, fine-tuning o simplemente contexto largo.

## Qué es RAG y cuándo conviene

Un LLM solo sabe lo que aprendió al entrenarse (hasta su fecha de corte) y lo que le pones en el contexto. **RAG** (*Retrieval-Augmented Generation*, Lewis et al., 2020) añade un paso previo: **recuperar** de tus documentos los fragmentos relevantes para la pregunta y dárselos al modelo para que **genere** la respuesta apoyándose en ellos.

### El pipeline
1. **Ingesta**: extraer texto de PDFs, webs, tickets… y partirlo en **chunks**.
2. **Indexar**: calcular **embeddings** (y/o un índice léxico) de cada chunk y guardarlos con **metadatos**.
3. **Recuperar**: con la pregunta, buscar los chunks más relevantes (búsqueda **híbrida** + **reranking**).
4. **Generar**: prompt con los fragmentos, instrucciones de **citar** y de decir "no lo sé" si no están.
5. **Evaluar**: medir recuperación y generación **por separado**.

### Qué resuelve
- Conocimiento **privado** o **reciente** (políticas internas, documentación de tu producto).
- **Citas**: la respuesta puede señalar de dónde sale, y el usuario verificar.
- **Permisos**: cada usuario recupera solo lo que puede ver.
- Menos **alucinación** sobre datos concretos (no cero: el modelo puede ignorar o malinterpretar el contexto).

### RAG, fine-tuning o contexto largo
- **RAG**: el conocimiento **cambia** o es grande; necesitas citas y permisos.
- **Fine-tuning**: quieres cambiar **comportamiento, estilo o formato**, no añadir hechos que cambian. Enseñar hechos por fine-tuning es caro y difícil de actualizar.
- **Contexto largo**: pocos documentos, estables y pequeños: mételos enteros (con caché de prompts) y ahórrate el pipeline.
Muchas veces la respuesta es **combinar**: RAG para los hechos y un buen prompt (o fine-tuning) para el formato.

## Glosario usado
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Alucinación: Contenido que el modelo genera con seguridad aparente pero que es falso o no está respaldado por las fuentes.
- Caché de prompts: El proveedor guarda un prefijo de prompt repetido y lo cobra mucho más barato (y más rápido) en las siguientes peticiones.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.
- Embedding: Vector numérico que representa el significado de un texto; textos parecidos quedan cerca en ese espacio.
- Chunk: Fragmento de un documento que se indexa y se recupera como unidad en un sistema RAG.
- Metadatos: Datos sobre un documento o chunk (fuente, fecha, sección, permisos) usados para filtrar, citar y controlar acceso.
- Búsqueda híbrida: Combinar búsqueda léxica (BM25) y semántica (embeddings) y fusionar sus rankings.
- Reranking: Segunda etapa que reordena los candidatos recuperados con un modelo más preciso y caro.
- Fine-tuning: Seguir entrenando un modelo con datos propios para cambiar su comportamiento, estilo o formato.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué RAG reduce las alucinaciones sobre datos concretos, pero no las elimina?
- (comparar) Compara RAG y fine-tuning para que un asistente conozca la política de vacaciones de la empresa.
- (aplicar) Tienes 3 documentos estables de 20 páginas. ¿Necesitas un pipeline de RAG?
- (que-pasa-si) ¿Qué pasa si el corpus tiene información desactualizada mezclada con la vigente?
- (por-que) ¿Por qué las citas son una de las mayores ventajas de RAG?
- (error-comun) Error común: «uso RAG, así que no necesito evaluar».

## Herramientas del curso en este subtema
- decision: ¿RAG, fine-tuning o contexto largo? — Asistente para decidir cómo darle conocimiento a un LLM según cuánto cambia, cuánto ocupa y qué necesitas (citas, permisos, estilo).
