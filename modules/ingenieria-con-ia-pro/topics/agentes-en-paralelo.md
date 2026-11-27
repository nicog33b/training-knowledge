---
title: Agentes en paralelo y subagentes
summary: Varias tareas a la vez con worktrees y entornos aislados, subagentes
  para explorar sin ensuciar el contexto y cuándo paralelizar no compensa.
order: 9
section: escala
status: done
requires: []
---

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
