---
title: Accesibilidad básica (WCAG 2.2)
summary: "Teclado, foco visible, textos alternativos, contraste, formularios con
  label y probar con lector de pantalla: lo mínimo que todo junior debe
  cumplir."
order: 10
section: oficio
status: done
requires: []
---

## Accesibilidad básica (WCAG 2.2)

La **accesibilidad** (a11y) es que todas las personas puedan usar la web: con lector de pantalla, solo teclado, baja visión, daltonismo, temblor en las manos o simplemente un móvil al sol. **WCAG 2.2** es el estándar de referencia; el nivel **AA** es lo que piden la mayoría de leyes y empresas.

### Lo mínimo que un junior debe cumplir
- **Teclado**: todo lo interactivo se alcanza con Tab, en un orden lógico, y se activa con Enter/Espacio. Usa elementos nativos (`button`, `a`, `input`).
- **Foco visible**: nunca `outline: none` sin una alternativa clara. WCAG 2.2 añade que el foco **no quede tapado** por cabeceras fijas.
- **Textos alternativos**: `alt` útil en imágenes informativas, `alt=""` en decorativas.
- **Contraste**: texto normal ≥ **4,5:1**, texto grande ≥ 3:1, componentes e iconos ≥ 3:1.
- **Formularios**: cada campo con `label` visible; errores en texto (no solo en rojo) y asociados al campo.
- **No depender solo del color**: "los campos en rojo son obligatorios" no sirve a quien no distingue el rojo.
- **Tamaño de objetivos**: WCAG 2.2 pide objetivos táctiles de al menos **24×24 px** (o espacio suficiente alrededor).
- **Zoom** al 200 % y texto con espaciado ampliado sin que se rompa ni se corte el contenido.
- `lang` en el `html` y títulos de página descriptivos.

### Cómo probar
1. Recorre la página **solo con teclado**.
2. Pasa un validador automático (detecta solo una parte de los problemas: no sustituye a probar).
3. Escucha la página con un **lector de pantalla** (NVDA, VoiceOver) unos minutos.
4. Revisa contraste y zoom.

### ARIA con cuidado
La primera regla de ARIA: **si existe un elemento HTML nativo, úsalo**. Un ARIA mal puesto empeora la accesibilidad más que no ponerlo.
