---
title: Evaluar RAG por etapas
summary: Medir la recuperación (recall@k, MRR) y la generación (fidelidad,
  relevancia) por separado; conjuntos de prueba y jueces automáticos.
order: 9
section: generar-y-medir
status: done
requires: []
---

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
