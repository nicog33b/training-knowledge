---
title: "Gobierno: permisos, sandbox, secretos y métricas"
summary: Modos de permiso, entornos aislados, secretos fuera del alcance del
  agente, auditoría y métricas de equipo (DORA) para adoptar IA sin perder
  estabilidad.
order: 10
section: organizacion
status: done
requires: []
---

## Gobierno: permisos, sandbox, secretos y métricas

Adoptar agentes en un equipo es una decisión de **ingeniería y seguridad**, no solo de productividad.

### Permisos y sandbox
- **Modos de permiso**: qué puede hacer el agente sin preguntar (leer, editar, ejecutar ciertos comandos) y qué requiere aprobación (instalar paquetes, red, comandos destructivos, push).
- **Sandbox**: ejecutar el agente en un contenedor o entorno aislado, con red restringida a lo necesario. Si una inyección lo engaña, que el daño quede **contenido**.
- **Mínimo privilegio** en tokens y credenciales: el agente trabaja en ramas, nunca con permisos para desplegar a producción o hacer push a la rama principal.

### Secretos
Nada de claves en el repositorio, en los prompts ni en archivos que el agente lea. Usa gestores de secretos o **proxies** que inyectan credenciales en las peticiones sin que el agente las vea. Escáneres de secretos en CI.

### Inyección por el contexto
Issues, comentarios de PR, documentación externa y salidas de herramientas pueden contener instrucciones (**inyección indirecta**). El agente debe tratarlos como datos y pedir confirmación antes de acciones con efecto fuera de su tarea.

### Auditoría
Registro de qué hizo cada agente (comandos, archivos, PR) y atribución en los commits. Permite revisar incidentes y aprender.

### Métricas de adopción
- **DORA** (despliegues, tiempo de entrega, tasa de fallos, recuperación): la IA debería mejorar el flujo **sin** empeorar la estabilidad.
- Tamaño y tiempo de revisión de PR, retrabajo, bugs escapados.
- Satisfacción y carga cognitiva del equipo.

### Política del equipo
Escribe qué se espera: cuándo usar agentes, qué se revisa siempre, cómo se atribuye, qué datos nunca se comparten con servicios externos. Revísala cada pocos meses: las herramientas cambian rápido.
