---
title: EventBridge, CloudTrail y Config
summary: Eventos, auditoría de API y cumplimiento de configuración; X-Ray y Health.
order: 32
section: monitoreo
status: done
requires: []
---

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
