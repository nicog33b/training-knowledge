---
title: KMS, CloudHSM y gestión de secretos
summary: Cifrado con KMS, SSM Parameter Store, Secrets Manager, ACM y CloudHSM.
order: 33
section: seguridad
status: done
requires: []
---

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
