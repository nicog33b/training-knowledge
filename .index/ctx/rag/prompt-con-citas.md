# Subtema: Construir el prompt: orden, citas y «no lo sé» [rag/prompt-con-citas]
Cuántos fragmentos mandar, en qué orden (lost in the middle), cómo pedir citas verificables y cuándo responder que no hay información.

## Construir el prompt: orden, citas y «no lo sé»

### Cuántos fragmentos
Más fragmentos suben la probabilidad de incluir el correcto, pero también el **ruido**, el costo y la confusión. Tras un buen reranking, **5–10** chunks suelen bastar; mide con evals en vez de "meter 50 por si acaso".

### Orden
Los modelos usan peor la información **en medio** de un contexto largo (Liu et al., *Lost in the Middle*, 2024: rendimiento en forma de **U** según la posición). Pon lo **más relevante al principio** (o al final), no enterrado en medio.

### Formato de los fragmentos
- Cada fragmento con un **identificador** y su **fuente** (título, sección, fecha): `<doc id="3" fuente="Política de viajes §4" fecha="2025-02">…</doc>`.
- Delimitadores claros e instrucción de que el contenido es **dato**, no instrucciones (inyección indirecta).

### Citas verificables
- Pide citar el **id** del fragmento en cada afirmación ("[3]") y, si hace falta, la **frase literal** que lo respalda.
- **Verifica en código** que los ids citados existen y que la cita aparece en el fragmento. Una cita inventada es peor que ninguna.
- En la interfaz, haz las citas **clicables** hacia el documento.

### Permitir «no lo sé»
Instruye explícitamente: si los fragmentos no contienen la respuesta, **dilo** y sugiere dónde buscar, en vez de completar con conocimiento general. Pon en la eval preguntas **sin respuesta** en los documentos para comprobarlo: un RAG que nunca dice "no lo sé" está inventando.

## Glosario usado
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.
- Inyección de prompt: Ataque en el que un texto (del usuario o escondido en datos) hace que el modelo siga instrucciones no autorizadas.
- Delimitadores: Marcas (etiquetas XML, comillas triples) que separan en el prompt los datos de las instrucciones.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.
- Chunk: Fragmento de un documento que se indexa y se recupera como unidad en un sistema RAG.
- Reranking: Segunda etapa que reordena los candidatos recuperados con un modelo más preciso y caro.
- Lost in the middle: Efecto por el que los modelos usan peor la información situada en medio de un contexto largo.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el orden de los fragmentos en el prompt importa?
- (que-pasa-si) ¿Qué pasa si no instruyes al modelo para decir «no lo sé»?
- (aplicar) Diseña el formato de los fragmentos para obtener citas verificables.
- (comparar) Compara mandar 5 y 30 fragmentos al modelo.
- (por-que) ¿Por qué hay que verificar en código las citas que da el modelo?
- (error-comun) Error común: poner los fragmentos recuperados como si fueran instrucciones del sistema.

## Herramientas del curso en este subtema
- calculadora: Dimensionar el índice y el costo por consulta — Cuántos chunks salen de tu corpus según tamaño y solapamiento, cuánta memoria ocupan los vectores y cuántos tokens manda cada consulta al modelo.
