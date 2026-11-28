---
title: Reranking con cross-encoders
summary: Recuperar muchos candidatos baratos y reordenarlos con un modelo que
  lee consulta y fragmento juntos; costo, latencia y ganancia.
order: 6
section: recuperar
status: done
requires: []
---

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
