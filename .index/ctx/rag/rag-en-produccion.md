# Subtema: Operar RAG: frescura, permisos, costo y seguridad [rag/rag-en-produccion]
Reindexar cuando cambian los documentos, permisos por documento, caché, costos y la inyección indirecta que llega por los documentos.

## Operar RAG: frescura, permisos, costo y seguridad

### Frescura
Los documentos **cambian**: reindexa de forma **incremental** (detecta altas, cambios y bajas por hash o fecha), borra los chunks de documentos eliminados y guarda la **fecha** como metadato para filtrar o preferir lo reciente. Un RAG que responde con la política del año pasado es peor que ninguno.

### Permisos
Aplica los permisos **en la recuperación**: el índice guarda quién puede ver cada documento y la búsqueda filtra por el usuario que pregunta. Si filtras después de generar, el modelo ya **leyó** datos ajenos. Sincroniza los cambios de permisos igual que los de contenido.

### Costo y latencia
- Embeddings al indexar (una vez por chunk) y por consulta; reranking por consulta; tokens del prompt por cada fragmento enviado.
- **Caché** de consultas frecuentes y de embeddings de consultas repetidas; caché de prompts para la parte fija.
- Ajusta **k** y el número de candidatos a rerankear con las evals delante.

### Seguridad
- **Inyección indirecta**: un documento indexado puede contener instrucciones ("ignora lo anterior…"). Trátalo como **dato** (delimitadores), no des al modelo herramientas con efecto en el flujo de RAG y valida la salida.
- **Envenenamiento**: quien puede escribir en las fuentes (una wiki abierta) puede influir en las respuestas. Controla qué fuentes se indexan.
- **Registro**: guarda pregunta, consulta transformada, chunks recuperados y respuesta, para depurar y auditar (respetando la privacidad).

### Observabilidad
Monitoriza el porcentaje de "no lo sé", el feedback negativo y las preguntas sin buenos resultados: son tu lista de **documentos que faltan**.

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Caché de prompts: El proveedor guarda un prefijo de prompt repetido y lo cobra mucho más barato (y más rápido) en las siguientes peticiones.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.
- Inyección de prompt: Ataque en el que un texto (del usuario o escondido en datos) hace que el modelo siga instrucciones no autorizadas.
- Delimitadores: Marcas (etiquetas XML, comillas triples) que separan en el prompt los datos de las instrucciones.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.
- Embedding: Vector numérico que representa el significado de un texto; textos parecidos quedan cerca en ese espacio.
- Chunk: Fragmento de un documento que se indexa y se recupera como unidad en un sistema RAG.
- Metadatos: Datos sobre un documento o chunk (fuente, fecha, sección, permisos) usados para filtrar, citar y controlar acceso.
- Reranking: Segunda etapa que reordena los candidatos recuperados con un modelo más preciso y caro.
- Envenenamiento: Introducir contenido malicioso en las fuentes que un sistema indexa para manipular sus respuestas.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué los permisos deben aplicarse en la recuperación y no después de generar?
- (que-pasa-si) ¿Qué pasa si borras un documento de la wiki pero no del índice?
- (aplicar) Diseña la reindexación de 50.000 documentos que cambian a diario.
- (comparar) Compara inyección indirecta y envenenamiento en RAG.
- (por-que) ¿Por qué monitorizar las respuestas «no lo sé»?
- (error-comun) Error común: dar herramientas de escritura al modelo dentro del flujo de RAG.

## Herramientas del curso en este subtema
- checklist: Checklist de diagnóstico de un RAG que responde mal — Recorre las etapas en orden: casi siempre el fallo está antes de lo que parece.
