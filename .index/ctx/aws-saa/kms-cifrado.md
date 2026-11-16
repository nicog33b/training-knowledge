# Subtema: KMS, CloudHSM y gestión de secretos [aws-saa/kms-cifrado]
Cifrado con KMS, SSM Parameter Store, Secrets Manager, ACM y CloudHSM.

## KMS, CloudHSM y gestión de secretos

### Conceptos de cifrado
- **En tránsito** (TLS/SSL): protege datos viajando por la red.
- **En reposo**: datos cifrados en disco con claves.
- **Cifrado en el servidor** vs **en el cliente**.
- **Envelope encryption**: una clave de datos cifra los datos y una clave maestra cifra la clave de datos (para archivos >4 KB).

### AWS KMS (Key Management Service)
Servicio gestionado para crear y controlar claves de cifrado, integrado con casi todos los servicios (S3, EBS, RDS, Lambda…) y con IAM y **CloudTrail** (cada uso queda auditado).
- **Tipos de claves**:
  - *AWS owned keys* (gratis, invisibles).
  - *AWS managed keys* (`aws/s3`, `aws/ebs`; gratis, rotación automática anual).
  - *Customer managed keys (CMK/KMS keys)*: tuyas, 1 $/mes, rotación opcional (anual automática o manual).
  - *Simétricas* (AES-256, nunca salen de KMS; API Encrypt/Decrypt) y *asimétricas* (RSA/ECC, par público/privado, para firmar o cifrar fuera de AWS).
- **Key Policy**: política de recurso obligatoria de la clave (la "bucket policy" de KMS); puede delegar en IAM.
- **Regionales**: una clave KMS está ligada a una Región. Para copiar un snapshot cifrado a otra Región se vuelve a cifrar con otra clave. **Multi-Region Keys** son claves con el mismo ID/material replicado, útiles para cifrado global (DynamoDB Global Tables, Aurora Global).
- Límite: `Encrypt/Decrypt` sujeto a cuotas por segundo (5 500-30 000 según Región); con SSE-KMS en S3 cada acceso cuenta; mitiga con **S3 Bucket Keys**.
- **Compartir** snapshots cifrados con otra cuenta: usa una CMK (no la managed key) y concede acceso en la key policy.

### CloudHSM
**Hardware Security Module** dedicado, resistente a manipulación, FIPS 140-2 Nivel 3, **bajo tu control exclusivo** (AWS no tiene acceso a las claves). Soporta claves simétricas y asimétricas, SSL offload, firmas. Despliegue en clúster multi-AZ. Integración con KMS como *custom key store*. Elige CloudHSM si necesitas control total o requisitos de cumplimiento estrictos.

### SSM Parameter Store
Almacén de **configuración y secretos** seguro y serverless: versionado, jerarquías (`/app/prod/db`), cifrado opcional con KMS (`SecureString`), integrado con IAM y notificaciones por EventBridge. Tiers: *Standard* (gratis, 4 KB) y *Advanced* (8 KB, políticas con TTL, de pago).

### Secrets Manager
Servicio dedicado a **secretos** (contraseñas de BD, API keys): **rotación automática** mediante Lambda, integración nativa con RDS/Aurora/Redshift/DocumentDB, cifrado con KMS, **replicación multi-Región**. Más caro que Parameter Store (0,40 $/secreto/mes).

### AWS Certificate Manager (ACM)
Aprovisiona, administra y **renueva automáticamente** certificados TLS **públicos gratuitos** (o importados). Se integra con ELB, CloudFront (certificado en us-east-1) y API Gateway; no se pueden instalar directamente en EC2.

### Elegir
| Necesidad | Servicio |
|---|---|
| Claves de cifrado administradas | KMS |
| Hardware dedicado, control exclusivo | CloudHSM |
| Configuración barata, algunos secretos | Parameter Store |
| Rotación automática de credenciales de BD | Secrets Manager |
| Certificados HTTPS | ACM |

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- ebs: EBS e Instance Store — Volúmenes EBS, tipos, snapshots, cifrado, Multi-Attach e Instance Store. [secciones: EBS e Instance Store · Tipos de volumen · Multi-Attach (io1/io2) · Snapshots · Cifrado · Instance Store]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- TTL: Time To Live. Duración tras la cual un dato guardado se considera vencido.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- Load Balancer: Reparte el tráfico entrante entre varios destinos sanos y expone un único punto de entrada.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Aurora: Base de datos relacional de AWS compatible con MySQL y PostgreSQL, con almacenamiento distribuido en 3 AZ y hasta 15 réplicas.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket Policy: Política JSON basada en recurso asociada a un bucket; habilita acceso cross-account o público.
- Versionado: Conserva cada versión de un objeto S3 protegiendo de borrados y sobrescrituras.
- SSE-KMS: Cifrado en el servidor con claves de KMS, con auditoría en CloudTrail.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- Global Tables: Replicación activa-activa de una tabla DynamoDB en varias Regiones.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.
- DocumentDB: Base de datos de documentos gestionada compatible con MongoDB, con almacenamiento tipo Aurora.
- Redshift: Data warehouse columnar MPP (OLAP) basado en PostgreSQL que escala a petabytes.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- Envelope Encryption: Técnica en que una clave de datos cifra la información y una clave maestra cifra esa clave de datos.
- Customer Managed Key: Clave KMS creada y controlada por el cliente, con key policy y rotación opcional.
- Key Policy: Política de recurso obligatoria que controla quién puede usar y administrar una clave KMS.
- Multi-Region Keys: Claves KMS con el mismo ID y material replicado en varias Regiones.
- S3 Bucket Keys: Reducen las llamadas a KMS de SSE-KMS en S3, bajando costes.
- CloudHSM: Módulo de seguridad de hardware dedicado donde solo tú controlas las claves (FIPS 140-2 Nivel 3).
- Parameter Store: Almacén seguro y jerárquico de configuración y secretos de Systems Manager, con versionado.
- Secrets Manager: Servicio para almacenar secretos con rotación automática y replicación multi-Región.
- ACM: Servicio que aprovisiona y renueva automáticamente certificados TLS para ELB, CloudFront y API Gateway.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el cifrado de sobre (envelope) permite cifrar datos grandes con KMS?
- (comparar) Compara Secrets Manager y Parameter Store: ¿cuál rota secretos de forma nativa?
- (que-pasa-si) ¿Qué pasa con un snapshot cifrado si quieres compartirlo con otra cuenta?
- (aplicar) ¿Cuándo exigirías CloudHSM en vez de KMS?
- (comparar) Compara una clave gestionada por AWS y una customer managed key en KMS.
- (aplicar) Replicas datos cifrados entre dos Regiones y no quieres descifrar y volver a cifrar al moverlos: ¿qué usas?
