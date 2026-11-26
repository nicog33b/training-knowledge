---
title: Workflows y agentes
summary: Workflows (caminos fijos en código) frente a agentes (el modelo decide
  el siguiente paso); patrones comunes y cuándo compensa cada uno.
order: 6
section: integracion
status: done
requires: []
---

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
