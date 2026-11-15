---
title: Protección contra amenazas
summary: Shield, WAF, Firewall Manager, GuardDuty, Inspector, Macie, Detective y
  Security Hub.
order: 34
section: seguridad
status: done
requires: []
---

## Protección contra amenazas

### Shield (DDoS)
- **Shield Standard**: gratuito para todos; protege contra ataques comunes de capa 3/4 (SYN/UDP flood, reflexión).
- **Shield Advanced**: ~3 000 $/mes por organización; protección ampliada para EC2, ELB, CloudFront, Global Accelerator y Route 53, equipo de respuesta DRT 24/7, **protección de costes** durante ataques y WAF incluido en ataques.

### AWS WAF (Web Application Firewall)
Firewall de **capa 7** (HTTP/S) para ALB, API Gateway, CloudFront, AppSync, Cognito User Pool. Define **Web ACLs** con reglas: bloquear **IPs/rangos**, cabeceras, cuerpo, URI, **SQL injection** y **XSS**, geo-matching y **rate-based rules** (limitar peticiones por IP, defensa DDoS de capa 7). Reglas administradas (AWS y Marketplace). No protege NLB (capa 4).

### Firewall Manager
Gestiona y aplica de forma central **reglas** de WAF, Shield Advanced, security groups, Network Firewall y Route 53 DNS Firewall en **todas las cuentas de una Organization**, incluso para recursos nuevos.

### Network Firewall
Firewall gestionado de **VPC** (capas 3-7) con inspección profunda, filtrado por dominio, IPS; protege tráfico entrante y saliente de la VPC (usa GWLB internamente).

### Amazon GuardDuty
**Detección inteligente de amenazas** con ML y feeds de inteligencia sobre: **CloudTrail**, **VPC Flow Logs**, **DNS logs**, EKS audit, S3 data events, Lambda, malware en EBS, RDS login. Sin agentes. Hallazgos a EventBridge → Lambda/SNS. Detecta instancias comprometidas, minería de cripto, llamadas de API sospechosas.

### Amazon Inspector
**Evaluación automatizada de vulnerabilidades**: EC2 (agente SSM), imágenes de contenedor en ECR y funciones Lambda; escanea CVEs y exposición de red de forma continua; puntúa por riesgo; envía a Security Hub y EventBridge.

### Amazon Macie
Servicio de **privacidad de datos con ML** que descubre y protege **PII y datos sensibles** en buckets S3 (tarjetas, nombres, claves); alertas a EventBridge.

### Otros
- **Amazon Detective**: análisis de causa raíz; agrega y visualiza logs (GuardDuty, CloudTrail, Flow Logs) para investigar incidentes.
- **Security Hub**: panel central de seguridad y cumplimiento que agrega hallazgos de GuardDuty, Inspector, Macie, Firewall Manager, Config…; estándares CIS, PCI DSS.
- **AWS Artifact**: informes de cumplimiento y acuerdos (ISO, SOC, PCI).
- **Secrets / Trusted Advisor** y **Audit Manager**.

### Cómo recordarlo
DDoS → Shield. Inyecciones/XSS/rate limit → WAF. Política multi-cuenta → Firewall Manager. Amenazas en cuenta → GuardDuty. Vulnerabilidades en cómputo → Inspector. PII en S3 → Macie. Investigar un incidente → Detective. Todo junto → Security Hub.
