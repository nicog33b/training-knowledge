---
title: Seguridad web para frontend
summary: XSS y cómo lo evitan los frameworks, CSP, CSRF y cookies SameSite,
  CORS, dónde guardar tokens y dependencias vulnerables.
order: 8
section: rendimiento-y-seguridad
status: done
requires: []
---

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
