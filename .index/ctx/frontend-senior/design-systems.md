# Subtema: Design systems [frontend-senior/design-systems]
Tokens, componentes accesibles, documentación, versionado y gobierno: el producto interno que hace consistente y rápido a todo el equipo.

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

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- ARIA: Atributos (role, aria-label, aria-expanded…) que añaden semántica cuando HTML no alcanza; mal usados empeoran la accesibilidad.
- Foco: Indicador del elemento que recibe la entrada del teclado; debe verse siempre.
- Props: Datos de solo lectura que un componente recibe de su padre.
- Design system: Conjunto de tokens, componentes, patrones y documentación que hace consistente la interfaz de un producto.
- Tokens de diseño: Decisiones de diseño con nombre (color, espaciado, tipografía) usadas como fuente común por diseño y código.
- Versionado semántico: Esquema MAYOR.MENOR.PARCHE: cambios incompatibles suben MAYOR, nuevas funciones MENOR y correcciones PARCHE.
- Codemod: Script que modifica código automáticamente para migrar a una nueva API.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué separar tokens primitivos y semánticos?
- (que-pasa-si) ¿Qué pasa si un componente acumula 40 props para cubrir cada caso?
- (comparar) Compara un design system con una librería de componentes.
- (aplicar) Vas a cambiar la API del componente Botón. ¿Cómo lo haces sin romper a todos?
- (por-que) ¿Por qué los componentes del sistema deben ser accesibles por defecto?
- (error-comun) Error común: un design system que solo mantiene un equipo central sin contribuciones.
