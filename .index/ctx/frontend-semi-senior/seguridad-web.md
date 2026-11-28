# Subtema: Seguridad web para frontend [frontend-semi-senior/seguridad-web]
XSS y cómo lo evitan los frameworks, CSP, CSRF y cookies SameSite, CORS, dónde guardar tokens y dependencias vulnerables.

## Seguridad web para frontend

El frontend corre en un entorno **hostil**: el navegador del usuario, con extensiones, redes inseguras y atacantes que escriben datos que otros verán.

### XSS
**Cross-Site Scripting**: lograr que tu página ejecute código del atacante. Ocurre al insertar datos no confiables como HTML.
- React, Vue y compañía **escapan** el texto por defecto. El peligro está en las salidas de emergencia: `dangerouslySetInnerHTML`, `v-html`, `innerHTML`, URLs `javascript:` en `href`.
- Si necesitas HTML de usuarios (markdown, editores ricos), **sanéalo** con una librería probada (DOMPurify).

### CSP
La **Content Security Policy** es una cabecera que dice qué scripts, estilos e imágenes puede cargar la página. Una CSP estricta (con *nonces* o *hashes* y sin `unsafe-inline`) convierte muchos XSS en inofensivos. Empieza en modo *report-only* para descubrir qué romperías.

### CSRF y cookies
**CSRF**: otra web hace que el navegador de la víctima envíe una petición a tu sitio con sus cookies. Defensas: cookies **`SameSite=Lax`** o `Strict`, tokens anti-CSRF y no aceptar cambios con GET.

### ¿Dónde guardo el token?
- `localStorage`: cómodo pero **legible por cualquier XSS**.
- Cookie **`HttpOnly; Secure; SameSite`**: JavaScript no puede leerla, así que un XSS no la roba (aunque puede hacer peticiones en tu nombre mientras está en la página). Suele ser la opción más segura para sesiones.

### CORS no es seguridad del servidor
CORS controla qué **páginas** pueden **leer** respuestas desde un navegador; no impide que alguien llame a tu API con curl. La autorización va siempre en el **servidor**.

### Dependencias
La mayor parte del código que envías no lo escribiste tú. Lockfile, auditorías automáticas (Dependabot o similar), revisar paquetes nuevos y no cargar scripts de terceros sin necesidad (o con **SRI**).

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- XSS: Ataque que inyecta código en una página (p. ej. vía innerHTML con datos del usuario) para ejecutarlo en el navegador de otros.
- CORS: Mecanismo por el que un servidor permite, con cabeceras, que páginas de otro origen lean sus respuestas.
- React: Librería para construir interfaces como funciones del estado, con componentes y reconciliación del DOM.
- CSP: Cabecera que limita qué scripts, estilos y recursos puede cargar una página; mitiga XSS.
- CSRF: Ataque en el que otra web hace que el navegador de la víctima envíe peticiones a tu sitio con sus cookies.
- SRI: Hash en una etiqueta script o link que garantiza que el archivo de un tercero no fue alterado.
- DOMPurify: Librería que sanea HTML no confiable eliminando lo que pueda ejecutar código.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué React previene la mayoría de XSS y dónde deja de hacerlo?
- (comparar) Compara guardar el token de sesión en localStorage o en una cookie HttpOnly.
- (que-pasa-si) ¿Qué pasa si confías en CORS para proteger tu API?
- (aplicar) Tienes que mostrar comentarios en markdown escritos por usuarios. ¿Cómo lo haces seguro?
- (por-que) ¿Por qué una CSP estricta reduce el impacto de un XSS?
- (error-comun) Error común: añadir scripts de terceros sin revisar.
