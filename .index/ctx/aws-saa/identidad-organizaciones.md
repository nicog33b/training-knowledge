# Subtema: Organizations, IAM Identity Center y Control Tower [aws-saa/identidad-organizaciones]
Multi-cuenta, SCP, federación, Directory Service y gobierno.

## Organizations, IAM Identity Center y Control Tower

### AWS Organizations
Gestión **multi-cuenta**: una cuenta de administración (management) y cuentas miembro en una jerarquía de **OUs (Organizational Units)**.
- **Facturación consolidada**: una sola factura y **descuentos por volumen** agregados (también para Reserved Instances/Savings Plans compartidos).
- Automatiza la creación de cuentas por API.
- Beneficios: aislamiento por entorno (dev/prod/sandbox), límites de seguridad, etiquetado por cuenta, activar CloudTrail y GuardDuty en toda la organización.
- **SCP (Service Control Policies)**: políticas allow/deny aplicadas a OUs o cuentas que fijan el **máximo de permisos** posible (no conceden; limitan). Afectan a todos los usuarios y roles de la cuenta, **incluido root**, pero no a la cuenta de administración. Estrategias: *deny list* (por defecto se permite todo y se deniegan servicios) o *allow list*.
- **Tag policies**, **backup policies**, **AI opt-out policies**.
- **Reserved Instance sharing**: las RI no usadas en una cuenta se aplican en otras.

### IAM avanzado
- **Cross-account**: asumir un rol en otra cuenta (`sts:AssumeRole`) → credenciales temporales.
- **Condiciones** útiles: `aws:SourceIp`, `aws:RequestedRegion`, `aws:PrincipalOrgID`, `aws:MultiFactorAuthPresent`, tags (ABAC).
- **Resource-based vs IAM role**: al asumir un rol renuncias a tus permisos originales; con política de recurso los conservas.

### IAM Identity Center (antes AWS SSO)
**Inicio de sesión único** para múltiples cuentas AWS y aplicaciones SaaS/SAML desde un portal. Identidades propias o externas (Active Directory, Okta, Azure AD). **Permission sets** (conjuntos de permisos asignados a usuarios/grupos por cuenta); control de acceso por atributos.

### Directory Service
- **AWS Managed Microsoft AD**: AD real gestionado en AWS; relaciones de confianza con AD on-premises.
- **AD Connector**: proxy que redirige las solicitudes al AD on-premises (sin almacenar datos).
- **Simple AD**: directorio compatible con AD básico, independiente de on-premises.

### Control Tower y gobierno
- **Control Tower**: configura una **landing zone** multi-cuenta segura y conforme siguiendo mejores prácticas, con **guardrails** (preventivos con SCP, detectivos con Config) y *Account Factory*.
- **Resource Access Manager (RAM)**: comparte recursos entre cuentas.
- **Service Catalog**, **License Manager**, **Cost Explorer**, **Budgets** y **Cost & Usage Report** para finanzas.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- iam: IAM: usuarios, grupos y políticas — Identidades, permisos, políticas JSON, MFA, roles y herramientas de auditoría de IAM. [secciones: IAM: Identity and Access Management · Entidades · Políticas · Política de contraseñas y MFA · Roles: casos típicos · Herramientas de seguridad de IAM]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- Usuario root: Identidad creada con la cuenta de AWS con acceso total e irrestricto; debe protegerse con MFA y usarse lo mínimo.
- Rol IAM: Identidad sin credenciales permanentes que puede asumir un servicio, otra cuenta o usuario; entrega credenciales temporales.
- Reserved Instances: Compromiso de 1 o 3 años en EC2 con descuento de hasta ~72 % frente a On-Demand.
- Savings Plans: Compromiso de gasto por hora a 1-3 años que otorga descuentos; Compute Savings Plans cubre EC2, Fargate y Lambda.
- RAM: Servicio para compartir recursos AWS (subredes, Transit Gateway…) entre cuentas.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- AWS Config: Registra la configuración de recursos y evalúa su cumplimiento con reglas.
- GuardDuty: Detección inteligente de amenazas con ML sobre CloudTrail, Flow Logs y DNS logs.
- Organizations: Servicio para gestionar varias cuentas AWS con facturación consolidada, OUs y SCPs.
- SCP: Política de Organizations que limita los permisos máximos de cuentas u OUs; no concede permisos.
- IAM Identity Center: Inicio de sesión único para varias cuentas AWS y apps, con permission sets e IdPs externos.
- Directory Service: Directorios gestionados: Managed Microsoft AD, AD Connector (proxy) y Simple AD.
- Control Tower: Configura una landing zone multi-cuenta con guardrails y Account Factory.
- Cost Explorer: Herramienta para visualizar, analizar y prever costes y uso de AWS.
- Budgets: Alertas de gasto y uso frente a un presupuesto definido.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué una SCP no da permisos aunque diga Allow?
- (que-pasa-si) ¿Qué pasa si una SCP deniega una acción que la política IAM de un usuario permite?
- (aplicar) ¿Cómo darías acceso con un solo login a 50 cuentas de AWS?
- (por-que) ¿Por qué la facturación consolidada de Organizations puede salir más barata?
- (aplicar) ¿Cómo impides que cualquier cuenta de la organización use Regiones fuera de la UE?
- (comparar) Compara AWS Control Tower con usar Organizations a mano.
