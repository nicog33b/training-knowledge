---
title: "Seguridad: inyección de prompt y guardarraíles"
summary: Inyección directa e indirecta (OWASP LLM01), fuga de datos, mínimo
  privilegio en herramientas y confirmación humana para acciones con efecto.
order: 11
section: produccion
status: done
requires: []
---

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
