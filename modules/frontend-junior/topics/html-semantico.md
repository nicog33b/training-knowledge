---
title: HTML semántico
summary: "Elegir el elemento por su significado (header, nav, main, button,
  label…): accesibilidad, SEO y comportamiento gratis del navegador."
order: 1
section: web-base
status: done
requires: []
---

## HTML semántico

HTML no es solo "cajas para pintar": cada elemento dice **qué es** su contenido. Usar el elemento correcto da **accesibilidad**, **SEO** y **comportamiento** del navegador sin escribir JavaScript.

### Estructura de la página
- **Landmarks**: `header`, `nav`, `main` (uno por página), `aside`, `footer`. Los lectores de pantalla permiten saltar entre ellos.
- **Encabezados** `h1`–`h6` en orden lógico (un `h1`, sin saltar niveles por estética): son el índice de la página.
- `section` y `article` para agrupar contenido con sentido propio; `div` y `span` solo cuando ningún elemento describe el contenido.

### Elementos interactivos de verdad
- Un `button` se enfoca con Tab, se activa con Enter y Espacio y anuncia su rol. Un `div` con `onclick` **no hace nada de eso** si no lo programas a mano.
- Un **enlace** (`a href`) navega a otra URL; un **botón** ejecuta una acción. No los mezcles.
- Formularios: cada `input` con su **`label`** asociada (`for`/`id`), tipos adecuados (`email`, `number`, `date`) que dan teclado móvil y validación, y `fieldset`/`legend` para grupos.

### Imágenes y medios
- `alt` describe la **función** de la imagen ("Logo de Acme, ir al inicio"); si es decorativa, `alt=""` para que se ignore.
- `figure` + `figcaption` para imágenes con pie.

### Por qué importa
El HTML semántico es la base del **árbol de accesibilidad** que usan lectores de pantalla y buscadores. Arreglar semántica después cuesta más que escribirla bien: empieza siempre por el elemento correcto y añade **ARIA** solo cuando HTML no alcanza.
