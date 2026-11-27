# Subtema: La cascada, la especificidad y el box model [frontend-junior/cascada-y-especificidad]
Por qué un estilo gana a otro (origen, especificidad, orden), herencia, box-sizing y cómo evitar guerras de !important.

## La cascada, la especificidad y el box model

CSS significa *Cascading* Style Sheets: cuando varias reglas aplican al mismo elemento, la **cascada** decide cuál gana.

### Quién gana
1. **Origen e importancia**: estilos del navegador < estilos del autor; `!important` invierte el orden (úsalo casi nunca).
2. **Capas** (`@layer`): las reglas en capas declaradas antes pierden ante las posteriores, sin importar la especificidad.
3. **Especificidad**: se cuenta como (ids, clases/atributos/pseudoclases, elementos). `#menu a` (1,0,1) gana a `.nav a` (0,1,1). Los estilos en línea ganan a todo salvo `!important`.
4. **Orden**: a igual especificidad, gana la regla que aparece **después**.

### Mantenerla baja
- Prefiere **clases** a ids y a selectores largos (`.card-title` mejor que `main section .card h3`).
- `:where()` tiene especificidad **cero**: útil para estilos base fáciles de sobrescribir.
- Si necesitas `!important` para ganar, el problema es la arquitectura del CSS, no la regla.

### Herencia
Algunas propiedades se **heredan** (color, font, line-height) y otras no (margin, border, background). `inherit`, `initial` y `unset` controlan esto explícitamente.

### El box model
Cada elemento es una caja: **contenido + padding + border + margin**. Por defecto (`content-box`), `width` solo mide el contenido y el padding lo **ensancha**. Con **`box-sizing: border-box`** el ancho incluye padding y borde, mucho más predecible: casi todos los proyectos lo aplican a todo (`*, *::before, *::after`).
Recuerda también el **colapso de márgenes** verticales entre bloques: dos márgenes de 20px seguidos dan 20px, no 40px.

### Depurar
Las herramientas de desarrollo muestran qué reglas aplican, cuáles están **tachadas** (perdieron) y por qué. Mira ahí antes de añadir otra regla.

## Glosario usado
- Cascada: Algoritmo de CSS que decide qué declaración gana cuando varias aplican: origen e importancia, capas, especificidad y orden.
- Especificidad: Peso de un selector CSS (ids, clases/atributos/pseudoclases, elementos) que decide qué regla gana a igual origen y capa.
- Box model: Cada elemento es una caja de contenido + padding + border + margin; box-sizing decide qué mide width.

## Preguntas sugeridas al alumno
- (aplicar) Entre `#menu a` y `.nav a`, ¿cuál gana y por qué?
- (por-que) ¿Por qué casi todos los proyectos aplican box-sizing: border-box a todo?
- (que-pasa-si) ¿Qué pasa si usas !important para ganar una regla?
- (comparar) Compara propiedades heredadas y no heredadas.
- (por-que) ¿Por qué :where() es útil para estilos base?
- (error-comun) Error común: añadir más reglas sin mirar por qué la tuya no aplica.
