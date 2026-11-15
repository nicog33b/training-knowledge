---
title: Snow Family, Storage Gateway y DataSync
summary: "Mover datos a AWS: Snowcone/Snowball/Snowmobile, Storage Gateway,
  DataSync y Transfer Family."
order: 19
section: almacenamiento-hibrido
status: done
requires: []
---

## Snow Family, Storage Gateway y DataSync

### Snow Family
Dispositivos físicos para **migrar datos offline** o hacer **edge computing** cuando la red es insuficiente (regla: si la transferencia tarda >1 semana, usa Snow).
- **Snowcone**: 8 TB (HDD) / 14 TB (SSD), muy pequeño, también con DataSync para envío online.
- **Snowball Edge Storage Optimized**: ~80 TB utilizables (210 TB NVMe en el modelo más nuevo), cómputo básico.
- **Snowball Edge Compute Optimized**: 28 TB NVMe, GPU opcional, EC2/Lambda en el edge.
- **Snowmobile**: camión con hasta 100 PB (exabytes); migraciones masivas de centro de datos.
- Proceso: pedir dispositivo → cargar datos → devolverlo → AWS los vuelca en S3. Importar a **Glacier** requiere pasar primero por S3 y un lifecycle rule.
- **OpsHub** es el software de gestión.

### Storage Gateway (híbrido)
Puente entre on-premises y almacenamiento AWS, con caché local.
- **S3 File Gateway**: NFS/SMB → objetos en S3 (Standard, IA…), con caché local, integrado con Active Directory.
- **FSx File Gateway**: acceso local rápido a FSx for Windows.
- **Volume Gateway**: iSCSI respaldado por S3 con snapshots EBS; *cached* (datos en S3, caché local) o *stored* (todo local, backup asíncrono).
- **Tape Gateway**: VTL (biblioteca virtual de cintas) compatible con software de backup, archivando en S3/Glacier.
- Corre como VM o appliance hardware.

### DataSync
Servicio para **mover grandes volúmenes** entre on-premises (NFS, SMB, HDFS) y AWS (S3, EFS, FSx) y también entre servicios AWS, con un **agente** en origen. Programable (no continuo), preserva permisos y metadatos, cifra y valida integridad. Se puede combinar con Snowcone si no hay red.

### Transfer Family
SFTP, FTPS y FTP gestionados hacia S3/EFS, con autenticación (Directory Service, IdP propio) y tarifa por endpoint por hora.

### Elegir
| Necesidad | Servicio |
|---|---|
| Sin red / petabytes | Snow Family |
| Archivos locales con caché y backend S3 | Storage Gateway |
| Migración programada online | DataSync |
| Clientes SFTP existentes | Transfer Family |
