# Subtema: Build, bundling y módulos [frontend-semi-senior/build-y-bundling]
Qué hace el bundler (Vite, esbuild, Rollup): módulos ES, tree shaking, code splitting, carga diferida y medir el peso del bundle.

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

## Glosario usado
- CI: Integración continua: cada cambio se construye y se prueba automáticamente en un servidor antes de integrarlo.
- TypeScript: Superconjunto de JavaScript con tipos estáticos que se comprueban al compilar y desaparecen en ejecución.
- useEffect: Hook de React para sincronizar un componente con un sistema externo, con dependencias y función de limpieza.
- Bundler: Herramienta que transforma, resuelve y empaqueta módulos para el navegador (Vite, Rollup, esbuild, webpack).
- Tree shaking: Eliminar del bundle los exports que nadie importa, posible gracias a los módulos ES estáticos.
- Code splitting: Dividir el JavaScript en partes que se cargan cuando se necesitan (por ruta o con import dinámico).
- Módulos ES: Sistema estándar de módulos de JavaScript con import/export estáticos.
- Source map: Archivo que relaciona el código generado con el original para depurar y leer errores.
- LCP: Tiempo hasta que se pinta el elemento más grande visible; bueno ≤ 2,5 s.
- INP: Latencia de las interacciones hasta el siguiente pintado durante toda la visita; bueno ≤ 200 ms. Sustituyó a FID en 2024.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el tree shaking necesita módulos ES?
- (comparar) Compara importar todo lodash y `import { debounce } from 'lodash-es'`.
- (aplicar) Tu editor de texto enriquecido pesa 300 KB y solo se usa en una página. ¿Qué haces?
- (que-pasa-si) ¿Qué pasa con INP si mandas 1 MB de JavaScript a un móvil de gama baja?
- (por-que) ¿Para qué sirven los nombres de archivo con hash?
- (error-comun) Error común: añadir una dependencia enorme para una función pequeña sin mirar el peso.

## Herramientas del curso en este subtema
- calculadora: Presupuesto de JavaScript para INP y LCP — Estima cuánto tarda un móvil en descargar, parsear y ejecutar tu JavaScript inicial, y si cabe en un presupuesto razonable.
