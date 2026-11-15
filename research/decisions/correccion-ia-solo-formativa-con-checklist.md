---
title: Corrección con IA solo formativa, contra rúbricas tipo checklist
summary: "La IA corrige explicaciones libres solo para dar feedback (nunca nota de examen), contra una lista de ideas concretas; lo que pueda corregirse con código, se corrige con código."
status: proposed
confidence: medium
date: 2026-11-15
sources:
  - hardy-2026-autoscoring
  - jade-yartsev-2025
  - anthropic-pricing-docs
  - wisniewski-2020
affects:
  - package:sims
  - package:tutor
---

## Decisión

1. Primero, corrección determinista (opción, clasificación, orden, reglas de simulación). Costo cero.
2. Para texto libre: cada receta trae `rubric` como **lista de ideas verificables** ("menciona ChangeMessageVisibility"), no criterios evaluativos ("explica bien"). Sin IA, la UI muestra la checklist para autoevaluación; con IA (modelo barato, prompt fijo cacheado) se marca qué ideas aparecen y se da una pista sobre la que falta.
3. La corrección con IA es **formativa**: nunca alimenta notas, certificados ni el planificador de repasos como "acierto"; el alumno puede discrepar.

## Por qué (evidencia)

- Los LLM generativos tienen menos acuerdo con humanos que los modelos encoder ajustados (0.37 menos en promedio) y fallan de forma impredecible incluso en tareas fáciles para humanos (`hardy-2026-autoscoring`).
- GPT-4o en posgrado: kappa ≈ -0.08 con el humano, notas sesgadas a la baja, pero el desacuerdo fue menor en ítems tipo checklist y mayor en los evaluativos (`jade-yartsev-2025`).
- El feedback con información (qué falta y por qué) es el que más ayuda (`wisniewski-2020`), lo que encaja con "marcar ideas presentes/ausentes y dar pista".
- Con Haiku 5.5 y el prompt cacheado, una corrección cuesta fracciones de centavo (`anthropic-pricing-docs`).

## Límites y qué no sabemos

- No medimos el acuerdo de nuestro corrector con un humano; antes de confiar, revisar a mano una muestra (tarea en tasks.md).
- Las fuentes son de medicina y preprints; el dominio técnico (AWS, Next) puede comportarse distinto.
