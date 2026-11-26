# Subtema: HTML semántico [frontend-junior/html-semantico]
Elegir el elemento por su significado (header, nav, main, button, label…): accesibilidad, SEO y comportamiento gratis del navegador.

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

## Glosario usado
- HTML semántico: Usar cada elemento HTML por su significado (nav, main, button, label…) y no solo por su aspecto.
- Landmark: Región principal de la página (header, nav, main, aside, footer) por la que se puede navegar con lector de pantalla.
- Lector de pantalla: Software que lee en voz alta (o en braille) la interfaz usando el árbol de accesibilidad: NVDA, JAWS, VoiceOver, TalkBack.
- Árbol de accesibilidad: Versión del DOM que el navegador expone a tecnologías de apoyo: rol, nombre y estado de cada elemento.
- ARIA: Atributos (role, aria-label, aria-expanded…) que añaden semántica cuando HTML no alcanza; mal usados empeoran la accesibilidad.
- SEO: Optimización para buscadores: que las páginas se entiendan e indexen bien.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué un div con onclick no es un buen botón?
- (comparar) Compara un enlace y un botón.
- (que-pasa-si) ¿Qué pasa si saltas de h1 a h4 porque el h4 «se ve del tamaño correcto»?
- (aplicar) Escribe el alt para el logo de la empresa que enlaza al inicio.
- (por-que) ¿Por qué cada input necesita una label asociada?
- (error-comun) Error común: usar div y span para todo y arreglarlo luego con ARIA.

## Herramientas del curso en este subtema
- checklist: Checklist antes de pedir revisión de tu PR — Lo que un buen junior revisa en su propio cambio antes de pedir a otros que lo miren.
