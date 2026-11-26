# Subtema: TypeScript práctico [frontend-semi-senior/typescript-practico]
Tipos que aportan: inferencia, uniones y estrechamiento, genéricos, tipos de utilidad, unknown frente a any y validar en el borde (zod).

## TypeScript práctico

**TypeScript** añade tipos a JavaScript y los comprueba **al compilar**; en tiempo de ejecución desaparecen. Su valor está en detectar errores antes, documentar contratos y hacer refactorizaciones seguras.

### Deja que infiera
No anotes todo: `const total = precios.reduce((a, b) => a + b, 0)` ya es `number`. Anota en los **bordes**: parámetros de funciones públicas, valores de retorno de módulos, props de componentes y respuestas de API.

### Uniones y estrechamiento
Las **uniones** modelan estados reales: `type Estado = { tipo: 'cargando' } | { tipo: 'ok'; datos: Pedido[] } | { tipo: 'error'; mensaje: string }`. Con un campo discriminante (`tipo`), un `switch` **estrecha** el tipo y TypeScript te avisa si olvidas un caso. Así los estados imposibles (datos y error a la vez) no se pueden representar.

### Genéricos
Un **genérico** es un tipo con parámetro: `function primero<T>(lista: T[]): T | undefined`. Permite funciones y componentes reutilizables sin perder información de tipos.

### Tipos de utilidad
`Partial<T>`, `Pick<T, 'a' | 'b'>`, `Omit<T, 'id'>`, `Record<K, V>`, `ReturnType<typeof f>`: derivan tipos de otros en lugar de duplicarlos.

### any frente a unknown
- **`any`** apaga el compilador: todo vale y los errores se propagan en silencio.
- **`unknown`** obliga a comprobar antes de usar. Úsalo para datos de origen incierto.

### Validar en el borde
Los tipos **no validan datos en ejecución**: si la API devuelve otra forma, TypeScript no se entera. Valida en el borde con un esquema (**zod**, valibot) y deriva el tipo del esquema: `type Pedido = z.infer<typeof PedidoSchema>`. Una sola fuente de verdad.

### Configuración
`strict: true` desde el principio. Activarlo en un proyecto grande después cuesta semanas.

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- TypeScript: Superconjunto de JavaScript con tipos estáticos que se comprueban al compilar y desaparecen en ejecución.
- Unión discriminada: Tipo que es una de varias formas, distinguidas por un campo común (p. ej. tipo: 'ok' | 'error').
- Estrechamiento: Cuando TypeScript reduce un tipo amplio a uno concreto tras una comprobación (if, switch, in).
- Genérico: Tipo o función con parámetros de tipo (T) que permite reutilizarla sin perder información de tipos.
- unknown: Tipo de TypeScript para valores de origen incierto: obliga a comprobarlos antes de usarlos (a diferencia de any).
- zod: Librería para declarar esquemas que validan datos en ejecución y de los que se deriva el tipo de TypeScript.
- Props: Datos de solo lectura que un componente recibe de su padre.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué los tipos de TypeScript no te protegen de una API que devuelve otra forma?
- (comparar) Compara any y unknown.
- (aplicar) Modela con tipos el estado de una petición para que «datos y error a la vez» sea imposible.
- (que-pasa-si) ¿Qué pasa si activas strict en un proyecto grande que nunca lo tuvo?
- (por-que) ¿Por qué no anotar el tipo de cada variable?
- (error-comun) Error común: duplicar a mano un tipo que ya existe en otro sitio.
