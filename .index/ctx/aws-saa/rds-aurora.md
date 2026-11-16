# Subtema: RDS y Aurora [aws-saa/rds-aurora]
Bases relacionales gestionadas: Multi-AZ, réplicas de lectura, Aurora, RDS Proxy y backups.

## RDS y Aurora

**RDS (Relational Database Service)** gestiona bases SQL: PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, Db2 y Aurora. AWS se encarga del aprovisionamiento, parches del SO, backups, monitorización, escalado y Multi-AZ. **No tienes acceso SSH** a la instancia (excepto RDS Custom).

### Backups y recuperación
- **Backups automáticos**: diarios + logs de transacciones, retención 1-35 días, **point-in-time recovery** al segundo.
- **Snapshots manuales**: retención ilimitada.
- Restaurar siempre crea una **nueva** instancia.

### Alta disponibilidad vs escalado de lectura
- **Réplicas de lectura (Read Replicas)**: hasta 15; replicación **asíncrona** (consistencia eventual); pueden ser cross-AZ o cross-Region; se pueden promover a bases independientes. Solo lecturas (SELECT). Dentro de la misma Región no hay coste de transferencia entre AZ.
- **Multi-AZ**: réplica **síncrona** en otra AZ solo para failover (no se lee de ella), mismo DNS, conmutación automática. Es **alta disponibilidad**, no escalado. Se puede pasar de Single-AZ a Multi-AZ sin parada.
- **Multi-AZ DB Cluster** (MySQL/PostgreSQL): 2 réplicas legibles.

### Seguridad
Cifrado en reposo con KMS (se define al crear; para cifrar uno existente: snapshot → copia cifrada), TLS en tránsito, **IAM Authentication** (MySQL/PostgreSQL) y security groups. Sin acceso al SO.

### RDS Proxy
Pool de conexiones totalmente gestionado: reduce el estrés de conexiones, mejora tiempos de failover (-66 %), cifrado forzado, credenciales en Secrets Manager. Muy útil con **Lambda**, que abre muchas conexiones. No es accesible públicamente.

### Aurora
BD propietaria de AWS compatible con **MySQL y PostgreSQL**, con 5× el rendimiento de MySQL y 3× el de PostgreSQL en RDS, ~20 % más cara.
- Almacenamiento compartido que **crece automáticamente de 10 GB a 128 TB**, con **6 copias en 3 AZ** (tolera perder 2 copias de escritura y 3 de lectura), autorreparable.
- 1 instancia **Writer** + hasta 15 **Aurora Replicas**; failover en <30 s. Endpoints: *Writer* (escritura), *Reader* (balancea lecturas) y *custom endpoints*.
- **Aurora Serverless v2**: capacidad ACU que escala automáticamente; cargas impredecibles.
- **Aurora Global Database**: 1 Región primaria + hasta 5 secundarias de lectura, replicación <1 s, RTO <1 min en DR.
- **Aurora Multi-Master / Backtrack** (MySQL): rebobinar sin restaurar; **Aurora Machine Learning**; **Babelfish** para SQL Server.
- **Clonación**: crea una BD nueva rápido con copy-on-write.

> **Tip de examen**: "alta disponibilidad" = Multi-AZ; "rendimiento de lectura" = Read Replicas; "mínima carga operativa y cargas variables" = Aurora Serverless.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- lambda: AWS Lambda — Funciones sin servidor: límites, concurrencia, triggers, VPC, SnapStart y Lambda@Edge. [secciones: AWS Lambda · Límites clave (por Región / ejecución) · Invocación · Concurrencia · Rendimiento, red y seguridad · Patrones · Lambda vs contenedores]
- recuperacion-desastres: Recuperación de desastres — RPO/RTO, estrategias de DR, backups y AWS Backup, Elastic Disaster Recovery. [secciones: Recuperación de desastres (DR) · Conceptos · Estrategias de DR (de menor a mayor coste y rapidez) · Servicios y técnicas · Elegir]

## Glosario usado
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Read Replica: Copia asíncrona de solo lectura para escalar lecturas; puede estar en otra Región y promoverse.
- Point-in-time recovery: Restaurar una base de datos a cualquier instante dentro del periodo de retención de backups.
- RDS Proxy: Pool de conexiones gestionado para RDS/Aurora que mejora resiliencia y reduce carga; ideal con Lambda.
- Aurora: Base de datos relacional de AWS compatible con MySQL y PostgreSQL, con almacenamiento distribuido en 3 AZ y hasta 15 réplicas.
- Aurora Serverless: Variante de Aurora que ajusta automáticamente la capacidad (ACU) a la carga.
- Aurora Global Database: Base Aurora multi-Región con replicación <1 s hacia hasta 5 Regiones secundarias.
- Backtrack: Función de Aurora MySQL para rebobinar la base a un instante previo sin restaurar un backup.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- Secrets Manager: Servicio para almacenar secretos con rotación automática y replicación multi-Región.
- RTO: Tiempo máximo aceptable para restablecer el servicio tras un desastre.
- Disaster Recovery: Estrategias para restaurar sistemas tras un fallo grave: Backup & Restore, Pilot Light, Warm Standby, Multi-Site.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué Multi-AZ no mejora el rendimiento de lectura?
- (que-pasa-si) ¿Qué pasa con las lecturas de una réplica justo después de escribir en la principal?
- (aplicar) ¿Cuándo pondrías RDS Proxy delante de la base de datos?
- (comparar) Compara Aurora con RDS MySQL en réplicas, almacenamiento y failover.
- (aplicar) Una base de datos con tráfico muy intermitente e impredecible: ¿qué opción de Aurora eliges?
- (que-pasa-si) ¿Qué pasa con los backups automáticos si borras una instancia de RDS?
- (aplicar) Necesitas DR en otra Región con RPO de segundos para Aurora: ¿qué usas?

## Simulaciones del subtema
- clasificar: ¿Multi-AZ o réplica de lectura?
