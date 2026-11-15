---
title: AWS Lambda
summary: "Funciones sin servidor: límites, concurrencia, triggers, VPC,
  SnapStart y Lambda@Edge."
order: 24
section: serverless
status: done
requires: []
---

## AWS Lambda

**Lambda** ejecuta código bajo demanda sin gestionar servidores (FaaS): pagas por **invocación y por ms de ejecución** (con GB-s). Escala automáticamente hasta miles de ejecuciones concurrentes, integrado con la mayoría de servicios AWS. Runtimes: Python, Node.js, Java, Go, .NET, Ruby, custom runtime y **imágenes de contenedor** (hasta 10 GB).

### Límites clave (por Región / ejecución)
- Memoria 128 MB – 10 GB (la CPU escala con la memoria).
- Tiempo máximo: **15 minutos**.
- Variables de entorno: 4 KB. `/tmp`: 512 MB – 10 GB.
- Payload: 6 MB síncrono, 256 KB asíncrono.
- Paquete de despliegue: 50 MB comprimido, 250 MB descomprimido (con layers).
- Concurrencia por defecto: 1 000 por Región (ampliable).

### Invocación
- **Síncrona**: API Gateway, ALB, CloudFront (Lambda@Edge), Cognito, SDK; el cliente espera y gestiona los errores.
- **Asíncrona**: S3, SNS, EventBridge; Lambda reintenta 2 veces y puede enviar fallos a una **DLQ** (SQS/SNS) o a *Destinations* (éxito y fallo).
- **Event Source Mapping** (polling de Lambda): SQS, Kinesis, DynamoDB Streams; procesa por lotes.

### Concurrencia
**Reserved concurrency** (límite y garantía por función) y **Provisioned concurrency** (instancias precalentadas para evitar *cold starts*). El throttling devuelve 429 (síncrono) o reintenta (asíncrono).

### Rendimiento, red y seguridad
- **Cold start**: latencia de inicializar el entorno; **SnapStart** (Java) lo reduce hasta 10×.
- Fuera de VPC por defecto (acceso a Internet). Para acceder a recursos privados (RDS) se despliega **en tu VPC** (ENI); para Internet hará falta NAT Gateway. Con muchas conexiones a RDS usa **RDS Proxy**.
- Rol de ejecución IAM; políticas de recurso para permitir a otros servicios invocarla.
- **Layers**: bibliotecas/dependencias compartidas. **Versions** y **Aliases** (punteros como `PROD` con ponderación para despliegues canary). **Function URL**: endpoint HTTPS directo sin API Gateway (con auth IAM o pública).
- Variables de entorno cifrables con KMS.

### Patrones
Procesar subidas de S3 (thumbnails), CRON serverless con **EventBridge Scheduler**, backend de API con API Gateway + DynamoDB, procesamiento de streams.

### Lambda vs contenedores
Lambda para eventos cortos (<15 min) y cargas variables; ECS/Fargate para procesos largos o con estado y dependencias pesadas.
