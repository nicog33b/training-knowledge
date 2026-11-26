---
title: Qué es RAG y cuándo conviene
summary: "Recuperar antes de generar: qué problema resuelve, el pipeline
  completo y cuándo elegir RAG, fine-tuning o simplemente contexto largo."
order: 1
section: fundamentos
status: done
requires: []
---

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
