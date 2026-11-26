# Subtema: Streaming y experiencia de usuario con IA [ia-en-aplicaciones/streaming-y-ux]
Mostrar la respuesta mientras se genera, comunicar incertidumbre, permitir corregir y las pautas de interacción humano-IA de Microsoft.

## Streaming y experiencia de usuario con IA

### Streaming
Con **streaming** la API envía tokens a medida que se generan. La respuesta total tarda lo mismo, pero el usuario **empieza a leer en cientos de milisegundos** en vez de esperar varios segundos ante un spinner. Detalles: renderiza markdown de forma incremental, permite **detener** la generación y no muestres JSON a medio construir.

### Diseñar para un sistema que se equivoca
Las **pautas de interacción humano-IA de Microsoft** (Amershi et al., 2019: 18 pautas en 4 momentos) siguen siendo una buena checklist:
- **Al inicio**: deja claro **qué puede hacer** y **qué tan bien** lo hace. No prometas magia.
- **Durante**: muestra información relevante al contexto, en el momento justo, sin interrumpir.
- **Cuando se equivoca**: facilita **descartar**, **corregir** y **deshacer**; explica por qué hizo lo que hizo.
- **Con el tiempo**: aprende de las correcciones, pide **feedback granular** y **avisa de cambios** de comportamiento.

### Patrones concretos
- **Citas y fuentes** clicables cuando la respuesta se basa en documentos.
- Estados claros: pensando, buscando, usando herramienta X.
- **Edición** antes de enviar acciones (el borrador del correo, no el correo enviado).
- Feedback 👍/👎 con motivo opcional, que alimente tus **evals**.
- Indicar el **costo** o el uso cuando el usuario paga por él.

### Evitar la sobreconfianza
Un texto fluido parece correcto. Para decisiones importantes, muestra la **evidencia** y pide al usuario que la revise; no ocultes la incertidumbre detrás de un tono seguro.

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- JSON: Formato de texto para datos estructurados (objetos, listas, números, cadenas) que entienden casi todos los lenguajes.
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Streaming: Recibir la respuesta en trozos mientras se genera, en lugar de esperar a que termine.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el streaming mejora la experiencia aunque la respuesta tarde lo mismo?
- (aplicar) Según las pautas de Microsoft, ¿qué debe hacer la app cuando la IA se equivoca?
- (comparar) Compara mostrar «Pensando…» con mostrar «Buscando en 3 documentos…».
- (que-pasa-si) ¿Qué pasa si una app con IA responde siempre con tono muy seguro?
- (por-que) ¿Por qué el feedback 👍/👎 debería alimentar las evals?
- (error-comun) Error común: ejecutar directamente la acción que propone la IA para «ahorrar un clic».

## Herramientas del curso en este subtema
- checklist: Checklist para lanzar una feature con IA — Lo mínimo que debería estar resuelto antes de abrir a usuarios una función con un LLM.
