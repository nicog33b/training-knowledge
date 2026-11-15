---
title: Otros servicios relevantes
summary: SES, Pinpoint, Batch, AppFlow, Amplify, Elastic Transcoder, Cost
  Explorer y más.
order: 39
section: otros
status: done
requires: []
---

## Otros servicios relevantes

### Comunicación y marketing
- **SES (Simple Email Service)**: envío masivo de correos transaccionales y de marketing por SMTP/API; reputación, DKIM/SPF.
- **Pinpoint**: marketing multicanal (email, SMS, push, voz) con segmentación y campañas (en evolución hacia nuevos servicios).
- **SNS** para notificaciones simples y móviles; **Connect** para contact center.

### Procesamiento y cómputo adicional
- **AWS Batch**: ejecuta trabajos por lotes como contenedores en EC2/Spot o Fargate, con colas y planificación; dimensiona automáticamente. Diferencia con Lambda: sin límite de 15 min, cualquier runtime, almacenamiento EBS/instance store.
- **Lightsail**: VPS simples con precio fijo (blogs, apps pequeñas) para quien no sabe de cloud.
- **Elastic Transcoder / MediaConvert**: transcodificación de vídeo (MediaConvert es el sucesor).
- **AppFlow**: transferencia de datos entre SaaS (Salesforce, Slack, SAP) y AWS (S3, Redshift) con transformaciones, sin código.
- **AppSync**: GraphQL gestionado en tiempo real con suscripciones.
- **Amplify**: herramientas para construir y alojar aplicaciones web y móviles full-stack.

### Aplicaciones de escritorio y trabajo
- **WorkSpaces**: escritorios virtuales (DaaS) Windows/Linux; **AppStream 2.0**: streaming de aplicaciones.
- **Workspaces Web**, **WorkDocs**.

### IoT y edge
- **IoT Core**: conecta dispositivos con MQTT; **Greengrass** (cómputo local en el borde).
- **Outposts**: infraestructura AWS en tu centro de datos (racks o servidores); **Local Zones** (latencia ultra baja en ciudades), **Wavelength** (en redes 5G), **Snow**.

### Costes
- **Cost Explorer**, **Budgets** (alertas de gasto y de uso), **Cost and Usage Report**, **Cost Allocation Tags**, **Savings Plans** y **Compute Optimizer** (recomendaciones de tamaño con ML), **Trusted Advisor**, **Pricing Calculator**.

### Soporte y otros
- **Planes de soporte**: Basic, Developer, Business y Enterprise (On-Ramp, Enterprise con TAM).
- **Well-Architected Tool**, **Service Quotas** (límites), **Resource Groups & Tag Editor**.
- **Ground Station**, **Braket** (cuántica), **RoboMaker**: servicios nicho poco probables en SAA.
