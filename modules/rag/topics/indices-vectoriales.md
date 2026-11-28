---
title: Índices vectoriales y búsqueda aproximada
summary: Búsqueda exacta frente a ANN (HNSW, IVF), el compromiso
  recall-latencia-memoria y los filtros por metadatos.
order: 4
section: indexar
status: done
requires: []
---

## Índices vectoriales y búsqueda aproximada

Comparar la consulta con **todos** los vectores (búsqueda exacta, *k-NN*) es simple y perfecta, pero su costo crece con el número de chunks. Con miles de chunks va bien; con millones, se usan índices de **búsqueda aproximada** (**ANN**, *Approximate Nearest Neighbors*): mucho más rápidos a cambio de **perder algún resultado**.

### Dos familias
- **HNSW** (*Hierarchical Navigable Small World*): un **grafo** por capas; se salta de vecino en vecino hacia la consulta. Muy buen recall y latencia; consume **memoria**. Parámetros: conexiones por nodo y tamaño de búsqueda (más = mejor recall, más lento).
- **IVF** (*inverted file*): agrupa los vectores en **clústeres** y solo busca en los más cercanos a la consulta. Menos memoria; el recall depende de cuántos clústeres se revisan. Se combina con **cuantización** (comprimir vectores) para ahorrar aún más.

### El triángulo
Siempre eliges entre **recall**, **latencia** y **memoria/costo**. Mide el recall del índice aproximado frente a la búsqueda exacta en una muestra: si pierde los chunks correctos, el modelo nunca los verá.

### Filtros por metadatos
Casi siempre hay que filtrar: idioma, producto, fecha, **permisos**. Hay dos formas: filtrar **antes** (solo buscar entre lo permitido; correcto pero puede ser lento) o **después** (buscar y descartar; rápido pero puede quedarte sin resultados si el filtro es estricto). Para permisos, filtra siempre de forma que **nunca** se devuelva algo no autorizado.

### ¿Base de datos vectorial dedicada?
Muchas bases de datos generalistas (PostgreSQL con extensiones, buscadores como Elasticsearch/OpenSearch) ya hacen búsqueda vectorial e híbrida. Una base dedicada compensa a gran escala; a menudo basta con lo que ya operas.
