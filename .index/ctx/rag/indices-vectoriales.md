# Subtema: Índices vectoriales y búsqueda aproximada [rag/indices-vectoriales]
Búsqueda exacta frente a ANN (HNSW, IVF), el compromiso recall-latencia-memoria y los filtros por metadatos.

## Índices vectoriales y búsqueda aproximada

Comparar la consulta con **todos** los vectores (búsqueda exacta, *k-NN*) es simple y perfecta, pero su costo crece con el número de chunks. Con miles de chunks va bien; con millones, se usan índices de **búsqueda aproximada** (**ANN**, *Approximate Nearest Neighbors*): mucho más rápidos a cambio de **perder algún resultado**.

### Dos familias
- **HNSW** (*Hierarchical Navigable Small World*): un **grafo** por capas; se salta de vecino en vecino hacia la consulta. Muy buen recall y latencia; consume **memoria**. Parámetros: conexiones por nodo y tamaño de búsqueda (más = mejor recall, más lento).
- **IVF** (*inverted file*): agrupa los vectores en **clústeres** y solo busca en los más cercanos a la consulta. Menos memoria; el recall depende de cuántos clústeres se revisan. Se combina con **cuantización** (comprimir vectores) para ahorrar aún más.

### El triángulo
Siempre eliges entre **recall**, **latencia** y **memoria/costo**. Mide el recall del índice aproximado frente a la búsqueda exacta en una muestra: si pierde los chunks correctos, el modelo nunca los verá.

### Filtros por metadatos
Casi siempre hay que filtrar: idioma, producto, fecha, **permisos**. Hay dos formas: filtrar **antes** (solo buscar entre lo permitido; correcto pero puede ser lento) o **después** (buscar y descartar; rápido pero puede quedarte sin resultados si el filtro es estricto). Para permisos, filtra siempre de forma que **nunca** se devuelva algo no autorizado.

### ¿Base de datos vectorial dedicada?
Muchas bases de datos generalistas (PostgreSQL con extensiones, buscadores como Elasticsearch/OpenSearch) ya hacen búsqueda vectorial e híbrida. Una base dedicada compensa a gran escala; a menudo basta con lo que ya operas.

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Chunk: Fragmento de un documento que se indexa y se recupera como unidad en un sistema RAG.
- Metadatos: Datos sobre un documento o chunk (fuente, fecha, sección, permisos) usados para filtrar, citar y controlar acceso.
- Búsqueda híbrida: Combinar búsqueda léxica (BM25) y semántica (embeddings) y fusionar sus rankings.
- ANN: Búsqueda de vecinos más cercanos aproximada: mucho más rápida que la exacta a cambio de perder algunos resultados.
- HNSW: Hierarchical Navigable Small World: índice ANN basado en un grafo por capas; buen recall y latencia, más memoria.
- IVF: Inverted File: índice ANN que agrupa vectores en clústeres y solo busca en los más cercanos a la consulta.
- Cuantización: Comprimir vectores (menos bits por número) para ahorrar memoria y acelerar, perdiendo algo de precisión.
- Recall@k: Proporción de consultas cuyo elemento relevante aparece entre los k primeros resultados.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué no se usa siempre búsqueda exacta (comparar con todos los vectores)?
- (comparar) Compara HNSW e IVF.
- (que-pasa-si) ¿Qué pasa si aplicas un filtro estricto de permisos DESPUÉS de una búsqueda ANN con k=10?
- (aplicar) ¿Cómo compruebas si tu índice aproximado está perdiendo resultados importantes?
- (por-que) ¿Por qué quizá no necesitas una base de datos vectorial nueva?
- (error-comun) Error común: subir los parámetros del índice al máximo «para tener el mejor recall».

## Herramientas del curso en este subtema
- calculadora: Dimensionar el índice y el costo por consulta — Cuántos chunks salen de tu corpus según tamaño y solapamiento, cuánta memoria ocupan los vectores y cuántos tokens manda cada consulta al modelo.
