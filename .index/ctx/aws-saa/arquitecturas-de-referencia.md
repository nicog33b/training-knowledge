# Subtema: Arquitecturas de referencia [aws-saa/arquitecturas-de-referencia]
Patrones de soluciones: web escalable, serverless, event-driven, híbridas.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- vpc-fundamentos: VPC: fundamentos — CIDR, subredes, route tables, IGW, NAT, NACL, security groups y Flow Logs. [secciones: VPC: fundamentos · Direccionamiento · Componentes · Seguridad de red · Monitoreo]
- sqs: SQS — Colas gestionadas: estándar vs FIFO, visibilidad, long polling, DLQ y patrones. [secciones: SQS: Simple Queue Service · Cola estándar · Visibility Timeout · Long Polling · Dead-Letter Queue (DLQ) · Delay y otros · Patrón con Auto Scaling]
- lambda: AWS Lambda — Funciones sin servidor: límites, concurrencia, triggers, VPC, SnapStart y Lambda@Edge. [secciones: AWS Lambda · Límites clave (por Región / ejecución) · Invocación · Concurrencia · Rendimiento, red y seguridad · Patrones · Lambda vs contenedores]
- dynamodb: DynamoDB — NoSQL gestionada: claves, capacidad, índices, DAX, streams, tablas globales y TTL. [secciones: DynamoDB · Modelo · Capacidad · Índices · Funciones avanzadas · Cuándo usar]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Mínimo privilegio: Conceder solo los permisos estrictamente necesarios para una tarea.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Spot Instances: Capacidad sobrante de EC2 con hasta ~90 % de descuento que AWS puede reclamar con 2 minutos de aviso.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- Auto Scaling Group: Grupo de instancias EC2 con tamaño mínimo/deseado/máximo que se autorrepara y escala.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Read Replica: Copia asíncrona de solo lectura para escalar lecturas; puede estar en otra Región y promoverse.
- Aurora: Base de datos relacional de AWS compatible con MySQL y PostgreSQL, con almacenamiento distribuido en 3 AZ y hasta 15 réplicas.
- ElastiCache: Caché en memoria gestionada con motores Redis/Valkey y Memcached.
- Route 53: DNS global gestionado de AWS con registro de dominios, health checks y políticas de enrutamiento.
- Subred privada: Subred sin ruta directa a Internet; la salida se hace vía NAT Gateway.
- NAT Gateway: Servicio que permite a instancias privadas iniciar tráfico saliente a Internet sin ser accesibles desde fuera.
- Site-to-Site VPN: Túneles IPsec cifrados entre tu red on-premises y una VPC a través de Internet.
- Direct Connect: Enlace de red físico dedicado y privado entre tu centro de datos y AWS.
- Transit Gateway: Hub regional transitivo que interconecta VPC y redes on-premises en topología estrella.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Pre-signed URL: URL temporal firmada que otorga acceso a un objeto con los permisos de quien la generó.
- Replicación S3: Copia asíncrona de objetos a otro bucket en otra Región (CRR) o en la misma (SRR); requiere versionado.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Global Accelerator: Servicio con 2 IPs anycast estáticas que enruta tráfico TCP/UDP por la red global de AWS hacia tus endpoints.
- Storage Gateway: Servicio híbrido que expone S3/EBS/FSx a sistemas locales vía NFS, SMB, iSCSI o VTL con caché local.
- DataSync: Servicio para transferir y sincronizar grandes volúmenes entre on-premises y AWS con un agente.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- Dead-Letter Queue: Cola donde se aparcan mensajes que fallaron repetidamente para depurarlos.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Fan-out: Patrón que replica un mensaje de un topic SNS a múltiples colas SQS o destinos.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Firehose: Servicio de entrega casi en tiempo real de streams a S3, Redshift, OpenSearch y otros destinos.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- DAX: Caché en memoria compatible con DynamoDB que ofrece latencia de microsegundos.
- Global Tables: Replicación activa-activa de una tabla DynamoDB en varias Regiones.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.
- Cognito: Servicio de identidad para usuarios de aplicaciones: User Pools e Identity Pools.
- Step Functions: Orquestador serverless de flujos de trabajo definidos como máquinas de estado.
- Redshift: Data warehouse columnar MPP (OLAP) basado en PostgreSQL que escala a petabytes.
- Athena: Servicio serverless de consultas SQL sobre datos en S3, facturado por TB escaneado.
- OpenSearch: Servicio de búsqueda y analítica de logs y texto, sucesor de Elasticsearch.
- QuickSight: Servicio de BI serverless con dashboards interactivos y motor en memoria SPICE.
- Glue: Servicio ETL serverless con catálogo de metadatos, crawlers y jobs Spark.
- Rekognition: Servicio de visión por computador para analizar imágenes y vídeo: objetos, rostros, moderación.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- AWS Config: Registra la configuración de recursos y evalúa su cumplimiento con reglas.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- WAF: Firewall de capa 7 que filtra HTTP/S por IP, geografía, SQLi, XSS y límites de tasa.
- GuardDuty: Detección inteligente de amenazas con ML sobre CloudTrail, Flow Logs y DNS logs.
- Security Hub: Panel central que agrega hallazgos de seguridad y comprueba estándares de cumplimiento.
- Organizations: Servicio para gestionar varias cuentas AWS con facturación consolidada, OUs y SCPs.
- IAM Identity Center: Inicio de sesión único para varias cuentas AWS y apps, con permission sets e IdPs externos.
- Directory Service: Directorios gestionados: Managed Microsoft AD, AD Connector (proxy) y Simple AD.
- Control Tower: Configura una landing zone multi-cuenta con guardrails y Account Factory.
- Disaster Recovery: Estrategias para restaurar sistemas tras un fallo grave: Backup & Restore, Pilot Light, Warm Standby, Multi-Site.
- CloudFormation: Servicio de infraestructura como código que crea recursos AWS desde plantillas JSON/YAML agrupadas en stacks.
- StackSets: Despliega stacks de CloudFormation en múltiples cuentas y Regiones a la vez.
- MediaConvert: Servicios de transcodificación de vídeo bajo demanda.
- Outposts: Infraestructura AWS instalada en tu centro de datos.
- Acoplamiento débil: Diseño en que los componentes se comunican mediante colas o eventos para fallar y escalar de forma independiente.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué en una web de tres capas la base de datos va en subredes privadas?
- (que-pasa-si) ¿Qué pasa con los pedidos si el backend cae y no hay una cola entre medias?
- (aplicar) Diseña el procesamiento de imágenes subidas a S3 con miniaturas y metadatos en DynamoDB.
- (por-que) ¿Por qué guardar la sesión del usuario fuera de las instancias (ElastiCache o DynamoDB)?
- (que-pasa-si) ¿Qué pasa si sirves una web estática muy visitada en todo el mundo directamente desde S3, sin CloudFront?
- (aplicar) Diseña una API serverless con usuarios registrados y datos por clave.
