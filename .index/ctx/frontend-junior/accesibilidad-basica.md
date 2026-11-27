# Subtema: Accesibilidad básica (WCAG 2.2) [frontend-junior/accesibilidad-basica]
Teclado, foco visible, textos alternativos, contraste, formularios con label y probar con lector de pantalla: lo mínimo que todo junior debe cumplir.

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

## Glosario usado
- Lector de pantalla: Software que lee en voz alta (o en braille) la interfaz usando el árbol de accesibilidad: NVDA, JAWS, VoiceOver, TalkBack.
- ARIA: Atributos (role, aria-label, aria-expanded…) que añaden semántica cuando HTML no alcanza; mal usados empeoran la accesibilidad.
- WCAG: Pautas de Accesibilidad para el Contenido Web del W3C; el nivel AA es el exigido habitualmente.
- Contraste: Diferencia de luminancia entre texto y fondo; WCAG AA pide 4,5:1 en texto normal y 3:1 en grande.
- Foco: Indicador del elemento que recibe la entrada del teclado; debe verse siempre.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué nunca hay que quitar el outline del foco sin reemplazarlo?
- (aplicar) ¿Qué contraste mínimo pide WCAG AA para texto normal y grande?
- (que-pasa-si) ¿Qué pasa si los errores del formulario solo se marcan en rojo?
- (comparar) Compara un validador automático con probar a mano.
- (por-que) ¿Qué añadió WCAG 2.2 que afecta al trabajo diario de un frontend?
- (error-comun) Error común: añadir role=button y aria-label a todo «por si acaso».

## Simulaciones del subtema
- clasificar: ¿Qué problema de accesibilidad es?

## Herramientas del curso en este subtema
- checklist: Checklist antes de pedir revisión de tu PR — Lo que un buen junior revisa en su propio cambio antes de pedir a otros que lo miren.
- calculadora: Calculadora de contraste (luminancia aproximada) — Introduce la luminancia relativa aproximada de texto y fondo (0 = negro, 100 = blanco) y comprueba los mínimos de WCAG.
