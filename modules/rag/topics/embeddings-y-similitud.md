---
title: Embeddings y similitud
summary: Cómo un modelo convierte texto en vectores, qué mide la similitud
  coseno, por qué funciona para significado y dónde falla (nombres, códigos,
  negaciones).
order: 2
section: fundamentos
status: done
requires: []
---

## Embeddings y similitud

Un **modelo de embeddings** convierte un texto en un **vector** de cientos o miles de números. Está entrenado para que textos con **significado parecido** queden **cerca** en ese espacio: "¿cómo cancelo mi suscripción?" y "dar de baja el plan" acaban próximos aunque no compartan palabras.

### Medir cercanía
- **Similitud coseno**: el coseno del ángulo entre dos vectores (1 = misma dirección). Es la más común.
- **Producto escalar** y **distancia euclídea**: equivalentes si los vectores están **normalizados**. Usa la métrica para la que se entrenó el modelo.
La búsqueda semántica = calcular el embedding de la **consulta** y buscar los chunks con vectores más cercanos (**búsqueda densa**).

### Dónde brillan y dónde fallan
- Bien: sinónimos, paráfrasis, preguntas en otro idioma (con modelos multilingües).
- Mal: **identificadores exactos** (códigos de error, SKUs, nombres propios raros), **negaciones** ("sin gluten" cerca de "con gluten"), números y fechas. Por eso se combina con búsqueda **léxica** (BM25).

### Elegir y usar el modelo
- El mismo modelo para **indexar** y para **consultar**. Si cambias de modelo, hay que **reindexar todo**.
- Algunos modelos distinguen **consulta** y **documento** (prefijos o tareas distintas): respétalo.
- Más dimensiones no siempre es mejor: cuestan memoria y latencia. Compara modelos con **tu** conjunto de evaluación, no solo con rankings públicos.
- Un embedding resume un chunk entero en un vector: chunks demasiado largos **diluyen** el significado.
