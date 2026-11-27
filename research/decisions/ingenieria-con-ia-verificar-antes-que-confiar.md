---
title: "Cursos de IA para desarrolladores: verificación, contexto y medición
  antes que confianza"
summary: "Enseñar a trabajar con IA como lo documentan Google, Microsoft y
  Anthropic: contexto curado, workflows simples, verificación automática y
  medir; la sensación de rapidez engaña."
status: proposed
confidence: medium
date: 2026-11-26
sources:
  - metr-2025-ai-devs
  - peng-2023-copilot
  - dora-2025-ai
  - google-2025-llm-migrations
  - amershi-2019-hai
  - anthropic-building-agents
  - anthropic-context-engineering
  - anthropic-mcp-2024
  - spacex-ai-platform-jobs
  - owasp-llm-top10-2025
affects:
  - module:ingenieria-con-ia-pro
  - module:ia-en-aplicaciones
---

## Decisión

Los cursos `ia-en-aplicaciones` e `ingenieria-con-ia-pro` enseñan métodos documentados públicamente y con su evidencia y límites:
- **Contexto curado** (archivos de instrucciones del repo, specs, recuperación justo a tiempo) antes que prompts largos.
- **Workflows simples antes que agentes**; agentes solo cuando mejoran algo medible.
- **Verificación automática** (tests, tipado, linters, evals) como condición para aceptar código o salidas de IA; revisión humana de lo que llega a producción.
- **Medir** (tiempo real, defectos, métricas DORA, evals) en vez de fiarse de la sensación de productividad.
- **Seguridad**: mínimo privilegio en herramientas, tratar todo contenido externo como no confiable (inyección indirecta).
- Para cada empresa se dice **qué se sabe y de dónde**: Google (migraciones a escala con LLM, DORA), Microsoft (Copilot RCT, pautas Human-AI), Anthropic (agentes, contexto, MCP). De **SpaceX** no hay metodología publicada: se enseña solo lo que dicen sus ofertas (plataforma de IA, revisión de código con IA, guardarraíles) y se marca como tal.

## Por qué (evidencia)

- En una tarea nueva y acotada, Copilot aceleró un 55,8 % (peng-2023-copilot); en repos maduros con expertos, la IA ralentizó un 19 % y los desarrolladores creían ir un 20 % más rápido (metr-2025-ai-devs) → medir, no sentir.
- DORA 2025: la IA amplifica lo que hay; gana quien tiene arquitectura desacoplada y feedback rápido (dora-2025-ai).
- Google: el LLM generó ~74 % de los cambios en 39 migraciones, pero dentro de un pipeline con validación y revisión; prompts simples no bastan (google-2025-llm-migrations).
- Pautas de interacción humano-IA de Microsoft (amershi-2019-hai); patrones de workflows/agentes (anthropic-building-agents); contexto como recurso finito (anthropic-context-engineering); MCP (anthropic-mcp-2024); OWASP LLM01 (owasp-llm-top10-2025).
- SpaceX: solo ofertas de empleo (spacex-ai-platform-jobs).

## Límites y qué no sabemos

- Casi todas las fuentes son de la propia industria y vistas por resumen (`secondary`).
- El campo cambia cada pocos meses: revisar el curso cada 6 meses (T-105).
- No inventar prácticas internas: si no hay fuente pública, el curso lo dice.
