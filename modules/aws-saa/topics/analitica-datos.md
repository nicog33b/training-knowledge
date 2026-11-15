---
title: Servicios de analítica
summary: Athena, EMR, Redshift, OpenSearch, Glue, Lake Formation, QuickSight,
  MSK y Managed Flink.
order: 29
section: analitica
status: done
requires: []
---

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
