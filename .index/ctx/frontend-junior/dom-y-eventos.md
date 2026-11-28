# Subtema: DOM y eventos [frontend-junior/dom-y-eventos]
Seleccionar y modificar el DOM, escuchar eventos, propagación y delegación, y no bloquear el hilo principal.

## DOM y eventos

El **DOM** (*Document Object Model*) es el árbol de objetos que el navegador construye a partir del HTML. JavaScript lo lee y modifica para que la página cambie.

### Seleccionar y modificar
- `document.querySelector('.card')` y `querySelectorAll` con selectores CSS.
- Cambiar texto con **`textContent`** (seguro). Evita `innerHTML` con datos del usuario: abre la puerta a **XSS**.
- Clases con `classList.add/remove/toggle`; atributos con `setAttribute`; datos propios con `dataset`.
- Crear elementos con `document.createElement` y añadirlos con `append`. Muchos cambios seguidos: agrúpalos o usa un `DocumentFragment` para no forzar recálculos de diseño.

### Eventos
- `elemento.addEventListener('click', manejador)`. El manejador recibe el **objeto evento** (`event.target`, `event.key`…).
- `event.preventDefault()` cancela la acción por defecto (enviar un formulario, seguir un enlace).
- Formularios: escucha **`submit`** del `form`, no el clic del botón: así funciona también con Enter.

### Propagación y delegación
Un evento **sube** (burbujea) desde el elemento donde ocurrió hacia sus ancestros. Por eso puedes poner **un solo listener** en la lista y averiguar qué hijo se pulsó con `event.target.closest('li')`: **delegación de eventos**. Funciona con elementos añadidos después y usa menos memoria.

### No bloquear el hilo principal
JavaScript del navegador corre en el **hilo principal**, el mismo que pinta y responde a la interacción. Un bucle pesado de 300 ms congela la página: el usuario hace clic y no pasa nada (mala **INP**). Divide el trabajo, cede el control (`await` entre trozos) o muévelo a un **Web Worker**.

### Accesibilidad
Si creas controles propios, deben funcionar con **teclado** (Enter, Espacio, flechas) y anunciar su estado. Casi siempre es mejor partir del elemento nativo (`button`, `details`, `dialog`).

## Glosario usado
- DOM: Árbol de objetos que representa la página y que JavaScript puede leer y modificar.
- Delegación de eventos: Escuchar un evento en un ancestro y averiguar con event.target qué hijo lo originó.
- Hilo principal: Hilo del navegador donde corre el JavaScript de la página y que además pinta y responde a la interacción.
- Web Worker: Hilo aparte del navegador para ejecutar JavaScript pesado sin bloquear el hilo principal.
- XSS: Ataque que inyecta código en una página (p. ej. vía innerHTML con datos del usuario) para ejecutarlo en el navegador de otros.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué textContent es más seguro que innerHTML con datos del usuario?
- (aplicar) Explica la delegación de eventos y cuándo usarla.
- (que-pasa-si) ¿Qué pasa si un clic dispara un cálculo de 400 ms en el hilo principal?
- (comparar) Compara escuchar el click del botón y el submit del formulario.
- (por-que) ¿Por qué agrupar muchos cambios en el DOM?
- (error-comun) Error común: crear un menú desplegable con divs que solo funciona con ratón.
