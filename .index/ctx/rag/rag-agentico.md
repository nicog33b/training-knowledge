# Subtema: RAG agéntico y GraphRAG [rag/rag-agentico]
Cuando una sola búsqueda no basta: el modelo decide qué buscar en varios pasos, o se navega un grafo de entidades; beneficios y costo.

## RAG agéntico y GraphRAG

El RAG clásico hace **una** búsqueda y responde. Falla con preguntas que necesitan **varios pasos** ("¿qué clientes afectados por el incidente de marzo tienen contrato premium?") o una visión **global** del corpus ("¿cuáles son los temas recurrentes en las quejas?").

### RAG agéntico
El modelo usa la búsqueda como una **herramienta**, dentro de un bucle de agente:
- Decide **qué** buscar, mira los resultados y decide si buscar **otra vez** con otra consulta, en otra fuente o con filtros.
- Puede combinar herramientas: búsqueda en documentos + consulta a una base de datos + calculadora.
- Termina cuando tiene suficiente evidencia (o un **tope** de pasos).
Ventajas: preguntas compuestas, fuentes heterogéneas. Costos: más **latencia**, más **tokens**, más difícil de evaluar y de depurar. Úsalo cuando las evals muestren que la búsqueda única se queda corta.

### GraphRAG
Construye a partir de los documentos un **grafo de conocimiento**: entidades (personas, productos, sistemas) y relaciones, a menudo extraídas con un LLM, y resúmenes por **comunidades** de entidades relacionadas.
- Útil para preguntas de **relaciones** (multi-salto) y de **resumen global**.
- Costo alto de construcción (muchas llamadas al LLM) y de mantenimiento cuando cambian los documentos; la extracción puede equivocarse.

### Criterio
Antes de un agente o un grafo: ¿has mejorado **chunking, híbrida, reranking y prompt**? Muchas fallas de RAG "simple" son de esas etapas. Añade complejidad cuando un **conjunto de preguntas multi-paso** en tu eval lo justifique.

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.
- Chunking: Partir documentos en chunks (por tamaño, solapamiento o estructura) antes de indexarlos.
- Búsqueda híbrida: Combinar búsqueda léxica (BM25) y semántica (embeddings) y fusionar sus rankings.
- Reranking: Segunda etapa que reordena los candidatos recuperados con un modelo más preciso y caro.
- RAG agéntico: RAG en el que un agente decide en varios pasos qué buscar, dónde y cuándo tiene suficiente evidencia.
- GraphRAG: RAG que construye y recorre un grafo de entidades y relaciones extraídas de los documentos.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué un RAG de una sola búsqueda falla con preguntas multi-paso?
- (comparar) Compara RAG agéntico y GraphRAG.
- (que-pasa-si) ¿Qué pasa si un agente de búsqueda no tiene tope de pasos?
- (aplicar) Te piden «¿cuáles son los temas más repetidos en las 20.000 quejas del año?». ¿Qué enfoque?
- (por-que) ¿Por qué mejorar primero chunking, híbrida y reranking antes de pasar a un agente?
- (error-comun) Error común: construir GraphRAG para responder preguntas de un FAQ.
