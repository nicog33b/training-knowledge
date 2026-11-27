# Subtema: Evaluar RAG por etapas [rag/evaluacion-rag]
Medir la recuperación (recall@k, MRR) y la generación (fidelidad, relevancia) por separado; conjuntos de prueba y jueces automáticos.

## Evaluar RAG por etapas

Una respuesta mala puede venir de **dos sitios**: no se recuperó el fragmento correcto, o se recuperó y el modelo lo usó mal. Si solo mides la respuesta final, no sabes qué arreglar. Mide **por etapas**.

### Recuperación
Necesitas preguntas con sus **fragmentos relevantes** marcados (aunque sean 50).
- **Recall@k**: ¿qué proporción de preguntas tiene el fragmento correcto entre los k primeros? La métrica clave: si no está en el contexto, el modelo no puede usarlo.
- **MRR** (*Mean Reciprocal Rank*): media de 1/posición del primer fragmento correcto; premia que aparezca **arriba**.
- **Precisión@k**: cuánto ruido acompaña.

### Generación
- **Fidelidad** (*faithfulness*, groundedness): ¿cada afirmación está respaldada por los fragmentos? Detecta alucinaciones.
- **Relevancia de la respuesta**: ¿responde lo que se preguntó?
- **Citas correctas**: ¿los ids citados respaldan la frase?
- **Rechazo correcto**: en preguntas sin respuesta, ¿dice que no la sabe?
Frameworks como **Ragas** (Es et al., 2024) proponen métricas **sin respuestas de referencia** usando un LLM como juez. Son útiles, pero heredan los sesgos del juez: valídalas con una **muestra corregida por personas**.

### Cómo montarlo
1. 50–100 preguntas reales + casos difíciles + preguntas sin respuesta.
2. Marca fragmentos relevantes (puedes ayudarte de un LLM y revisar).
3. Ejecuta en **CI** con cada cambio de chunking, modelo de embeddings, reranker o prompt.
4. Mira **qué casos** cambian, no solo la media.

## Glosario usado
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- CI: Integración continua: cada cambio se construye y se prueba automáticamente en un servidor antes de integrarlo.
- Alucinación: Contenido que el modelo genera con seguridad aparente pero que es falso o no está respaldado por las fuentes.
- LLM como juez: Usar un modelo para puntuar salidas de otro contra una rúbrica; útil pero con sesgos que hay que validar con humanos.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.
- Embedding: Vector numérico que representa el significado de un texto; textos parecidos quedan cerca en ese espacio.
- Chunking: Partir documentos en chunks (por tamaño, solapamiento o estructura) antes de indexarlos.
- Recall@k: Proporción de consultas cuyo elemento relevante aparece entre los k primeros resultados.
- MRR: Media de 1/posición del primer resultado relevante; premia que aparezca arriba.
- Precisión@k: Proporción de los k resultados recuperados que son relevantes.
- Reranking: Segunda etapa que reordena los candidatos recuperados con un modelo más preciso y caro.
- Fidelidad: Grado en que cada afirmación de la respuesta está respaldada por los fragmentos recuperados.
- Ragas: Framework de evaluación de RAG con métricas sin referencia (fidelidad, relevancia) basadas en LLM como juez.
- Top-k: Los k resultados mejor puntuados que devuelve una búsqueda.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué evaluar la recuperación por separado de la respuesta final?
- (comparar) Compara recall@k y MRR.
- (aplicar) Una respuesta tiene fidelidad baja pero recall@10 alto. ¿Dónde está el problema?
- (por-que) ¿Por qué incluir preguntas SIN respuesta en el conjunto de evaluación?
- (que-pasa-si) ¿Qué pasa si confías ciegamente en las métricas de Ragas sin revisarlas?
- (error-comun) Error común: evaluar con 5 preguntas escritas por el propio equipo.

## Simulaciones del subtema
- predecir-observar: ¿Dónde está el fallo?

## Herramientas del curso en este subtema
- checklist: Checklist de diagnóstico de un RAG que responde mal — Recorre las etapas en orden: casi siempre el fallo está antes de lo que parece.
