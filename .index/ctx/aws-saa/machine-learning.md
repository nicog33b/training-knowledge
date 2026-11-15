# Subtema: Servicios de Machine Learning [aws-saa/machine-learning]
Rekognition, Transcribe, Polly, Translate, Lex, Comprehend, SageMaker, Kendra, Textract y más.

## Servicios de Machine Learning

Servicios de IA gestionados que se consumen por API sin ser experto en ML.

| Servicio | Qué hace |
|---|---|
| **Rekognition** | Análisis de imágenes/vídeo: objetos, rostros, texto, celebridades, moderación de contenido |
| **Transcribe** | Voz a texto (ASR), redacción automática de PII, identificación de idioma |
| **Polly** | Texto a voz (TTS); lexicons y SSML |
| **Translate** | Traducción de idiomas natural y escalable |
| **Lex** | Chatbots conversacionales (mismo motor que Alexa); NLU + ASR; se integra con Lambda y Connect |
| **Connect** | Centro de contacto en la nube omnicanal |
| **Comprehend** | NLP: sentimiento, entidades, frases clave, idioma, tópicos; **Comprehend Medical** extrae datos de textos clínicos |
| **SageMaker** | Plataforma completa para construir, entrenar y desplegar modelos ML a medida |
| **Forecast** | Previsión de series temporales (ventas, demanda) |
| **Kendra** | Búsqueda documental empresarial con lenguaje natural, ML |
| **Personalize** | Recomendaciones en tiempo real (mismo tipo de ML que Amazon.com) |
| **Textract** | OCR avanzado: extrae texto, formularios y tablas de documentos escaneados, PDFs |
| **Fraud Detector** | Detección de fraude |
| **Lookout** | Detección de anomalías en equipos/métricas/visión |
| **DevOps Guru / CodeGuru** | Recomendaciones operativas y de código con ML |
| **Bedrock** | Acceso a modelos fundacionales (IA generativa) por API; Knowledge Bases (RAG), Agents, Guardrails |
| **Q** | Asistente de IA generativa para empresa y desarrolladores |

### Cómo recordarlo
- *Ver*: Rekognition. *Leer documentos*: Textract. *Oír*: Transcribe. *Hablar*: Polly. *Traducir*: Translate. *Conversar*: Lex. *Entender texto*: Comprehend. *Buscar*: Kendra. *Recomendar*: Personalize. *Predecir*: Forecast. *Construir tu propio modelo*: SageMaker.

### SageMaker (resumen)
Incluye Studio, Ground Truth (etiquetado), Feature Store, entrenamiento distribuido, ajuste de hiperparámetros, Clarify (sesgo), Model Monitor y endpoints de inferencia (en tiempo real, serverless, asíncrono, batch transform).

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- Rekognition: Servicio de visión por computador para analizar imágenes y vídeo: objetos, rostros, moderación.
- Transcribe: Convierte voz en texto (ASR) con redacción automática de PII.
- Polly: Convierte texto en voz realista (TTS).
- Translate: Traducción automática de idiomas con redes neuronales.
- Lex: Servicio para crear chatbots conversacionales con voz y texto (tecnología de Alexa).
- Amazon Connect: Centro de contacto omnicanal en la nube.
- Comprehend: NLP para extraer sentimiento, entidades, frases clave e idioma de textos.
- SageMaker: Plataforma completa para construir, entrenar y desplegar modelos de ML.
- Forecast: Servicio de previsión de series temporales basado en ML.
- Kendra: Búsqueda documental empresarial en lenguaje natural basada en ML.
- Personalize: Servicio de recomendaciones personalizadas en tiempo real.
- Textract: OCR avanzado que extrae texto, formularios y tablas de documentos escaneados.
- Bedrock: Acceso por API a modelos fundacionales de IA generativa, con RAG, agentes y guardrails.
- PII: Información de identificación personal, como nombres, tarjetas o documentos.
- Control Tower: Configura una landing zone multi-cuenta con guardrails y Account Factory.
- AWS Batch: Ejecuta trabajos por lotes como contenedores con dimensionamiento automático.

## Preguntas sugeridas al alumno
- (aplicar) ¿Qué servicio usas para extraer texto y tablas de facturas escaneadas?
- (comparar) Compara Comprehend y Kendra: ¿analizar sentimiento o buscar en documentos?
- (por-que) ¿Por qué elegir SageMaker en vez de un servicio de IA ya entrenado?
