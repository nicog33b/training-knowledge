---
title: Maquetación con Flexbox y Grid
summary: Flexbox para una dimensión, Grid para dos; alinear, repartir espacio y
  plantillas sin hacks.
order: 3
section: web-base
status: done
requires: []
---

## Maquetación con Flexbox y Grid

### Flexbox: una dimensión
**Flexbox** reparte elementos en **una fila o una columna**. El contenedor (`display: flex`) controla:
- `flex-direction` (fila o columna) y `flex-wrap` (saltar de línea).
- `justify-content`: alineación en el **eje principal** (start, center, space-between…).
- `align-items`: alineación en el **eje transversal**.
- `gap`: espacio entre elementos (sin márgenes negativos).
Cada hijo con `flex: 1` (crecer, encoger, base) reparte el espacio sobrante. Ideal para **barras de navegación, filas de botones, centrar** algo.

### Grid: dos dimensiones
**Grid** define **filas y columnas** a la vez:
- `grid-template-columns: repeat(3, 1fr)` → tres columnas iguales; la unidad **`fr`** reparte el espacio libre.
- `repeat(auto-fill, minmax(240px, 1fr))` → tantas columnas como quepan, de al menos 240px: una rejilla de tarjetas **responsive sin media queries**.
- `grid-template-areas` para dibujar la plantilla con nombres (cabecera, lateral, contenido).
- Los hijos se colocan con `grid-column` / `grid-row` o fluyen solos.

### Cuál usar
- Contenido que fluye en una línea y cuyo tamaño manda → **Flexbox**.
- Una **estructura** de filas y columnas que manda sobre el contenido → **Grid**.
Se combinan: Grid para el layout de la página, Flexbox dentro de cada componente.

### Errores típicos
Usar márgenes para separar en vez de `gap`, anidar flex dentro de flex para simular una rejilla, y fijar alturas que rompen cuando el texto crece (con letra grande o traducciones).
