---
title: Qué hacen Google, Microsoft, Anthropic y SpaceX
summary: Lo publicado por cada empresa sobre trabajar con IA, con su fuente y su
  límite; y lo que NO se sabe (SpaceX solo tiene ofertas de empleo públicas).
order: 11
section: organizacion
status: done
requires: []
---

## Qué hacen Google, Microsoft, Anthropic y SpaceX

Lo que **publican** las empresas sobre cómo trabajan con IA, con su fuente y su límite. Regla del curso: si no hay fuente pública, se dice.

### Google
- **Migraciones con LLM** en su monorepo: pipeline de descubrimiento determinista + generación + validación automática + revisión humana; ~74 % de los cambios generados por el modelo en 39 migraciones (FSE 2025).
- **DORA**: su programa de investigación sobre entrega de software; el informe 2025 describe la IA como **amplificador** y propone un modelo de 7 capacidades para aprovecharla.
- Límite: estudios de caso internos, sin grupo de control.

### Microsoft
- **Ensayo controlado de Copilot** (Microsoft Research y GitHub, 2023): 55,8 % más rápido en una tarea nueva y acotada.
- **Pautas de interacción humano-IA** (Amershi et al., CHI 2019): 18 pautas para diseñar sistemas con IA (dejar claro qué puede hacer, permitir corregir, pedir feedback, avisar de cambios).
- Límite: el ensayo es una tarea única y pequeña; no predice el efecto en bases de código grandes.

### Anthropic
- **Building effective agents** (2024): workflows antes que agentes, empezar simple, patrones de orquestación.
- **Context engineering** (2025): contexto mínimo de alta señal, recuperación justo a tiempo.
- **MCP** (2024): estándar abierto para conectar herramientas y datos.
- Límite: guías de un proveedor, basadas en su experiencia con clientes.

### SpaceX
No hay publicaciones de SpaceX sobre su metodología de ingeniería con IA. Lo público son **ofertas de empleo** que describen: una plataforma interna para que los ingenieros **escriban código más rápido** con IA mediante gateways seguros, **revisión de código y automatización de PR con IA**, **guardarraíles** de seguridad, y en ingeniería de vehículos, IA para acelerar desarrollo y pruebas de software, diseño de aviónica y revisión de datos de vuelo, con modelos internos, RAG y herramientas agénticas. Es una señal de **intención**, no de práctica verificada. Desconfía de cursos que afirman conocer "el método SpaceX".

### Lo común
Contexto curado, verificación automática, revisión humana, seguridad por diseño y **medir** el efecto. Ninguna empresa seria publica "deja que la IA lo haga sola".
