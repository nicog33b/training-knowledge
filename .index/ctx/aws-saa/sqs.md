# Subtema: SQS [aws-saa/sqs]
Colas gestionadas: estándar vs FIFO, visibilidad, long polling, DLQ y patrones.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- sns-fanout: SNS y fan-out — Pub/sub con SNS, patrón fan-out SNS+SQS, filtros y entrega de eventos. [secciones: SNS y fan-out · Suscriptores · Publicar · Seguridad · Patrón fan-out (SNS + SQS) · SNS FIFO · SNS vs EventBridge]
- asg: Auto Scaling Groups — Grupos de escalado, launch templates, políticas de escalado y ciclo de vida de instancias. [secciones: Auto Scaling Groups · Launch Template · Parámetros · Políticas de escalado · Hooks y refresco]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Throughput: Volumen de datos transferido por unidad de tiempo (MB/s).
- Auto Scaling Group: Grupo de instancias EC2 con tamaño mínimo/deseado/máximo que se autorrepara y escala.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- Visibility Timeout: Tiempo en que un mensaje recibido queda invisible a otros consumidores de SQS.
- Long Polling: Espera de hasta 20 s en SQS a que haya mensajes, reduciendo llamadas y latencia.
- Dead-Letter Queue: Cola donde se aparcan mensajes que fallaron repetidamente para depurarlos.
- Cola FIFO: Cola con orden estricto y entrega exactly-once mediante MessageGroupId y deduplicación.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Shard: Unidad de capacidad de un stream de Kinesis (1 MB/s de entrada y 2 MB/s de salida).
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- Alarma de CloudWatch: Evalúa una métrica y dispara acciones (SNS, EC2, Auto Scaling) al superar un umbral.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- Acoplamiento débil: Diseño en que los componentes se comunican mediante colas o eventos para fallar y escalar de forma independiente.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué una cola estándar puede entregar el mismo mensaje dos veces?
- (que-pasa-si) ¿Qué pasa si el procesamiento tarda más que el visibility timeout?
- (comparar) ¿En qué se diferencia SQS de SNS al entregar un mensaje a varios consumidores?
- (error-comun) Error común: ¿por qué subir el visibility timeout a 12 h no es la solución para trabajos que fallan?
- (aplicar) ¿Cómo escalarías los consumidores según el tamaño de la cola?
- (comparar) Compara las colas estándar y FIFO.
- (por-que) ¿Por qué activar long polling abarata y mejora una cola con poco tráfico?

## Simulaciones del subtema
- predecir-observar: Visibility timeout y DLQ
