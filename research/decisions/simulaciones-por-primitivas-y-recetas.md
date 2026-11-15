---
title: Simulaciones como primitivas fijas + recetas declarativas por subtema
summary: "Pocas primitivas de simulación programadas una vez (predecir-observar, clasificar...) que ejecutan recetas YAML validadas; la IA escribe recetas, no HTML."
status: proposed
confidence: medium
date: 2026-11-15
sources:
  - podolefsky-moore-perkins-2013
  - moore-herzog-perkins-2013
  - alfieri-2011
  - kirschner-sweller-clark-2006
  - chernikova-2020
  - koyunlu-unlu-2024-poe
  - gentner-loewenstein-thompson-2003
  - anthropic-pricing-docs
affects:
  - all
  - package:sims
  - app:web
---

## Decisión

Las simulaciones de los cursos se construyen con **primitivas** (componentes genéricos programados y probados una sola vez) que ejecutan **recetas** declarativas guardadas en `modules/<id>/lab/<subtema>.yaml` y validadas con zod en `pnpm validate`. Las reglas de las recetas (`when: "proceso > timeout"`) las evalúa un mini-evaluador seguro (números, variables declaradas, aritmética, comparaciones, `&&`, `||`, `!`); nunca se ejecuta JS arbitrario.

Primeras primitivas:
- `predecir-observar`: el alumno ajusta parámetros, **predice antes** de ver el resultado, observa y luego explica (rúbrica tipo checklist).
- `clasificar`: el alumno asigna casos a conceptos confundibles (SQS/SNS/Kinesis) y ve por qué en cada uno.

Niveles de costo: 0 = recetas generadas al crear el curso (suscripción, en el repo) y corrección determinista; 1 = corrección de texto libre con modelo barato y rúbrica; 2 = el modelo barato genera una receta nueva de una primitiva existente (se valida y se cachea); 3 = HTML a medida, excepcional y revisado, candidato a convertirse en primitiva.

## Por qué (evidencia)

- La guía importa: el descubrimiento sin ayuda rinde peor que la instrucción explícita (d = -0.38) y el guiado rinde mejor (d = 0.30) (`alfieri-2011`); la guía mínima falla con novatos (`kirschner-sweller-clark-2006`). Una primitiva fija impone esa guía en todas las recetas.
- PhET guía "sin que se note" con affordances, restricciones, señales y feedback del propio simulador (`podolefsky-moore-perkins-2013`), y alumnos lo exploran sin instrucciones de forma productiva (`moore-herzog-perkins-2013`). Las primitivas codifican esas cuatro palancas una vez; la receta solo pone el contenido.
- Simulaciones con andamiaje tienen efectos grandes en habilidades complejas (`chernikova-2020`). POE tiene un efecto medio alto en rendimiento (g ≈ 0.98, evidencia débil) (`koyunlu-unlu-2024-poe`).
- Comparar casos juntos mejora la transferencia (`gentner-loewenstein-thompson-2003`): base de `clasificar`.
- Costo: una receta de ~2K tokens con Haiku 5.5 cuesta ~$0.001 frente a ~$0.30 de un HTML completo con Opus 5.5 (`anthropic-pricing-docs`; tokens estimados por nosotros).

## Límites y qué no sabemos

- No hay estudio que compare "primitiva fija" vs "simulación a medida"; es una inferencia de diseño.
- El efecto de POE viene de estudios de baja calidad; esperar menos.
- Faltan primitivas para procedimientos largos (paso a paso, ordenar, encontrar el error); se añaden cuando haya recetas que las pidan.
