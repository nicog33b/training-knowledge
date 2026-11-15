---
title: Recuperación de desastres
summary: RPO/RTO, estrategias de DR, backups y AWS Backup, Elastic Disaster Recovery.
order: 36
section: dr-migracion
status: done
requires: []
---

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
