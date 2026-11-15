# Subtema: IAM: usuarios, grupos y políticas [aws-saa/iam]
Identidades, permisos, políticas JSON, MFA, roles y herramientas de auditoría de IAM.

## IAM: Identity and Access Management

IAM es un servicio **global** (no se elige Región) que controla **quién** (autenticación) puede hacer **qué** (autorización) en tu cuenta de AWS.

### Entidades
- **Usuario root**: se crea con la cuenta, tiene permisos totales. Úsalo solo para tareas iniciales y de cuenta; activa MFA y no crees access keys para él.
- **Usuarios**: personas o aplicaciones, con credenciales de largo plazo (contraseña y/o access keys).
- **Grupos**: conjuntos de usuarios (solo usuarios, no otros grupos). Un usuario puede estar en varios grupos.
- **Roles**: identidades **sin credenciales permanentes** que asume un servicio (EC2, Lambda), otra cuenta o un usuario federado. Entregan credenciales temporales vía STS.

### Políticas
Documentos JSON con **Statements**: `Effect` (Allow/Deny), `Action`, `Resource`, opcional `Principal` (solo en políticas basadas en recurso) y `Condition`.

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::mi-bucket/*"
  }]
}
```

- **Principio de mínimo privilegio**: concede solo lo necesario.
- **Políticas basadas en identidad** (adjuntas a usuario/grupo/rol) vs **basadas en recurso** (en el recurso: bucket policy, trust policy de un rol).
- **Inline** (incrustada en una sola entidad) vs **gestionadas** (reutilizables; AWS managed o customer managed).
- **Evaluación**: un `Deny` explícito siempre gana; si no hay `Allow` explícito, se deniega por defecto.
- **Permission boundary**: techo máximo de permisos que una entidad puede llegar a tener.

### Política de contraseñas y MFA
Puedes exigir longitud mínima, caracteres, rotación y reutilización. **MFA** (virtual, llave U2F/FIDO, token hardware) añade un segundo factor; protege sobre todo a root y administradores.

### Roles: casos típicos
- Rol de instancia EC2 para que la app llame a S3 sin guardar claves.
- Rol de ejecución de Lambda.
- Acceso entre cuentas (cross-account) asumiendo un rol.

### Herramientas de seguridad de IAM
- **Credential Report** (a nivel de cuenta): CSV con todos los usuarios y estado de sus credenciales.
- **Access Advisor** (a nivel de usuario): servicios a los que el usuario tiene permiso y cuándo los usó por última vez → permite recortar permisos.
- **IAM Access Analyzer**: detecta recursos compartidos con entidades externas (buckets, roles, KMS keys…).

> **Tip de examen**: nunca pongas access keys dentro de una instancia EC2 → usa un **rol de instancia**. Compartir credenciales entre personas está prohibido.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- s3-fundamentos: S3: fundamentos y seguridad — Buckets, objetos, bucket policies, versionado, replicación y cifrado. [secciones: S3: fundamentos y seguridad · Buckets y objetos · Seguridad y acceso · Versionado · Replicación · Cifrado]

## Glosario usado
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- Usuario root: Identidad creada con la cuenta de AWS con acceso total e irrestricto; debe protegerse con MFA y usarse lo mínimo.
- Mínimo privilegio: Conceder solo los permisos estrictamente necesarios para una tarea.
- Permission boundary: Política que fija el máximo de permisos que una entidad IAM puede obtener, aunque se le adjunten otras más amplias.
- MFA: Segundo factor de autenticación (app, llave FIDO, token hardware) además de la contraseña.
- STS: Servicio que emite credenciales temporales de acceso a AWS (AssumeRole, GetSessionToken, federación).
- Access Key: Par Access Key ID + Secret Access Key que firma peticiones a la API de AWS desde CLI/SDK.
- Credential Report: CSV a nivel de cuenta con el estado de las credenciales (contraseñas, claves, MFA) de todos los usuarios IAM.
- Access Advisor: Muestra, por usuario o rol, los servicios permitidos y cuándo se usaron por última vez, para recortar permisos.
- IAM Access Analyzer: Identifica recursos (buckets, roles, claves KMS) compartidos con entidades externas a tu cuenta u organización.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket: Contenedor de objetos en S3 con nombre global único creado en una Región.
- Bucket Policy: Política JSON basada en recurso asociada a un bucket; habilita acceso cross-account o público.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué se prefiere un rol a guardar access keys dentro de una EC2?
- (que-pasa-si) ¿Qué pasa si una política permite una acción y otra la deniega explícitamente?
- (comparar) ¿En qué se diferencia una política de identidad de una política de recurso?
- (error-comun) Error común: ¿por qué usar el usuario root para el día a día es un problema aunque tenga MFA?
