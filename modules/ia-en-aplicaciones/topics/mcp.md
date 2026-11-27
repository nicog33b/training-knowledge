---
title: "MCP: Model Context Protocol"
summary: Estándar abierto para conectar asistentes con herramientas y datos
  mediante servidores; qué expone un servidor (herramientas, recursos, prompts)
  y sus riesgos.
order: 7
section: integracion
status: done
requires: []
---

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
