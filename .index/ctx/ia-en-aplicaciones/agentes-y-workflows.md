# Subtema: Workflows y agentes [ia-en-aplicaciones/agentes-y-workflows]
Workflows (caminos fijos en código) frente a agentes (el modelo decide el siguiente paso); patrones comunes y cuándo compensa cada uno.

## Workflows y agentes

"Agente" se usa para casi todo. Una distinción útil (Anthropic, *Building effective agents*): ambos son **sistemas agénticos**, pero
- un **workflow** orquesta LLM y herramientas por **caminos predefinidos en código**;
- un **agente** deja que **el modelo decida** el siguiente paso y qué herramienta usar, en bucle, hasta terminar.

### Patrones de workflow
- **Encadenar prompts**: paso 1 → validación → paso 2 (p. ej. esquema → borrador → revisión).
- **Enrutar**: clasificar la entrada y mandarla al prompt o modelo adecuado (preguntas fáciles a un modelo barato).
- **Paralelizar**: varias llamadas a la vez y combinar (secciones, o votación entre varias respuestas).
- **Orquestador-trabajadores**: un modelo divide la tarea y reparte subtareas.
- **Evaluador-optimizador**: uno genera, otro critica contra criterios, se itera.

### Cuándo un agente
Cuando los pasos **no se pueden prever** (depurar un error, investigar en un repositorio) y hay forma de **verificar** el progreso (tests, resultados de herramientas). El precio: más **costo**, más **latencia**, errores que se **acumulan** y comportamiento más difícil de depurar.

### Regla de oro
Empieza por **la solución más simple** que funcione: una llamada bien diseñada con buen contexto. Añade un workflow cuando una sola llamada no basta, y un agente solo cuando el workflow se queda corto **y las evals muestran mejora**. Da al agente **herramientas bien documentadas**, un **criterio de parada** y **topes** de pasos y gasto.

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Repositorio: Carpeta de un proyecto bajo control de versiones (normalmente Git) con todo su historial de cambios.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Workflow: Sistema donde LLM y herramientas siguen caminos predefinidos en el código (encadenar, enrutar, paralelizar…).
- Sistema agéntico: Término paraguas para workflows y agentes: cualquier sistema que combina LLM, herramientas y pasos.
- Orquestador-trabajadores: Patrón donde un modelo divide una tarea en subtareas, las reparte a otros y combina los resultados.
- Evaluador-optimizador: Patrón donde un modelo genera y otro critica contra criterios, iterando hasta cumplirlos.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.

## Preguntas sugeridas al alumno
- (comparar) Compara un workflow y un agente.
- (por-que) ¿Por qué empezar por la solución más simple antes de construir un agente?
- (que-pasa-si) ¿Qué pasa si un agente no tiene criterio de parada ni tope de pasos?
- (aplicar) Un chat de soporte recibe preguntas fáciles y difíciles. ¿Qué patrón usarías?
- (por-que) ¿Por qué el patrón evaluador-optimizador funciona mejor con criterios claros?
- (error-comun) Error común: «más agentes en paralelo = mejor resultado».

## Herramientas del curso en este subtema
- decision: ¿Una llamada, un workflow o un agente? — Asistente para elegir la arquitectura más simple que resuelve tu caso, siguiendo la regla de empezar por lo simple y añadir complejidad solo si mejora algo medible.
