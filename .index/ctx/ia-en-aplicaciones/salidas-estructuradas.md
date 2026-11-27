# Subtema: Salidas estructuradas (JSON Schema) [ia-en-aplicaciones/salidas-estructuradas]
Pedir JSON válido contra un esquema, validarlo siempre en el código y qué hacer cuando falla; por qué el formato estructurado no garantiza contenido correcto.

## Salidas estructuradas (JSON Schema)

Cuando la respuesta del modelo la va a leer **tu código** (no una persona), pide una **salida estructurada**: JSON que cumple un **JSON Schema** con campos, tipos y valores permitidos.

### Cómo se consigue
- **Modo estructurado / esquema estricto** del proveedor: el decodificador solo permite tokens que mantienen el JSON válido contra el esquema. Es la opción más fiable.
- **Herramienta falsa**: declarar una herramienta cuyo input es el esquema y forzar su uso.
- **Solo instrucciones** ("responde en JSON"): funciona casi siempre… y falla en producción el día menos pensado.

### Valida siempre
Aunque el proveedor garantice la **forma**, vuelve a **validar** en tu código (zod, pydantic): versiones distintas, campos opcionales y límites de tokens pueden romperlo. Si falla: reintenta una vez con el error, y si vuelve a fallar, **degrada** con un mensaje claro en vez de mostrar basura.

### Forma correcta ≠ contenido correcto
El esquema garantiza que hay un campo `precio` numérico, no que el número sea **verdadero**. Las alucinaciones siguen pasando dentro de un JSON perfecto. Por eso:
- Usa **enums** cuando el conjunto de valores es cerrado.
- Pide **citas** o el fragmento de origen para extracciones.
- Comprueba con reglas de negocio lo que se pueda comprobar (sumas, fechas, ids existentes).

### Diseño del esquema
Nombres de campo **descriptivos** y descripciones en cada propiedad: el modelo las lee. Pon primero un campo de **razonamiento breve** si la decisión lo necesita, y al final la respuesta.

## Glosario usado
- JSON: Formato de texto para datos estructurados (objetos, listas, números, cadenas) que entienden casi todos los lenguajes.
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Salida estructurada: Respuesta del modelo en un formato verificable por código, normalmente JSON que cumple un esquema.
- JSON Schema: Estándar para describir la forma de un JSON (campos, tipos, valores permitidos) y validarlo.
- Alucinación: Contenido que el modelo genera con seguridad aparente pero que es falso o no está respaldado por las fuentes.
- Decodificador: Parte que elige los tokens de salida; restringirlo permite garantizar que el texto cumpla una gramática o esquema.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué hay que validar el JSON aunque el proveedor garantice el esquema?
- (comparar) Compara salida estructurada estricta, herramienta falsa y «responde en JSON» en el prompt.
- (que-pasa-si) El JSON es válido pero el campo `total` no coincide con la suma de líneas. ¿Qué falló?
- (aplicar) Diseña el esquema para extraer datos de una factura.
- (por-que) ¿Por qué poner un campo de razonamiento breve antes de la respuesta en el esquema?
- (error-comun) Error común: usar un string libre para un campo que solo admite 4 valores.
