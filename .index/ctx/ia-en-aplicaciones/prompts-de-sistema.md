# Subtema: Prompt de sistema e instrucciones [ia-en-aplicaciones/prompts-de-sistema]
Roles (system, user, assistant), cómo escribir instrucciones a la altura justa, ejemplos (few-shot) y separar datos de instrucciones.

## Prompt de sistema e instrucciones

Las APIs de chat separan **roles**: el **prompt de sistema** fija quién es el asistente, sus reglas y su formato; los mensajes **user** y **assistant** forman la conversación. El sistema pesa más que un mensaje cualquiera, pero **no es una barrera de seguridad**: un texto malicioso puede intentar saltárselo.

### Instrucciones a la altura justa
- Ni reglas rígidas para cada caso (frágiles) ni vaguedades ("sé útil"). Explica el **objetivo**, el **público**, las **restricciones** y el **formato** de salida, y por qué importan.
- Ordena el prompt en bloques con etiquetas claras (contexto, tarea, formato, ejemplos). Los modelos siguen mejor las instrucciones **estructuradas** que un párrafo largo.
- Di lo que **sí** hay que hacer, no solo lo prohibido.

### Ejemplos (few-shot)
Uno a tres **ejemplos** de entrada→salida enseñan formato y tono mejor que una descripción. Que sean **variados**: si todos se parecen, el modelo copia el detalle irrelevante.

### Separar datos de instrucciones
Todo texto que venga del usuario, de una web o de un documento es **dato**, no instrucción. Envuélvelo en delimitadores (p. ej. etiquetas XML) y dile al modelo que lo trate como contenido a analizar. Reduce errores y es la primera línea —no la única— contra la **inyección de prompt**.

### Versiona tus prompts
Un prompt es **código**: guárdalo en el repositorio, revísalo en PR y mide cada cambio con evals antes de desplegarlo.

## Glosario usado
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Repositorio: Carpeta de un proyecto bajo control de versiones (normalmente Git) con todo su historial de cambios.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Prompt de sistema: Instrucciones de nivel superior que fijan rol, reglas y formato del asistente para toda la conversación.
- Few-shot: Incluir unos pocos ejemplos de entrada→salida en el prompt para enseñar formato y criterio.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.
- Inyección de prompt: Ataque en el que un texto (del usuario o escondido en datos) hace que el modelo siga instrucciones no autorizadas.
- Delimitadores: Marcas (etiquetas XML, comillas triples) que separan en el prompt los datos de las instrucciones.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el prompt de sistema no es una barrera de seguridad?
- (comparar) Compara un prompt con reglas para cada caso y uno que explica objetivo y criterios.
- (que-pasa-si) ¿Qué pasa si tus 3 ejemplos few-shot son casi iguales?
- (aplicar) Vas a resumir correos de clientes. ¿Cómo metes el correo en el prompt?
- (por-que) ¿Por qué hay que versionar los prompts como código?
- (error-comun) Error común: escribir solo prohibiciones («no hagas X, no digas Y»).
