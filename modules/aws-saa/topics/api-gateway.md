---
title: API Gateway
summary: "APIs REST/HTTP/WebSocket: integraciones, stages, autenticación,
  throttling y caché."
order: 26
section: serverless
status: done
requires: []
---

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
