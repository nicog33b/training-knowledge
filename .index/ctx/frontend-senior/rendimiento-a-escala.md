# Subtema: Rendimiento a escala [frontend-senior/rendimiento-a-escala]
Presupuestos de rendimiento, RUM, perfilado del hilo principal, caché y CDN, y una cultura que evita que la web se degrade con cada release.

## Rendimiento a escala

El rendimiento no se arregla una vez: se **degrada con cada release** si nadie lo vigila. A escala, es un problema de **proceso**, no solo de técnica.

### Presupuestos
Un **presupuesto de rendimiento** fija límites medibles: KB de JavaScript por ruta, LCP e INP en el percentil 75, número de peticiones. Se comprueban en **CI** (tamaño de bundle, Lighthouse en páginas clave) y en **producción** (RUM) con alertas. Un PR que rompe el presupuesto necesita una justificación explícita.

### Medir en campo
**RUM** (*Real User Monitoring*): la librería web-vitals (o tu proveedor) envía LCP, INP y CLS de usuarios reales con atributos (página, dispositivo, país, versión). Permite ver **regresiones por release** y priorizar donde están los usuarios, no tu portátil. Para INP, registra también **qué interacción** fue lenta y qué script la causó (atribución).

### Perfilar
El panel de rendimiento del navegador muestra **tareas largas** del hilo principal, renders, recálculos de estilo y layout. El profiler de React muestra qué componentes renderizan y por qué. Optimiza lo que **el perfil** señala, no lo que intuyes.

### Palancas grandes
- **Enviar menos JavaScript**: code splitting por ruta, eliminar dependencias, Server Components o islas.
- **Caché y CDN**: recursos estáticos con hash y caché larga, HTML con caché en el borde cuando se pueda, `stale-while-revalidate`.
- **Imágenes y fuentes**: formatos modernos, tamaños adecuados, prioridad para el LCP, subconjuntos de fuentes.
- **Terceros**: analítica, chats y anuncios suelen ser lo más pesado. Inventaríalos, cárgalos diferidos y mide su costo.

### Cultura
Paneles visibles, un responsable por métrica, revisión de rendimiento en features grandes y celebrar mejoras. Sin eso, cada equipo optimiza su parte y la página total empeora.

## Glosario usado
- CI: Integración continua: cada cambio se construye y se prueba automáticamente en un servidor antes de integrarlo.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Hilo principal: Hilo del navegador donde corre el JavaScript de la página y que además pinta y responde a la interacción.
- React: Librería para construir interfaces como funciones del estado, con componentes y reconciliación del DOM.
- Code splitting: Dividir el JavaScript en partes que se cargan cuando se necesitan (por ruta o con import dinámico).
- LCP: Tiempo hasta que se pinta el elemento más grande visible; bueno ≤ 2,5 s.
- INP: Latencia de las interacciones hasta el siguiente pintado durante toda la visita; bueno ≤ 200 ms. Sustituyó a FID en 2024.
- CLS: Medida de cuánto se mueve el contenido de forma inesperada; bueno ≤ 0,1.
- Percentil 75: Valor por debajo del cual está el 75 % de las mediciones; umbral usado en Core Web Vitals.
- Tarea larga: Trabajo en el hilo principal de más de 50 ms que impide responder a la interacción.
- Lighthouse: Herramienta de laboratorio que audita rendimiento, accesibilidad y buenas prácticas de una página.
- Islas: Página mayormente estática en la que solo se hidratan los componentes interactivos.
- Server Components: Componentes que se ejecutan solo en el servidor y no envían su JavaScript al cliente.
- CDN: Red de servidores repartidos geográficamente que sirve contenido desde el punto más cercano al usuario.
- Presupuesto de rendimiento: Límites medibles (KB de JS, LCP, INP) que un cambio no debe superar, comprobados en CI y producción.
- RUM: Medición del rendimiento y los errores en los navegadores de usuarios reales.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el rendimiento empeora solo si nadie lo vigila?
- (aplicar) Define un presupuesto de rendimiento para la página de producto.
- (comparar) Compara optimizar por intuición y optimizar por perfil.
- (que-pasa-si) ¿Qué pasa si añades un chat de soporte de terceros a todas las páginas?
- (por-que) ¿Por qué el RUM debe registrar la versión desplegada?
- (error-comun) Error común: confiar en que «el CDN lo hace rápido».

## Herramientas del curso en este subtema
- checklist: Checklist de lanzamiento seguro en frontend — Antes de abrir una funcionalidad importante a todos los usuarios.
