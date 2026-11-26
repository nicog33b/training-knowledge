---
title: "Menú de accesibilidad: solo opciones con evidencia o derecho de acceso"
summary: Ajustes por persona (fuente, tamaño, medida, espaciado, contraste,
  movimiento, foco, lectura en voz alta, perfiles); sin superposiciones de color
  ni Bionic Reading.
status: proposed
confidence: medium
date: 2026-11-26
sources:
  - wood-2018-tts
  - griffiths-2016-overlays
  - brysbaert-2024-bionic
  - dyson-2004
  - wcag-22-contrast-spacing
  - zorzi-2012-letter-spacing
  - mayer-multimedia-chartered
affects:
  - all
  - app:web
---

## Decisión

El menú "Aa" del header pasa a ser un **panel de accesibilidad** con perfiles rápidos y ajustes sueltos, todos guardados por navegador (y en el perfil local):
- **Lectura**: fuente (Sistema/Literata/Atkinson), tamaño 15–28 px, **ancho de línea** (estrecho ~55, normal ~68, ancho ~80 caracteres), espaciado amplio WCAG 1.4.12, alineación siempre a la izquierda.
- **Visión**: tema auto/claro/oscuro y **alto contraste** (objetivo 7:1), enlaces siempre subrayados, foco visible reforzado.
- **Atención**: **modo foco** (oculta header, chat y adornos; atenúa todo salvo el párrafo bajo el puntero), **reducir movimiento** aunque el sistema no lo pida, ocultar el subrayado del glosario para quien lo encuentre ruidoso.
- **Escuchar**: **leer en voz alta** (Web Speech API, sin costo) el subtema o la selección, con velocidad ajustable y resaltado del párrafo que se lee.
- **Perfiles**: "Dislexia" (Atkinson + espaciado + línea estrecha + voz), "Baja visión" (24 px + alto contraste), "Concentración" (modo foco + sin movimiento). Son atajos: cada ajuste se puede cambiar después.
- **No** se ofrecen superposiciones/filtros de color ni Bionic Reading.

## Por qué (evidencia)

- Texto a voz mientras se lee: d = 0,35 en comprensión para alumnos con dificultades lectoras, 22 estudios (wood-2018-tts).
- Longitud de línea es la variable tipográfica con más efecto en lectura en pantalla; las medias (~55 cpl) se prefieren y a veces se comprenden mejor (dyson-2004) → se ofrece como ajuste.
- Espaciado entre letras ayuda a lectores con dislexia (zorzi-2012-letter-spacing); valores de WCAG 1.4.12 (wcag-22-contrast-spacing).
- Quitar lo que no enseña mejora el aprendizaje (coherencia, mayer-multimedia-chartered) → modo foco.
- Filtros de color: revisión de 51 publicaciones, los estudios de menor riesgo de sesgo apoyan menos el beneficio (griffiths-2016-overlays).
- Bionic Reading: sin diferencia en tiempos de lectura en 100 párrafos (brysbaert-2024-bionic).

## Límites y qué no sabemos

- Las fuentes nuevas están verificadas solo por resúmenes (`secondary`); ver T-099.
- El efecto del texto a voz se midió en alumnos con dificultades; en adultos sin ellas puede no ayudar (o distraer).
- El "modo foco" se apoya en un principio general, no en un estudio de esa función concreta.
- La calidad de la voz depende del navegador y del sistema operativo.
