---
title: Organizations, IAM Identity Center y Control Tower
summary: Multi-cuenta, SCP, federación, Directory Service y gobierno.
order: 35
section: seguridad
status: done
requires: []
---

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
