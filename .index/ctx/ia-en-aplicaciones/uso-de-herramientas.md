# Subtema: Uso de herramientas (tool use / function calling) [ia-en-aplicaciones/uso-de-herramientas]
El modelo no ejecuta nada: propone llamadas a funciones que tu código ejecuta. Diseño de herramientas, bucle de llamadas y errores típicos.

## Uso de herramientas (tool use / function calling)

Con **uso de herramientas** el modelo puede pedir acciones: buscar en una base de datos, consultar el tiempo, crear un ticket. Pero **el modelo no ejecuta nada**: devuelve una **llamada propuesta** (nombre + argumentos en JSON) y **tu código** decide si la ejecuta y le devuelve el resultado.

### El bucle
1. Envías el mensaje + la **lista de herramientas** (nombre, descripción, esquema de entrada).
2. El modelo responde con texto o con una o más **llamadas a herramienta**.
3. Tu código **valida** los argumentos, ejecuta y devuelve el **resultado** como un mensaje más.
4. Repite hasta que el modelo responde sin pedir herramientas (o llegas a un **tope de pasos**).

### Diseñar buenas herramientas
- Pocas, con **propósito claro** y sin solaparse: si una persona dudaría qué herramienta usar, el modelo también.
- **Descripciones** que digan cuándo usarla y cuándo no, con ejemplos de argumentos.
- Resultados **compactos** y útiles (no volcar 5.000 filas: pagina o resume). Cada resultado gasta contexto.
- **Errores legibles**: "fecha inválida, usa AAAA-MM-DD" permite al modelo corregirse.

### Seguridad
Trata los argumentos como **entrada no confiable**: valida, aplica **mínimo privilegio** (credenciales con el permiso justo), pon **topes** (pasos, tiempo, gasto) y pide **confirmación humana** para acciones irreversibles (pagar, borrar, enviar). Un resultado de herramienta puede traer texto malicioso: es la vía de la **inyección indirecta**.

## Glosario usado
- JSON: Formato de texto para datos estructurados (objetos, listas, números, cadenas) que entienden casi todos los lenguajes.
- Uso de herramientas: Capacidad del modelo de proponer llamadas a funciones (nombre + argumentos JSON) que el código de la app ejecuta y le devuelve.
- Inyección de prompt: Ataque en el que un texto (del usuario o escondido en datos) hace que el modelo siga instrucciones no autorizadas.
- Mínimo privilegio: Dar a un componente solo los permisos imprescindibles para su tarea, para limitar el daño si falla o lo atacan.

## Preguntas sugeridas al alumno
- (por-que) ¿Quién ejecuta realmente una herramienta cuando el modelo «la usa»?
- (que-pasa-si) ¿Qué pasa si una herramienta devuelve 5.000 filas de la base de datos?
- (comparar) Compara una herramienta `ejecutar_sql(consulta)` con `buscar_pedidos(cliente_id, estado)`.
- (aplicar) El modelo llama a la herramienta con una fecha en formato incorrecto. ¿Qué debería devolverle tu código?
- (por-que) ¿Por qué las descripciones de las herramientas importan tanto?
- (error-comun) Error común: dejar que el agente envíe correos a clientes sin revisión.

## Herramientas del curso en este subtema
- decision: ¿Una llamada, un workflow o un agente? — Asistente para elegir la arquitectura más simple que resuelve tu caso, siguiendo la regla de empezar por lo simple y añadir complejidad solo si mejora algo medible.
