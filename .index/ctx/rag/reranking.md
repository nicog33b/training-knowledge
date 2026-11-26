# Subtema: Reranking con cross-encoders [rag/reranking]
Recuperar muchos candidatos baratos y reordenarlos con un modelo que lee consulta y fragmento juntos; costo, latencia y ganancia.

## Reranking con cross-encoders

### Dos tipos de modelo
- **Bi-encoder** (el modelo de embeddings): codifica consulta y documento **por separado**. Rápido: los vectores de los documentos se calculan una vez. Pero no ve cómo interactúan las palabras de ambos.
- **Cross-encoder** (reranker): lee **consulta y documento juntos** y devuelve una puntuación de relevancia. Mucho más **preciso**… y mucho más **caro**: no se puede precalcular, hay que pasar cada par por el modelo.

### Recuperar barato, ordenar caro
El patrón estándar es en **dos etapas**:
1. **Recuperación** amplia y barata (híbrida): 50–150 candidatos con buen **recall**.
2. **Reranking**: el cross-encoder puntúa esos candidatos y te quedas con los **5–20 mejores**: buena **precisión** en lo que llega al prompt.

### Por qué compensa
- Mejora la **precisión** de lo que ve el modelo: menos ruido en el contexto, mejores respuestas y prompts más cortos (más baratos).
- En las pruebas de Anthropic, añadir reranking a la búsqueda contextual bajó los fallos del 2,9 % al 1,9 %.

### Costos y alternativas
- Suma **latencia** (decenas a cientos de ms según candidatos y modelo) y costo por consulta. Ajusta cuántos candidatos rerankeas.
- Alternativa: un **LLM como reranker** (le pides ordenar o puntuar): flexible, pero más caro y lento.
- El reranker **no recupera** lo que la primera etapa no trajo: si el recall de la etapa 1 es malo, reranking no lo arregla. Mide ambas.

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Embedding: Vector numérico que representa el significado de un texto; textos parecidos quedan cerca en ese espacio.
- Búsqueda híbrida: Combinar búsqueda léxica (BM25) y semántica (embeddings) y fusionar sus rankings.
- Recall@k: Proporción de consultas cuyo elemento relevante aparece entre los k primeros resultados.
- Reranking: Segunda etapa que reordena los candidatos recuperados con un modelo más preciso y caro.
- Cross-encoder: Modelo que lee consulta y documento juntos para puntuar su relevancia; preciso pero no precalculable.
- Bi-encoder: Modelo que codifica consulta y documento por separado (embeddings); rápido porque los documentos se precalculan.
- Contextual retrieval: Técnica de Anthropic: añadir a cada chunk, antes de indexar, una frase de contexto generada por un LLM.

## Preguntas sugeridas al alumno
- (comparar) Compara bi-encoder y cross-encoder.
- (por-que) ¿Por qué el reranking va después de una recuperación amplia y no en su lugar?
- (que-pasa-si) ¿Qué pasa si el fragmento correcto no está entre los 100 candidatos?
- (aplicar) El reranker añade 300 ms y tu objetivo de latencia es estricto. ¿Qué ajustas?
- (por-que) ¿Por qué el reranking puede abaratar las respuestas aunque cueste por consulta?
- (error-comun) Error común: usar un LLM grande como reranker de 200 candidatos en cada consulta.
