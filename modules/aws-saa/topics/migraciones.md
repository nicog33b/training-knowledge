---
title: Migraciones
summary: Las 7 R, DMS, SCT, Application Migration Service, Migration Hub y VMware Cloud.
order: 37
section: dr-migracion
status: done
requires: []
---

## Migraciones

### Las 7 R de la migración
**Retire** (apagar), **Retain** (mantener donde está), **Relocate** (mover VMware a VMC sin cambios), **Rehost** (*lift-and-shift*), **Replatform** (*lift-tinker-shift*, p. ej. a RDS), **Repurchase** (pasar a SaaS) y **Refactor/Re-architect** (rediseñar cloud-native).

### Application Discovery y planificación
- **Application Discovery Service**: inventario de servidores on-premises y dependencias (Agentless Collector para VMware, Discovery Agent). Datos a **Migration Hub**.
- **Migration Hub**: panel central para seguir migraciones de múltiples herramientas.
- **Migration Evaluator**: caso de negocio y estimación de costes.

### Servidores
- **Application Migration Service (MGN)**: *lift-and-shift* con replicación continua a nivel de bloque de servidores físicos/virtuales/cloud hacia EC2 (sustituye a SMS y CloudEndure Migration). Cortes mínimos.
- **VM Import/Export**: importa imágenes de VM a AMI.
- **VMware Cloud on AWS**: ejecuta el stack VMware (vSphere, vSAN, NSX) en infraestructura AWS para extender el DC o migrar sin reconvertir las VM.

### Bases de datos
- **DMS (Database Migration Service)**: migra BD con **replicación continua** (CDC) minimizando downtime; origen y destino, **homogénea** (Oracle→Oracle) o **heterogénea** (Oracle→Aurora). Requiere una **instancia de replicación EC2**; **Multi-AZ** para HA.
- **SCT (Schema Conversion Tool)**: convierte esquema y código entre motores distintos (heterogéneas).
- Migración MySQL/PostgreSQL → Aurora: snapshot de RDS, réplica de lectura de Aurora o `mysqldump`/Percona.

### Datos
Snow Family y DataSync (ver tema de transferencia), Transfer Family, Direct Connect para cargas continuas. **Migraciones de datos de ficheros**: DataSync, Storage Gateway.

### Otros
**AWS Mainframe Modernization**, **AWS Transform**, **Migration Hub Orchestrator**. Cumplimiento: Artifact. Estrategia habitual: descubrir → evaluar → pilotar → migrar por oleadas → optimizar.
