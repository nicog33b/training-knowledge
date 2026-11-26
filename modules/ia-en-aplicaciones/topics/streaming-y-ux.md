---
title: Streaming y experiencia de usuario con IA
summary: Mostrar la respuesta mientras se genera, comunicar incertidumbre,
  permitir corregir y las pautas de interacción humano-IA de Microsoft.
order: 9
section: produccion
status: done
requires: []
---

## Streaming y experiencia de usuario con IA

### Streaming
Con **streaming** la API envía tokens a medida que se generan. La respuesta total tarda lo mismo, pero el usuario **empieza a leer en cientos de milisegundos** en vez de esperar varios segundos ante un spinner. Detalles: renderiza markdown de forma incremental, permite **detener** la generación y no muestres JSON a medio construir.

### Diseñar para un sistema que se equivoca
Las **pautas de interacción humano-IA de Microsoft** (Amershi et al., 2019: 18 pautas en 4 momentos) siguen siendo una buena checklist:
- **Al inicio**: deja claro **qué puede hacer** y **qué tan bien** lo hace. No prometas magia.
- **Durante**: muestra información relevante al contexto, en el momento justo, sin interrumpir.
- **Cuando se equivoca**: facilita **descartar**, **corregir** y **deshacer**; explica por qué hizo lo que hizo.
- **Con el tiempo**: aprende de las correcciones, pide **feedback granular** y **avisa de cambios** de comportamiento.

### Patrones concretos
- **Citas y fuentes** clicables cuando la respuesta se basa en documentos.
- Estados claros: pensando, buscando, usando herramienta X.
- **Edición** antes de enviar acciones (el borrador del correo, no el correo enviado).
- Feedback 👍/👎 con motivo opcional, que alimente tus **evals**.
- Indicar el **costo** o el uso cuando el usuario paga por él.

### Evitar la sobreconfianza
Un texto fluido parece correcto. Para decisiones importantes, muestra la **evidencia** y pide al usuario que la revise; no ocultes la incertidumbre detrás de un tono seguro.
