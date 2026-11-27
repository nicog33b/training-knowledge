---
title: Migraciones a escala con LLM (caso Google)
summary: "Cómo Google migra miles de archivos con LLM: buscar los sitios,
  generar cambios, validar con build y tests, y revisión humana; qué porcentaje
  hizo el modelo."
order: 8
section: escala
status: done
requires: []
---

## Migraciones a escala con LLM (caso Google)

Google ha publicado cómo usa LLM para **migraciones de código** en su monorepo (arXiv 2501.06972 y 2504.09691, FSE 2025). Es uno de los casos industriales mejor documentados.

### Qué migraron
Cambios mecánicos pero enormes: identificadores de 32 a 64 bits, **JUnit3 → JUnit4**, Joda-Time → java.time, limpieza de flags experimentales. En su estudio de **39 migraciones** de 3 desarrolladores durante 12 meses, el LLM generó el **74,45 %** de los cambios de código y el **69,46 %** de las ediciones. La migración de JUnit (5.359 archivos, 149.000 líneas) se hizo en **3 meses**, con una estimación de la **mitad** de tiempo, incluso revisándolo todo.

### Cómo lo hacen (el patrón)
1. **Encontrar** los sitios a cambiar con herramientas deterministas (búsqueda en el código, análisis estático), no con el LLM.
2. **Generar** el cambio con el LLM, archivo a archivo, con el contexto relevante.
3. **Validar** automáticamente: compila, pasan los tests, cumple los linters. Si falla, reintentar con el error.
4. **Revisión humana** de los cambios antes de integrarlos, en lotes manejables.

### La lección principal
Los propios autores afirman que **un LLM con prompts simples no basta** salvo para las migraciones más triviales. El valor está en el **pipeline**: descubrimiento determinista + generación + verificación automática + revisión. El LLM es una pieza, no el sistema.

### Cómo aplicarlo en tu equipo
Para migraciones (actualizar un framework, cambiar una API interna): escribe un script que **liste** los sitios, pide al agente que migre en **lotes** pequeños, ejecuta build y tests en cada lote y revisa PR por lote. Mide cuánto del cambio necesitó corrección humana.
