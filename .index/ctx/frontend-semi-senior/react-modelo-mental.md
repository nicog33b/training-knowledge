# Subtema: El modelo mental de React [frontend-semi-senior/react-modelo-mental]
UI = f(estado): renderizado, props y estado, inmutabilidad, keys en listas y qué provoca un re-render.

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

## Glosario usado
- DOM: Árbol de objetos que representa la página y que JavaScript puede leer y modificar.
- React: Librería para construir interfaces como funciones del estado, con componentes y reconciliación del DOM.
- Props: Datos de solo lectura que un componente recibe de su padre.
- Re-render: Volver a ejecutar un componente para obtener la nueva descripción de la UI tras un cambio.
- Reconciliación: Proceso por el que React compara la nueva descripción de la UI con la anterior y solo cambia lo necesario en el DOM.
- Key: Identificador estable de cada elemento de una lista para que React conserve su estado entre renders.
- Context: Mecanismo de React para pasar datos a muchos componentes sin pasarlos por props nivel a nivel.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué no hay que guardar en estado algo que se puede calcular?
- (que-pasa-si) ¿Qué pasa si usas el índice del array como key y luego insertas un elemento al principio?
- (por-que) ¿Por qué `items.push(x); setItems(items)` puede no re-renderizar?
- (comparar) Compara props y estado.
- (aplicar) Dos componentes hermanos necesitan el filtro seleccionado. ¿Dónde lo pones?
- (error-comun) Error común: llenar el código de memo y useMemo «por rendimiento».

## Herramientas del curso en este subtema
- decision: ¿Dónde debería vivir este estado? — Asistente para decidir entre estado local, padre común, URL, librería de datos del servidor o store global.
