---
title: Testing en frontend
summary: Probar comportamiento como lo usa una persona (Testing Library), qué
  cubrir con unitarios, integración y extremo a extremo, y tests que no se
  rompen al refactorizar.
order: 5
section: datos-y-calidad
status: done
requires: []
---

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
