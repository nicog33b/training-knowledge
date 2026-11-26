# Subtema: JavaScript esencial: valores, ámbito y closures [frontend-junior/javascript-esencial]
Tipos y comparación, let/const, ámbito de bloque, funciones como valores, closures y referencias frente a copias.

## JavaScript esencial: valores, ámbito y closures

### Tipos y comparación
- **Primitivos**: string, number, boolean, null, undefined, bigint, symbol. Se copian **por valor**.
- **Objetos** (incluidos arrays y funciones): las variables guardan una **referencia**. `const b = a` no copia el objeto: `a` y `b` apuntan al mismo. Copia superficial con `{...obj}` o `[...arr]`; profunda con `structuredClone`.
- Usa siempre **`===`** (sin conversión de tipos). `==` convierte: `0 == ''` es `true`.
- **Falsy**: `false, 0, '', null, undefined, NaN`. Cuidado con `if (cantidad)` cuando 0 es válido; usa `??` (solo null/undefined) en vez de `||` para valores por defecto.

### Declarar variables
- **`const`** por defecto, **`let`** si se reasigna, **nunca `var`** (ámbito de función y *hoisting* confuso).
- `const` impide **reasignar**, no **mutar**: `const lista = []; lista.push(1)` es válido.

### Ámbito
El **ámbito** decide dónde existe una variable. `let`/`const` tienen **ámbito de bloque** (`{ }`). Una función puede leer variables de los ámbitos que la rodean (**ámbito léxico**: donde se escribió, no donde se llama).

### Closures
Una **closure** es una función que **recuerda** las variables de su ámbito aunque ese ámbito ya haya terminado:
```js
function contador() { let n = 0; return () => ++n; }
const c = contador(); c(); c(); // 2
```
Están en todas partes: manejadores de eventos, callbacks, hooks de React. Permiten **estado privado** y también causan errores sutiles cuando una función recuerda un valor **viejo**.

### Funciones como valores
Las funciones se pasan y devuelven como cualquier valor: `map`, `filter`, `reduce`, callbacks. Prefiere funciones **puras** (misma entrada → misma salida, sin efectos) cuando puedas: son fáciles de probar.

## Glosario usado
- Closure: Función que recuerda las variables del ámbito donde se creó aunque ese ámbito haya terminado.
- Ámbito: Zona del código donde una variable existe y es accesible.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué `const lista = []; lista.push(1)` no da error?
- (que-pasa-si) ¿Qué pasa al hacer `const b = a` con un objeto y luego cambiar `b.nombre`?
- (comparar) Compara `||` y `??` para valores por defecto.
- (aplicar) Explica qué es una closure con un ejemplo.
- (por-que) ¿Por qué no usar var?
- (error-comun) Error común: comparar con `==`.
