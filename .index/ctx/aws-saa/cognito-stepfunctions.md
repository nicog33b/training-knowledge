# Subtema: Cognito y Step Functions [aws-saa/cognito-stepfunctions]
Identidad de usuarios de aplicaciones y orquestación de flujos serverless.

## Cognito y Step Functions

### Amazon Cognito
Da identidad a **usuarios de aplicaciones web y móviles** (distinto de IAM, que es para empleados/cuentas AWS).
- **User Pools (CUP)**: directorio de usuarios para **autenticación** (registro, login, MFA, recuperación de contraseña, verificación de email/teléfono); emite **JWT**. Soporta proveedores sociales (Google, Facebook, Apple) y SAML/OIDC. Se integra con **ALB** y **API Gateway** como autorizador. Hosted UI propia con dominio.
- **Identity Pools (Federated Identities)**: **autorización** — canjea un token (de User Pool, social, SAML) por **credenciales temporales de AWS** (STS) con roles IAM, para acceder directamente a S3 o DynamoDB; soporta usuarios invitados y políticas por `${cognito-identity.amazonaws.com:sub}`.
- Se pueden combinar: User Pool autentica; Identity Pool autoriza a recursos AWS.

> **Tip de examen**: "usuarios de la app con login social" → Cognito User Pool; "dar a la app móvil acceso directo a S3" → Cognito Identity Pool; "directorio corporativo" → IAM Identity Center / Directory Service.

### AWS Step Functions
Orquestador **serverless de flujos** de trabajo con máquinas de estado en JSON (**Amazon States Language**). Reemplaza código "pegamento" y reintentos manuales.
- **Estados**: Task, Choice, Wait, Parallel, Map, Pass, Succeed, Fail.
- Integra Lambda, ECS, Batch, DynamoDB, SNS, SQS, Glue, SageMaker y más (+200 servicios via SDK).
- Gestión de **errores, reintentos y timeouts** declarativa; auditoría visual de cada ejecución.
- **Standard** (hasta 1 año, exactly-once, ejecuciones auditables, ~2 000 transiciones/s) vs **Express** (hasta 5 min, at-least-once, 100 000+/s, para alto volumen de eventos).
- Se dispara desde API Gateway, EventBridge, SDK o CLI. Caso típico: procesamiento de pedidos con aprobación humana (callback token).

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- lambda: AWS Lambda — Funciones sin servidor: límites, concurrencia, triggers, VPC, SnapStart y Lambda@Edge. [secciones: AWS Lambda · Límites clave (por Región / ejecución) · Invocación · Concurrencia · Rendimiento, red y seguridad · Patrones · Lambda vs contenedores]
- s3-fundamentos: S3: fundamentos y seguridad — Buckets, objetos, bucket policies, versionado, replicación y cifrado. [secciones: S3: fundamentos y seguridad · Buckets y objetos · Seguridad y acceso · Versionado · Replicación · Cifrado]

## Glosario usado
- JSON: Formato de texto para datos estructurados (objetos, listas, números, cadenas) que entienden casi todos los lenguajes.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- MFA: Segundo factor de autenticación (app, llave FIDO, token hardware) además de la contraseña.
- STS: Servicio que emite credenciales temporales de acceso a AWS (AssumeRole, GetSessionToken, federación).
- AWS CLI: Herramienta de línea de comandos para llamar a la API de AWS, configurada con aws configure.
- SDK: Biblioteca por lenguaje (boto3, JS, Java…) para llamar a la API de AWS desde código.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- ECS: Orquestador de contenedores propio de AWS, con lanzamiento en EC2 o Fargate.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.
- JWT: Token firmado en JSON que transporta identidad y claims de un usuario autenticado.
- Cognito: Servicio de identidad para usuarios de aplicaciones: User Pools e Identity Pools.
- User Pool: Directorio de usuarios de Cognito que autentica y emite tokens JWT.
- Identity Pool: Canjea tokens por credenciales temporales de AWS para acceder directamente a recursos.
- Step Functions: Orquestador serverless de flujos de trabajo definidos como máquinas de estado.
- Amazon States Language: Lenguaje JSON para definir máquinas de estado de Step Functions.
- Glue: Servicio ETL serverless con catálogo de metadatos, crawlers y jobs Spark.
- SageMaker: Plataforma completa para construir, entrenar y desplegar modelos de ML.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- IAM Identity Center: Inicio de sesión único para varias cuentas AWS y apps, con permission sets e IdPs externos.
- Directory Service: Directorios gestionados: Managed Microsoft AD, AD Connector (proxy) y Simple AD.
- AWS Batch: Ejecuta trabajos por lotes como contenedores con dimensionamiento automático.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué hay dos piezas en Cognito: user pools e identity pools?
- (comparar) ¿Qué ventaja da Step Functions frente a encadenar Lambdas que se llaman entre sí?
- (aplicar) Una app móvil necesita que cada usuario suba fotos a su carpeta de S3: ¿qué pieza de Cognito usas?
- (comparar) Compara los workflows Standard y Express de Step Functions.
- (aplicar) Un paso del flujo necesita que una persona apruebe antes de seguir: ¿cómo lo haces con Step Functions?
- (que-pasa-si) ¿Qué pasa si un paso de Step Functions falla por un error temporal?
