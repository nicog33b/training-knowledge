---
title: Proveedores LLM intercambiables por función y saldo estimado
summary: "Cada función pide un nivel de modelo (rápido/equilibrado/potente) y cada proveedor declara su equivalente al mismo precio; el saldo se estima (declarado − gasto medido) porque no hay API de saldo."
status: superseded
supersededBy: proveedores-llm-y-contador-de-gasto
confidence: medium
date: 2026-11-15
sources:
  - anthropic-pricing-docs
  - openai-pricing-docs
  - openai-gpt-6-luna-model
  - ollama-openai-compat
  - gemini-openai-compat
  - anthropic-admin-cost-api
  - openai-costs-api-no-balance
affects:
  - all
  - package:llm
  - package:tutor
  - app:web
---

## Decisión

**Niveles, no modelos.** Cada función usa un nivel (`packages/llm/src/models.ts` → `FUNCTIONS`): tutor, corrección y recetas = `rapido`; simulación a medida = `potente`. Cada proveedor declara su modelo por nivel:

| Nivel | Claude | ChatGPT (OpenAI) |
|---|---|---|
| rápido | claude-haiku-5-5 | gpt-6-luna (mismo precio) |
| equilibrado | claude-sonnet-5-5 | gpt-6.1-sol (mismo precio) |
| potente | claude-opus-5-5 | gpt-6-astra (más caro: $10/$50 vs $4/$20) |

Gemini, Ollama y "compatible" (OpenRouter, Groq, LM Studio…) no tienen equivalencia verificada: el modelo se da por entorno.

**Formato canónico.** El historial y las peticiones internas usan la forma de la API de Anthropic; un adaptador traduce a OpenAI Chat Completions (sin SDK, solo fetch). Así una conversación puede seguir con otro proveedor y el tutor no conoce a ninguno.

**Saldo estimado.** Restante ≈ saldo que el usuario declara (copiado de la consola) − gasto que la app mide por tokens en cada respuesta (`.data/credito.json`). Se muestra en el header.

## Por qué (evidencia)

- gpt-6-luna cuesta $0.10/$0.50 por millón con caché a $0.01, igual que Haiku 5.5; gpt-6.1-sol $2/$10, igual que Sonnet 5.5 (`openai-pricing-docs`, `anthropic-pricing-docs`). Cambiar de proveedor no cambia el presupuesto.
- gpt-6-luna solo usa herramientas en Chat Completions con `reasoning_effort: "none"` (`openai-gpt-6-luna-model`): el preset lo envía.
- Ollama y Gemini exponen endpoints compatibles con OpenAI; Ollama no acepta `tool_choice` (`ollama-openai-compat`, `gemini-openai-compat`): por eso el tope de lecturas no depende de `tool_choice`.
- Ni Anthropic ni OpenAI exponen el saldo restante; solo informes de gasto con clave Admin y retraso de horas (`anthropic-admin-cost-api`, `openai-costs-api-no-balance`). Una clave Admin da poder de dueño de la organización: no se guarda para un contador.

## Límites y qué no sabemos

- Equivalencia por precio y nivel, no por calidad medida en nuestras tareas: falta comparar respuestas del tutor entre proveedores (tasks.md).
- El saldo estimado se desvía si se usa la misma cuenta fuera de esta app; hay que redeclararlo de vez en cuando.
- Los precios cambian; los nombres de modelo de OpenAI cambian rápido. Revisar `PRICES` antes de presupuestar.
