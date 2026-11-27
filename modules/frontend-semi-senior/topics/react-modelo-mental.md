---
title: El modelo mental de React
summary: "UI = f(estado): renderizado, props y estado, inmutabilidad, keys en
  listas y qué provoca un re-render."
order: 2
section: lenguaje-y-modelo
status: done
requires: []
---

## El modelo mental de React

La idea central: **la interfaz es una función del estado**. Tú describes cómo debe verse la UI para un estado dado; React se encarga de actualizar el DOM cuando el estado cambia.

### Componentes, props y estado
- Un **componente** es una función que recibe **props** (datos del padre, de solo lectura) y devuelve JSX.
- El **estado** (`useState`) son datos propios que cambian con el tiempo. Cambiarlo con el *setter* provoca un **re-render** del componente y sus hijos.
- Lo que se puede **calcular** a partir de props o estado **no es estado**: calcúlalo al renderizar (`const total = items.reduce(...)`). Duplicarlo en otro estado es fuente de bugs de sincronización.

### Inmutabilidad
React detecta cambios comparando **referencias**. Si mutas un array (`items.push(x)`) y llamas al setter con el mismo array, puede no re-renderizar. Crea uno nuevo: `setItems([...items, x])`, `setUser({ ...user, nombre })`.

### Renderizar no es pintar
Un **render** es llamar a tu función para obtener la descripción de la UI. React compara (**reconciliación**) con la anterior y solo toca el DOM donde hay diferencias. Por eso los renders deben ser **puros**: sin peticiones, sin mutar variables externas.

### Keys en listas
La **key** identifica cada elemento entre renders. Usa un id **estable** del dato, no el índice: con índices, al insertar o reordenar, React confunde elementos y mezcla su estado (un input con el texto de otra fila).

### Estado: dónde vive
Pon el estado en el componente **más bajo** que lo necesite; si dos hermanos lo comparten, súbelo al **padre común** y pásalo por props. Si tienes que pasar props por muchos niveles, considera **context** (para datos que cambian poco) o reestructurar componentes.

### Qué provoca re-renders
Cambio de estado propio, re-render del padre o cambio de un context que consume. Que algo se re-renderice **no es un problema** por sí mismo; solo optimiza (`memo`, `useMemo`) cuando lo midas.
