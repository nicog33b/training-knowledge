# Subtema: Explorar → planificar → implementar → verificar [ingenieria-con-ia-pro/explorar-planificar-implementar-verificar]
El ciclo que usan los equipos con agentes: entender antes de tocar, plan revisable, cambios pequeños y verificación automática en cada paso.

## Explorar → planificar → implementar → verificar

El flujo que mejor funciona con agentes de código es un ciclo con **puntos de control humanos** donde el error es barato.

### 1. Explorar
Pide al agente que **lea y explique** las partes relevantes **sin tocar nada**: dónde vive la lógica, qué patrones usa el repo, qué tests existen. Detectas malentendidos antes de que se conviertan en código. En exploraciones grandes, delega a **subagentes** para no llenar el contexto principal.

### 2. Planificar
Pide un **plan** concreto: archivos a cambiar, enfoque, riesgos y cómo se verificará. **Revísalo**: es el momento de mayor palanca, corregir un plan cuesta minutos. Para problemas difíciles, pide alternativas y sus compromisos.

### 3. Implementar
En **pasos pequeños**, cada uno compilable y probado. Pide que siga las convenciones del repo y que no amplíe el alcance. Si se desvía, **interrumpe** pronto y corrige el rumbo en vez de dejar que acumule cambios.

### 4. Verificar
Tests, tipado, linter y **validaciones del proyecto** en cada paso, ejecutados por el agente (que lea la salida) y otra vez en **CI**. Para interfaces, verificación visual (capturas) o tests de extremo a extremo. "Debería funcionar" no es verificación.

### 5. Integrar
**Commits** pequeños con mensajes que expliquen el porqué, **PR** revisado por una persona, y actualización de la documentación y del registro de tareas en la misma sesión.

### Antipatrón
"Implementa todo y avísame": sin exploración ni plan, el agente produce un cambio grande basado en suposiciones, que hay que revisar entero y que a menudo se tira.

## Glosario usado
- Repositorio: Carpeta de un proyecto bajo control de versiones (normalmente Git) con todo su historial de cambios.
- CI: Integración continua: cada cambio se construye y se prueba automáticamente en un servidor antes de integrarlo.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Agente de código: LLM en un bucle con herramientas sobre un repositorio: lee, busca, edita archivos y ejecuta comandos hasta cumplir una tarea.
- Subagente: Agente lanzado por otro para una subtarea con su propio contexto; devuelve solo la conclusión.
- Linter: Herramienta que analiza el código sin ejecutarlo para detectar errores y malas prácticas de estilo.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el momento de mayor palanca es revisar el plan?
- (comparar) Compara pedir «implementa la feature» con el ciclo explorar-planificar-implementar-verificar.
- (aplicar) En la fase de exploración, ¿qué le pides al agente?
- (que-pasa-si) ¿Qué pasa si dejas que el agente siga cuando ves que se desvía del plan?
- (por-que) ¿Por qué «debería funcionar» no es verificación?
- (error-comun) Error común: integrar los cambios del agente en un único commit enorme al final.

## Simulaciones del subtema
- clasificar: ¿En qué fase estás?

## Herramientas del curso en este subtema
- plantilla: Generador de spec para un agente — Rellena el qué, el porqué y cómo se comprobará; obtienes una especificación lista para pegar al agente (o en un issue) antes de pedir código.
