---
title: Ruta frontend junior → semi senior → senior con tareas completas y
  métricas actuales
summary: Tres cursos encadenados (ruta) con heredado de glosario; cada nivel se
  organiza por tareas reales del puesto y usa métricas vigentes (INP, WCAG 2.2).
status: proposed
confidence: low
date: 2026-11-26
sources:
  - costa-2022-4cid
  - webdev-inp-2024
  - wcag-22-contrast-spacing
  - kirschner-sweller-clark-2006
affects:
  - module:frontend-junior
  - module:frontend-semi-senior
  - module:frontend-senior
---

## Decisión

Se crean tres cursos encadenados en una **ruta** (`paths/frontend.yaml`): `frontend-junior` → `frontend-semi-senior` → `frontend-senior`. Los niveles heredan el glosario del anterior (`glossaries:`). Cada nivel se organiza por **tareas reales del puesto** (maquetar accesible, depurar asincronía, medir y mejorar INP, decidir estrategia de renderizado, revisar PRs, escribir un ADR) y tiene herramientas propias (checklists, asistente de decisión, calculadora de presupuesto de rendimiento). Se usan métricas vigentes: INP (no FID), WCAG 2.2.

## Por qué (evidencia)

- Diseño con tareas completas (4C/ID): efecto grande en adquisición de conocimiento (costa-2022-4cid).
- Guía explícita para novatos; se retira con el nivel (kirschner-sweller-clark-2006).
- INP sustituye a FID desde el 12-mar-2024 (webdev-inp-2024); WCAG 2.2 (wcag-22-contrast-spacing).

## Límites y qué no sabemos

- Lo que se espera de un "senior" varía entre empresas; el curso da criterios, no un título.
- Las herramientas y frameworks cambian rápido: revisar cada 6 meses (T-105).
