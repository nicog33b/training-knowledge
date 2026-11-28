---
title: "Construir el prompt: orden, citas y «no lo sé»"
summary: Cuántos fragmentos mandar, en qué orden (lost in the middle), cómo
  pedir citas verificables y cuándo responder que no hay información.
order: 8
section: generar-y-medir
status: done
requires: []
---

## Construir el prompt: orden, citas y «no lo sé»

### Cuántos fragmentos
Más fragmentos suben la probabilidad de incluir el correcto, pero también el **ruido**, el costo y la confusión. Tras un buen reranking, **5–10** chunks suelen bastar; mide con evals en vez de "meter 50 por si acaso".

### Orden
Los modelos usan peor la información **en medio** de un contexto largo (Liu et al., *Lost in the Middle*, 2024: rendimiento en forma de **U** según la posición). Pon lo **más relevante al principio** (o al final), no enterrado en medio.

### Formato de los fragmentos
- Cada fragmento con un **identificador** y su **fuente** (título, sección, fecha): `<doc id="3" fuente="Política de viajes §4" fecha="2025-02">…</doc>`.
- Delimitadores claros e instrucción de que el contenido es **dato**, no instrucciones (inyección indirecta).

### Citas verificables
- Pide citar el **id** del fragmento en cada afirmación ("[3]") y, si hace falta, la **frase literal** que lo respalda.
- **Verifica en código** que los ids citados existen y que la cita aparece en el fragmento. Una cita inventada es peor que ninguna.
- En la interfaz, haz las citas **clicables** hacia el documento.

### Permitir «no lo sé»
Instruye explícitamente: si los fragmentos no contienen la respuesta, **dilo** y sugiere dónde buscar, en vez de completar con conocimiento general. Pon en la eval preguntas **sin respuesta** en los documentos para comprobarlo: un RAG que nunca dice "no lo sé" está inventando.
