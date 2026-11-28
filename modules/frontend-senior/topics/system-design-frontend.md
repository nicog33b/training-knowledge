---
title: System design de frontend
summary: "Cómo abordar el diseño de un sistema frontend (feed, autocompletar,
  editor): requisitos, modelo de datos, API, estado, rendimiento, accesibilidad
  y fallos."
order: 8
section: liderazgo
status: done
requires: []
---

## System design de frontend

En entrevistas y en el trabajo real, te piden diseñar un sistema frontend: un **feed infinito**, un **autocompletar**, un **editor colaborativo**, un **chat**. Lo que se evalúa es el **razonamiento estructurado** y los compromisos, no una respuesta única.

### Un marco para cualquier problema
1. **Requisitos**: funcionales (qué hace) y no funcionales (rendimiento, offline, accesibilidad, i18n, dispositivos, escala). Pregunta antes de diseñar.
2. **Arquitectura de alto nivel**: componentes principales, dónde se renderiza (CSR/SSR), qué vive en el cliente y qué en el servidor.
3. **Modelo de datos**: entidades y su forma en el cliente (normalizadas por id), qué se cachea y cómo se invalida.
4. **Interfaz con el servidor (API)**: endpoints o consultas, **paginación** (por cursor mejor que por offset en feeds), tiempo real (polling, SSE, WebSocket), errores y reintentos.
5. **Estado y flujo**: estado local, datos del servidor, URL; actualizaciones optimistas.
6. **Rendimiento**: virtualización de listas largas, carga diferida de imágenes, code splitting, **debounce** y cancelación en búsquedas, caché.
7. **Accesibilidad**: patrón de teclado y lector de pantalla del componente (p. ej. combobox de la APG para autocompletar), foco al cargar más.
8. **Fallos y bordes**: red lenta o caída, datos vacíos, conflictos, seguridad (XSS en contenido de usuarios).

### Ejemplo: autocompletar
Debounce de ~200 ms, cancelar peticiones viejas (o ignorar respuestas fuera de orden), caché por término, mínimo de caracteres, resaltar coincidencias, patrón **combobox** accesible (flechas, Enter, Escape, opciones anunciadas), estado vacío y de error, y límite de resultados.

### Cómo comunicarlo
Piensa en voz alta, dibuja, declara supuestos, ofrece **alternativas con sus compromisos** y prioriza: primero algo que funcione, después lo optimizas.
