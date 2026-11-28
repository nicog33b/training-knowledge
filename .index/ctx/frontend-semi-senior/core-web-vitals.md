# Subtema: Core Web Vitals: LCP, INP y CLS [frontend-semi-senior/core-web-vitals]
Las tres métricas de experiencia (umbrales en el percentil 75), qué las causa y cómo mejorarlas; INP sustituyó a FID en 2024.

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

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Hilo principal: Hilo del navegador donde corre el JavaScript de la página y que además pinta y responde a la interacción.
- Re-render: Volver a ejecutar un componente para obtener la nueva descripción de la UI tras un cambio.
- Core Web Vitals: Métricas de experiencia de Google: LCP (carga), INP (respuesta) y CLS (estabilidad), medidas en campo al percentil 75.
- LCP: Tiempo hasta que se pinta el elemento más grande visible; bueno ≤ 2,5 s.
- INP: Latencia de las interacciones hasta el siguiente pintado durante toda la visita; bueno ≤ 200 ms. Sustituyó a FID en 2024.
- CLS: Medida de cuánto se mueve el contenido de forma inesperada; bueno ≤ 0,1.
- FID: Métrica antigua (retraso de la primera interacción) reemplazada por INP en marzo de 2024.
- Percentil 75: Valor por debajo del cual está el 75 % de las mediciones; umbral usado en Core Web Vitals.
- Tarea larga: Trabajo en el hilo principal de más de 50 ms que impide responder a la interacción.
- Lighthouse: Herramienta de laboratorio que audita rendimiento, accesibilidad y buenas prácticas de una página.
- CrUX: Conjunto público de datos de campo de usuarios de Chrome sobre Core Web Vitals.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué INP sustituyó a FID?
- (aplicar) Indica los umbrales de «bueno» de LCP, INP y CLS.
- (que-pasa-si) ¿Qué pasa con el CLS si cargas imágenes sin width y height?
- (comparar) Compara datos de laboratorio (Lighthouse) y de campo (RUM/CrUX).
- (aplicar) Tu LCP es 4 s y el elemento LCP es la imagen principal. ¿Qué revisas?
- (error-comun) Error común: optimizar solo para la puntuación de Lighthouse.

## Simulaciones del subtema
- clasificar: ¿Qué métrica empeora?

## Herramientas del curso en este subtema
- calculadora: Presupuesto de JavaScript para INP y LCP — Estima cuánto tarda un móvil en descargar, parsear y ejecutar tu JavaScript inicial, y si cabe en un presupuesto razonable.
