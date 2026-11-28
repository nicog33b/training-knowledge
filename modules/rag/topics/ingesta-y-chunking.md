---
title: Ingesta y chunking
summary: Extraer texto limpio, partirlo en fragmentos (tamaño, solapamiento, por
  estructura) y guardar metadatos; el chunking decide más calidad que el modelo.
order: 3
section: indexar
status: done
requires: []
---

## Ingesta y chunking

La calidad de un RAG se decide antes de buscar: si el texto llega sucio o mal partido, ningún modelo lo arregla.

### Ingesta
- Extrae texto **limpio**: quita menús, pies de página repetidos, cabeceras; conserva **títulos**, listas y tablas (las tablas, mejor como markdown o filas con su encabezado).
- Guarda **metadatos**: fuente, URL, título, sección, fecha, idioma, **permisos** (quién puede verlo). Sirven para filtrar, citar y controlar acceso.
- Detecta **duplicados** y versiones: tres copias del mismo PDF llenan el top-k de lo mismo.

### Chunking: partir en fragmentos
- **Tamaño**: chunks pequeños (100–300 tokens) son precisos pero pierden contexto; grandes (800–1.500) conservan contexto pero diluyen el embedding y gastan más prompt. Un punto de partida habitual: **300–800 tokens** y ajustar con evals.
- **Solapamiento** (10–20 %): repite el final de un chunk al principio del siguiente para no cortar una idea por la mitad.
- **Por estructura** mejor que por número de caracteres: corta por secciones, párrafos o funciones de código, respetando títulos.
- Añade al chunk su **contexto**: título del documento y de la sección ("Política de viajes › Reembolsos: …"). Generar una frase de contexto por chunk (*contextual retrieval*) redujo un 49 % los fallos de recuperación en las pruebas de Anthropic, combinado con BM25.

### Padre-hijo
Indexa chunks **pequeños** para buscar con precisión, pero manda al modelo el **chunk padre** (la sección completa) para que tenga contexto. Combina lo mejor de ambos tamaños.
