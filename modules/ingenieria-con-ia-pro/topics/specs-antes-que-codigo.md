---
title: Specs antes que código
summary: "Desarrollo guiado por especificaciones: requisitos, plan y tareas
  pequeñas y verificables antes de pedir código; el humano decide el qué, el
  agente propone el cómo."
order: 4
section: contexto
status: done
requires: []
---

## Specs antes que código

Pedir "haz la feature X" a un agente produce **una** interpretación razonable de X. El **desarrollo guiado por especificaciones** (*spec-driven development*) invierte el orden: primero se acuerda **qué** y **cómo se comprobará**, y luego se genera código.

### Las piezas
1. **Spec** (el qué y el porqué): problema, usuarios, comportamiento esperado, **criterios de aceptación** verificables, casos límite y lo que queda **fuera** del alcance.
2. **Plan técnico** (el cómo): componentes que se tocan, contratos y datos, riesgos, estrategia de pruebas. Lo puede **proponer** el agente; lo **revisa** un humano.
3. **Tareas** pequeñas y ordenadas, cada una con su **verificación** (qué test o comando demuestra que está hecha).
4. **Implementación** tarea a tarea, con verificación entre pasos.

### Por qué funciona
- Las ambigüedades salen **antes**, cuando corregir cuesta una frase y no una refactorización.
- Los criterios de aceptación se convierten en **tests**: el agente sabe cuándo ha terminado.
- Las tareas pequeñas producen **PR revisables**: revisar 2.000 líneas generadas de golpe no es revisar.
- La spec queda como **documentación** del porqué.

### Reparto de responsabilidades
El humano decide **qué** construir y **qué significa terminado**; el agente propone el **cómo**, que el humano acepta o corrige. Delegar también el "qué" es la forma más rápida de construir rápidamente lo que nadie pidió.

### Tamaño adecuado
No todo necesita una spec formal: un bug con reproducción clara basta con el test que falla. Usa specs para features, cambios de comportamiento y todo lo que tocará varios módulos.
