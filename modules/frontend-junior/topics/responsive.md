---
title: Diseño responsive
summary: Mobile first, viewport, unidades relativas, media queries y container
  queries, imágenes adaptables.
order: 4
section: web-base
status: done
requires: []
---

## Diseño responsive

Una web **responsive** se adapta al espacio disponible: móvil, tableta, escritorio, ventanas partidas, zoom.

### La base
- `<meta name="viewport" content="width=device-width, initial-scale=1">`: sin ella el móvil simula un escritorio y encoge todo.
- **Mobile first**: estilos base para pantallas pequeñas y `@media (min-width: …)` para ir añadiendo. El CSS móvil queda simple y lo complejo es opcional.
- **Unidades relativas**: `rem` para tamaños de letra y espacios (respeta el tamaño de letra del usuario), `%`, `fr`, `vw`/`vh` con cuidado, `ch` para anchos de texto legibles.
- **Layouts fluidos**: Grid con `minmax` y `auto-fill`, Flexbox con `wrap`, `clamp()` para tamaños que crecen con límites (`font-size: clamp(1.5rem, 4vw, 2.5rem)`).

### Media queries y container queries
- **Media queries**: dependen de la **ventana** (ancho, orientación, `prefers-color-scheme`, `prefers-reduced-motion`).
- **Container queries** (`@container`): dependen del **contenedor** del componente. Una tarjeta puede cambiar su diseño según el hueco donde la pongas, no según la pantalla. Ideal para componentes reutilizables.

### Imágenes
- `max-width: 100%; height: auto` para que no desborden.
- `srcset` y `sizes` para que el navegador elija el **tamaño adecuado** (no descargar 2000px en un móvil); `picture` para cambiar de recorte o formato.
- Siempre `width` y `height` (o `aspect-ratio`) para reservar espacio y evitar saltos de diseño.

### Probar
Herramientas de desarrollo en modo dispositivo, pero también **zoom al 200 %** y móviles reales: el modo dispositivo no simula el rendimiento ni el táctil.
