---
title: Proveedores LLM intercambiables por función y contador de gasto por modelo
summary: "Cada función pide un nivel de modelo y cada proveedor declara su equivalente; el header cuenta lo gastado (tokens × precio del modelo que respondió), por modelo y por día, sin pedir el saldo."
status: proposed
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

**Formato canónico.** El historial y las peticiones internas usan la forma de la API de Anthropic; un adaptador traduce a OpenAI Chat Completions (solo fetch). Una conversación puede seguir con otro proveedor.

**Contador de gasto (reemplaza al saldo estimado).** Cada respuesta suma sus tokens (entrada, salida, caché leído y escrito) × el precio del modelo que respondió (`PRICES`), agrupado por modelo y por día local, en `.data/gasto.json`. El header muestra "hoy · mes"; el panel, hoy / mes / total y una fila por modelo (usado o disponible) con su precio por millón, respuestas, tokens y gasto. Modelos sin precio conocido cuentan tokens y se marcan; el precio se puede dar con `<PROVEEDOR>_PRICE_IN/OUT`. Se puede reiniciar.

## Por qué (evidencia)

- Equivalencias al mismo precio: gpt-6-luna = Haiku 5.5 ($0.10/$0.50, caché $0.01); gpt-6.1-sol = Sonnet 5.5 ($2/$10) (`openai-pricing-docs`, `anthropic-pricing-docs`).
- gpt-6-luna solo usa herramientas en Chat Completions con `reasoning_effort: "none"` (`openai-gpt-6-luna-model`); Ollama no acepta `tool_choice` (`ollama-openai-compat`); Gemini es compatible con OpenAI (`gemini-openai-compat`).
- No existe API de saldo restante en Anthropic ni en OpenAI; solo informes de gasto con clave Admin y horas de retraso (`anthropic-admin-cost-api`, `openai-costs-api-no-balance`). Contar el gasto propio es exacto para esta app, inmediato y no pide claves de administrador ni que el usuario copie su saldo (decisión del dueño, 2026-11-15).

## Límites y qué no sabemos

- Cuenta solo lo que pasa por esta app (chat web y `tk ask`), no otros usos de la misma cuenta.
- Es tan exacto como la tabla `PRICES`: si un proveedor cambia precios, hay que actualizarla (tasks.md T-066). El costo se guarda al momento de cada respuesta, así que un cambio de tabla no reescribe el pasado.
- Equivalencia por precio y nivel, no por calidad medida en nuestras tareas (tasks.md T-074).
