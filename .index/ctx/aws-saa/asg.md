# Subtema: Auto Scaling Groups [aws-saa/asg]
Grupos de escalado, launch templates, políticas de escalado y ciclo de vida de instancias.

## Auto Scaling Groups

Un **ASG** mantiene el número deseado de instancias EC2 entre un mínimo y un máximo, sustituye las no sanas y escala según la demanda. Se integra con ELB (registra automáticamente instancias en el target group) y es **gratuito** (pagas los recursos creados).

### Launch Template
Define AMI, tipo de instancia, user data, EBS, security groups, rol IAM, red y claves. Soporta versiones y **mezcla de On-Demand y Spot**. Sustituye a las *Launch Configurations* (obsoletas).

### Parámetros
`MinSize`, `DesiredCapacity`, `MaxSize`; subredes en varias AZ (balancea entre ellas); health checks de EC2 y/o de ELB (si el ELB lo marca no sano, el ASG reemplaza la instancia).

### Políticas de escalado
- **Target tracking**: mantén una métrica en un valor (p. ej. CPU media al 50 %). La más simple.
- **Simple / Step scaling**: reglas basadas en alarmas de CloudWatch (si CPU > 70 % añade 2).
- **Scheduled**: acciones programadas (picos conocidos, viernes por la tarde).
- **Predictive**: usa ML sobre el histórico para escalar con antelación.
- Métricas habituales: CPU, `RequestCountPerTarget`, tráfico de red; **métricas personalizadas** (p. ej. memoria o longitud de cola SQS).
- **Cooldown** (300 s por defecto): periodo en que no se lanzan nuevos escalados para dejar estabilizar.

### Hooks y refresco
- **Lifecycle hooks**: pausan una instancia en `Pending:Wait` o `Terminating:Wait` para ejecutar tareas (instalar, extraer logs).
- **Instance Refresh**: actualiza todas las instancias con una nueva plantilla de forma gradual (min healthy %).
- **Warm pools**: instancias preinicializadas para reducir el tiempo de escalado.
- **Terminación**: por defecto se elimina de la AZ con más instancias, la de configuración más antigua.

> **Tip de examen**: "escalar según la cola SQS" → métrica personalizada (backlog por instancia). "Alta disponibilidad web" → ALB + ASG multi-AZ.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- sqs: SQS — Colas gestionadas: estándar vs FIFO, visibilidad, long polling, DLQ y patrones. [secciones: SQS: Simple Queue Service · Cola estándar · Visibility Timeout · Long Polling · Dead-Letter Queue (DLQ) · Delay y otros · Patrón con Auto Scaling]
- elb: Elastic Load Balancing — ALB, NLB, GWLB, CLB, sticky sessions, cross-zone, SSL/SNI y connection draining. [secciones: Elastic Load Balancing · Tipos · Funciones clave · Elegir]

## Glosario usado
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- Rol IAM: Identidad sin credenciales permanentes que puede asumir un servicio, otra cuenta o usuario; entrega credenciales temporales.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- AMI: Plantilla regional (SO + software + configuración) para lanzar instancias EC2.
- User Data: Script que EC2 ejecuta como root solo en el primer arranque de la instancia.
- On-Demand: Modelo de compra EC2 de pago por uso sin compromiso.
- Spot Instances: Capacidad sobrante de EC2 con hasta ~90 % de descuento que AWS puede reclamar con 2 minutos de aviso.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- Load Balancer: Reparte el tráfico entrante entre varios destinos sanos y expone un único punto de entrada.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- Target Group: Conjunto de destinos (instancias, IPs, Lambda) a los que un balanceador enruta tráfico.
- Health Check: Sonda periódica que determina si un destino puede recibir tráfico.
- Auto Scaling Group: Grupo de instancias EC2 con tamaño mínimo/deseado/máximo que se autorrepara y escala.
- Launch Template: Plantilla versionada con AMI, tipo, user data y red usada por un ASG para lanzar instancias.
- Target Tracking: Política de escalado que mantiene una métrica en un valor objetivo, como CPU media al 50 %.
- Step Scaling: Política de escalado por pasos basada en alarmas de CloudWatch.
- Cooldown: Pausa tras una acción de escalado durante la que no se lanzan otras.
- Lifecycle Hook: Pausa una instancia al lanzarse o terminarse para ejecutar acciones personalizadas.
- Instance Refresh: Reemplazo gradual de las instancias de un ASG con una nueva plantilla o AMI.
- Warm Pool: Instancias preinicializadas que acortan el tiempo de escalado de un ASG.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Subred: Segmento del rango de la VPC que reside en una única AZ.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- Métrica personalizada: Métrica enviada por el usuario a CloudWatch con PutMetricData, con resolución estándar o alta.
- Alarma de CloudWatch: Evalúa una métrica y dispara acciones (SNS, EC2, Auto Scaling) al superar un umbral.
- CloudFormation: Servicio de infraestructura como código que crea recursos AWS desde plantillas JSON/YAML agrupadas en stacks.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué escalar por backlog por instancia de SQS es mejor que por CPU para un worker?
- (que-pasa-si) ¿Qué pasa si el health check del ASG es solo de EC2 y la aplicación devuelve errores 500?
- (comparar) Compara target tracking, step scaling y scheduled scaling.
