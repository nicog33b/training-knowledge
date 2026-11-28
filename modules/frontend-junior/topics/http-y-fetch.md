---
title: HTTP y fetch
summary: Métodos, códigos de estado, cabeceras y JSON; consumir una API con
  fetch, manejar errores, estados de carga y CORS a nivel básico.
order: 8
section: javascript
status: done
requires: []
---

## HTTP y fetch

### HTTP en cinco ideas
- **Método**: `GET` (leer, sin efectos), `POST` (crear o acción), `PUT`/`PATCH` (actualizar), `DELETE`.
- **Código de estado**: 2xx éxito (200, 201, 204), 3xx redirección, **4xx error del cliente** (400 datos mal, 401 sin autenticar, 403 sin permiso, 404 no existe, 429 demasiadas peticiones), **5xx error del servidor**.
- **Cabeceras**: metadatos (`Content-Type: application/json`, `Authorization`, caché).
- **Cuerpo**: normalmente JSON en APIs.
- Es **sin estado**: cada petición lleva lo necesario (cookies, tokens).

### fetch
```js
const r = await fetch('/api/pedidos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pedido) });
if (!r.ok) throw new Error(`HTTP ${r.status}`);
const datos = await r.json();
```
**Ojo**: `fetch` **no lanza error** con un 404 o un 500: solo si falla la red. Comprueba siempre **`r.ok`** o `r.status`.

### Estados en la interfaz
Toda petición tiene al menos **cargando, éxito, vacío y error**. Diseña los cuatro: un spinner eterno o una pantalla en blanco ante un error son bugs. Desactiva el botón mientras se envía para no duplicar.

### Cancelar y limitar
`AbortController` cancela peticiones que ya no interesan (el usuario cambió de página o siguió escribiendo en un buscador). Para búsquedas mientras se escribe, combina con **debounce**.

### CORS en una frase
El navegador bloquea que una página lea respuestas de **otro origen** salvo que el servidor lo permita con cabeceras **CORS**. Se arregla en el **servidor** (o con un proxy), no desactivando nada en el cliente.
