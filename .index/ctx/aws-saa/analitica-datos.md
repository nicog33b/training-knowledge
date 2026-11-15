# Subtema: Servicios de analítica [aws-saa/analitica-datos]
Athena, EMR, Redshift, OpenSearch, Glue, Lake Formation, QuickSight, MSK y Managed Flink.

## Servicios de analítica

### Athena
Consultas **SQL serverless** sobre datos en S3 (CSV, JSON, ORC, Avro, **Parquet**), basado en Presto/Trino; pagas por TB escaneado ($5/TB). Optimiza con **formatos columnares** (Parquet/ORC), **compresión**, **particionado** y archivos grandes. **Federated Query** (conectores Lambda) consulta RDS, DynamoDB, on-premises. Catálogo vía Glue Data Catalog. Usos: logs de VPC/ALB/CloudTrail, informes ad-hoc.

### Redshift
Data warehouse columnar **OLAP** basado en PostgreSQL, 10× más rápido que otros DWH, escala a PB. Procesamiento masivamente paralelo (MPP). Nodos *Leader* y *Compute*; RA3 separa cómputo y almacenamiento. **Redshift Spectrum** consulta S3 sin cargar. **Multi-AZ** para HA y snapshots (cross-region) para DR. **Redshift Serverless** para cargas impredecibles. Carga masiva con COPY desde S3.

### EMR (Elastic MapReduce)
Clusters gestionados de **Hadoop, Spark, HBase, Presto, Flink, Hive** para big data. Nodos *master, core* y *task*; admite instancias Spot para tasks. Puede ser transitorio (se destruye al terminar) o de larga vida. **EMR Serverless** y EMR on EKS.

### OpenSearch Service
Búsqueda y analítica de texto/logs (antes Elasticsearch), con dashboards (OpenSearch Dashboards). Complemento de DynamoDB o CloudWatch Logs (vía Lambda/Firehose); no es serverless por defecto (existe modo *Serverless*). Multi-AZ.

### QuickSight
BI **serverless**: dashboards interactivos, motor en memoria **SPICE**, **ML Insights**, seguridad por filas/columnas, usuarios/grupos propios; se integra con Athena, RDS, Redshift, S3 y más. Paga por sesión/usuario.

### Glue
ETL **serverless** gestionado:
- **Glue Data Catalog**: metastore central de metadatos para Athena, Redshift Spectrum, EMR.
- **Crawlers**: infieren esquemas y rellenan el catálogo.
- **Glue ETL** (Spark), **Glue Studio**, **DataBrew** (limpieza visual), **Glue Elastic Views**.
- Job bookmarks para procesar solo datos nuevos.

### Lake Formation
Construye y securiza **data lakes** en S3 en días: ingesta, limpieza, catálogo y **control de acceso centralizado** a nivel de fila, columna y celda, sobre Glue.

### Streaming y MSK
- **Kinesis** (ver tema) y **MSK (Managed Streaming for Apache Kafka)**: Kafka gestionado en tu VPC, mensajes de hasta 10 MB (frente a 1 MB de Kinesis), almacenamiento en EBS, replicación Multi-AZ; **MSK Serverless**.
- **Managed Service for Apache Flink** para procesamiento de streams.

### Piezas típicas
- Analítica sobre logs en S3: **S3 → Glue crawler → Athena → QuickSight**.
- Streaming a S3: **Kinesis → Firehose → S3 (Parquet)**.
- Ingesta a DWH: **S3 → COPY → Redshift**.

## Glosario usado
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- Spot Instances: Capacidad sobrante de EC2 con hasta ~90 % de descuento que AWS puede reclamar con 2 minutos de aviso.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Firehose: Servicio de entrega casi en tiempo real de streams a S3, Redshift, OpenSearch y otros destinos.
- Managed Service for Apache Flink: Servicio gestionado para analizar streams en tiempo real con Flink o SQL.
- EKS: Kubernetes gestionado por AWS con nodos EC2 o Fargate.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- Redshift: Data warehouse columnar MPP (OLAP) basado en PostgreSQL que escala a petabytes.
- Redshift Spectrum: Función de Redshift para consultar datos en S3 sin cargarlos en el cluster.
- OLAP: Procesamiento analítico en línea: consultas complejas sobre grandes volúmenes de datos.
- ETL: Proceso de extraer, transformar y cargar datos de un sistema a otro.
- Athena: Servicio serverless de consultas SQL sobre datos en S3, facturado por TB escaneado.
- Parquet: Formatos de archivo columnares comprimidos que reducen el coste de consulta en Athena y Redshift Spectrum.
- EMR: Servicio de clusters gestionados de big data con Hadoop, Spark, Hive, Presto y Flink.
- OpenSearch: Servicio de búsqueda y analítica de logs y texto, sucesor de Elasticsearch.
- QuickSight: Servicio de BI serverless con dashboards interactivos y motor en memoria SPICE.
- Glue: Servicio ETL serverless con catálogo de metadatos, crawlers y jobs Spark.
- Lake Formation: Servicio para crear data lakes en S3 con control de acceso centralizado por fila, columna y celda.
- MSK: Apache Kafka gestionado en tu VPC, con mensajes de hasta 10 MB.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- Disaster Recovery: Estrategias para restaurar sistemas tras un fallo grave: Backup & Restore, Pilot Light, Warm Standby, Multi-Site.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué Athena cobra por datos escaneados y cómo reduces el coste con Parquet y particiones?
- (comparar) Compara Athena y Redshift: ¿consultas puntuales o un almacén de datos constante?
- (aplicar) ¿Qué hace Glue en un pipeline de datos de S3 a Athena?
