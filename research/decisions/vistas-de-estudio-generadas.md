---
title: "Vistas de estudio generadas del mismo contenido: esquema, mapa,
  tarjetas, huecos, explícalo y pregunta previa"
summary: Cada subtema se puede transformar sin IA en vistas que obligan a
  recuperar o generar; el mapa automático es punto de partida y el alumno
  construye el suyo.
status: proposed
confidence: medium
date: 2026-11-26
sources:
  - schroeder-2018
  - fiorella-zhang-2018-drawing
  - fiorella-mayer-2016
  - dunlosky-2013
  - pan-carpenter-2023
  - bisra-2018
  - mayer-multimedia-chartered
affects:
  - all
  - app:web
  - package:views
---

## Decisión

Cualquier subtema de cualquier curso se puede **transformar sin IA ni costo** en otras vistas desde una barra "Estudiar como": 
1. **Leer** (texto normal).
2. **Esquema**: títulos + ideas en negrita como árbol plegable (vista rápida antes y después de leer).
3. **Mapa**: diagrama del subtema (título → secciones → ideas clave) y del curso (secciones, subtemas y requisitos). Debajo, **"Haz tu mapa"**: el alumno escribe su propia versión en texto con sangrías y la ve como diagrama al instante.
4. **Tarjetas**: términos del glosario usados en el subtema + preguntas del lab, una cara y otra; se marcan Sí/No y alimentan el repaso.
5. **Completar huecos**: las ideas en negrita se ocultan y hay que escribirlas (recuperación sobre el propio texto).
6. **Explícalo**: plantilla guiada para explicar el tema a otro (qué es, por qué, ejemplo, error típico), con aviso previo de que se va a enseñar.
7. **Pregunta previa** (opcional): 2 preguntas del lab antes de leer; se responden de memoria y se ven al final.
Además, en el chat la acción "Hazlo diagrama" pide a la IA un diagrama Mermaid del fragmento seleccionado (cuesta) y el chat lo dibuja.

## Por qué (evidencia)

- Construir mapas (g = 0,72) rinde más que estudiar mapas hechos (g = 0,43) (schroeder-2018): por eso el mapa automático viene con "Haz tu mapa".
- Dibujar/generar representaciones ayuda, con más efecto cuando hay guía (fiorella-zhang-2018-drawing; fiorella-mayer-2016).
- Práctica de recuperación y autoevaluación, de alta utilidad (dunlosky-2013) → tarjetas y huecos.
- Preguntar antes de enseñar ayuda aunque se falle (pan-carpenter-2023) → pregunta previa.
- Autoexplicación con prompts concretos, g ≈ 0,55 (bisra-2018) → plantilla "Explícalo".
- Señalización y segmentación (mayer-multimedia-chartered) → esquema.

## Límites y qué no sabemos

- El esquema y los huecos dependen de que el autor marque en **negrita** las ideas clave; en subtemas con poca negrita la vista queda pobre (`validate` podría avisar: T-104).
- Releer el esquema es de baja utilidad si sustituye a la práctica (descartar-tecnicas-de-baja-evidencia): se presenta como mapa de orientación, no como forma de estudiar.
- Las vistas no se adaptan a "estilos de aprendizaje" (pashler-2008): son técnicas distintas para todos, no un canal por persona.
