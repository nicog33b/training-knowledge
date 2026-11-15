# Subtema: Otros servicios relevantes [aws-saa/otros-servicios]
SES, Pinpoint, Batch, AppFlow, Amplify, Elastic Transcoder, Cost Explorer y más.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- lambda: AWS Lambda — Funciones sin servidor: límites, concurrencia, triggers, VPC, SnapStart y Lambda@Edge. [secciones: AWS Lambda · Límites clave (por Región / ejecución) · Invocación · Concurrencia · Rendimiento, red y seguridad · Patrones · Lambda vs contenedores]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Savings Plans: Compromiso de gasto por hora a 1-3 años que otorga descuentos; Compute Savings Plans cubre EC2, Fargate y Lambda.
- Spot Instances: Capacidad sobrante de EC2 con hasta ~90 % de descuento que AWS puede reclamar con 2 minutos de aviso.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- Instance Store: Disco físico del host con IOPS extremos pero efímero: los datos se pierden al parar o fallar.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- Fargate: Motor serverless para ejecutar contenedores en ECS o EKS sin gestionar servidores.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Redshift: Data warehouse columnar MPP (OLAP) basado en PostgreSQL que escala a petabytes.
- Amazon Connect: Centro de contacto omnicanal en la nube.
- Trusted Advisor: Herramienta con recomendaciones de coste, rendimiento, seguridad, tolerancia a fallos y límites.
- Cost Explorer: Herramienta para visualizar, analizar y prever costes y uso de AWS.
- CloudFormation: Servicio de infraestructura como código que crea recursos AWS desde plantillas JSON/YAML agrupadas en stacks.
- SES: Servicio de envío de correo electrónico masivo y transaccional.
- Pinpoint: Servicio de marketing multicanal (email, SMS, push) con segmentación.
- AWS Batch: Ejecuta trabajos por lotes como contenedores con dimensionamiento automático.
- Lightsail: Servidores privados virtuales con precios fijos y simples para aplicaciones pequeñas.
- MediaConvert: Servicios de transcodificación de vídeo bajo demanda.
- AppFlow: Transferencia de datos sin código entre aplicaciones SaaS y servicios AWS.
- AppSync: Servicio gestionado de GraphQL con suscripciones en tiempo real.
- Amplify: Conjunto de herramientas para construir y alojar apps web y móviles full-stack.
- WorkSpaces: Escritorios virtuales (DaaS) y streaming de aplicaciones.
- IoT Core: Conecta dispositivos IoT con MQTT; Greengrass ejecuta cómputo local en el borde.
- Outposts: Infraestructura AWS instalada en tu centro de datos.
- Local Zones: Extensiones de infraestructura AWS cercanas a grandes ciudades (Local Zones) o redes 5G (Wavelength).
- Budgets: Alertas de gasto y uso frente a un presupuesto definido.
- Compute Optimizer: Recomienda tamaños óptimos de recursos con ML.
- Well-Architected Framework: Buenas prácticas de AWS organizadas en seis pilares: excelencia operativa, seguridad, fiabilidad, rendimiento, costes y sostenibilidad.

## Preguntas sugeridas al alumno
- (aplicar) ¿Qué servicio usas para enviar emails transaccionales a gran escala?
- (comparar) Compara AWS Batch y Lambda para trabajos de 2 horas.
- (aplicar) ¿Cómo detectarías que el gasto del mes va a superar el presupuesto?
