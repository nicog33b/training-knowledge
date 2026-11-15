---
title: "S3: fundamentos y seguridad"
summary: Buckets, objetos, bucket policies, versionado, replicación y cifrado.
order: 15
section: s3
status: done
requires: []
---

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
