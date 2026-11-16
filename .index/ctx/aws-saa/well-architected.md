# Subtema: Well-Architected Framework [aws-saa/well-architected]
Los seis pilares, principios de diseño y herramientas de revisión.

## Well-Architected Framework

El **AWS Well-Architected Framework** reúne mejores prácticas para diseñar y operar arquitecturas en la nube, organizadas en **seis pilares**. La **Well-Architected Tool** (consola) permite revisar cargas de trabajo y generar planes de mejora.

### Los seis pilares
1. **Excelencia operativa**: ejecutar y monitorizar sistemas y mejorar procesos. Principios: operaciones como código, cambios pequeños y reversibles, anticipar fallos, aprender de incidentes. Servicios: CloudFormation, Config, CloudWatch, X-Ray, Systems Manager.
2. **Seguridad**: proteger información y sistemas. Principios: identidad fuerte (mínimo privilegio), trazabilidad, seguridad en todas las capas, automatizar, proteger datos en tránsito y reposo, prepararse para incidentes. Servicios: IAM, KMS, GuardDuty, Shield/WAF, CloudTrail.
3. **Fiabilidad**: recuperarse de fallos y satisfacer la demanda. Principios: probar procedimientos de recuperación, recuperarse automáticamente, escalar horizontalmente, no adivinar capacidad, automatizar cambios. Servicios: Multi-AZ, Auto Scaling, Route 53, Backup, Shield.
4. **Eficiencia del rendimiento**: usar los recursos de computación con eficacia. Principios: democratizar tecnologías avanzadas, ir global en minutos, serverless, experimentar más a menudo, comprender los sistemas. Servicios: Lambda, CloudFront, ElastiCache, Global Accelerator.
5. **Optimización de costes**: evitar costes innecesarios. Principios: gestionar el consumo, pagar solo lo que uso, medir la eficiencia, dejar de gastar en el centro de datos, analizar y atribuir el gasto. Servicios: Savings Plans, Spot, Cost Explorer, Budgets, rightsizing.
6. **Sostenibilidad**: minimizar el impacto ambiental. Principios: comprender impacto, maximizar utilización, adoptar hardware más eficiente, usar servicios gestionados, reducir el volumen de datos. Servicios: Graviton, Auto Scaling, S3 lifecycle.

### Principios generales de diseño
- **Dejar de adivinar** la capacidad y **escalar** bajo demanda.
- **Probar** a escala de producción.
- **Automatizar** para experimentar fácilmente.
- **Arquitecturas evolutivas** y basadas en datos.
- **Game days** para ensayar fallos.
- **Acoplamiento débil** (colas, eventos) y **servicios en lugar de servidores**.

### AWS Well-Architected Tool y otros
- **Lens**: especializaciones (Serverless, SaaS, IoT, ML, Data Analytics).
- **Cloud Adoption Framework (CAF)**: perspectivas de negocio, personas, gobierno, plataforma, seguridad y operaciones.
- **Trusted Advisor**: comprobaciones automáticas alineadas con los pilares.

## Glosario usado
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- Mínimo privilegio: Conceder solo los permisos estrictamente necesarios para una tarea.
- On-Demand: Modelo de compra EC2 de pago por uso sin compromiso.
- Savings Plans: Compromiso de gasto por hora a 1-3 años que otorga descuentos; Compute Savings Plans cubre EC2, Fargate y Lambda.
- Spot Instances: Capacidad sobrante de EC2 con hasta ~90 % de descuento que AWS puede reclamar con 2 minutos de aviso.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- ElastiCache: Caché en memoria gestionada con motores Redis/Valkey y Memcached.
- Route 53: DNS global gestionado de AWS con registro de dominios, health checks y políticas de enrutamiento.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Lifecycle Rules: Reglas que transicionan objetos entre clases o los expiran automáticamente.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Global Accelerator: Servicio con 2 IPs anycast estáticas que enruta tráfico TCP/UDP por la red global de AWS hacia tus endpoints.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- AWS Config: Registra la configuración de recursos y evalúa su cumplimiento con reglas.
- X-Ray: Servicio de trazado distribuido para analizar latencias y errores en aplicaciones.
- Trusted Advisor: Herramienta con recomendaciones de coste, rendimiento, seguridad, tolerancia a fallos y límites.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- Systems Manager: Conjunto de herramientas para operar flotas: Session Manager, Parameter Store, Patch Manager, Run Command, Automation.
- Shield: Protección DDoS: Standard (gratuita, capas 3/4) y Advanced (de pago, con equipo de respuesta y protección de costes).
- WAF: Firewall de capa 7 que filtra HTTP/S por IP, geografía, SQLi, XSS y límites de tasa.
- GuardDuty: Detección inteligente de amenazas con ML sobre CloudTrail, Flow Logs y DNS logs.
- Cost Explorer: Herramienta para visualizar, analizar y prever costes y uso de AWS.
- CloudFormation: Servicio de infraestructura como código que crea recursos AWS desde plantillas JSON/YAML agrupadas en stacks.
- Budgets: Alertas de gasto y uso frente a un presupuesto definido.
- Compute Optimizer: Recomienda tamaños óptimos de recursos con ML.
- Well-Architected Framework: Buenas prácticas de AWS organizadas en seis pilares: excelencia operativa, seguridad, fiabilidad, rendimiento, costes y sostenibilidad.
- Cloud Adoption Framework: Guía de AWS para planificar la adopción de la nube desde perspectivas de negocio, personas, gobierno, plataforma, seguridad y operaciones.
- Graviton: Procesadores ARM diseñados por AWS con mejor relación precio-rendimiento y eficiencia energética.
- Acoplamiento débil: Diseño en que los componentes se comunican mediante colas o eventos para fallar y escalar de forma independiente.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el pilar de sostenibilidad se añadió como sexto pilar?
- (aplicar) Elige un pilar y di qué decisión de arquitectura lo mejora y cuál lo empeora.
- (comparar) Compara fiabilidad y eficiencia del rendimiento: ¿qué pregunta responde cada uno?
- (comparar) ¿Cuáles son los seis pilares de Well-Architected y qué pregunta clave responde cada uno?
- (aplicar) ¿Qué herramienta usas para revisar una carga de trabajo contra el marco Well-Architected?
- (error-comun) Error común: ¿por qué optimizar costes no significa elegir siempre lo más barato?
