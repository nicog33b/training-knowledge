---
title: Herramientas propias de cada curso creadas con constructores comunes
summary: Un curso declara en YAML herramientas (calculadora, asistente de
  decisión, checklist, comparador, plantilla) que un constructor genérico valida
  y pinta; nada de HTML por curso.
status: proposed
confidence: low
date: 2026-11-26
sources:
  - podolefsky-moore-perkins-2013
  - chernikova-2020
  - costa-2022-4cid
  - kirschner-sweller-clark-2006
affects:
  - all
  - package:tools
  - app:web
---

## Decisión

Cada curso puede tener **herramientas propias** (`modules/<id>/tools/<herramienta>.yaml`) sin escribir código: el archivo elige un **constructor** común y lo configura. Constructores iniciales:
- `calculadora`: entradas numéricas o de selección + salidas calculadas con el mini-lenguaje seguro de `@tk/sims` (p. ej. tokens y costo de un RAG, presupuesto de rendimiento web).
- `decision`: asistente de preguntas encadenadas que termina en una recomendación con su porqué (p. ej. ¿RAG, fine-tuning o prompt?, ¿SSR, SSG o CSR?).
- `checklist`: lista verificable agrupada, con progreso guardado (p. ej. revisión de código senior, puesta en producción de una app con IA).
- `comparador`: matriz opciones × criterios con filtro y resaltado de diferencias.
- `plantilla`: campos que rellena el alumno → texto generado (p. ej. spec para un agente, ADR, frase en un tiempo verbal).
El constructor (contrato en `contracts`, validación en `packages/tools`, render en `Tool.astro`) es general; la herramienta es específica del curso. Una herramienta puede asociarse a subtemas (`topics:`) y aparece al final de esos subtemas y en `/<curso>/herramientas/`. Un constructor nuevo = esquema + validación + render, igual que una primitiva de simulación.

## Por qué (evidencia)

- Mismo enfoque que las simulaciones (decisión simulaciones-por-primitivas-y-recetas): primitivas programadas una vez, configuradas por receta, baratas de generar y validables.
- Guiar con affordances y restricciones del propio simulador/herramienta (podolefsky-moore-perkins-2013) y andamiaje según conocimiento previo (chernikova-2020; kirschner-sweller-clark-2006).
- Tareas completas del oficio (4C/ID, costa-2022-4cid): checklists y plantillas reproducen tareas reales (revisar un PR, escribir una spec).

## Límites y qué no sabemos

- Confianza baja: es una decisión de arquitectura apoyada por analogía, no un estudio de "herramientas por curso". Medir uso (T-106).
- Si un curso necesita algo que ningún constructor cubre, se añade un constructor general, no un caso especial.
