# Subtema: Productividad con IA: lo que se ha medido [ingenieria-con-ia-pro/productividad-medida]
Los resultados que hay que conocer: Copilot 55,8 % más rápido en una tarea nueva, METR 19 % más lento en repos maduros, DORA 2025 (la IA amplifica). Cómo medir en tu equipo.

## Productividad con IA: lo que se ha medido

Antes de cambiar cómo trabaja un equipo, conviene saber qué se ha **medido** de verdad, porque los resultados dependen muchísimo del contexto.

### Tres resultados que hay que conocer
- **Copilot, ensayo controlado (Peng et al., 2023)**: 95 programadores implementaron un servidor HTTP en JavaScript; con Copilot terminaron un **55,8 % más rápido** (71 frente a 161 minutos). Tarea **nueva, acotada y bien especificada**.
- **METR (2025)**: 16 desarrolladores **expertos** trabajando en **sus propios repositorios maduros** (246 tareas reales de ~2 h). Con IA permitida tardaron un **19 % más**. Esperaban ir un 24 % más rápido y, después, seguían **creyendo** que la IA les había acelerado un 20 %.
- **DORA 2025** (encuesta a ~5.000 profesionales): ~**90 %** usa IA; la adopción se asocia a más **throughput** de entrega pero sigue afectando a la **estabilidad**. La IA es un **amplificador**: los equipos con arquitectura desacoplada y feedback rápido ganan; los acoplados y lentos, poco o nada.

### Qué se deduce
1. La ganancia es **grande en tareas nuevas y bien definidas** y puede ser **negativa** donde el experto ya conoce el código y el contexto implícito pesa mucho.
2. La **sensación** de ir más rápido **no es una medida**: en METR fue incluso de signo contrario.
3. El cuello de botella se mueve: escribir código es más barato; **revisar, integrar y verificar** se vuelve lo caro.

### Cómo medir en tu equipo
- Métricas de flujo y estabilidad (**DORA**: frecuencia de despliegue, tiempo de entrega, tasa de fallos, tiempo de recuperación) antes y después.
- **Comparaciones controladas** pequeñas: tareas similares con y sin agente, tiempo real (no estimado) y defectos posteriores.
- Calidad: retrabajo, bugs escapados, tamaño de los PR y tiempo de revisión.

## Glosario usado
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- Repositorio: Carpeta de un proyecto bajo control de versiones (normalmente Git) con todo su historial de cambios.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- DORA: Programa de investigación (Google) y sus métricas de entrega: frecuencia de despliegue, tiempo de entrega, tasa de fallos y tiempo de recuperación.
- Throughput: Cantidad de trabajo entregado por unidad de tiempo (p. ej. cambios desplegados por semana).
- Ensayo controlado aleatorizado: Experimento que asigna al azar quién recibe el tratamiento (p. ej. usar IA) para medir su efecto causal.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el ensayo de Copilot (55,8 % más rápido) y el de METR (19 % más lento) no se contradicen?
- (que-pasa-si) ¿Qué pasa si mides la productividad con IA preguntando al equipo si se siente más rápido?
- (aplicar) Según DORA 2025, ¿qué equipos aprovechan más la IA?
- (comparar) Compara cómo cambia el cuello de botella al adoptar agentes.
- (por-que) ¿Por qué la adopción de IA puede subir el throughput y bajar la estabilidad a la vez?
- (error-comun) Error común: extrapolar «55 % más rápido» a la productividad de todo el equipo.

## Herramientas del curso en este subtema
- calculadora: ¿Cuántos agentes en paralelo puede absorber tu equipo? — Compara los PR que generan los agentes con la capacidad de revisión del equipo: el paralelismo útil lo limita la revisión.
