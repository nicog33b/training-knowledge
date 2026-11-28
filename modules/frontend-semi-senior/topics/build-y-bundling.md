---
title: Build, bundling y módulos
summary: "Qué hace el bundler (Vite, esbuild, Rollup): módulos ES, tree shaking,
  code splitting, carga diferida y medir el peso del bundle."
order: 6
section: datos-y-calidad
status: done
requires: []
---

## Build, bundling y módulos

El navegador entiende HTML, CSS y JavaScript. Todo lo demás (TypeScript, JSX, imports de paquetes, CSS modules) pasa por una **herramienta de build** antes de llegar al usuario.

### Qué hace un bundler
- **Transforma**: TypeScript y JSX a JavaScript, sintaxis moderna a la que soportan tus navegadores objetivo.
- **Resuelve módulos**: sigue los `import` desde el punto de entrada y construye el **grafo de dependencias**.
- **Empaqueta** en archivos (*bundles*) y los **minifica**, con nombres con hash para cachearlos para siempre.
- En desarrollo, sirve los módulos rápido con recarga en caliente. **Vite** usa módulos ES nativos en desarrollo y Rollup/esbuild para producción.

### Módulos ES y tree shaking
Con `import`/`export` estáticos, el bundler sabe qué se usa. El **tree shaking** elimina exports que nadie importa. Para que funcione: paquetes con módulos ES, sin efectos secundarios al importar, e imports concretos (`import { debounce } from 'lodash-es'` en vez de todo lodash).

### Code splitting
No mandes toda la app en el primer archivo. Con **import dinámico** (`import('./Editor')`) o la carga por rutas del framework, el bundler crea **chunks** que se cargan cuando se necesitan: la página inicial descarga y ejecuta menos JavaScript.

### Medir el peso
- Analizadores de bundle (treemap) para ver qué ocupa más: a menudo una sola dependencia enorme (fechas, iconos, gráficos).
- **Presupuestos** de tamaño en CI que fallen si el bundle crece más de lo acordado.
- Recuerda: el costo no es solo descargar, es **parsear y ejecutar** JavaScript en móviles lentos, lo que afecta a **INP** y LCP.

### Source maps
Permiten ver el código original al depurar o en los informes de errores. Súbelos a tu herramienta de errores; decide si los publicas.
