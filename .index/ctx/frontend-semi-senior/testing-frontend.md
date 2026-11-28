# Subtema: Testing en frontend [frontend-semi-senior/testing-frontend]
Probar comportamiento como lo usa una persona (Testing Library), qué cubrir con unitarios, integración y extremo a extremo, y tests que no se rompen al refactorizar.

## Testing en frontend

El objetivo de los tests es poder **cambiar el código con confianza**. Un test que se rompe cada vez que refactorizas sin cambiar el comportamiento es un costo, no una red.

### Probar como un usuario
**Testing Library** propone buscar elementos como lo haría una persona: por **rol y nombre accesible** (`getByRole('button', { name: 'Comprar' })`), por label o por texto; no por clases CSS ni estructura interna. Ventajas: los tests sobreviven a refactorizaciones y, de paso, comprueban la **accesibilidad** (si no encuentras el botón por su rol, un lector de pantalla tampoco).

### Qué tipo de test
- **Unitarios**: lógica pura (formatear, calcular, validar). Rápidos y baratos.
- **Integración / componente**: un componente o pantalla con sus hijos reales, simulando la red (p. ej. con MSW). Aquí está la mayor parte del valor en frontend.
- **Extremo a extremo** (Playwright, Cypress): flujos críticos en un navegador real (registro, pago). Lentos y algo frágiles: pocos y bien elegidos.
Muchos equipos usan la forma de **"trofeo"**: análisis estático en la base, pocos unitarios, muchos de integración y unos pocos e2e.

### Buenas prácticas
- Un test = un **comportamiento** ("muestra error si el email es inválido").
- Simula la **red**, no tus propios módulos: así pruebas la integración real de tus componentes.
- Usa las consultas **asíncronas** (`findBy…`) para lo que aparece tras una petición, en vez de esperas fijas.
- En e2e, selectores **estables** (roles, `data-testid` si no hay otra) y datos de prueba aislados.

### Lo que no se prueba con tests
Diseño visual: usa **regresión visual** (capturas comparadas) en componentes clave. Rendimiento: medición específica (Lighthouse en CI, RUM).

## Glosario usado
- CI: Integración continua: cada cambio se construye y se prueba automáticamente en un servidor antes de integrarlo.
- Lector de pantalla: Software que lee en voz alta (o en braille) la interfaz usando el árbol de accesibilidad: NVDA, JAWS, VoiceOver, TalkBack.
- Testing Library: Familia de librerías para probar componentes buscando elementos como un usuario: por rol, label o texto.
- Test de extremo a extremo: Prueba que recorre un flujo completo en un navegador real (Playwright, Cypress).
- MSW: Herramienta que intercepta peticiones de red para simular la API en tests y desarrollo.
- Regresión visual: Test que compara capturas de la interfaz con una referencia para detectar cambios visuales no deseados.
- Lighthouse: Herramienta de laboratorio que audita rendimiento, accesibilidad y buenas prácticas de una página.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué buscar elementos por rol y nombre en lugar de por clase CSS?
- (comparar) Compara tests unitarios, de integración y e2e en frontend.
- (que-pasa-si) ¿Qué pasa si tus tests dependen de detalles internos del componente?
- (aplicar) Escribe los casos de test para un formulario de registro.
- (por-que) ¿Por qué usar findBy en vez de esperar 500 ms?
- (error-comun) Error común: mockear tus propios módulos en todos los tests.

## Herramientas del curso en este subtema
- comparador: Comparador de tipos de test — Qué te da y qué cuesta cada tipo de prueba en frontend.
