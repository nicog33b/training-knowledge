---
title: Repaso espaciado con planificador FSRS y relearning sucesivo
summary: Los ítems se reprograman con un algoritmo de repetición espaciada; el intervalo crece con el tiempo de retención deseado.
status: proposed
confidence: high
date: 2026-11-15
sources: [cepeda-2008, rawson-dunlosky-successive-relearning, fsrs-anki-docs, dunlosky-2013]
affects: [all, package:practice]
---

## Decisión

`packages/practice` implementa un planificador tipo FSRS con retención objetivo configurable. Cada ítem se practica hasta acertar y se repite en sesiones separadas (relearning sucesivo). Las fechas de examen del usuario fijan la retención/intervalos objetivo.

## Por qué (evidencia)

- Práctica distribuida = utilidad alta (dunlosky-2013).
- El intervalo óptimo entre sesiones crece con el tiempo que se quiere retener, sin proporción fija (cepeda-2008): por eso un planificador adaptativo, no un calendario fijo.
- Acertar hasta criterio y repetir en sesiones separadas protege contra el olvido, incluso con control de exposición igualada (rawson-dunlosky-successive-relearning).
- FSRS permite fijar retención deseada y suele pedir menos repasos que SM-2 (fsrs-anki-docs).

## Límites y qué no sabemos

- No usar la regla "10-20% del intervalo" como ley: el propio paper no la sostiene.
- El ahorro de 20-30% de repasos de FSRS viene de blogs; no prometerlo hasta verificar el benchmark.
- Falta elegir implementación (librería existente vs propia).
