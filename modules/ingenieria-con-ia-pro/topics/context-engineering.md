---
title: Context engineering en un repositorio
summary: "Archivos de instrucciones (CLAUDE.md, AGENTS.md), índices,
  convenciones y recuperación justo a tiempo: darle al agente el contexto mínimo
  de alta señal."
order: 3
section: contexto
status: done
requires: []
---

## Context engineering en un repositorio

**Context engineering** es curar el conjunto mínimo de información de **alta señal** que el modelo necesita en cada momento (Anthropic, 2025). En un repositorio significa decidir qué sabe el agente **siempre**, qué **descubre** cuando lo necesita y qué **nunca** debería cargar.

### Instrucciones persistentes del repo
Archivos como **CLAUDE.md** o **AGENTS.md** en la raíz (y en subcarpetas) se cargan en cada sesión:
- Comandos para **construir, probar y validar** (exactos, copiables).
- **Arquitectura** en pocas líneas y reglas de dependencia.
- **Convenciones** que el código no muestra solo ("no usar enums", "fechas en UTC").
- **Protocolos**: "empieza leyendo el índice", "tras cambiar contenido ejecuta X".
Cortos y concretos: cada línea se paga en **cada** sesión. Lo que es largo o ocasional va a documentos aparte que se leen **cuando hace falta**.

### Contexto justo a tiempo
- **Índices** generados (mapa de módulos, resúmenes por carpeta) para que el agente sepa **qué existe** sin leerlo todo.
- Herramientas de **búsqueda** y lectura por partes en lugar de pegar archivos enteros.
- **Habilidades** o guías por tarea que se cargan solo cuando la tarea las necesita.

### Señales que el contexto está mal
El agente pregunta cosas que están documentadas, rompe convenciones, repite la misma exploración en cada sesión o se pierde en sesiones largas. Respuesta: **escribirlo una vez** en el archivo de instrucciones o en un índice.

### Higiene de sesión
Una tarea por sesión, **compactar** o empezar de cero cuando el contexto se llena, y pedir resúmenes de lo explorado antes de implementar.
