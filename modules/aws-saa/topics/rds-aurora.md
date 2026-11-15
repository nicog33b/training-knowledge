---
title: RDS y Aurora
summary: "Bases relacionales gestionadas: Multi-AZ, réplicas de lectura, Aurora,
  RDS Proxy y backups."
order: 10
section: datos-relacionales
status: done
requires: []
---

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
