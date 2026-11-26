---
title: Transformar la consulta
summary: "Reescritura, multi-consulta, HyDE y descomposición: adaptar la
  pregunta del usuario al índice cuando las palabras no coinciden."
order: 7
section: recuperar
status: done
requires: []
---

## Transformar la consulta

Los usuarios preguntan con **sus** palabras, a menudo vagas o dependientes de la conversación ("¿y para el plan anual?"). Antes de buscar, conviene **adaptar la consulta** al índice.

### Técnicas
- **Reescritura con historial**: convierte "¿y para el plan anual?" en "precio de cancelación del plan anual". Imprescindible en chats: sin ella, la búsqueda no sabe de qué se habla.
- **Multi-consulta**: genera 3–5 variantes de la pregunta (sinónimos, otros enfoques), busca con todas y **fusiona** (RRF). Sube el recall en preguntas ambiguas.
- **Descomposición**: una pregunta compuesta ("compara la política de 2024 y 2025") se divide en subpreguntas que se buscan por separado.
- **HyDE** (*Hypothetical Document Embeddings*): el LLM escribe una **respuesta hipotética** y se busca con su embedding, que se parece más a un documento real que una pregunta corta. Útil cuando preguntas y documentos se expresan muy distinto; riesgo: si la hipótesis es errónea, sesga la búsqueda.
- **Enrutamiento**: decidir **qué índice** o fuente consultar (documentación, tickets, base de datos) según la pregunta.
- **Filtros extraídos**: sacar de la pregunta filtros de metadatos ("del último año", "producto X").

### Precio
Cada transformación es una **llamada más al LLM**: latencia y costo. Usa un modelo **rápido**, aplícala solo cuando ayude (las evals te dirán dónde) y registra la consulta transformada para depurar: muchas veces el fallo no está en la búsqueda sino en una reescritura mala.
