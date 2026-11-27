---
title: "RAG: recuperación híbrida + reranking, contexto corto y bien ordenado, y
  evaluación por etapas"
summary: El curso de RAG enseña a medir recuperación y generación por separado,
  combinar BM25 y embeddings, rerankear y no confiar en meter más contexto.
status: proposed
confidence: medium
date: 2026-11-26
sources:
  - lewis-2020-rag
  - anthropic-contextual-retrieval
  - liu-2024-lost-in-middle
  - ragas-2024
  - owasp-llm-top10-2025
affects:
  - module:rag
---

## Decisión

El curso `rag` se organiza alrededor de un pipeline medible: **ingesta → chunking → índice (denso + BM25) → recuperación híbrida → reranking → prompt con citas → evaluación por etapas**, y enseña a:
- Medir **recuperación** (recall@k, MRR) aparte de la **generación** (fidelidad a las fuentes, relevancia).
- Combinar búsqueda léxica y semántica y rerankear antes de mandar al modelo.
- Mandar **pocos fragmentos bien ordenados** (lo más relevante al principio o al final), no "todo lo que quepa".
- Tratar los documentos recuperados como **entrada no confiable** (inyección indirecta) y respetar permisos por documento.

## Por qué (evidencia)

- RAG original: memoria paramétrica + índice denso supera al modelo solo en QA abierta (lewis-2020-rag).
- Contexto en chunks + BM25 reduce fallos de recuperación un 49 %, y con reranking un 67 % (anthropic-contextual-retrieval).
- Información en medio de contextos largos se usa peor (liu-2024-lost-in-middle).
- Métricas sin referencia por etapa (ragas-2024).
- Inyección de prompt indirecta es el riesgo n.º 1 (owasp-llm-top10-2025).

## Límites y qué no sabemos

- Las cifras de Anthropic miden si el chunk correcto llega al top-k, no la respuesta final.
- Las métricas con LLM como juez heredan sus sesgos (hardy-2026-autoscoring): validar con muestras humanas.
