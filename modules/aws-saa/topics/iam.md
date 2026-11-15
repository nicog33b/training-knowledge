---
title: "IAM: usuarios, grupos y políticas"
summary: Identidades, permisos, políticas JSON, MFA, roles y herramientas de
  auditoría de IAM.
order: 2
section: fundamentos
status: done
requires: []
---

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
