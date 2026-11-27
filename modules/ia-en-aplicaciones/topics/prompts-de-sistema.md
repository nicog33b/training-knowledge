---
title: Prompt de sistema e instrucciones
summary: Roles (system, user, assistant), cómo escribir instrucciones a la
  altura justa, ejemplos (few-shot) y separar datos de instrucciones.
order: 3
section: fundamentos
status: done
requires: []
---

## Prompt de sistema e instrucciones

Las APIs de chat separan **roles**: el **prompt de sistema** fija quién es el asistente, sus reglas y su formato; los mensajes **user** y **assistant** forman la conversación. El sistema pesa más que un mensaje cualquiera, pero **no es una barrera de seguridad**: un texto malicioso puede intentar saltárselo.

### Instrucciones a la altura justa
- Ni reglas rígidas para cada caso (frágiles) ni vaguedades ("sé útil"). Explica el **objetivo**, el **público**, las **restricciones** y el **formato** de salida, y por qué importan.
- Ordena el prompt en bloques con etiquetas claras (contexto, tarea, formato, ejemplos). Los modelos siguen mejor las instrucciones **estructuradas** que un párrafo largo.
- Di lo que **sí** hay que hacer, no solo lo prohibido.

### Ejemplos (few-shot)
Uno a tres **ejemplos** de entrada→salida enseñan formato y tono mejor que una descripción. Que sean **variados**: si todos se parecen, el modelo copia el detalle irrelevante.

### Separar datos de instrucciones
Todo texto que venga del usuario, de una web o de un documento es **dato**, no instrucción. Envuélvelo en delimitadores (p. ej. etiquetas XML) y dile al modelo que lo trate como contenido a analizar. Reduce errores y es la primera línea —no la única— contra la **inyección de prompt**.

### Versiona tus prompts
Un prompt es **código**: guárdalo en el repositorio, revísalo en PR y mide cada cambio con evals antes de desplegarlo.
