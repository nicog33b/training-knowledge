# Subtema: Búsqueda híbrida: BM25 + embeddings [rag/busqueda-hibrida]
Por qué combinar búsqueda léxica y semántica, cómo fusionar rankings con RRF y qué aporta el contexto añadido a cada chunk.

## Búsqueda híbrida: BM25 + embeddings

### Dos maneras de buscar
- **Léxica (BM25)**: puntúa por **palabras compartidas**, dando más peso a las raras en la colección y penalizando documentos largos. Excelente para **códigos, nombres, siglas** y coincidencias exactas; ciega a sinónimos.
- **Semántica (densa)**: compara **embeddings**; entiende paráfrasis e idiomas, pero confunde identificadores y negaciones.
Se equivocan en casos **distintos**, así que combinarlas recupera más chunks correctos que cualquiera sola.

### Fusionar rankings: RRF
Las puntuaciones de BM25 y de coseno no están en la misma escala, así que no se suman directamente. **Reciprocal Rank Fusion** usa solo la **posición**: cada documento suma 1 / (k + posición) en cada lista (k suele ser 60). Lo que aparece alto en ambas listas sube. Es simple, robusto y no necesita calibrar pesos.

### Contexto en cada chunk
Un chunk como "El plazo es de 30 días" no dice **de qué** es el plazo. Anthropic propuso añadir a cada chunk, antes de indexarlo, una frase de **contexto** generada por un LLM ("Este fragmento es de la política de devoluciones de 2025…") tanto para los embeddings como para BM25 (*contextual retrieval*). En sus pruebas, los fallos de recuperación en el top-20 bajaron de **5,7 % a 2,9 %** (−49 %), y con reranking a **1,9 %** (−67 %). Ojo: miden si el chunk correcto llega al top-k, no la respuesta final, y cuesta una llamada al LLM por chunk al indexar (con caché de prompts, barata).

### Cuántos recuperar
Recupera **más candidatos** de los que vas a mandar (p. ej. 50–150) y deja que el **reranking** elija los mejores 5–20.

## Glosario usado
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Caché de prompts: El proveedor guarda un prefijo de prompt repetido y lo cobra mucho más barato (y más rápido) en las siguientes peticiones.
- Embedding: Vector numérico que representa el significado de un texto; textos parecidos quedan cerca en ese espacio.
- Chunk: Fragmento de un documento que se indexa y se recupera como unidad en un sistema RAG.
- Similitud coseno: Medida de cercanía entre dos vectores según el ángulo que forman: 1 = misma dirección.
- BM25: Algoritmo clásico de búsqueda por palabras que pesa más los términos raros y penaliza documentos largos.
- Búsqueda híbrida: Combinar búsqueda léxica (BM25) y semántica (embeddings) y fusionar sus rankings.
- RRF: Fusión de rankings que suma 1/(k + posición) de cada lista; no necesita escalas comparables.
- Reranking: Segunda etapa que reordena los candidatos recuperados con un modelo más preciso y caro.
- Contextual retrieval: Técnica de Anthropic: añadir a cada chunk, antes de indexar, una frase de contexto generada por un LLM.
- Top-k: Los k resultados mejor puntuados que devuelve una búsqueda.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué combinar BM25 y embeddings recupera más que cualquiera de los dos solos?
- (por-que) ¿Por qué no se suman directamente la puntuación de BM25 y la similitud coseno?
- (aplicar) Calcula con RRF (k=60): un documento está 1.º en BM25 y 3.º en densa; otro, 2.º en ambas.
- (que-pasa-si) ¿Qué aporta añadir una frase de contexto a cada chunk antes de indexar?
- (comparar) Compara recuperar 10 candidatos y mandarlos al modelo frente a recuperar 100 y rerankear a 10.
- (error-comun) Error común: «la búsqueda semántica es moderna, BM25 está obsoleto».

## Simulaciones del subtema
- clasificar: ¿Qué búsqueda acierta mejor?
