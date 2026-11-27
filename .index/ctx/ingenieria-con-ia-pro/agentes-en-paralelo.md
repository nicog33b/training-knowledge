# Subtema: Agentes en paralelo y subagentes [ingenieria-con-ia-pro/agentes-en-paralelo]
Varias tareas a la vez con worktrees y entornos aislados, subagentes para explorar sin ensuciar el contexto y cuándo paralelizar no compensa.

## Agentes en paralelo y subagentes

Un agente trabajando solo deja al ingeniero esperando. Varios agentes en paralelo multiplican el trabajo… y la **coordinación**.

### Aislar el trabajo
- **Worktrees de git**: varias copias de trabajo del mismo repositorio en carpetas distintas, cada una en su rama. Cada agente trabaja en la suya sin pisar a los demás.
- **Entornos aislados** (contenedores o sesiones en la nube): cada tarea con sus dependencias y sin acceso a lo que no necesita.
- **Una tarea, una rama, un PR**: lo que se paraleliza debe poder integrarse por separado.

### Subagentes
Un **subagente** es un agente que otro lanza para una subtarea con **su propio contexto**: explorar el código, investigar una librería, revisar un diff. Devuelve solo la **conclusión**, así el contexto del agente principal no se llena de lecturas. Útiles para exploraciones amplias y revisiones independientes.

### Cuándo compensa paralelizar
- Tareas **independientes** (distintos módulos, distintos bugs) con verificación automática propia.
- Exploraciones o investigaciones que solo devuelven un informe.
- **Varias soluciones** a un mismo problema difícil para elegir la mejor.

### Cuándo no
- Tareas que tocan los **mismos archivos**: conflictos de integración que cuestan más que lo ganado.
- Cuando el cuello de botella es la **revisión humana**: más PR en paralelo = más cola de revisión.
- Sin verificación automática: no puedes supervisar a varios agentes leyendo cada línea.

### Coordinación
Un registro de tareas compartido (quién hace qué, estado, dependencias), ramas con nombres claros y un humano que **integra**. El paralelismo útil está limitado por tu capacidad de revisar y decidir.

## Glosario usado
- Repositorio: Carpeta de un proyecto bajo control de versiones (normalmente Git) con todo su historial de cambios.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Worktree: Copia de trabajo adicional de un repositorio git en otra carpeta y rama, que permite trabajar en paralelo sin interferir.
- Subagente: Agente lanzado por otro para una subtarea con su propio contexto; devuelve solo la conclusión.
- Sandbox: Entorno restringido (contenedor, máquina aislada, red limitada) donde ejecutar código o agentes para contener daños.

## Preguntas sugeridas al alumno
- (por-que) ¿Para qué sirven los worktrees al trabajar con varios agentes?
- (comparar) Compara un subagente con abrir otra sesión de agente.
- (que-pasa-si) ¿Qué pasa si lanzas 5 agentes que tocan los mismos archivos?
- (aplicar) ¿Cuándo compensa lanzar varias soluciones en paralelo al mismo problema?
- (por-que) ¿Por qué la revisión humana limita el paralelismo útil?
- (error-comun) Error común: dar a todos los agentes paralelos acceso a la rama principal.

## Herramientas del curso en este subtema
- calculadora: ¿Cuántos agentes en paralelo puede absorber tu equipo? — Compara los PR que generan los agentes con la capacidad de revisión del equipo: el paralelismo útil lo limita la revisión.
