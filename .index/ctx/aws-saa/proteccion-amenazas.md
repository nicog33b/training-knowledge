# Subtema: Protección contra amenazas [aws-saa/proteccion-amenazas]
Shield, WAF, Firewall Manager, GuardDuty, Inspector, Macie, Detective y Security Hub.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- elb: Elastic Load Balancing — ALB, NLB, GWLB, CLB, sticky sessions, cross-zone, SSL/SNI y connection draining. [secciones: Elastic Load Balancing · Tipos · Funciones clave · Elegir]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- Load Balancer: Reparte el tráfico entrante entre varios destinos sanos y expone un único punto de entrada.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- NLB: Balanceador de capa 4 (TCP/UDP/TLS) de ultra rendimiento con una IP estática por AZ.
- GWLB: Balanceador de capa 3 (GENEVE) para desplegar y escalar appliances virtuales de red y seguridad.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Route 53: DNS global gestionado de AWS con registro de dominios, health checks y políticas de enrutamiento.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- VPC Flow Logs: Registro de metadatos del tráfico IP de una VPC, subred o ENI hacia CloudWatch, S3 o Firehose.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket: Contenedor de objetos en S3 con nombre global único creado en una Región.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Global Accelerator: Servicio con 2 IPs anycast estáticas que enruta tráfico TCP/UDP por la red global de AWS hacia tus endpoints.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- ECR: Registro gestionado de imágenes de contenedor con escaneo de vulnerabilidades e integración IAM.
- EKS: Kubernetes gestionado por AWS con nodos EC2 o Fargate.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.
- User Pool: Directorio de usuarios de Cognito que autentica y emite tokens JWT.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- AWS Config: Registra la configuración de recursos y evalúa su cumplimiento con reglas.
- Trusted Advisor: Herramienta con recomendaciones de coste, rendimiento, seguridad, tolerancia a fallos y límites.
- Systems Manager: Conjunto de herramientas para operar flotas: Session Manager, Parameter Store, Patch Manager, Run Command, Automation.
- Shield: Protección DDoS: Standard (gratuita, capas 3/4) y Advanced (de pago, con equipo de respuesta y protección de costes).
- DDoS: Ataque que satura un servicio con tráfico desde muchas fuentes.
- WAF: Firewall de capa 7 que filtra HTTP/S por IP, geografía, SQLi, XSS y límites de tasa.
- Rate-based rule: Regla de WAF que bloquea IPs que superan un número de peticiones por periodo.
- Firewall Manager: Aplica reglas de WAF, Shield, SG y Network Firewall de forma centralizada en una Organization.
- Network Firewall: Firewall gestionado de VPC con inspección profunda y filtrado por dominio.
- GuardDuty: Detección inteligente de amenazas con ML sobre CloudTrail, Flow Logs y DNS logs.
- Inspector: Escáner automático de vulnerabilidades para EC2, imágenes ECR y funciones Lambda.
- Macie: Descubre datos sensibles y PII en S3 usando ML.
- PII: Información de identificación personal, como nombres, tarjetas o documentos.
- Detective: Analiza y visualiza logs para encontrar la causa raíz de incidentes de seguridad.
- Security Hub: Panel central que agrega hallazgos de seguridad y comprueba estándares de cumplimiento.
- AWS Artifact: Portal de informes de cumplimiento y acuerdos de AWS (ISO, SOC, PCI).
- Organizations: Servicio para gestionar varias cuentas AWS con facturación consolidada, OUs y SCPs.
- AppSync: Servicio gestionado de GraphQL con suscripciones en tiempo real.

## Preguntas sugeridas al alumno
- (comparar) Compara GuardDuty, Inspector y Macie: ¿qué detecta cada uno?
- (aplicar) ¿Dónde pones WAF para bloquear inyección SQL: en un NLB o en un ALB?
- (por-que) ¿Por qué Shield Advanced incluye protección de costes por DDoS?

## Simulaciones del subtema
- clasificar: ¿Qué servicio de seguridad?
