---
title: Tokens y ventana de contexto
summary: Qué es un token, por qué todo se cobra y se limita en tokens, qué cabe
  en la ventana de contexto y por qué más contexto no siempre es mejor (context
  rot).
order: 1
section: fundamentos
status: done
requires: []
---

## Tokens y ventana de contexto

Un LLM no lee letras ni palabras: lee **tokens**, trozos de texto de un vocabulario fijo (en español, una palabra son ~1,3–2 tokens; el código y los idiomas poco frecuentes gastan más). Todo se mide en tokens: el **precio** (entrada y salida por separado), el **límite** de lo que cabe y buena parte de la **latencia**.

### La ventana de contexto
La **ventana de contexto** es el máximo de tokens que el modelo puede considerar a la vez: prompt de sistema + historial + documentos + herramientas + la respuesta que está generando. Lo que no está en la ventana **no existe** para el modelo: no "recuerda" conversaciones anteriores salvo que tu app las vuelva a enviar.

### Más contexto no es mejor contexto
- Con ventanas de cientos de miles de tokens es tentador "meterlo todo". Pero la capacidad de recuperar un dato concreto **baja cuando el contexto crece** (*context rot*), y la información enterrada **en medio** de un contexto largo se usa peor que la del principio o el final.
- Cada token de entrada cuesta y añade latencia, en **cada** turno: un historial que crece encarece toda la conversación.
- Regla práctica: busca el **conjunto mínimo de tokens de alta señal**. Resume el historial viejo, recupera solo los fragmentos relevantes (RAG) y carga detalles **justo a tiempo** con herramientas.

### Cómo contarlos
Los SDK traen contadores de tokens; úsalos para **presupuestar** antes de enviar y para cortar documentos. Reserva siempre espacio para la salida (el parámetro de máximo de tokens de salida): si la respuesta no cabe, se corta a mitad de frase.
