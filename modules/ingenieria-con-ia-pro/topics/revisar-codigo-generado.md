---
title: Revisar código generado por IA
summary: "Qué mirar en un PR de un agente: seguridad, dependencias inventadas,
  tests débiles, duplicación y mantenibilidad; la responsabilidad sigue siendo
  humana."
order: 7
section: flujo
status: done
requires: []
---

## Revisar código generado por IA

El código generado **llega más rápido** que la capacidad de revisarlo. La responsabilidad sigue siendo de quien lo integra: "lo escribió la IA" no es una explicación válida en un incidente.

### Qué mirar especialmente
- **Seguridad**: validación de entradas, inyecciones (SQL, comandos, XSS), secretos en el código, permisos excesivos, criptografía casera. Los modelos reproducen patrones inseguros frecuentes en su entrenamiento.
- **Dependencias**: ¿existe ese paquete y es el que crees? Los modelos a veces **inventan nombres de paquetes**; un atacante puede registrar ese nombre con código malicioso (*slopsquatting*). Verifica cada dependencia nueva.
- **APIs inventadas o antiguas**: métodos que no existen o versiones obsoletas.
- **Tests**: ¿prueban comportamiento real o se limitan a no fallar? ¿Se modificaron tests existentes?
- **Duplicación**: el agente reescribe lo que ya existía en otro módulo en vez de reutilizarlo.
- **Alcance**: cambios que nadie pidió ("aproveché para refactorizar…").
- **Mantenibilidad**: nombres, complejidad, coherencia con las convenciones del repo.

### Cómo revisar a escala
- **PR pequeños** con descripción del porqué y de cómo se verificó.
- Automatiza lo mecánico (linters, análisis estático, escáner de dependencias y secretos) y dedica la revisión humana al **diseño** y la **lógica**.
- Una **segunda IA** puede revisar (Google, Microsoft y otros usan revisión asistida por ML), pero como apoyo: no sustituye la aprobación humana.
- Pide al autor (humano o agente) que **explique** decisiones no obvias en el PR.

### Señal de alarma
Si nadie del equipo puede explicar un trozo de código, no está revisado: está aceptado.
