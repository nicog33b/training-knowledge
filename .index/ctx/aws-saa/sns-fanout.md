# Subtema: SNS y fan-out [aws-saa/sns-fanout]
Pub/sub con SNS, patrón fan-out SNS+SQS, filtros y entrega de eventos.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- sqs: SQS — Colas gestionadas: estándar vs FIFO, visibilidad, long polling, DLQ y patrones. [secciones: SQS: Simple Queue Service · Cola estándar · Visibility Timeout · Long Polling · Dead-Letter Queue (DLQ) · Delay y otros · Patrón con Auto Scaling]
- eventbridge-cloudtrail-config: EventBridge, CloudTrail y Config — Eventos, auditoría de API y cumplimiento de configuración; X-Ray y Health. [secciones: EventBridge, CloudTrail y Config · Amazon EventBridge (antes CloudWatch Events) · CloudTrail · AWS Config · Diferencias · Otros]

## Glosario usado
- JSON: Formato de texto para datos estructurados (objetos, listas, números, cadenas) que entienden casi todos los lenguajes.
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- SDK: Biblioteca por lenguaje (boto3, JS, Java…) para llamar a la API de AWS desde código.
- Auto Scaling Group: Grupo de instancias EC2 con tamaño mínimo/deseado/máximo que se autorrepara y escala.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- Cola FIFO: Cola con orden estricto y entrega exactly-once mediante MessageGroupId y deduplicación.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Fan-out: Patrón que replica un mensaje de un topic SNS a múltiples colas SQS o destinos.
- Filter Policy: Política JSON de una suscripción SNS que filtra mensajes por atributos.
- Firehose: Servicio de entrega casi en tiempo real de streams a S3, Redshift, OpenSearch y otros destinos.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- Redshift: Data warehouse columnar MPP (OLAP) basado en PostgreSQL que escala a petabytes.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- Budgets: Alertas de gasto y uso frente a un presupuesto definido.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el fan-out pone colas SQS entre SNS y los consumidores en vez de suscribirlos directo?
- (que-pasa-si) ¿Qué pasa si un consumidor HTTP suscrito a SNS está caído cuando se publica?
- (aplicar) ¿Cómo harías que el servicio de facturación reciba solo pedidos de más de 100 €?
- (comparar) Compara SNS y EventBridge para enrutar eventos por contenido.
- (aplicar) Necesitas fan-out a varias colas manteniendo el orden de los mensajes: ¿cómo?
- (error-comun) Error común: ¿por qué un topic SNS no consigue entregar en una cola SQS recién suscrita?
