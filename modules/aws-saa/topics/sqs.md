---
title: SQS
summary: "Colas gestionadas: estándar vs FIFO, visibilidad, long polling, DLQ y
  patrones."
order: 20
section: integracion
status: done
requires: []
---

## SQS: Simple Queue Service

Cola de mensajes **gestionada y sin servidor** para **desacoplar** componentes: productores envían, consumidores sondean (*poll*) y procesan. Escala prácticamente sin límite.

### Cola estándar
- Throughput ilimitado, latencia <10 ms.
- Retención 4 días por defecto (hasta 14). Tamaño máx. 256 KB.
- Entrega **al menos una vez** (posibles duplicados) y **orden no garantizado** ("best effort").
- Consumo: hasta 10 mensajes por llamada; el consumidor elimina el mensaje tras procesarlo (`DeleteMessage`).

### Visibility Timeout
Tras recibir un mensaje, queda invisible a otros consumidores durante 30 s por defecto (0 s – 12 h). Si no se borra a tiempo, vuelve a verse (posible doble proceso). `ChangeMessageVisibility` extiende el tiempo.

### Long Polling
`WaitTimeSeconds` (1-20 s) espera a que haya mensajes: menos llamadas API y menor latencia. Se recomienda frente al short polling.

### Dead-Letter Queue (DLQ)
Mensajes que superan `MaximumReceives` van a una cola de mensajes fallidos para depurarlos; *redrive* los devuelve a la cola origen. La DLQ de FIFO debe ser FIFO.

### Delay y otros
- **Delay Queue**: aplaza la entrega 0-15 min.
- **Cola FIFO**: nombre acaba en `.fifo`; orden estricto y **exactly-once** mediante `MessageGroupId` y `MessageDeduplicationId`; 300 msg/s (3 000 con batching) o más en high-throughput.
- **Seguridad**: cifrado en tránsito y SSE con KMS, políticas de acceso (cross-account, permitir que S3/SNS escriban).

### Patrón con Auto Scaling
Una **ASG** escala según la métrica `ApproximateNumberOfMessages` (CloudWatch alarm / backlog por instancia) para absorber picos. SQS desacopla un frontend (web) de un backend (procesado de vídeo, pedidos).

> **Tip de examen**: SQS = pull, desacoplar y buffer; SNS = push, múltiples destinos; Kinesis = streaming con orden por shard y reproducción.
