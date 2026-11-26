# Subtema: Tokens y ventana de contexto [ia-en-aplicaciones/tokens-y-contexto]
Qué es un token, por qué todo se cobra y se limita en tokens, qué cabe en la ventana de contexto y por qué más contexto no siempre es mejor (context rot).

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

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Ventana de contexto: Máximo de tokens que un modelo considera a la vez: sistema, historial, documentos, herramientas y la respuesta en curso.
- Context rot: Pérdida de precisión del modelo para usar información concreta a medida que el contexto crece.
- Prompt de sistema: Instrucciones de nivel superior que fijan rol, reglas y formato del asistente para toda la conversación.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué una conversación larga con un chatbot cuesta más en cada turno?
- (que-pasa-si) ¿Qué pasa si metes 300 páginas en el contexto para responder una pregunta sobre un dato concreto?
- (comparar) Compara la ventana de contexto con la memoria de una persona.
- (aplicar) Tu respuesta se corta a mitad de frase. ¿Qué revisas primero?
- (por-que) ¿Por qué el mismo texto puede costar distinto en español, inglés o código?
- (error-comun) Error común: «tengo 1 millón de tokens de contexto, así que no necesito RAG».

## Herramientas del curso en este subtema
- calculadora: Calculadora de costo de una conversación — Cuánto cuesta una conversación con historial que crece, y cuánto ahorra el caché del prompt de sistema. Ajusta los precios a tu modelo.
