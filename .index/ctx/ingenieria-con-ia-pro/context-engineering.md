# Subtema: Context engineering en un repositorio [ingenieria-con-ia-pro/context-engineering]
Archivos de instrucciones (CLAUDE.md, AGENTS.md), índices, convenciones y recuperación justo a tiempo: darle al agente el contexto mínimo de alta señal.

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

## Glosario usado
- Repositorio: Carpeta de un proyecto bajo control de versiones (normalmente Git) con todo su historial de cambios.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Context engineering: Curar el conjunto mínimo de información de alta señal que el modelo necesita en cada momento: qué se carga siempre, qué bajo demanda y qué nunca.
- CLAUDE.md: Archivo en el repositorio con instrucciones persistentes para agentes (comandos, arquitectura, convenciones) que se carga en cada sesión.
- Compactar: Resumir el historial de una sesión de agente para liberar contexto sin perder lo importante.

## Preguntas sugeridas al alumno
- (aplicar) ¿Qué debería ir en un CLAUDE.md o AGENTS.md y qué no?
- (por-que) ¿Por qué cada línea del archivo de instrucciones «se paga»?
- (comparar) Compara cargar todo al inicio con recuperación justo a tiempo.
- (aplicar) El agente pregunta en cada sesión cómo se ejecutan los tests. ¿Qué haces?
- (que-pasa-si) ¿Qué pasa si no tienes un índice o mapa del repositorio en un monorepo grande?
- (error-comun) Error común: escribir el archivo de instrucciones una vez y no tocarlo más.

## Herramientas del curso en este subtema
- plantilla: Esqueleto de CLAUDE.md / AGENTS.md — Un archivo de instrucciones corto y de alta señal para tu repositorio: comandos exactos, arquitectura, convenciones y protocolo.
