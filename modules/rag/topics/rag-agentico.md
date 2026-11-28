---
title: RAG agéntico y GraphRAG
summary: "Cuando una sola búsqueda no basta: el modelo decide qué buscar en
  varios pasos, o se navega un grafo de entidades; beneficios y costo."
order: 11
section: produccion
status: done
requires: []
---

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
