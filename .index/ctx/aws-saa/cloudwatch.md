# Subtema: CloudWatch [aws-saa/cloudwatch]
Métricas, alarmas, logs, Logs Insights, Synthetics y Container/Lambda Insights.

## CloudWatch

**CloudWatch** es el servicio de observabilidad de AWS: métricas, logs, alarmas, eventos y paneles.

### Métricas
- Pertenecen a un **namespace** (p. ej. `AWS/EC2`), tienen **dimensiones** (InstanceId) y marca de tiempo; hasta 30 dimensiones.
- **EC2 básico**: cada 5 min; **monitorización detallada**: cada 1 min (de pago). Memoria y disco **no** son métricas nativas → requieren el **CloudWatch Agent** (métricas personalizadas).
- **Métricas personalizadas**: `PutMetricData`; resolución estándar 1 min o alta resolución hasta 1 s. Se aceptan datos con timestamp hasta 2 semanas atrás y 2 horas adelante.
- **Metric Streams** hacia Firehose (S3, Datadog…).
- **Dashboards** globales multi-región y multi-cuenta.

### Alarmas
Estados: `OK`, `ALARM`, `INSUFFICIENT_DATA`. Acciones: **EC2** (stop, terminate, reboot, recover), **Auto Scaling**, **SNS**. **Composite alarms** combinan varias con AND/OR. Alarmas sobre **logs** mediante metric filters. Evaluación configurable (periodos, datapoints to alarm).

### Logs
- Organización: **Log Group** (aplicación) → **Log Stream** (instancia/contenedor). Retención configurable (por defecto indefinida).
- Fuentes: SDK, **CloudWatch Logs Agent/unified agent**, Elastic Beanstalk, ECS, Lambda, VPC Flow Logs, API Gateway, CloudTrail, Route 53.
- **Exportación**: a S3 (`CreateExportTask`, hasta ~12 h), **Subscription Filters** (casi tiempo real) a Kinesis, Firehose, Lambda, OpenSearch; agregación multi-cuenta/región.
- **Logs Insights**: lenguaje de consulta sobre logs (no tiempo real, bajo demanda).
- **Metric Filters**: extraen métricas de logs para alarmas.
- Cifrado KMS por log group; **Live Tail** para ver logs al instante.

### Insights y más
- **Container Insights** (ECS, EKS, Fargate), **Lambda Insights**, **Contributor Insights** (top-N), **Application Insights**.
- **Synthetics**: *canaries* (scripts Node/Python) que prueban APIs y sitios con navegador sin cabeza.
- **Evidently / RUM**: pruebas de funcionalidades y monitoreo real de usuarios.

### Relaciones
CloudWatch Alarms → SNS (notificar) o EC2 action; **EventBridge** reacciona a eventos (y cron); **X-Ray** traza peticiones distribuidas.

## Glosario usado
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- SDK: Biblioteca por lenguaje (boto3, JS, Java…) para llamar a la API de AWS desde código.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- On-Demand: Modelo de compra EC2 de pago por uso sin compromiso.
- Route 53: DNS global gestionado de AWS con registro de dominios, health checks y políticas de enrutamiento.
- VPC Flow Logs: Registro de metadatos del tráfico IP de una VPC, subred o ENI hacia CloudWatch, S3 o Firehose.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Firehose: Servicio de entrega casi en tiempo real de streams a S3, Redshift, OpenSearch y otros destinos.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- ECS: Orquestador de contenedores propio de AWS, con lanzamiento en EC2 o Fargate.
- Fargate: Motor serverless para ejecutar contenedores en ECS o EKS sin gestionar servidores.
- EKS: Kubernetes gestionado por AWS con nodos EC2 o Fargate.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.
- OpenSearch: Servicio de búsqueda y analítica de logs y texto, sucesor de Elasticsearch.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- CloudWatch Agent: Agente que envía métricas del sistema (memoria, disco) y logs de instancias a CloudWatch.
- Métrica personalizada: Métrica enviada por el usuario a CloudWatch con PutMetricData, con resolución estándar o alta.
- Alarma de CloudWatch: Evalúa una métrica y dispara acciones (SNS, EC2, Auto Scaling) al superar un umbral.
- Log Group: Contenedor de logs de CloudWatch (por aplicación) que agrupa streams de logs de cada fuente.
- Logs Insights: Lenguaje de consulta interactivo para analizar logs en CloudWatch.
- Subscription Filter: Filtro que envía logs de CloudWatch en tiempo real a Kinesis, Firehose o Lambda.
- Metric Filter: Extrae métricas a partir de patrones en logs de CloudWatch.
- CloudWatch Synthetics: Scripts programados (canaries) que prueban APIs y sitios web de forma continua.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- X-Ray: Servicio de trazado distribuido para analizar latencias y errores en aplicaciones.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- Elastic Beanstalk: PaaS que despliega y escala aplicaciones desde el código, gestionando EC2, ASG, ELB y más.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué la memoria de una EC2 no aparece en CloudWatch por defecto?
- (que-pasa-si) ¿Qué pasa con una alarma en estado INSUFFICIENT_DATA?
- (aplicar) ¿Cómo reiniciarías automáticamente una instancia cuando falla su status check?
