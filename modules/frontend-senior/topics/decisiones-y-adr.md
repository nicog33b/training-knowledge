---
title: Decisiones técnicas y ADR
summary: Cómo decidir con compromisos explícitos, documentar en Architecture
  Decision Records y revisar decisiones cuando cambia el contexto.
order: 6
section: liderazgo
status: done
requires: []
---

## Decisiones técnicas y ADR

Un senior se distingue menos por saber la respuesta correcta y más por **decidir bien con información incompleta** y dejar el porqué por escrito.

### Decidir con compromisos explícitos
1. **Contexto y problema**: qué necesitamos y qué restricciones hay (plazo, equipo, presupuesto, requisitos no funcionales).
2. **Opciones** reales (al menos dos, incluida "no hacer nada" o "lo más simple").
3. **Criterios** ponderados: rendimiento, costo, complejidad operativa, curva de aprendizaje, reversibilidad, riesgo.
4. **Decisión** y **consecuencias**: lo que ganamos y lo que aceptamos perder.
Distingue decisiones **reversibles** (decide rápido, aprende) de **irreversibles** o caras de revertir (más análisis, prototipo, opinión de más gente).

### ADR
Un **Architecture Decision Record** es un documento corto (una página) por decisión importante: título, fecha, estado (propuesta, aceptada, reemplazada), contexto, decisión, alternativas consideradas y consecuencias. Se guarda en el **repositorio** junto al código y se revisa como un PR.
- No se edita para cambiar la historia: si la decisión cambia, se escribe un ADR nuevo que **reemplaza** al anterior.
- Responde a la pregunta que todo recién llegado hace: "¿por qué está hecho así?".

### Evidencia
Prototipos pequeños y **mediciones** valen más que opiniones: un benchmark de 2 días puede ahorrar meses. Cita las fuentes (documentación, artículos, datos propios) y su fiabilidad.

### Revisar decisiones
Pon fecha o condición de revisión ("si superamos 1 M de usuarios", "en 6 meses"). Cambiar una decisión cuando cambia el contexto no es un fracaso; mantenerla por inercia sí.
