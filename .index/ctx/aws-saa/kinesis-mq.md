# Subtema: Kinesis y Amazon MQ [aws-saa/kinesis-mq]
Streaming de datos en tiempo real con Kinesis, Firehose y brokers Amazon MQ.

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

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- SDK: Biblioteca por lenguaje (boto3, JS, Java…) para llamar a la API de AWS desde código.
- On-Demand: Modelo de compra EC2 de pago por uso sin compromiso.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- EFS: Sistema de archivos NFS elástico y multi-AZ, montable en cientos de instancias Linux.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- VPC Endpoint: Acceso privado a servicios AWS sin Internet: Gateway (S3, DynamoDB) o Interface (PrivateLink).
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- Cola FIFO: Cola con orden estricto y entrega exactly-once mediante MessageGroupId y deduplicación.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Shard: Unidad de capacidad de un stream de Kinesis (1 MB/s de entrada y 2 MB/s de salida).
- Partition Key: Clave que determina a qué shard (Kinesis) o partición (DynamoDB) va un registro.
- Enhanced Fan-Out: Modo de Kinesis con 2 MB/s dedicados por consumidor por shard.
- Firehose: Servicio de entrega casi en tiempo real de streams a S3, Redshift, OpenSearch y otros destinos.
- Managed Service for Apache Flink: Servicio gestionado para analizar streams en tiempo real con Flink o SQL.
- Amazon MQ: Broker gestionado de ActiveMQ y RabbitMQ para migrar apps con MQTT, AMQP, STOMP u OpenWire.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Hot partition: Partición que recibe tráfico desproporcionado por mala elección de clave.
- Redshift: Data warehouse columnar MPP (OLAP) basado en PostgreSQL que escala a petabytes.
- Parquet: Formatos de archivo columnares comprimidos que reducen el coste de consulta en Athena y Redshift Spectrum.
- OpenSearch: Servicio de búsqueda y analítica de logs y texto, sucesor de Elasticsearch.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué Kinesis garantiza orden solo dentro de una partition key?
- (que-pasa-si) ¿Qué pasa si todas tus escrituras usan la misma partition key?
- (comparar) Compara Data Streams y Firehose: ¿cuál eliges si necesitas reprocesar datos de ayer?
- (aplicar) Una app on-premises usa AMQP y no quieres reescribirla: ¿qué servicio usas?

## Simulaciones del subtema
- predecir-observar: ¿Cuántos shards necesito?
- clasificar: ¿SQS, SNS o Kinesis?
