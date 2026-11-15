---
title: Cognito y Step Functions
summary: Identidad de usuarios de aplicaciones y orquestación de flujos serverless.
order: 27
section: serverless
status: done
requires: []
---

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
