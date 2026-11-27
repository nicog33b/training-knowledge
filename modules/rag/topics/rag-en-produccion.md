---
title: "Operar RAG: frescura, permisos, costo y seguridad"
summary: Reindexar cuando cambian los documentos, permisos por documento, caché,
  costos y la inyección indirecta que llega por los documentos.
order: 10
section: produccion
status: done
requires: []
---

## Operar RAG: frescura, permisos, costo y seguridad

### Frescura
Los documentos **cambian**: reindexa de forma **incremental** (detecta altas, cambios y bajas por hash o fecha), borra los chunks de documentos eliminados y guarda la **fecha** como metadato para filtrar o preferir lo reciente. Un RAG que responde con la política del año pasado es peor que ninguno.

### Permisos
Aplica los permisos **en la recuperación**: el índice guarda quién puede ver cada documento y la búsqueda filtra por el usuario que pregunta. Si filtras después de generar, el modelo ya **leyó** datos ajenos. Sincroniza los cambios de permisos igual que los de contenido.

### Costo y latencia
- Embeddings al indexar (una vez por chunk) y por consulta; reranking por consulta; tokens del prompt por cada fragmento enviado.
- **Caché** de consultas frecuentes y de embeddings de consultas repetidas; caché de prompts para la parte fija.
- Ajusta **k** y el número de candidatos a rerankear con las evals delante.

### Seguridad
- **Inyección indirecta**: un documento indexado puede contener instrucciones ("ignora lo anterior…"). Trátalo como **dato** (delimitadores), no des al modelo herramientas con efecto en el flujo de RAG y valida la salida.
- **Envenenamiento**: quien puede escribir en las fuentes (una wiki abierta) puede influir en las respuestas. Controla qué fuentes se indexan.
- **Registro**: guarda pregunta, consulta transformada, chunks recuperados y respuesta, para depurar y auditar (respetando la privacidad).

### Observabilidad
Monitoriza el porcentaje de "no lo sé", el feedback negativo y las preguntas sin buenos resultados: son tu lista de **documentos que faltan**.
