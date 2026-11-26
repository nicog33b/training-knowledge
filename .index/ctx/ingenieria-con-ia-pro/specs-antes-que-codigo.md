# Subtema: Specs antes que código [ingenieria-con-ia-pro/specs-antes-que-codigo]
Desarrollo guiado por especificaciones: requisitos, plan y tareas pequeñas y verificables antes de pedir código; el humano decide el qué, el agente propone el cómo.

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

## Glosario usado
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Spec-driven development: Acordar primero la especificación (qué, por qué, criterios de aceptación) y el plan, y generar código después, tarea a tarea.
- Criterios de aceptación: Condiciones verificables que debe cumplir un cambio para considerarse terminado; idealmente se convierten en tests.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué escribir la spec antes de pedir código a un agente?
- (comparar) Compara spec, plan técnico y tareas.
- (aplicar) Escribe criterios de aceptación para «permitir exportar el informe a CSV».
- (que-pasa-si) ¿Qué pasa si delegas al agente también el «qué» construir?
- (por-que) ¿Por qué tareas pequeñas en vez de un gran cambio?
- (error-comun) Error común: escribir una spec formal para arreglar un typo.

## Herramientas del curso en este subtema
- plantilla: Generador de spec para un agente — Rellena el qué, el porqué y cómo se comprobará; obtienes una especificación lista para pegar al agente (o en un issue) antes de pedir código.
