---
title: SNS y fan-out
summary: Pub/sub con SNS, patrón fan-out SNS+SQS, filtros y entrega de eventos.
order: 21
section: integracion
status: done
requires: []
---

## SNS y fan-out

**SNS (Simple Notification Service)** es **pub/sub**: un productor publica en un **topic** y todos los **suscriptores** reciben copia (push). Hasta 12,5 millones de suscripciones por topic y 100 000 topics.

### Suscriptores
SQS, Lambda, Kinesis Data Firehose, HTTP/S, email, SMS y notificaciones móviles push. Muchos servicios AWS publican en SNS (CloudWatch alarms, S3 events, ASG, Budgets, DynamoDB…).

### Publicar
- SDK (`Publish` a un topic).
- Móvil: Platform Application (APNS, FCM).
- **Mensajes direccionados** por atributos con **filtrado de suscripciones** (filter policy JSON): cada suscriptor recibe solo lo que le interesa.

### Seguridad
Cifrado en tránsito (HTTPS) y en reposo (KMS); políticas de acceso IAM y de topic (cross-account o para que S3 publique).

### Patrón fan-out (SNS + SQS)
Un único publish en SNS se copia a **varias colas SQS**, cada una con su propio consumidor y reintentos. Ventajas: desacoplado, persistente, sin pérdida de datos, añadir suscriptores sin tocar al productor. Ejemplos: un pedido genera trabajo para facturación, envío y analítica; **S3 events** a varias colas (S3 solo admite una regla por prefijo/evento → fan-out vía SNS); **Firehose** como suscriptor para volcar a S3/Redshift.

### SNS FIFO
Orden estricto y deduplicación, con colas SQS FIFO como suscriptoras (fan-out FIFO). Solo SQS (y SQS FIFO) como suscriptor.

### SNS vs EventBridge
EventBridge ofrece enrutamiento por reglas de contenido, esquemas, SaaS partners y buses; SNS es más simple y de alto volumen.
