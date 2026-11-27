---
title: Design systems
summary: "Tokens, componentes accesibles, documentación, versionado y gobierno:
  el producto interno que hace consistente y rápido a todo el equipo."
order: 3
section: arquitectura
status: done
requires: []
---

## Design systems

Un **design system** es un **producto interno**: tokens, componentes, patrones y documentación que hacen que toda la interfaz sea consistente, accesible y rápida de construir.

### Capas
1. **Tokens de diseño**: decisiones con nombre (color, espaciado, tipografía, radios, sombras, movimiento): `--color-texto`, `--espacio-3`. Separados en **primitivos** (`azul-600`) y **semánticos** (`color-accion`), que es lo que usan los componentes. Cambiar de tema o de marca = cambiar el mapa de semánticos.
2. **Componentes**: botón, campo, diálogo, tabla… **accesibles por defecto** (teclado, foco, ARIA correctos) y con una API pequeña y coherente.
3. **Patrones**: cómo se combinan (formularios, estados vacíos, errores, navegación).
4. **Documentación**: cuándo usar cada cosa y cuándo **no**, ejemplos vivos, guías de accesibilidad y de contenido.

### Ingeniería del sistema
- **Versionado semántico** y registro de cambios; deprecaciones con tiempo y *codemods* para migrar.
- **Tests visuales** y de accesibilidad automáticos en cada componente.
- Distribución como paquete (o en el monorepo) y medición de **adopción** (qué equipos usan qué versión, componentes duplicados fuera del sistema).

### Gobierno
Sin un modelo de contribución, el sistema se vuelve un cuello de botella o se fragmenta. Funciona: un equipo núcleo pequeño + contribuciones de los equipos de producto con revisión, y un proceso para **proponer** componentes nuevos basado en necesidades repetidas, no en casos únicos.

### Errores típicos
- Componentes con decenas de props para cubrir cada caso ("prop soup"): mejor **composición**.
- Copiar el sistema de otra empresa sin las necesidades propias.
- Diseño y código desincronizados: los tokens deben ser la **fuente común**.
