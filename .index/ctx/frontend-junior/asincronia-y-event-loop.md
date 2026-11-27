# Subtema: Asincronía: event loop, promesas y async/await [frontend-junior/asincronia-y-event-loop]
Cómo JavaScript hace varias cosas con un solo hilo: pila, cola de tareas y microtareas; promesas, async/await y manejo de errores.

## Asincronía: event loop, promesas y async/await

JavaScript tiene **un solo hilo** para tu código, pero no se bloquea esperando la red o un temporizador. El secreto es el **event loop**.

### El modelo
- **Pila de llamadas**: el código que se está ejecutando ahora.
- Las operaciones lentas (red, temporizadores) las hace el navegador **fuera** del hilo; cuando terminan, encolan su callback.
- **Cola de tareas** (macrotareas): `setTimeout`, eventos, mensajes.
- **Cola de microtareas**: callbacks de **promesas** (`then`, código tras `await`), `queueMicrotask`.
- El event loop: cuando la pila queda vacía, ejecuta **todas las microtareas** pendientes, luego **una** tarea, y entre medias el navegador puede **pintar**.
Por eso `setTimeout(fn, 0)` no es inmediato y una cadena infinita de microtareas puede bloquear el pintado.

### Promesas
Una **promesa** representa un valor futuro: *pending*, luego *fulfilled* (con valor) o *rejected* (con error).
- `Promise.all([...])`: espera todas, falla si una falla. **En paralelo**.
- `Promise.allSettled`: espera todas y te da el resultado de cada una.
- `Promise.race` / `any`: la primera que termine / que tenga éxito.

### async/await
`async` hace que una función devuelva una promesa; `await` **pausa esa función** (no el hilo) hasta que la promesa se resuelve. Se lee como código secuencial:
```js
async function cargar() {
  try { const r = await fetch('/api/items'); return await r.json(); }
  catch (e) { mostrarError(e); }
}
```
- Errores con **`try/catch`**. Una promesa rechazada sin manejar es un error silencioso.
- `await` en un bucle hace las peticiones **una tras otra**; si son independientes, lánzalas a la vez con `Promise.all`.

## Glosario usado
- Event loop: Mecanismo que, cuando la pila queda vacía, ejecuta las microtareas pendientes y luego la siguiente tarea, dejando pintar entre medias.
- Promesa: Objeto que representa un valor futuro: pendiente, cumplida con un valor o rechazada con un error.
- Microtarea: Callback de alta prioridad (then de promesas, código tras await) que se ejecuta antes de la siguiente tarea.
- async/await: Sintaxis para escribir código con promesas como si fuera secuencial; await pausa la función, no el hilo.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué setTimeout(fn, 0) no se ejecuta inmediatamente?
- (aplicar) ¿En qué orden se imprime: log('A'); setTimeout(()=>log('B')); Promise.resolve().then(()=>log('C')); log('D')?
- (comparar) Compara Promise.all y Promise.allSettled.
- (que-pasa-si) ¿Qué pasa si haces await dentro de un for para 10 peticiones independientes?
- (por-que) ¿Por qué await no bloquea la página?
- (error-comun) Error común: no manejar el error de una promesa.

## Simulaciones del subtema
- clasificar: ¿Tarea o microtarea?
