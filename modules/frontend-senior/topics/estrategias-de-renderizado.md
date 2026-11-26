---
title: Estrategias de renderizado
summary: "CSR, SSR, SSG, ISR, streaming, hidratación, islas y Server Components:
  qué gana y qué cuesta cada una, y cómo elegir por página."
order: 1
section: arquitectura
status: done
requires: []
---

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
