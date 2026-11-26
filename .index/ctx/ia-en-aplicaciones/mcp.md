# Subtema: MCP: Model Context Protocol [ia-en-aplicaciones/mcp]
Estándar abierto para conectar asistentes con herramientas y datos mediante servidores; qué expone un servidor (herramientas, recursos, prompts) y sus riesgos.

## MCP: Model Context Protocol

El **Model Context Protocol** (MCP) es un **estándar abierto**, publicado por Anthropic en noviembre de 2024, para conectar aplicaciones de IA con herramientas y datos. Sin estándar, cada app tenía que integrar cada servicio a mano (N apps × M servicios); con MCP, un servicio expone **un servidor MCP** y cualquier cliente compatible lo usa.

### Piezas
- **Host / cliente**: la app de IA (un IDE, un chat de escritorio, un agente de código) que se conecta a servidores.
- **Servidor MCP**: programa que expone capacidades de un sistema (GitHub, una base de datos, el sistema de archivos).
- Lo que expone un servidor: **herramientas** (acciones que el modelo puede invocar), **recursos** (datos que se pueden leer) y **prompts** (plantillas reutilizables).
- **Transporte**: local por entrada/salida estándar o remoto por HTTP.

### Por qué importa
- **Reutilización**: escribes la integración una vez y sirve para varios clientes y modelos (no solo Claude).
- **Separación**: el servidor controla credenciales y permisos; el modelo solo ve herramientas.

### Riesgos
Instalar un servidor MCP es **instalar código** con acceso a tus datos:
- Revisa **de dónde viene** y qué permisos pide (mínimo privilegio, tokens de solo lectura cuando baste).
- Las descripciones de herramientas y los resultados entran al contexto: un servidor malicioso o un dato manipulado pueden **inyectar instrucciones**.
- Pide **confirmación** para herramientas con efectos y registra lo que se ejecuta.

## Glosario usado
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- MCP: Model Context Protocol: estándar abierto (2024) para que apps de IA usen herramientas, recursos y prompts expuestos por servidores.
- Mínimo privilegio: Dar a un componente solo los permisos imprescindibles para su tarea, para limitar el daño si falla o lo atacan.

## Preguntas sugeridas al alumno
- (por-que) ¿Qué problema resuelve MCP?
- (comparar) Compara herramientas, recursos y prompts en un servidor MCP.
- (que-pasa-si) ¿Qué pasa si instalas un servidor MCP de origen desconocido con tu token de GitHub con todos los permisos?
- (aplicar) Quieres que tu agente consulte la base de datos interna. ¿MCP o herramienta propia?
- (por-que) ¿Por qué MCP no hace seguro por sí solo usar herramientas?
- (error-comun) Error común: pensar que MCP solo funciona con Claude.
