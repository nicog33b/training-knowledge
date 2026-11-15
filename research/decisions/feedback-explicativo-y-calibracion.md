---
title: Feedback que explica y medición de calibración, no de "sensación"
summary: Cada opción tiene explicación; se pide confianza antes de responder y el panel muestra calibración frente a aciertos reales.
status: proposed
confidence: medium
date: 2026-11-15
sources: [wisniewski-2020, deslauriers-2019, dunlosky-2013]
affects: [all, package:practice]
---

## Decisión

Los ítems de opción múltiple explican cada opción (por qué es correcta o incorrecta). Antes de responder el alumno marca su confianza; el panel `/progreso` muestra retención estimada y calibración (confianza vs acierto). La UI explica que el esfuerzo se siente como peor aprendizaje.

## Por qué (evidencia)

- El feedback d ≈ 0.48 depende de qué información contiene (wisniewski-2020).
- Con aprendizaje activo se aprende más pero se siente aprender menos; sin explicar esto el alumno prefiere métodos peores (deslauriers-2019).
- Releer es de utilidad baja pese a sentirse productivo (dunlosky-2013).

## Límites y qué no sabemos

- NO verificado que el feedback elaborado supere al de solo respuesta correcta (falta la tabla de moderadores de wisniewski-2020).
- Efecto hipercorrección (errores de alta confianza se corrigen más) no incluido aún: investigar y guardar fuente antes de basar diseño en él.
