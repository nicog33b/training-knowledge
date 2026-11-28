# Subtema: Embeddings y similitud [rag/embeddings-y-similitud]
Cómo un modelo convierte texto en vectores, qué mide la similitud coseno, por qué funciona para significado y dónde falla (nombres, códigos, negaciones).

## Embeddings y similitud

Un **modelo de embeddings** convierte un texto en un **vector** de cientos o miles de números. Está entrenado para que textos con **significado parecido** queden **cerca** en ese espacio: "¿cómo cancelo mi suscripción?" y "dar de baja el plan" acaban próximos aunque no compartan palabras.

### Medir cercanía
- **Similitud coseno**: el coseno del ángulo entre dos vectores (1 = misma dirección). Es la más común.
- **Producto escalar** y **distancia euclídea**: equivalentes si los vectores están **normalizados**. Usa la métrica para la que se entrenó el modelo.
La búsqueda semántica = calcular el embedding de la **consulta** y buscar los chunks con vectores más cercanos (**búsqueda densa**).

### Dónde brillan y dónde fallan
- Bien: sinónimos, paráfrasis, preguntas en otro idioma (con modelos multilingües).
- Mal: **identificadores exactos** (códigos de error, SKUs, nombres propios raros), **negaciones** ("sin gluten" cerca de "con gluten"), números y fechas. Por eso se combina con búsqueda **léxica** (BM25).

### Elegir y usar el modelo
- El mismo modelo para **indexar** y para **consultar**. Si cambias de modelo, hay que **reindexar todo**.
- Algunos modelos distinguen **consulta** y **documento** (prefijos o tareas distintas): respétalo.
- Más dimensiones no siempre es mejor: cuestan memoria y latencia. Compara modelos con **tu** conjunto de evaluación, no solo con rankings públicos.
- Un embedding resume un chunk entero en un vector: chunks demasiado largos **diluyen** el significado.

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Embedding: Vector numérico que representa el significado de un texto; textos parecidos quedan cerca en ese espacio.
- Chunk: Fragmento de un documento que se indexa y se recupera como unidad en un sistema RAG.
- Similitud coseno: Medida de cercanía entre dos vectores según el ángulo que forman: 1 = misma dirección.
- Búsqueda densa: Búsqueda por cercanía de embeddings: encuentra textos de significado parecido aunque no compartan palabras.
- BM25: Algoritmo clásico de búsqueda por palabras que pesa más los términos raros y penaliza documentos largos.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué la búsqueda por embeddings encuentra «dar de baja el plan» al buscar «cancelar suscripción»?
- (que-pasa-si) ¿Qué pasa si buscas el código de error «E-4012» solo con embeddings?
- (error-comun) Cambiaste de modelo de embeddings y los resultados son basura. ¿Por qué?
- (comparar) Compara similitud coseno y producto escalar.
- (por-que) ¿Por qué un chunk muy largo da peores resultados en búsqueda densa?
- (aplicar) ¿Cómo eliges un modelo de embeddings para documentación técnica en español?
