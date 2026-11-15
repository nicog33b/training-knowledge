---
title: EBS e Instance Store
summary: Volúmenes EBS, tipos, snapshots, cifrado, Multi-Attach e Instance Store.
order: 6
section: almacenamiento-bloques
status: done
requires: []
---

## EBS e Instance Store

**EBS (Elastic Block Store)** es un disco de red persistente que se adjunta a una instancia. Está **atado a una AZ** (para moverlo se hace snapshot y se restaura en otra AZ/Región). Se factura por GB aprovisionados e IOPS.

### Tipos de volumen
- **gp2 / gp3** (SSD uso general): gp3 permite fijar IOPS (hasta 16 000) y throughput independientemente del tamaño; gp2 liga IOPS al tamaño (3 IOPS/GB).
- **io1 / io2 Block Express** (SSD IOPS aprovisionados): hasta 64 000 IOPS (256 000 con io2 Block Express); bases de datos críticas. Soportan **Multi-Attach**.
- **st1** (HDD optimizado para throughput): big data, logs, data warehouse.
- **sc1** (HDD en frío): acceso infrecuente, el más barato.
- Solo SSD (gp y io) pueden ser volumen de **arranque**.

### Multi-Attach (io1/io2)
Un mismo volumen conectado a hasta 16 instancias de la **misma AZ**; requiere sistema de archivos con clúster. Para alta disponibilidad de apps clusterizadas.

### Snapshots
Copias incrementales en S3 (gestionadas por AWS). Funciones:
- **Snapshot Archive**: hasta 75 % más barato, restauración en 24-72 h.
- **Recycle Bin**: recupera snapshots/AMIs borrados por error con retención configurable.
- **Fast Snapshot Restore (FSR)**: elimina la latencia de primera lectura (coste elevado).
- **Data Lifecycle Manager (DLM)**: automatiza creación/retención.

### Cifrado
Con KMS: cifra datos en reposo, en tránsito entre instancia y volumen, y snapshots. Impacto de latencia mínimo. Para cifrar un volumen existente: snapshot → copiar cifrando → crear volumen.

### Instance Store
Disco **físicamente unido** al host: IOPS extremos y latencia mínima, pero **efímero** (se pierde al parar/terminar o si falla el hardware). Úsalo para buffers, caché y datos temporales; responsabilidad de backup tuya.

> **Tip de examen**: IOPS > 80 000 → Instance Store o io2 Block Express; compartir entre AZ → EFS; volumen EBS no cruza AZ.
