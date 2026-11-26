# Subtema: S3: fundamentos y seguridad [aws-saa/s3-fundamentos]
Buckets, objetos, bucket policies, versionado, replicación y cifrado.

## S3: fundamentos y seguridad

**Amazon S3 (Simple Storage Service)** es almacenamiento de objetos prácticamente ilimitado, con 99,999999999 % (11 nueves) de durabilidad. Es la base de data lakes, backups, sitios estáticos y distribución de software.

### Buckets y objetos
- **Bucket**: contenedor con nombre **globalmente único**, creado en una Región.
- **Objeto**: archivo con **key** (ruta completa, p. ej. `carpeta/archivo.txt`; S3 no tiene carpetas reales), valor (hasta 5 TB), metadatos, tags y *version ID*. Subida de más de 5 GB obliga a **multi-part upload** (recomendado >100 MB).

### Seguridad y acceso
- **IAM policies** (usuario/rol), **Bucket Policies** (JSON en el bucket; permiten acceso cross-account y público), **ACLs** (legado, desactivadas por defecto).
- Un principal accede si IAM **o** la bucket policy lo permite y no hay Deny explícito.
- **Block Public Access**: salvaguarda a nivel de bucket/cuenta contra exposición accidental.
- **Pre-signed URLs**: URL temporal con los permisos de quien la genera para descargar/subir.
- **Hosting de sitios estáticos**: endpoint público; error 403 suele indicar bucket policy faltante.
- **CORS**: cabeceras para permitir que un origen distinto cargue recursos del bucket.

### Versionado
Mantiene cada versión de un objeto; protege frente a borrados y sobrescrituras. Un delete añade un *delete marker*; versiones previas siguen recuperables. Los objetos anteriores a activarlo tienen versión `null`. Suspender no borra versiones.

### Replicación
Requiere versionado en origen y destino.
- **CRR (Cross-Region)** y **SRR (Same-Region)**, asíncrona, entre cuentas posibles, con IAM role.
- Solo replica objetos nuevos (usar S3 Batch Replication para existentes); los delete markers pueden replicarse, los borrados de versión no; sin encadenamiento.
- Usos: cumplimiento, menor latencia, agregación de logs, replicación entre prod/test.

### Cifrado
- **SSE-S3**: claves gestionadas por S3 (AES-256) — por defecto para objetos nuevos.
- **SSE-KMS**: claves en KMS, auditoría con CloudTrail, límites de cuota de KMS.
- **SSE-C**: clave aportada por el cliente en cada petición (solo HTTPS).
- **Cifrado en cliente**: cifras antes de subir.
- **En tránsito**: HTTPS (se puede forzar con `aws:SecureTransport` en la bucket policy).
- **DSSE-KMS**: doble capa.

> **Tip de examen**: dar acceso desde otra cuenta → bucket policy; acceso de una instancia EC2 → rol IAM; acceso temporal a un archivo privado → pre-signed URL.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- kms-cifrado: KMS, CloudHSM y gestión de secretos — Cifrado con KMS, SSM Parameter Store, Secrets Manager, ACM y CloudHSM. [secciones: KMS, CloudHSM y gestión de secretos · Conceptos de cifrado · AWS KMS (Key Management Service) · CloudHSM · SSM Parameter Store · Secrets Manager · AWS Certificate Manager (ACM) · Elegir]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- JSON: Formato de texto para datos estructurados (objetos, listas, números, cadenas) que entienden casi todos los lenguajes.
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- Rol IAM: Identidad sin credenciales permanentes que puede asumir un servicio, otra cuenta o usuario; entrega credenciales temporales.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket: Contenedor de objetos en S3 con nombre global único creado en una Región.
- Bucket Policy: Política JSON basada en recurso asociada a un bucket; habilita acceso cross-account o público.
- Block Public Access: Control a nivel de bucket o cuenta que impide la exposición pública accidental de datos.
- Pre-signed URL: URL temporal firmada que otorga acceso a un objeto con los permisos de quien la generó.
- CORS: Mecanismo de cabeceras HTTP para permitir que un origen cargue recursos de otro.
- Versionado: Conserva cada versión de un objeto S3 protegiendo de borrados y sobrescrituras.
- Replicación S3: Copia asíncrona de objetos a otro bucket en otra Región (CRR) o en la misma (SRR); requiere versionado.
- SSE-S3: Cifrado en el servidor con claves gestionadas por S3 (AES-256).
- SSE-KMS: Cifrado en el servidor con claves de KMS, con auditoría en CloudTrail.
- SSE-C: Cifrado en el servidor con una clave proporcionada por el cliente en cada petición HTTPS.
- Multi-Part Upload: Subida de un objeto en partes paralelas; recomendada >100 MB y obligatoria >5 GB.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- AWS Batch: Ejecuta trabajos por lotes como contenedores con dimensionamiento automático.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué la replicación de S3 exige tener el versionado activado?
- (que-pasa-si) ¿Qué pasa con un objeto si borras sin indicar versión en un bucket versionado?
- (comparar) Compara SSE-S3, SSE-KMS y SSE-C: ¿quién controla la clave en cada uno?
- (que-pasa-si) ¿Qué pasa si Block Public Access está activado y añades una bucket policy que hace público el bucket?
- (comparar) Compara bucket policies y ACL para dar acceso a S3.
- (por-que) ¿Por qué después de escribir un objeto en S3 puedes leerlo al instante con su contenido nuevo?

## Herramientas del curso en este subtema
- decision: ¿Qué almacenamiento de AWS? — Asistente para elegir entre S3, EBS, EFS y FSx según el tipo de acceso y quién lo comparte.
