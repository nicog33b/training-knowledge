# Subtema: API Gateway [aws-saa/api-gateway]
APIs REST/HTTP/WebSocket: integraciones, stages, autenticación, throttling y caché.

## API Gateway

Servicio gestionado para crear, publicar y proteger **APIs** a escala. Soporta versionado, entornos, autenticación, límites de uso y monitorización. Se integra con Lambda para APIs serverless.

### Tipos de API
- **REST API**: completa (API keys, planes de uso, caché, validación de requests, transformaciones).
- **HTTP API**: más simple, **más barata y rápida**, con OIDC/JWT y CORS; menos funciones.
- **WebSocket API**: comunicación bidireccional persistente (chat, dashboards en vivo) con rutas `$connect`, `$disconnect`.
- Endpoint types: **Edge-optimized** (vía CloudFront), **Regional**, **Private** (solo desde una VPC con interface endpoint).

### Integraciones
Lambda (la más común), HTTP (backend on-premises/ALB), servicios AWS (publicar en SQS, Kinesis, Step Functions…), **Mock**, VPC Link a NLB.

### Despliegue
**Stages** (dev, test, prod) con **stage variables**; despliegues con **canary** (porcentaje de tráfico). Cada cambio exige un *deployment* al stage.

### Seguridad y control
- **Autenticación**: IAM (SigV4) para usuarios internos, **Cognito User Pools** (integración nativa), **Lambda Authorizer** (token o parámetros; lógica propia).
- **Certificados** personalizados con ACM (en edge-optimized, en us-east-1) y dominio propio vía Route 53.
- **Throttling**: 10 000 req/s por cuenta/Región, con límites por stage/método; los excesos devuelven 429. **Planes de uso y API keys** para controlar clientes.
- **Caché** de respuestas (0,5-237 GB, TTL por defecto 300 s) por stage.
- **CORS** configurable; **WAF** asociable a REST API.
- Límite de tiempo de integración: 29 s; payload 10 MB.
- Logs de acceso y ejecución en CloudWatch, X-Ray.

### Códigos útiles
4xx = error del cliente (400 petición mala, 403 acceso denegado, 429 throttling); 5xx = servidor (502 respuesta inválida del backend, 503 servicio no disponible, 504 timeout de integración).

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- cognito-stepfunctions: Cognito y Step Functions — Identidad de usuarios de aplicaciones y orquestación de flujos serverless. [secciones: Cognito y Step Functions · Amazon Cognito · AWS Step Functions]
- iam: IAM: usuarios, grupos y políticas — Identidades, permisos, políticas JSON, MFA, roles y herramientas de auditoría de IAM. [secciones: IAM: Identity and Access Management · Entidades · Políticas · Política de contraseñas y MFA · Roles: casos típicos · Herramientas de seguridad de IAM]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- TTL: Time To Live. Duración tras la cual un dato guardado se considera vencido.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- NLB: Balanceador de capa 4 (TCP/UDP/TLS) de ultra rendimiento con una IP estática por AZ.
- Route 53: DNS global gestionado de AWS con registro de dominios, health checks y políticas de enrutamiento.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- VPC Endpoint: Acceso privado a servicios AWS sin Internet: Gateway (S3, DynamoDB) o Interface (PrivateLink).
- CORS: Mecanismo de cabeceras HTTP para permitir que un origen cargue recursos de otro.
- Versionado: Conserva cada versión de un objeto S3 protegiendo de borrados y sobrescrituras.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.
- REST API: Tipos de API de API Gateway: REST (completa), HTTP (simple y barata) y WebSocket (bidireccional).
- Stage: Entorno de despliegue de una API en API Gateway (dev, prod).
- Lambda Authorizer: Función Lambda que decide si autorizar una petición a API Gateway con lógica propia.
- Throttling: Limitación de la tasa de peticiones; el exceso se rechaza (HTTP 429).
- JWT: Token firmado en JSON que transporta identidad y claims de un usuario autenticado.
- Cognito: Servicio de identidad para usuarios de aplicaciones: User Pools e Identity Pools.
- User Pool: Directorio de usuarios de Cognito que autentica y emite tokens JWT.
- Step Functions: Orquestador serverless de flujos de trabajo definidos como máquinas de estado.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- CloudWatch Synthetics: Scripts programados (canaries) que prueban APIs y sitios web de forma continua.
- X-Ray: Servicio de trazado distribuido para analizar latencias y errores en aplicaciones.
- ACM: Servicio que aprovisiona y renueva automáticamente certificados TLS para ELB, CloudFront y API Gateway.
- WAF: Firewall de capa 7 que filtra HTTP/S por IP, geografía, SQLi, XSS y límites de tasa.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué una API HTTP es más barata que una REST y qué pierdes?
- (que-pasa-si) ¿Qué pasa si un cliente supera el throttling configurado en el stage?
- (comparar) Compara autorizar con Cognito, con un Lambda authorizer y con IAM.
