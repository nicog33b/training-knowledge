# Subtema: Transformar la consulta [rag/transformar-consultas]
Reescritura, multi-consulta, HyDE y descomposición: adaptar la pregunta del usuario al índice cuando las palabras no coinciden.

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

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.
- Embedding: Vector numérico que representa el significado de un texto; textos parecidos quedan cerca en ese espacio.
- Metadatos: Datos sobre un documento o chunk (fuente, fecha, sección, permisos) usados para filtrar, citar y controlar acceso.
- RRF: Fusión de rankings que suma 1/(k + posición) de cada lista; no necesita escalas comparables.
- Recall@k: Proporción de consultas cuyo elemento relevante aparece entre los k primeros resultados.
- HyDE: Buscar con el embedding de una respuesta hipotética escrita por el LLM en lugar del de la pregunta.
- Multi-consulta: Generar varias variantes de la consulta, buscar con todas y fusionar resultados.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué en un chat hay que reescribir la consulta antes de buscar?
- (que-pasa-si) Explica HyDE y cuándo puede salir mal.
- (comparar) Compara multi-consulta y descomposición.
- (aplicar) Pregunta: «¿qué incidentes de seguridad hubo el último trimestre en el producto Pagos?». ¿Qué transformación aplicas?
- (por-que) ¿Por qué registrar la consulta transformada?
- (error-comun) Error común: aplicar todas las transformaciones a todas las consultas.
