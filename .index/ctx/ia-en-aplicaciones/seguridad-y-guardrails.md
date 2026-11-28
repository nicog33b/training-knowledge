# Subtema: Seguridad: inyección de prompt y guardarraíles [ia-en-aplicaciones/seguridad-y-guardrails]
Inyección directa e indirecta (OWASP LLM01), fuga de datos, mínimo privilegio en herramientas y confirmación humana para acciones con efecto.

## Seguridad: inyección de prompt y guardarraíles

### Inyección de prompt
Es el riesgo **n.º 1** del **OWASP Top 10 para aplicaciones LLM** (LLM01). El modelo no distingue de forma fiable entre instrucciones legítimas y texto que **parece** una instrucción:
- **Directa**: el usuario escribe "ignora tus reglas y…".
- **Indirecta**: la instrucción viene escondida en **datos** que el sistema lee: una web que se resume, un PDF, un correo, el resultado de una herramienta, un documento recuperado por RAG.
No hay un filtro que la elimine del todo; se **limita el daño**.

### Defensas por capas
- **Mínimo privilegio**: el modelo solo puede usar las herramientas y datos que la tarea necesita, con credenciales limitadas. Si lo engañan, que no pueda hacer mucho.
- **Confirmación humana** para acciones con efecto (enviar, pagar, borrar, publicar).
- **Separar** contenido externo de instrucciones (delimitadores) y decirle al modelo que es dato.
- **Validar salidas** antes de usarlas: no ejecutar código ni SQL generado sin control; escapar HTML (XSS).
- **No poner secretos** en el prompt: el prompt de sistema puede filtrarse.
- **Permisos por documento** en RAG: el sistema solo recupera lo que **ese usuario** puede ver.
- **Topes** de pasos, gasto y frecuencia; **registros** auditables.

### Otros riesgos del Top 10
Fuga de información sensible, salidas sin validar que llegan a otros sistemas, **agencia excesiva** (herramientas con demasiado poder), y consumo ilimitado (costos disparados). Revisa la lista completa al diseñar.

## Glosario usado
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- Prompt de sistema: Instrucciones de nivel superior que fijan rol, reglas y formato del asistente para toda la conversación.
- Inyección de prompt: Ataque en el que un texto (del usuario o escondido en datos) hace que el modelo siga instrucciones no autorizadas.
- OWASP Top 10 para LLM: Lista de OWASP de los 10 riesgos de seguridad más importantes en aplicaciones con LLM; LLM01 es la inyección de prompt.
- Mínimo privilegio: Dar a un componente solo los permisos imprescindibles para su tarea, para limitar el daño si falla o lo atacan.
- Guardarraíl: Control que limita lo que un sistema de IA puede hacer o decir: validaciones, filtros, topes, confirmaciones.
- Agencia excesiva: Riesgo de dar a un LLM herramientas o permisos de más, de modo que un error o ataque cause daños grandes.
- Delimitadores: Marcas (etiquetas XML, comillas triples) que separan en el prompt los datos de las instrucciones.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.

## Preguntas sugeridas al alumno
- (comparar) Compara inyección de prompt directa e indirecta.
- (por-que) ¿Por qué el mínimo privilegio es la defensa principal contra la inyección?
- (que-pasa-si) ¿Qué pasa si un asistente que resume correos también puede reenviarlos sin confirmación?
- (aplicar) Tu RAG interno indexa documentos de RRHH. ¿Qué control es imprescindible?
- (por-que) ¿Por qué no se deben poner claves de API ni secretos en el prompt de sistema?
- (error-comun) Error común: mostrar en la web el HTML o markdown que genera el modelo sin escapar.

## Simulaciones del subtema
- clasificar: ¿Hay riesgo de inyección?

## Herramientas del curso en este subtema
- checklist: Checklist para lanzar una feature con IA — Lo mínimo que debería estar resuelto antes de abrir a usuarios una función con un LLM.
