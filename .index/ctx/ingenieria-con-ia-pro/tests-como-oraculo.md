# Subtema: Tests como oráculo: TDD con agentes [ingenieria-con-ia-pro/tests-como-oraculo]
Los tests le dicen al agente cuándo terminó: escribirlos antes, que fallen, implementar hasta verde y no dejar que el agente toque el oráculo.

## Tests como oráculo: TDD con agentes

Un agente necesita saber **cuándo ha terminado**. Sin una señal objetiva, termina cuando el código *parece* correcto. Los tests son ese **oráculo**.

### El flujo
1. Escribe (o pide escribir) los **tests primero**, a partir de los criterios de aceptación. Revisa que prueban **comportamiento**, no detalles internos.
2. Ejecútalos y confirma que **fallan** por la razón esperada. Un test que pasa sin implementación no prueba nada.
3. **Fija** los tests: dile explícitamente al agente que no los modifique (y revísalo en el diff).
4. Pide la implementación hasta que estén en **verde**, ejecutándolos en cada iteración.
5. Refactoriza con la red de seguridad puesta.

### Por qué funciona tan bien con agentes
- El bucle del agente (actuar → observar → corregir) se vuelve **convergente**: cada ejecución de tests es feedback preciso.
- Reduce la ambigüedad: el test **es** la especificación ejecutable.
- Es lo que hace posible delegar tareas largas con confianza.

### Trampas
- **Modificar el oráculo**: el agente "arregla" el test en vez del código, o lo marca como omitido. Revisa siempre los cambios en archivos de test.
- **Casos especiales**: código que detecta el caso del test y devuelve lo esperado (*teaching to the test*). Añade casos variados y propiedades.
- **Tests débiles** generados por la IA: comprueban que "no lanza error" o repiten la implementación. Pide casos límite y valores concretos.
- **Mocks excesivos**: todo verde y nada funciona integrado. Combina con tests de integración.

### Más allá de los tests
Tipado estricto, linters, validaciones de esquema y **evals** (para salidas de IA) son también oráculos. Cuantos más tengas automatizados, más puedes delegar.

## Glosario usado
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.
- Criterios de aceptación: Condiciones verificables que debe cumplir un cambio para considerarse terminado; idealmente se convierten en tests.
- Oráculo: Mecanismo que decide si un resultado es correcto (tests, tipado, validaciones); le dice al agente cuándo ha terminado.
- TDD: Escribir primero un test que falla, después el código mínimo para que pase, y luego refactorizar.
- Teaching to the test: Hacer que el código pase los tests concretos (casos especiales) sin implementar el comportamiento general.
- Linter: Herramienta que analiza el código sin ejecutarlo para detectar errores y malas prácticas de estilo.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué confirmar que el test falla antes de implementar?
- (que-pasa-si) ¿Qué pasa si no fijas los tests y el agente no consigue el verde?
- (comparar) Compara un test que comprueba «no lanza error» con uno que comprueba valores concretos.
- (aplicar) Te piden arreglar un bug reportado. ¿Cómo usas al agente con TDD?
- (por-que) ¿Por qué los tests hacen convergente el bucle del agente?
- (error-comun) Error común: llenar todo de mocks para que los tests del agente pasen rápido.

## Herramientas del curso en este subtema
- checklist: Checklist de revisión de un PR generado por IA — Lo que hay que mirar especialmente cuando el código lo escribió un agente.
