---
title: CloudWatch
summary: Métricas, alarmas, logs, Logs Insights, Synthetics y Container/Lambda Insights.
order: 31
section: monitoreo
status: done
requires: []
---

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
