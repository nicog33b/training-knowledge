---
title: "Core Web Vitals: LCP, INP y CLS"
summary: Las tres métricas de experiencia (umbrales en el percentil 75), qué las
  causa y cómo mejorarlas; INP sustituyó a FID en 2024.
order: 7
section: rendimiento-y-seguridad
status: done
requires: []
---

## Core Web Vitals: LCP, INP y CLS

Google define tres **Core Web Vitals** para medir la experiencia real. Se evalúan con datos **de campo** (usuarios reales) en el **percentil 75**: el 75 % de las visitas debe estar en "bueno".

### Las tres métricas
- **LCP** (*Largest Contentful Paint*): cuándo se pinta el **elemento más grande** visible (imagen principal, titular). Bueno **≤ 2,5 s**.
- **INP** (*Interaction to Next Paint*): latencia de las **interacciones** (clic, tecla, toque) hasta el siguiente pintado, a lo largo de toda la visita. Bueno **≤ 200 ms**, malo > 500 ms. **Sustituyó a FID el 12 de marzo de 2024**: FID solo medía la primera interacción y solo el retraso de entrada.
- **CLS** (*Cumulative Layout Shift*): cuánto **se mueve** el contenido inesperadamente. Bueno **≤ 0,1**.

### Qué las estropea y cómo se arreglan
- **LCP**: servidor lento, imagen principal pesada o descubierta tarde, CSS/JS que bloquean el renderizado. → Imagen optimizada y con prioridad (`fetchpriority="high"`, sin carga diferida), precarga, renderizado en servidor, CDN.
- **INP**: tareas largas de JavaScript en el hilo principal, manejadores pesados, renders enormes. → Menos JavaScript, dividir tareas largas y ceder el control, feedback inmediato antes del trabajo pesado, mover cálculo a workers, evitar re-renders masivos.
- **CLS**: imágenes y anuncios sin tamaño reservado, fuentes que cambian de métrica, contenido insertado arriba. → `width`/`height` o `aspect-ratio`, espacio reservado, `font-display` y fuentes con métricas ajustadas.

### Laboratorio frente a campo
**Lighthouse** (laboratorio) es útil para depurar, pero no mide INP real ni tus usuarios. Usa datos de **campo** (CrUX, la librería web-vitals en tu RUM) para saber cómo va de verdad y el laboratorio para investigar por qué.
