# Subtema: HTTP y fetch [frontend-junior/http-y-fetch]
Métodos, códigos de estado, cabeceras y JSON; consumir una API con fetch, manejar errores, estados de carga y CORS a nivel básico.

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

## Glosario usado
- JSON: Formato de texto para datos estructurados (objetos, listas, números, cadenas) que entienden casi todos los lenguajes.
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- fetch: API del navegador para hacer peticiones HTTP que devuelve una promesa con la respuesta.
- Código de estado: Número de tres cifras de una respuesta HTTP: 2xx éxito, 3xx redirección, 4xx error del cliente, 5xx error del servidor.
- CORS: Mecanismo por el que un servidor permite, con cabeceras, que páginas de otro origen lean sus respuestas.
- Mismo origen: Combinación de esquema, dominio y puerto de una URL; la base de las reglas de seguridad del navegador.
- Debounce: Esperar a que pare una ráfaga de eventos (p. ej. teclear) antes de ejecutar la acción.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué fetch no lanza error con un 404?
- (comparar) Compara 401 y 403.
- (aplicar) Diseña los estados de una lista que carga datos de una API.
- (que-pasa-si) ¿Qué pasa si un buscador hace una petición por cada tecla sin cancelar las anteriores?
- (por-que) Te sale un error de CORS. ¿Dónde se arregla?
- (error-comun) Error común: usar GET para una acción que modifica datos.

## Simulaciones del subtema
- clasificar: ¿Qué código de estado devolverías?
