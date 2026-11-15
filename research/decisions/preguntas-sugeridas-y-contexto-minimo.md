---
title: Preguntas sugeridas por subtema y contexto mínimo para la IA
summary: "Cada subtema trae preguntas concretas para hacerle a la IA; la IA recibe el subtema + requisitos + glosario usado, y solo pide otros subtemas por herramienta si los necesita."
status: proposed
confidence: medium
date: 2026-11-15
sources:
  - myers-hausman-rhodes-2023
  - peer-mcq-meta-2025
  - bisra-2018
  - kirschner-sweller-clark-2006
  - bastani-2025
  - anthropic-pricing-docs
affects:
  - all
  - package:tutor
  - package:indexer
---

## Decisión

**Preguntas sugeridas.** Cada subtema tiene en `modules/<id>/lab/<subtema>.yaml` una lista `questions` de preguntas específicas (por qué, qué pasa si, comparar, aplicar, error común) que el alumno puede hacerle a la IA o usar como autoexplicación. Se generan al crear el curso, junto con el contenido. Una pregunta puede declarar `uses: [otro-subtema]` cuando su respuesta necesita otro tema.

**Contexto mínimo.** Al crear o modificar un curso, `pnpm index` genera `.index/ctx/<módulo>/<subtema>.md`: el subtema completo, el resumen y encabezados de sus `requires` y de los `uses` de sus preguntas, y las definiciones del glosario que usa. El tutor recibe:
1. un prefijo común por curso (reglas + catálogo `id: título — resumen` de todos los subtemas), cacheable y compartido por todos los subtemas;
2. el contexto del subtema;
3. una herramienta `leer_subtema(id)` para traer otro subtema solo si la pregunta lo exige.

**Chat flotante (web).** En cada página de curso hay un chat que sabe el curso y el subtema abiertos (en la portada/glosario, solo el curso). Es una conversación de varios turnos con las mismas reglas de tutor (pistas, pregunta de recuperación al final). El historial se guarda en el navegador tal como lo devuelve el servidor y **solo crece por el final**, para que el caché de la API sirva en cada turno; por eso no se recorta: al llegar a 20 preguntas se empieza otra conversación. El alumno puede seleccionar un fragmento de la página y preguntar sobre él; las preguntas sugeridas del laboratorio se mandan al chat con un clic.

## Por qué (evidencia)

- Las preguntas que inventan los alumnos a menudo no apuntan a lo importante y a veces rinden peor (`myers-hausman-rhodes-2023`); dar preguntas buenas ya escritas corrige eso, y las preguntas hechas por otros tienen un efecto pequeño-positivo (`peer-mcq-meta-2025`).
- Responderse "por qué" es autoexplicación (g ≈ 0.55, `bisra-2018`): las preguntas sirven sin IA.
- Los novatos necesitan guía (`kirschner-sweller-clark-2006`); el chatbot libre puede dar respuestas sin aprendizaje (`bastani-2025`), por eso el tutor sigue las reglas de `tutor-ia-con-restricciones`.
- Costo: el prefijo del curso se cachea (~0.1x al releerlo) y el contexto de subtema es chico; leer otros subtemas solo bajo demanda evita mandar el curso entero en cada pregunta (`anthropic-pricing-docs`).

## Límites y qué no sabemos

- No medimos si las preguntas sugeridas cambian el aprendizaje frente a preguntar libre; registrar uso cuando haya tutor.
- El límite de qué es "necesario" lo decide el modelo vía la herramienta; puede leer de más o de menos.
