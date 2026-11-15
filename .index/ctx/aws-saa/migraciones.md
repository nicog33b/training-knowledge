# Subtema: Migraciones [aws-saa/migraciones]
Las 7 R, DMS, SCT, Application Migration Service, Migration Hub y VMware Cloud.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- rds-aurora: RDS y Aurora — Bases relacionales gestionadas: Multi-AZ, réplicas de lectura, Aurora, RDS Proxy y backups. [secciones: RDS y Aurora · Backups y recuperación · Alta disponibilidad vs escalado de lectura · Seguridad · RDS Proxy · Aurora]

## Glosario usado
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- AMI: Plantilla regional (SO + software + configuración) para lanzar instancias EC2.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Read Replica: Copia asíncrona de solo lectura para escalar lecturas; puede estar en otra Región y promoverse.
- Aurora: Base de datos relacional de AWS compatible con MySQL y PostgreSQL, con almacenamiento distribuido en 3 AZ y hasta 15 réplicas.
- Direct Connect: Enlace de red físico dedicado y privado entre tu centro de datos y AWS.
- Snow Family: Dispositivos físicos para migrar datos offline o computar en el edge: Snowcone, Snowball Edge y Snowmobile.
- Storage Gateway: Servicio híbrido que expone S3/EBS/FSx a sistemas locales vía NFS, SMB, iSCSI o VTL con caché local.
- DataSync: Servicio para transferir y sincronizar grandes volúmenes entre on-premises y AWS con un agente.
- Transfer Family: Servidores SFTP, FTPS y FTP gestionados con destino S3 o EFS.
- AWS Artifact: Portal de informes de cumplimiento y acuerdos de AWS (ISO, SOC, PCI).
- 7 R: Estrategias de migración: Retire, Retain, Relocate, Rehost, Replatform, Repurchase y Refactor.
- Application Migration Service: Servicio de lift-and-shift con replicación continua de servidores hacia EC2.
- Migration Hub: Panel central para seguir migraciones; Discovery Service inventaría servidores on-premises.
- VMware Cloud on AWS: Stack VMware ejecutándose sobre hardware de AWS para extender o migrar centros de datos.
- DMS: Migra bases de datos con replicación continua y mínimo downtime.
- SCT: Convierte esquemas y código entre motores de base de datos distintos.
- CloudFormation: Servicio de infraestructura como código que crea recursos AWS desde plantillas JSON/YAML agrupadas en stacks.

## Preguntas sugeridas al alumno
- (comparar) Compara rehost, replatform y refactor con un ejemplo cada uno.
- (por-que) ¿Por qué necesitas SCT además de DMS al migrar de Oracle a Aurora PostgreSQL?
- (aplicar) ¿Qué servicio usas para migrar servidores físicos casi sin parada (lift-and-shift)?
