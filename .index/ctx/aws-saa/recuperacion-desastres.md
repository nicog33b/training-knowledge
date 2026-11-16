# Subtema: Recuperación de desastres [aws-saa/recuperacion-desastres]
RPO/RTO, estrategias de DR, backups y AWS Backup, Elastic Disaster Recovery.

## Recuperación de desastres (DR)

### Conceptos
- **RPO (Recovery Point Objective)**: cuánto dato puedes perder (tiempo desde el último backup/replicación).
- **RTO (Recovery Time Objective)**: cuánto tarda en restaurarse el servicio.
- Menor RPO/RTO = mayor coste.

### Estrategias de DR (de menor a mayor coste y rapidez)
1. **Backup y restauración**: copias en S3/Glacier y restauración tras el desastre. RPO/RTO de horas; el más barato.
2. **Pilot Light**: núcleo mínimo (p. ej. la base de datos replicada) siempre activo; el resto (servidores) se enciende en el desastre. RTO de decenas de minutos.
3. **Warm Standby**: versión reducida pero **funcional** de todo el sistema ejecutándose; escala al fallar. RTO de minutos.
4. **Multi-Site / Hot Site (activo-activo)**: duplicado completo en otra Región recibiendo tráfico; RTO casi cero; el más caro.

### Servicios y técnicas
- **AWS Backup**: gestión **centralizada** de backups con planes (frecuencia, retención, ciclo de vida), cross-region y cross-account, para EBS, EC2, RDS, Aurora, DynamoDB, EFS, FSx, S3, Storage Gateway. **Vault Lock** (WORM) y backup en toda una Organización.
- **Elastic Disaster Recovery (DRS)**: replicación continua a nivel de bloque de servidores físicos, virtuales o cloud hacia una subred de ensayo en AWS; recuperación en minutos.
- **Replicación**: RDS/Aurora cross-region read replicas y **Aurora Global**, **DynamoDB Global Tables**, S3 CRR, EBS snapshots copiados, **Route 53 failover**, AMIs copiadas, **CloudFormation** para recrear infraestructura.
- **Pruebas de DR** regulares (game days) y **chaos engineering**.

### Elegir
| Requisito | Estrategia |
|---|---|
| RTO de horas, mínimo coste | Backup & Restore |
| RTO ~10-30 min, BBDD siempre viva | Pilot Light |
| RTO en minutos con capacidad reducida | Warm Standby |
| RTO ~0, activo-activo | Multi-Site |

## Glosario usado
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- EFS: Sistema de archivos NFS elástico y multi-AZ, montable en cientos de instancias Linux.
- FSx: Familia de sistemas de archivos gestionados: Windows File Server, Lustre, NetApp ONTAP y OpenZFS.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Read Replica: Copia asíncrona de solo lectura para escalar lecturas; puede estar en otra Región y promoverse.
- Aurora: Base de datos relacional de AWS compatible con MySQL y PostgreSQL, con almacenamiento distribuido en 3 AZ y hasta 15 réplicas.
- Route 53: DNS global gestionado de AWS con registro de dominios, health checks y políticas de enrutamiento.
- Subred: Segmento del rango de la VPC que reside en una única AZ.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Replicación S3: Copia asíncrona de objetos a otro bucket en otra Región (CRR) o en la misma (SRR); requiere versionado.
- Glacier: Clases de archivo de S3 de muy bajo coste con distintos tiempos de recuperación.
- Object Lock: Impide borrar o modificar objetos durante un periodo (modo Governance o Compliance, Legal Hold).
- Storage Gateway: Servicio híbrido que expone S3/EBS/FSx a sistemas locales vía NFS, SMB, iSCSI o VTL con caché local.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- Global Tables: Replicación activa-activa de una tabla DynamoDB en varias Regiones.
- RPO: Máxima pérdida de datos aceptable medida en tiempo.
- RTO: Tiempo máximo aceptable para restablecer el servicio tras un desastre.
- Disaster Recovery: Estrategias para restaurar sistemas tras un fallo grave: Backup & Restore, Pilot Light, Warm Standby, Multi-Site.
- Pilot Light: Estrategia DR con el núcleo mínimo (p. ej. BD) siempre activo y el resto apagado.
- Warm Standby: Estrategia DR con una versión reducida pero funcional del sistema siempre ejecutándose.
- Multi-Site: Estrategia DR con réplica completa activa en otra Región que recibe tráfico.
- AWS Backup: Servicio centralizado de backups con planes, retención, cross-region y Vault Lock.
- Elastic Disaster Recovery: Replicación continua de servidores a AWS para recuperarlos rápidamente tras un desastre.
- CloudFormation: Servicio de infraestructura como código que crea recursos AWS desde plantillas JSON/YAML agrupadas en stacks.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué bajar el RTO casi siempre sube el coste?
- (comparar) Compara pilot light y warm standby: ¿qué está encendido en cada uno?
- (error-comun) Error común: ¿por qué tener backups no garantiza un RPO bajo?
- (comparar) Compara backup and restore y multi-site active/active.
- (aplicar) Quieres centralizar y automatizar los backups de EBS, RDS, DynamoDB y EFS con copias en otra Región: ¿qué usas?
- (aplicar) Necesitas recuperar servidores on-premises en AWS en minutos si cae tu centro de datos: ¿qué servicio usas?

## Simulaciones del subtema
- predecir-observar: Elige la estrategia de DR
