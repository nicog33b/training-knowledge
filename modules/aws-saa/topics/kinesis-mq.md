---
title: Kinesis y Amazon MQ
summary: Streaming de datos en tiempo real con Kinesis, Firehose y brokers Amazon MQ.
order: 22
section: integracion
status: done
requires: []
---

## Kinesis y Amazon MQ

### Kinesis Data Streams
Ingesta y procesamiento de **streams en tiempo real** (logs, clics, IoT).
- Un stream se divide en **shards**: cada uno 1 MB/s o 1 000 registros/s de entrada, 2 MB/s de salida.
- Retención 24 h por defecto, hasta 365 días; los datos son **inmutables** y se pueden **reproducir** (replay).
- **Partition Key** determina el shard (orden dentro de la key). Un *hot shard* se debe a claves desequilibradas.
- Modos de capacidad: *Provisioned* y *On-Demand* (escala automático).
- Consumidores: SDK, KCL (Kinesis Client Library), Lambda, Managed Service for Apache Flink, Firehose; **Enhanced Fan-Out** da 2 MB/s por consumidor.
- Cifrado KMS, VPC endpoints.

### Kinesis Data Firehose (ahora Amazon Data Firehose)
**Carga casi en tiempo real** (buffer mín. 60 s o 1 MB) hacia **S3, Redshift, OpenSearch, Splunk, Datadog, HTTP**. Gestionado y sin administración; puede transformar con Lambda y convertir formatos (Parquet/ORC). No almacena ni permite replay. Paga por datos transferidos.

### Managed Service for Apache Flink (antes Kinesis Data Analytics)
Procesa y analiza streams con SQL o Flink (ventanas, agregaciones en tiempo real).

### Data Streams vs Firehose
| | Data Streams | Firehose |
|---|---|---|
| Código | Consumidores propios | Sin código |
| Latencia | ~200 ms (70 con EFO) | Casi real (≥60 s) |
| Almacenamiento/replay | Sí | No |
| Destinos | Los que programes | S3, Redshift, OpenSearch… |

### Kinesis vs SQS vs SNS
SQS: cola, un consumidor por mensaje. SNS: pub/sub. Kinesis: stream ordenado por shard, múltiples lectores y replay. **SQS FIFO** o **Kinesis** para ordenar por clave.

### Amazon MQ
Broker gestionado de **Apache ActiveMQ** y **RabbitMQ**: para migrar aplicaciones on-premises que usan **MQTT, AMQP, STOMP, OpenWire, WSS** sin reescribirlas. No escala tanto como SQS/SNS. Alta disponibilidad con **Multi-AZ** (active/standby) y almacenamiento EFS/EBS. Se despliega en una VPC.
