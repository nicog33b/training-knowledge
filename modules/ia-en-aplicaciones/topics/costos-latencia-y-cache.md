---
title: Costos, latencia y caché de prompts
summary: Cómo se calcula el costo por petición, qué pesa en la latencia, el
  caché de prefijos y cómo elegir modelo por función.
order: 8
section: produccion
status: done
requires: []
---

## Costos, latencia y caché de prompts

### Costo por petición
**Costo = tokens de entrada × precio de entrada + tokens de salida × precio de salida.** La salida suele costar varias veces más que la entrada. En una conversación, **cada turno reenvía** el historial: el costo de entrada crece con cada mensaje.

### Qué pesa en la latencia
- **Tiempo hasta el primer token** (TTFT): depende del tamaño de la entrada y de la carga del proveedor.
- **Tokens de salida por segundo**: una respuesta larga tarda más; pedir respuestas **concisas** es la optimización más barata.
- **Pasos de herramientas y agentes**: cada vuelta suma una llamada completa.

### Caché de prompts
Si muchas peticiones empiezan con el **mismo prefijo** (prompt de sistema, catálogo de herramientas, documento base), el proveedor puede **cachearlo**: leer del caché cuesta una fracción (en Claude, ~0,1× el precio de entrada) y reduce latencia. Para aprovecharlo:
- Pon lo **estable al principio** y lo variable (pregunta del usuario) al final.
- No cambies el prefijo en cada petición (ni una fecha con segundos).
- Mantén el historial **append-only** (solo añadir al final).

### Modelo por función
No todo necesita el modelo más potente. Asigna un **nivel por función**: clasificar o resumir → modelo rápido y barato; razonar sobre código o planes → equilibrado; tareas difíciles y poco frecuentes → potente. Mide con evals antes de bajar de nivel.

### Topes
Pon **topes** de gasto por usuario y día, de tokens de salida y de pasos de agente. Registra tokens y costo por petición: sin medición no hay optimización.
