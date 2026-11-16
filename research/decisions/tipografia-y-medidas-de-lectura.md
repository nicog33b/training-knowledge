---
title: "Tipografía de lectura: tamaño generoso, línea de ~65 caracteres y
  ajustes por persona"
summary: Cuerpo de 18–20 px con altura de x grande, interlineado ~1,5, línea de
  60–75 caracteres; serif o sans da igual; el alumno puede cambiar fuente,
  tamaño y espaciado.
status: proposed
confidence: medium
date: 2026-11-16
sources:
  - rello-pielot-marcos-2016
  - legge-bigelow-2011
  - dyson-2004
  - arditi-cho-2005
  - wallace-2022-individuated
  - wcag-22-contrast-spacing
  - literata-typetogether
  - atkinson-hyperlegible
affects:
  - all
  - package:web
---

## Decisión

- Texto de lectura a **18–20 px** (no 16), con una fuente de **altura de x grande** pensada para pantalla. Interlineado **~1,55**; párrafos separados.
- **Ancho de línea de 60–75 caracteres** (`max-width` ≈ 68ch en el artículo), aunque la página sea más ancha.
- Serif o sans: **da igual para la legibilidad**. Se elige por cómo se ve en pantalla y por la licencia.
- Fuentes gratuitas (SIL OFL) servidas desde el propio sitio, sin CDN de terceros:
  - **Literata**: serif para lectura larga en pantalla.
  - **Atkinson Hyperlegible**: sans que diferencia las letras confundibles.
  - **Fuente del sistema**: la de por defecto, que rinde bien y no descarga nada.
- **Ajustes por persona**: el alumno elige fuente, tamaño y espaciado (botón "Aa"), y se recuerda en su navegador. La mejor fuente varía de persona a persona.
- El diseño no se rompe si el usuario sube el espaciado (WCAG 1.4.12).

## Por qué (evidencia)

- **Tamaño**: con letra más grande la lectura fue más fluida y la comprensión mayor, con 18 y 26 pt mejor que con tamaños pequeños; el interlineado apenas importó salvo en los extremos (rello-pielot-marcos-2016).
- **Margen sobre el mínimo**: por encima del tamaño crítico (~0,2° de altura de x) la velocidad se mantiene en un rango de 10×. El texto web típico estaba justo en el mínimo (0,21°), así que subirlo da margen a quien lee más lejos, con cansancio o con más edad (legge-bigelow-2011).
- **Altura de x**: las fuentes con altura de x grande se asocian a mejor legibilidad en pantalla (legge-bigelow-2011).
- **Línea**: las líneas de ~100 caracteres se leen algo más rápido, pero con ~55 la comprensión fue mejor y la preferencia está en 45–72 (dyson-2004).
- **Serifas**: no cambian la legibilidad a tamaños normales (arditi-cho-2005).
- **Ajustes por persona**: dentro de una misma persona, su fuente más rápida y la más lenta difieren ~35 %. Ninguna fuente gana para todos y la preferida no predice la más rápida (wallace-2022-individuated). De ahí que el alumno pueda cambiar la fuente en vez de fijar una para todos.

## Límites y qué no sabemos

- Casi todo mide **velocidad y comprensión inmediata de lectura**, no aprendizaje a largo plazo. La tipografía quita fricción; lo que más aprendizaje produce sigue siendo la práctica de recuperación y el espaciado (practica-de-recuperacion, repeticion-espaciada-fsrs).
- Los "pt" de Rello no tienen una equivalencia exacta a px CSS confirmada; 18–20 px es una lectura prudente, no una cifra del estudio.
- Ni Literata ni Atkinson Hyperlegible tienen estudios publicados de rendimiento. Se ofrecen como opciones razonables, no probadas.
- Selector de fuente: no está medido que los alumnos elijan bien (la preferencia no predice la velocidad). Una mejora futura sería una prueba corta de velocidad para recomendar fuente.
