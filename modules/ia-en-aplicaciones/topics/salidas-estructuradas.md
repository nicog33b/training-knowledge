---
title: Salidas estructuradas (JSON Schema)
summary: Pedir JSON válido contra un esquema, validarlo siempre en el código y
  qué hacer cuando falla; por qué el formato estructurado no garantiza contenido
  correcto.
order: 4
section: integracion
status: done
requires: []
---

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
