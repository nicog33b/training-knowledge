# Subtema: Costos, latencia y caché de prompts [ia-en-aplicaciones/costos-latencia-y-cache]
Cómo se calcula el costo por petición, qué pesa en la latencia, el caché de prefijos y cómo elegir modelo por función.

## Costos, latencia y caché de prompts

### Costo por petición
**Costo = tokens de entrada × precio de entrada + tokens de salida × precio de salida.** La salida suele costar varias veces más que la entrada. En una conversación, **cada turno reenvía** el historial: el costo de entrada crece con cada mensaje.

### Qué pesa en la latencia
- **Tiempo hasta el primer token** (TTFT): depende del tamaño de la entrada y de la carga del proveedor.
- **Tokens de salida por segundo**: una respuesta larga tarda más; pedir respuestas **concisas** es la optimización más barata.
- **Pasos de herramientas y agentes**: cada vuelta suma una llamada completa.

### Caché de prompts
Si muchas peticiones empiezan con el **mismo prefijo** (prompt de sistema, catálogo de herramientas, documento base), el proveedor puede **cachearlo**: leer del caché cuesta una fracción (en Claude, ~0,1× el precio de entrada) y reduce latencia. Para aprovecharlo:
- Pon lo **estable al principio** y lo variable (pregunta del usuario) al final.
- No cambies el prefijo en cada petición (ni una fecha con segundos).
- Mantén el historial **append-only** (solo añadir al final).

### Modelo por función
No todo necesita el modelo más potente. Asigna un **nivel por función**: clasificar o resumir → modelo rápido y barato; razonar sobre código o planes → equilibrado; tareas difíciles y poco frecuentes → potente. Mide con evals antes de bajar de nivel.

### Topes
Pon **topes** de gasto por usuario y día, de tokens de salida y de pasos de agente. Registra tokens y costo por petición: sin medición no hay optimización.

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Prompt de sistema: Instrucciones de nivel superior que fijan rol, reglas y formato del asistente para toda la conversación.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Caché de prompts: El proveedor guarda un prefijo de prompt repetido y lo cobra mucho más barato (y más rápido) en las siguientes peticiones.
- TTFT: Time To First Token: tiempo desde que se envía la petición hasta que llega el primer token de la respuesta.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.

## Preguntas sugeridas al alumno
- (por-que) ¿Cómo se calcula el costo de una petición a un LLM?
- (que-pasa-si) ¿Qué pasa con el caché si pones la fecha y hora actual al principio del prompt de sistema?
- (comparar) Compara reducir latencia acortando la respuesta y cambiando a un modelo más rápido.
- (aplicar) Una función resume 10.000 tickets al día. ¿Qué modelo eliges?
- (por-que) ¿Por qué un historial append-only ayuda al caché?
- (error-comun) Error común: lanzar una función con IA sin registrar tokens ni costo por petición.

## Simulaciones del subtema
- predecir-observar: ¿Cuánto ahorra el caché de prompts?

## Herramientas del curso en este subtema
- calculadora: Calculadora de costo de una conversación — Cuánto cuesta una conversación con historial que crece, y cuánto ahorra el caché del prompt de sistema. Ajusta los precios a tu modelo.
