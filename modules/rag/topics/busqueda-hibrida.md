---
title: "Búsqueda híbrida: BM25 + embeddings"
summary: Por qué combinar búsqueda léxica y semántica, cómo fusionar rankings
  con RRF y qué aporta el contexto añadido a cada chunk.
order: 5
section: recuperar
status: done
requires: []
---

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
