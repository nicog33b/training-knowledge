# Subtema: EventBridge, CloudTrail y Config [aws-saa/eventbridge-cloudtrail-config]
Eventos, auditoría de API y cumplimiento de configuración; X-Ray y Health.

## EventBridge, CloudTrail y Config

### Amazon EventBridge (antes CloudWatch Events)
Bus de eventos serverless.
- **Fuentes**: servicios AWS (EC2 cambia de estado, CodeBuild, S3 events vía CloudTrail), cron/rate **schedules** (EventBridge Scheduler), aplicaciones propias y **SaaS partners** (Zendesk, Datadog).
- **Buses**: *default* (eventos AWS), *partner* y *custom*. **Reglas** con patrones de eventos filtran y envían a **targets** (Lambda, SQS, SNS, Step Functions, ECS, Kinesis, API destinations…).
- **Archive y Replay** de eventos, **Schema Registry**, **cross-account/region** con políticas de recurso. Ejemplos: alertar cuando el usuario root inicia sesión; lanzar Lambda cuando un ASG se escala; disparar un pipeline cada noche.

### CloudTrail
**Auditoría de llamadas a la API** de AWS (consola, SDK, CLI): quién, qué, cuándo y desde dónde. Habilitado por defecto con 90 días de historial.
- Tipos de eventos: **Management** (por defecto; crear/borrar recursos), **Data** (S3 object-level, Lambda invoke; opcionales y de volumen alto) e **Insights** (actividad inusual).
- Almacena en S3 (cifrado SSE-KMS, **log file validation**) y puede enviar a CloudWatch Logs; trails multi-región y de organización.
- Consulta con **CloudTrail Lake** o Athena. Para reaccionar en tiempo real combínalo con EventBridge.

### AWS Config
Registra la **configuración de recursos** a lo largo del tiempo y evalúa su **cumplimiento** con **Config Rules** (administradas o personalizadas con Lambda): p. ej. "los buckets S3 no deben ser públicos", "volúmenes cifrados". Responde: *¿cómo era el recurso ayer? ¿quién lo cambió?* (con CloudTrail). Soporta **remediación automática** con SSM Automation, **conformance packs** y agregadores multi-cuenta. No impide acciones; las detecta.

### Diferencias
| Servicio | Pregunta que responde |
|---|---|
| CloudWatch | ¿Cómo va el rendimiento? |
| CloudTrail | ¿Quién llamó a qué API? |
| Config | ¿Cómo está configurado y cumple las reglas? |

### Otros
- **X-Ray**: trazado distribuido (mapa de servicios, latencias, errores) de aplicaciones.
- **AWS Health Dashboard**: estado de servicios y eventos que afectan a tu cuenta.
- **Trusted Advisor**: recomendaciones de coste, rendimiento, seguridad, tolerancia a fallos y límites de servicio.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- lambda: AWS Lambda — Funciones sin servidor: límites, concurrencia, triggers, VPC, SnapStart y Lambda@Edge. [secciones: AWS Lambda · Límites clave (por Región / ejecución) · Invocación · Concurrencia · Rendimiento, red y seguridad · Patrones · Lambda vs contenedores]
- iam: IAM: usuarios, grupos y políticas — Identidades, permisos, políticas JSON, MFA, roles y herramientas de auditoría de IAM. [secciones: IAM: Identity and Access Management · Entidades · Políticas · Política de contraseñas y MFA · Roles: casos típicos · Herramientas de seguridad de IAM]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Usuario root: Identidad creada con la cuenta de AWS con acceso total e irrestricto; debe protegerse con MFA y usarse lo mínimo.
- AWS CLI: Herramienta de línea de comandos para llamar a la API de AWS, configurada con aws configure.
- SDK: Biblioteca por lenguaje (boto3, JS, Java…) para llamar a la API de AWS desde código.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Auto Scaling Group: Grupo de instancias EC2 con tamaño mínimo/deseado/máximo que se autorrepara y escala.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket: Contenedor de objetos en S3 con nombre global único creado en una Región.
- SSE-KMS: Cifrado en el servidor con claves de KMS, con auditoría en CloudTrail.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- ECS: Orquestador de contenedores propio de AWS, con lanzamiento en EC2 o Fargate.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- Step Functions: Orquestador serverless de flujos de trabajo definidos como máquinas de estado.
- Athena: Servicio serverless de consultas SQL sobre datos en S3, facturado por TB escaneado.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- AWS Config: Registra la configuración de recursos y evalúa su cumplimiento con reglas.
- X-Ray: Servicio de trazado distribuido para analizar latencias y errores en aplicaciones.
- Trusted Advisor: Herramienta con recomendaciones de coste, rendimiento, seguridad, tolerancia a fallos y límites.
- AWS Health Dashboard: Estado de servicios AWS y eventos que afectan a tus recursos.
- Systems Manager: Conjunto de herramientas para operar flotas: Session Manager, Parameter Store, Patch Manager, Run Command, Automation.
- CodeDeploy: Servicios CI/CD de AWS: construcción (CodeBuild), despliegue (CodeDeploy), orquestación (CodePipeline).

## Preguntas sugeridas al alumno
- (comparar) ¿Por qué CloudTrail responde 'quién hizo qué' y Config 'cómo estaba configurado'?
- (que-pasa-si) ¿Qué pasa si alguien abre un security group al 0.0.0.0/0 y tienes una regla de Config?
- (aplicar) ¿Cómo ejecutarías una Lambda cada noche a las 2:00?
- (que-pasa-si) ¿Qué pasa con el historial de CloudTrail si no creas ningún trail?
- (aplicar) Quieres un aviso inmediato cada vez que alguien inicia sesión con el usuario root: ¿cómo?
- (aplicar) ¿Cómo demuestras que nadie alteró los logs de CloudTrail?

## Herramientas del curso en este subtema
- comparador: Comparador de mensajería y eventos — SQS, SNS, Kinesis Data Streams y EventBridge lado a lado: el clásico de preguntas de examen con servicios confundibles.
