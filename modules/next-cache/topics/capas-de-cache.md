---
title: Las capas de caché
summary: Qué cachea Next.js y dónde vive cada capa.
order: 1
status: draft
requires: []
---

## Visión general

Next.js combina varias capas. El Data Cache guarda resultados de `fetch` en el servidor,
mientras que el Router Cache vive en el cliente y reduce la latencia al navegar.

## Cuándo se vence algo

Los datos se vencen por TTL o por Revalidación explícita. Una API lenta se beneficia mucho de esto.
