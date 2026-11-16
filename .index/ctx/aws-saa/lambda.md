# Subtema: AWS Lambda [aws-saa/lambda]
Funciones sin servidor: límites, concurrencia, triggers, VPC, SnapStart y Lambda@Edge.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- vpc-fundamentos: VPC: fundamentos — CIDR, subredes, route tables, IGW, NAT, NACL, security groups y Flow Logs. [secciones: VPC: fundamentos · Direccionamiento · Componentes · Seguridad de red · Monitoreo]
- sqs: SQS — Colas gestionadas: estándar vs FIFO, visibilidad, long polling, DLQ y patrones. [secciones: SQS: Simple Queue Service · Cola estándar · Visibility Timeout · Long Polling · Dead-Letter Queue (DLQ) · Delay y otros · Patrón con Auto Scaling]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- SDK: Biblioteca por lenguaje (boto3, JS, Java…) para llamar a la API de AWS desde código.
- On-Demand: Modelo de compra EC2 de pago por uso sin compromiso.
- ENI: Interfaz de red virtual con IP privada, SG y MAC; puede moverse entre instancias de la misma AZ.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- RDS Proxy: Pool de conexiones gestionado para RDS/Aurora que mejora resiliencia y reduce carga; ideal con Lambda.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- NAT Gateway: Servicio que permite a instancias privadas iniciar tráfico saliente a Internet sin ser accesibles desde fuera.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Lambda@Edge: Funciones Lambda que se ejecutan en edge locations de CloudFront para personalizar peticiones y respuestas.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- Dead-Letter Queue: Cola donde se aparcan mensajes que fallaron repetidamente para depurarlos.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- ECS: Orquestador de contenedores propio de AWS, con lanzamiento en EC2 o Fargate.
- Fargate: Motor serverless para ejecutar contenedores en ECS o EKS sin gestionar servidores.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- Cold Start: Latencia extra al inicializar un nuevo entorno de ejecución, p. ej. de Lambda.
- SnapStart: Característica de Lambda (Java) que reduce los cold starts restaurando una instantánea inicializada.
- Reserved Concurrency: Límite y garantía de ejecuciones simultáneas asignadas a una función Lambda.
- Provisioned Concurrency: Entornos Lambda precalentados para eliminar cold starts, con coste fijo.
- Lambda Layer: Paquete de bibliotecas o código compartido que varias funciones Lambda pueden reutilizar.
- Function URL: Endpoint HTTPS dedicado de una función Lambda sin necesidad de API Gateway.
- Event Source Mapping: Componente de Lambda que sondea SQS, Kinesis o DynamoDB Streams y la invoca con lotes.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- DynamoDB Streams: Flujo ordenado de cambios de una tabla DynamoDB durante 24 horas.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.
- Throttling: Limitación de la tasa de peticiones; el exceso se rechaza (HTTP 429).
- Cognito: Servicio de identidad para usuarios de aplicaciones: User Pools e Identity Pools.
- CloudWatch Synthetics: Scripts programados (canaries) que prueban APIs y sitios web de forma continua.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué un cold start afecta más a Java que a Python y cómo lo mitiga SnapStart?
- (que-pasa-si) ¿Qué pasa si una función tarda más de 15 minutos?
- (comparar) Compara reserved y provisioned concurrency: ¿cuál evita cold starts?
- (error-comun) Error común: ¿por qué poner una Lambda en una VPC privada le quita salida a Internet?
- (aplicar) ¿Cómo procesas los mensajes de una cola SQS con Lambda sin perder ni duplicar trabajo?
- (comparar) Compara la invocación síncrona y la asíncrona de Lambda.

## Simulaciones del subtema
- predecir-observar: Concurrencia y throttling
