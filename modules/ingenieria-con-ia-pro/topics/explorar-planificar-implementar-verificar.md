---
title: Explorar → planificar → implementar → verificar
summary: "El ciclo que usan los equipos con agentes: entender antes de tocar,
  plan revisable, cambios pequeños y verificación automática en cada paso."
order: 5
section: flujo
status: done
requires: []
---

## Explorar → planificar → implementar → verificar

El flujo que mejor funciona con agentes de código es un ciclo con **puntos de control humanos** donde el error es barato.

### 1. Explorar
Pide al agente que **lea y explique** las partes relevantes **sin tocar nada**: dónde vive la lógica, qué patrones usa el repo, qué tests existen. Detectas malentendidos antes de que se conviertan en código. En exploraciones grandes, delega a **subagentes** para no llenar el contexto principal.

### 2. Planificar
Pide un **plan** concreto: archivos a cambiar, enfoque, riesgos y cómo se verificará. **Revísalo**: es el momento de mayor palanca, corregir un plan cuesta minutos. Para problemas difíciles, pide alternativas y sus compromisos.

### 3. Implementar
En **pasos pequeños**, cada uno compilable y probado. Pide que siga las convenciones del repo y que no amplíe el alcance. Si se desvía, **interrumpe** pronto y corrige el rumbo en vez de dejar que acumule cambios.

### 4. Verificar
Tests, tipado, linter y **validaciones del proyecto** en cada paso, ejecutados por el agente (que lea la salida) y otra vez en **CI**. Para interfaces, verificación visual (capturas) o tests de extremo a extremo. "Debería funcionar" no es verificación.

### 5. Integrar
**Commits** pequeños con mensajes que expliquen el porqué, **PR** revisado por una persona, y actualización de la documentación y del registro de tareas en la misma sesión.

### Antipatrón
"Implementa todo y avísame": sin exploración ni plan, el agente produce un cambio grande basado en suposiciones, que hay que revisar entero y que a menudo se tira.
