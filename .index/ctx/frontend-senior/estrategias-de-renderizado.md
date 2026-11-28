# Subtema: Estrategias de renderizado [frontend-senior/estrategias-de-renderizado]
CSR, SSR, SSG, ISR, streaming, hidratación, islas y Server Components: qué gana y qué cuesta cada una, y cómo elegir por página.

## Estrategias de renderizado

Dónde y cuándo se genera el HTML decide la velocidad percibida, el costo de servidor, el SEO y la complejidad. Un senior elige **por página**, no por moda.

### Las opciones
- **CSR** (*client-side rendering*): el servidor manda un HTML casi vacío y JavaScript construye la página. Simple de desplegar; LCP lento en móviles y peor para SEO. Bien para apps tras login muy interactivas.
- **SSR** (*server-side rendering*): el servidor genera el HTML en **cada petición**. Contenido visible pronto y datos frescos; costo de servidor y el TTFB depende de lo que tarden tus datos.
- **SSG** (*static site generation*): HTML generado **al construir**. Rapidísimo y barato (CDN); los datos son de la última build.
- **ISR / revalidación**: páginas estáticas que se **regeneran** cada cierto tiempo o bajo demanda. Equilibrio entre SSG y frescura.
- **Streaming SSR**: el servidor envía el HTML **por partes**: lo rápido primero, lo lento después (con *Suspense*), sin esperar a todos los datos.

### Hidratación y su costo
Con SSR/SSG en apps de JavaScript, el navegador debe **hidratar**: descargar el JS, volver a ejecutar los componentes y conectar eventos. Hasta entonces la página **se ve pero no responde** (mal INP). Alternativas que reducen ese costo:
- **Islas**: solo se hidratan los componentes interactivos; el resto es HTML estático (Astro, por ejemplo).
- **Server Components**: componentes que se ejecutan **solo en el servidor** y no envían su JS al cliente; solo los componentes cliente se hidratan.

### Cómo elegir
- Contenido público que cambia poco (blog, documentación, marketing) → **SSG/ISR** o islas.
- Contenido personalizado o muy cambiante que debe verse rápido (tienda, feed) → **SSR con streaming** y caché donde se pueda.
- Herramienta interna tras login, muy interactiva → **CSR** o SSR ligero.
Mide con **datos de campo** (LCP, INP) antes y después: la estrategia "moderna" no garantiza mejores números.

## Glosario usado
- SEO: Optimización para buscadores: que las páginas se entiendan e indexen bien.
- Re-render: Volver a ejecutar un componente para obtener la nueva descripción de la UI tras un cambio.
- Revalidación: Volver a pedir datos cacheados para comprobar si cambiaron, mostrando mientras tanto los anteriores.
- LCP: Tiempo hasta que se pinta el elemento más grande visible; bueno ≤ 2,5 s.
- INP: Latencia de las interacciones hasta el siguiente pintado durante toda la visita; bueno ≤ 200 ms. Sustituyó a FID en 2024.
- CSR: Renderizado en el cliente: el servidor envía un HTML casi vacío y JavaScript construye la página en el navegador.
- SSR: Renderizado en el servidor: el HTML se genera en cada petición con los datos del momento.
- SSG: Generar el HTML de las páginas al construir el sitio y servirlo estático desde CDN.
- ISR: Páginas estáticas que se regeneran periódicamente o bajo demanda para mantenerse frescas.
- Hidratación: Ejecutar en el navegador los componentes de un HTML renderizado en servidor para conectarles eventos y estado.
- Streaming SSR: Enviar el HTML del servidor por partes a medida que los datos están listos, en lugar de esperar a todos.
- Islas: Página mayormente estática en la que solo se hidratan los componentes interactivos.
- Server Components: Componentes que se ejecutan solo en el servidor y no envían su JavaScript al cliente.
- TTFB: Tiempo hasta que llega el primer byte de la respuesta del servidor.
- CDN: Red de servidores repartidos geográficamente que sirve contenido desde el punto más cercano al usuario.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué una página con SSR puede verse rápido y aun así tener mal INP?
- (comparar) Compara SSG con ISR.
- (aplicar) Elige estrategia para: blog, ficha de producto con stock y panel interno.
- (que-pasa-si) ¿Qué pasa si renderizas todo en el servidor pero una consulta tarda 3 s?
- (por-que) ¿Por qué los Server Components reducen el JavaScript del cliente?
- (error-comun) Error común: elegir una estrategia de renderizado para toda la app por moda.

## Simulaciones del subtema
- clasificar: ¿Qué estrategia de renderizado?

## Herramientas del curso en este subtema
- comparador: Comparador de estrategias de renderizado — CSR, SSR, SSG, ISR e islas lado a lado.
- decision: ¿Qué estrategia de renderizado para esta página? — Asistente para elegir CSR, SSR, SSG/ISR o islas según SEO, frescura, personalización e interactividad.
