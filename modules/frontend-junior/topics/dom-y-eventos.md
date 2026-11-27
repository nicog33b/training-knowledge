---
title: DOM y eventos
summary: Seleccionar y modificar el DOM, escuchar eventos, propagación y
  delegación, y no bloquear el hilo principal.
order: 6
section: javascript
status: done
requires: []
---

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
