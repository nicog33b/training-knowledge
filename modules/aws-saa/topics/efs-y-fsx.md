---
title: EFS y FSx
summary: "Sistemas de archivos compartidos: EFS (NFS/Linux) y la familia FSx
  (Windows, Lustre, NetApp, OpenZFS)."
order: 7
section: almacenamiento-bloques
status: done
requires: []
---

## EFS y FSx

### EFS (Elastic File System)
NFS gestionado y elástico, montable en **cientos de instancias Linux a la vez** y **multi-AZ** (a diferencia de EBS). Pago por uso (sin aprovisionar); coste ~3× gp2. Compatible con NFSv4.1; protegido con security groups y cifrado KMS.

- **Modos de rendimiento**: *General Purpose* (latencia baja, web, CMS) y *Max I/O* (alto paralelismo, big data, mayor latencia).
- **Modos de throughput**: *Bursting*, *Provisioned* y *Elastic* (autoescala según carga).
- **Clases de almacenamiento**: Standard, **Standard-IA** (infrecuente) y Archive, con **lifecycle policies** que mueven archivos tras N días. *One Zone* para dev/test más barato.

### FSx
Sistemas de archivos de terceros gestionados:
- **FSx for Windows File Server**: SMB, NTFS, integración con Active Directory, DFS; Multi-AZ; accesible desde Linux y Windows.
- **FSx for Lustre**: sistema de archivos paralelo para HPC, ML, vídeo; cientos de GB/s y millones de IOPS; se integra con S3 (lee y escribe datos del bucket). Opciones *Scratch* (temporal, máxima velocidad) y *Persistent* (replicado).
- **FSx for NetApp ONTAP**: NFS, SMB, iSCSI; migración desde NetApp on-premises; compresión, deduplicación, snapshots.
- **FSx for OpenZFS**: NFS; migración de ZFS; clones y snapshots instantáneos.

### Elegir
| Necesidad | Servicio |
|---|---|
| Archivos compartidos Linux, multi-AZ | EFS |
| Windows/SMB/AD | FSx for Windows |
| HPC, alto rendimiento | FSx for Lustre |
| Disco para una instancia | EBS |
| Hogar de objetos | S3 |
