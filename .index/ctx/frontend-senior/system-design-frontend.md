# Subtema: System design de frontend [frontend-senior/system-design-frontend]
Cómo abordar el diseño de un sistema frontend (feed, autocompletar, editor): requisitos, modelo de datos, API, estado, rendimiento, accesibilidad y fallos.

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

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Lector de pantalla: Software que lee en voz alta (o en braille) la interfaz usando el árbol de accesibilidad: NVDA, JAWS, VoiceOver, TalkBack.
- XSS: Ataque que inyecta código en una página (p. ej. vía innerHTML con datos del usuario) para ejecutarlo en el navegador de otros.
- Debounce: Esperar a que pare una ráfaga de eventos (p. ej. teclear) antes de ejecutar la acción.
- Conflicto: Situación en la que dos ramas cambian las mismas líneas y Git necesita que una persona decida el resultado.
- Foco: Indicador del elemento que recibe la entrada del teclado; debe verse siempre.
- Datos del servidor: Copia en caché de datos que viven en el servidor: necesita revalidación, invalidación y deduplicación.
- Code splitting: Dividir el JavaScript en partes que se cargan cuando se necesitan (por ruta o con import dinámico).
- APG: Guía del W3C con patrones accesibles (diálogo, pestañas, combobox) y su comportamiento de teclado.
- CSR: Renderizado en el cliente: el servidor envía un HTML casi vacío y JavaScript construye la página en el navegador.
- SSR: Renderizado en el servidor: el HTML se genera en cada petición con los datos del momento.
- Virtualización: Renderizar solo los elementos visibles de una lista larga para ahorrar DOM y trabajo.
- Paginación por cursor: Paginar con un marcador del último elemento visto en lugar de un número de página; estable ante inserciones.
- SSE: Canal HTTP en el que el servidor envía eventos al cliente de forma continua (una sola dirección).
- WebSocket: Conexión persistente y bidireccional entre navegador y servidor para tiempo real.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué empezar un system design preguntando requisitos?
- (comparar) Compara paginación por offset y por cursor para un feed.
- (aplicar) Diseña un autocompletar accesible y eficiente.
- (que-pasa-si) ¿Qué pasa si renderizas 10.000 elementos en un feed sin virtualizar?
- (por-que) ¿Por qué normalizar los datos en el cliente?
- (error-comun) Error común: saltar directo a elegir el framework en una entrevista de system design.

## Herramientas del curso en este subtema
- decision: ¿Qué estrategia de renderizado para esta página? — Asistente para elegir CSR, SSR, SSG/ISR o islas según SEO, frescura, personalización e interactividad.
