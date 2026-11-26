---
title: Rendimiento a escala
summary: Presupuestos de rendimiento, RUM, perfilado del hilo principal, caché y
  CDN, y una cultura que evita que la web se degrade con cada release.
order: 4
section: produccion
status: done
requires: []
---

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
