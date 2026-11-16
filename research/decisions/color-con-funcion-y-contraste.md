---
title: Color para señalar y contrastar, no por psicología del color
summary: Modo claro por defecto con oscuro disponible, contraste ≥4,5:1
  (objetivo 7:1 en texto), color con significado fijo para señalar lo
  importante; ignorar afirmaciones de que un color concreto mejora el
  rendimiento.
status: proposed
confidence: medium
date: 2026-11-16
sources:
  - piepenbrock-2013-polarity
  - nngroup-dark-mode
  - wcag-22-contrast-spacing
  - schneider-2018-signaling
  - gnambs-2020-red
  - brom-2018-emotional-design
affects:
  - all
  - package:web
---

## Decisión

- **Modo claro por defecto** (texto oscuro sobre fondo claro) y **modo oscuro disponible**: hoy sigue la preferencia del sistema; añadir un interruptor manual.
- **Contraste**: el texto normal debe superar **4,5:1** (objetivo **7:1** en el cuerpo del texto), y el texto grande y la interfaz 3:1. No usar gris claro para texto que hay que leer.
- **El color señala, no decora**: un código fijo con significado que se repite en todo el sitio, siempre acompañado de texto o forma, nunca solo color.
  - Tipos de pregunta: por qué, qué pasa si, comparar, aplicar, error común.
  - Estados: sabías, dudas, a repasar.
  - Correcto e incorrecto en las simulaciones.
- Lo importante se resalta con **negrita o un color de acento**, con moderación.
- **Ignorar la "psicología del color"** como mecanismo de aprendizaje: rojo para atención, azul para creatividad, etc. Estética agradable sí, pero como comodidad, no como técnica.

## Por qué (evidencia)

- **Polaridad**: el modo claro dio mejor agudeza y corrección de textos que el oscuro en jóvenes y mayores (piepenbrock-2013-polarity). La ventaja crece con letra pequeña y de noche (nngroup-dark-mode, que resume Dobres et al. 2017).
- **Modo oscuro como opción**: personas con medios oculares turbios, como cataratas, leen mejor en modo oscuro (Legge et al. 1985, en nngroup-dark-mode). El posible vínculo del modo claro con la miopía viene de 7 participantes: es un indicio, no una razón para cambiar el modo por defecto.
- **Contraste**: 4,5:1 es el mínimo de WCAG AA para texto normal y 7:1 el de AAA (wcag-22-contrast-spacing).
- **Señalizar**: señalar lo importante (color, negrita, etiquetas, flechas) mejora la retención (g = 0,53) y algo la transferencia (g = 0,33), sobre todo en novatos (schneider-2018-signaling).
- **Psicología del color**: el efecto "el rojo empeora el rendimiento" desaparece al corregir el sesgo de publicación, y 4 réplicas no lo encontraron (gnambs-2020-red).
- **Estética**: en un estudio, los colores cálidos solos no cambiaron las emociones de quien aprendía; las formas amables sí algo (brom-2018-emotional-design). Es apoyo débil.

## Límites y qué no sabemos

- No se aisló el efecto del color frente a otras señales; puede que la negrita o las etiquetas rindan igual.
- Los estudios de polaridad miden lectura y agudeza en sesiones cortas, no aprendizaje en semanas.
- El efecto de Mehta y Zhu 2009 (rojo para detalle, azul para creatividad) no tiene réplica directa localizada: no se usa.
