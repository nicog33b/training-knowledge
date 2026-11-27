---
title: "Evals: medir una app con LLM"
summary: Conjuntos de prueba, métricas deterministas y LLM como juez,
  regresiones al cambiar prompt o modelo; por qué sin evals no hay ingeniería.
order: 10
section: produccion
status: done
requires: []
---

## Evals: medir una app con LLM

Una **eval** es un conjunto de **casos de prueba** (entradas + qué se espera) que se ejecuta contra tu sistema para medir su calidad. Sin evals, cambiar un prompt o de modelo es **adivinar**.

### Construir el conjunto
- Empieza con **20–50 casos reales**: preguntas de usuarios, tickets, documentos difíciles. Añade los **fallos** que vayas encontrando (cada bug → un caso).
- Cubre lo típico, los **bordes** y lo que **no** debe hacer (rechazos, datos ajenos).
- Separa un conjunto que **no uses para ajustar** el prompt, para no sobreajustar.

### Cómo puntuar
1. **Deterministas** primero: cumple el esquema, contiene el id correcto, la cifra coincide, no supera N palabras. Baratas y fiables.
2. **LLM como juez** para lo difícil de codificar (tono, si responde la pregunta): con una **rúbrica tipo checklist** concreta, no "puntúa del 1 al 10". Valida el juez contra **etiquetas humanas** de una muestra: los jueces automáticos tienen sesgos y fallan en casos que a un humano le resultan fáciles.
3. **Humanos** para muestras periódicas y para calibrar a los otros dos.

### En el ciclo de desarrollo
- Ejecuta las evals en **CI** al cambiar prompt, modelo, herramientas o recuperación: trátalas como **tests de regresión**.
- Mira el **diff de casos** (cuáles empeoraron), no solo la media.
- En producción, registra entradas y salidas (con privacidad) y convierte el feedback negativo en casos nuevos.
