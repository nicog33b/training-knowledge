# Subtema: Ingesta y chunking [rag/ingesta-y-chunking]
Extraer texto limpio, partirlo en fragmentos (tamaño, solapamiento, por estructura) y guardar metadatos; el chunking decide más calidad que el modelo.

## Ingesta y chunking

La calidad de un RAG se decide antes de buscar: si el texto llega sucio o mal partido, ningún modelo lo arregla.

### Ingesta
- Extrae texto **limpio**: quita menús, pies de página repetidos, cabeceras; conserva **títulos**, listas y tablas (las tablas, mejor como markdown o filas con su encabezado).
- Guarda **metadatos**: fuente, URL, título, sección, fecha, idioma, **permisos** (quién puede verlo). Sirven para filtrar, citar y controlar acceso.
- Detecta **duplicados** y versiones: tres copias del mismo PDF llenan el top-k de lo mismo.

### Chunking: partir en fragmentos
- **Tamaño**: chunks pequeños (100–300 tokens) son precisos pero pierden contexto; grandes (800–1.500) conservan contexto pero diluyen el embedding y gastan más prompt. Un punto de partida habitual: **300–800 tokens** y ajustar con evals.
- **Solapamiento** (10–20 %): repite el final de un chunk al principio del siguiente para no cortar una idea por la mitad.
- **Por estructura** mejor que por número de caracteres: corta por secciones, párrafos o funciones de código, respetando títulos.
- Añade al chunk su **contexto**: título del documento y de la sección ("Política de viajes › Reembolsos: …"). Generar una frase de contexto por chunk (*contextual retrieval*) redujo un 49 % los fallos de recuperación en las pruebas de Anthropic, combinado con BM25.

### Padre-hijo
Indexa chunks **pequeños** para buscar con precisión, pero manda al modelo el **chunk padre** (la sección completa) para que tenga contexto. Combina lo mejor de ambos tamaños.

## Glosario usado
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.
- Embedding: Vector numérico que representa el significado de un texto; textos parecidos quedan cerca en ese espacio.
- Chunk: Fragmento de un documento que se indexa y se recupera como unidad en un sistema RAG.
- Chunking: Partir documentos en chunks (por tamaño, solapamiento o estructura) antes de indexarlos.
- Solapamiento: Parte del final de un chunk que se repite al inicio del siguiente para no cortar ideas.
- Metadatos: Datos sobre un documento o chunk (fuente, fecha, sección, permisos) usados para filtrar, citar y controlar acceso.
- BM25: Algoritmo clásico de búsqueda por palabras que pesa más los términos raros y penaliza documentos largos.
- Contextual retrieval: Técnica de Anthropic: añadir a cada chunk, antes de indexar, una frase de contexto generada por un LLM.
- Padre-hijo: Indexar chunks pequeños para buscar, pero enviar al modelo la sección mayor (padre) que los contiene.
- Top-k: Los k resultados mejor puntuados que devuelve una búsqueda.

## Preguntas sugeridas al alumno
- (comparar) Compara chunks de 150 tokens y de 1.200 tokens.
- (por-que) ¿Por qué conviene cortar por estructura (secciones, párrafos) y no cada N caracteres?
- (que-pasa-si) ¿Qué pasa si indexas el mismo PDF tres veces (versiones distintas)?
- (aplicar) Aplica el patrón padre-hijo a un manual con secciones largas.
- (por-que) ¿Por qué guardar los permisos como metadatos desde la ingesta?
- (error-comun) Error común: indexar el HTML de la web tal cual, con menú y pie de página.

## Herramientas del curso en este subtema
- calculadora: Dimensionar el índice y el costo por consulta — Cuántos chunks salen de tu corpus según tamaño y solapamiento, cuánta memoria ocupan los vectores y cuántos tokens manda cada consulta al modelo.
