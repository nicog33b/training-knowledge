---
title: Nada de fuentes difíciles ni fuentes para dislexia como truco de aprendizaje
summary: No usar fuentes disfluentes (Sans Forgetica) ni fuentes especiales para
  dislexia; para dislexia, ofrecer más tamaño y espaciado entre letras.
status: proposed
confidence: high
date: 2026-11-16
sources:
  - taylor-2020-sans-forgetica
  - huff-2022-sans-forgetica-drm
  - xie-zhou-liu-2018-disfluency
  - weissgerber-brunmair-rummer-2021
  - wery-diliberto-2017
  - zorzi-2012-letter-spacing
affects:
  - all
  - package:web
---

## Decisión

- No usar **fuentes "difíciles" a propósito** (Sans Forgetica, cursivas raras, texto borroso) para "hacer pensar más": no son una dificultad deseable.
- No poner por defecto **fuentes "para dislexia"** (OpenDyslexic, Dyslexie): no mejoran la lectura.
- Para quien tenga dislexia o le cueste leer, los ajustes de lectura ofrecen lo que sí tiene evidencia: **más tamaño y más espaciado entre letras y palabras**.
- La "dificultad deseable" se pone donde sí funciona: preguntas antes de mirar la respuesta, espaciado e intercalado (decisiones practica-de-recuperacion e intercalar-conceptos-confundibles).

## Por qué (evidencia)

- **Sans Forgetica** (882 participantes, 4 experimentos): la fuente se percibe más difícil, pero la memoria fue igual o peor (taylor-2020-sans-forgetica). Una réplica independiente con ~300 participantes tampoco halló efecto (huff-2022-sans-forgetica-drm).
- **Disfluencia en general**, meta-análisis de 25 artículos (3.135 participantes): efecto nulo en recuerdo (d = −0,01) y en transferencia (d = 0,03) (xie-zhou-liu-2018-disfluency). Un reanálisis confirma el nulo en transferencia y pone en duda el de recuerdo por errores de codificación (weissgerber-brunmair-rummer-2021).
- **OpenDyslexic**: en alumnos con dislexia no mejoró la velocidad ni la precisión frente a Arial o Times, y ninguno la prefirió (wery-diliberto-2017).
- **Espaciado entre letras**: en niños con dislexia, el espaciado extra casi duplicó la precisión y subió la velocidad más de un 20 %; a quien no tenía dificultades no le cambió nada (zorzi-2012-letter-spacing). Por eso va como opción, no por defecto.

## Límites y qué no sabemos

- Las muestras de los estudios de fuentes para dislexia son pequeñas (12 alumnos). "No funcionan para el grupo" no excluye que a alguien concreto le guste; por eso los ajustes son libres.
- Zorzi trabajó con niños; no está demostrado igual en adultos.
- Algún estudio aislado vio una ventaja diferida (a 2 semanas) con fuente disfluente. La evidencia de conjunto es nula, pero no perfectamente uniforme.
