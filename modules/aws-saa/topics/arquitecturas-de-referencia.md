---
title: Arquitecturas de referencia
summary: "Patrones de soluciones: web escalable, serverless, event-driven, híbridas."
order: 41
section: arquitectura
status: done
requires: []
---

## Arquitecturas de referencia

Patrones recurrentes que el examen combina. Para cada uno: piezas, por qué y variaciones.

### Aplicación web escalable de tres capas
**Route 53 → CloudFront → ALB (multi-AZ) → ASG de EC2 en subredes privadas → Aurora Multi-AZ con réplicas de lectura → ElastiCache** para caché y sesiones. Contenido estático en S3 vía CloudFront. NAT Gateways por AZ para salida. Seguridad: WAF en CloudFront/ALB, SG encadenados, KMS. *Variante económica*: spot en el ASG.

### Aplicación serverless
**CloudFront + S3** (SPA) → **API Gateway** (Cognito authorizer) → **Lambda** → **DynamoDB** (con DAX si hace falta). Subidas directas a S3 con pre-signed URLs; **Step Functions** para flujos; escalado automático y pago por uso.

### Desacople y procesamiento asíncrono
Cliente → ALB/API → **SQS** → ASG/Lambda de procesamiento (escala por backlog) → resultados en S3/DynamoDB. Para varias reacciones por evento: **SNS → varias SQS** (fan-out) o **EventBridge**. DLQ para fallos.

### Event-driven / pipeline de datos
S3 `ObjectCreated` → EventBridge/Lambda → Glue/Step Functions → resultados en S3 → Athena/QuickSight. Streaming: **Kinesis Data Streams → Firehose → S3/Redshift/OpenSearch**.

### Procesamiento de imágenes y vídeo
Usuario sube a S3 (pre-signed URL) → evento a SQS/Lambda → Rekognition/MediaConvert → metadatos a DynamoDB → CloudFront para servir.

### Híbrido
On-premises ↔ AWS con **Direct Connect + VPN de respaldo**, Transit Gateway; Storage Gateway/DataSync para datos; Active Directory conectado con AD Connector; Outposts si se requiere cómputo local.

### Multi-Región / DR
Route 53 failover/latency, **Aurora Global** o DynamoDB Global Tables, S3 CRR, AMIs y snapshots copiados, CloudFormation StackSets, Global Accelerator para IP estática y failover rápido.

### Seguridad multi-cuenta
Organizations con OUs (prod/dev/seguridad/log), SCPs, IAM Identity Center, CloudTrail organizativo en cuenta de logs, GuardDuty/Security Hub delegados, Config agregado, Control Tower.

### Criterios para diseñar
1. Identifica el requisito dominante (coste, latencia, disponibilidad, seguridad, operación mínima).
2. Prefiere **servicios gestionados y serverless** si el enunciado pide "mínima carga operativa".
3. Elimina puntos únicos de fallo (Multi-AZ).
4. Desacopla con colas/eventos.
5. Cifra, aplica mínimo privilegio y registra.
