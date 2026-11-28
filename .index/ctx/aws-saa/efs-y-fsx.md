# Subtema: EFS y FSx [aws-saa/efs-y-fsx]
Sistemas de archivos compartidos: EFS (NFS/Linux) y la familia FSx (Windows, Lustre, NetApp, OpenZFS).

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- ebs: EBS e Instance Store — Volúmenes EBS, tipos, snapshots, cifrado, Multi-Attach e Instance Store. [secciones: EBS e Instance Store · Tipos de volumen · Multi-Attach (io1/io2) · Snapshots · Cifrado · Instance Store]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- gp3: Volúmenes EBS SSD de uso general; gp3 permite fijar IOPS y throughput sin depender del tamaño.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- EFS: Sistema de archivos NFS elástico y multi-AZ, montable en cientos de instancias Linux.
- FSx: Familia de sistemas de archivos gestionados: Windows File Server, Lustre, NetApp ONTAP y OpenZFS.
- Lustre: Sistema de archivos paralelo de alto rendimiento (HPC/ML) integrable con S3.
- NFS: Protocolo de archivos en red típico de Linux/Unix.
- SMB: Protocolo de archivos en red típico de Windows.
- IOPS: Operaciones de lectura/escritura por segundo; medida de rendimiento de almacenamiento.
- Throughput: Volumen de datos transferido por unidad de tiempo (MB/s).
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket: Contenedor de objetos en S3 con nombre global único creado en una Región.
- Clases de almacenamiento S3: Niveles de coste/acceso de S3: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA y Glacier.
- Lifecycle Rules: Reglas que transicionan objetos entre clases o los expiran automáticamente.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- Directory Service: Directorios gestionados: Managed Microsoft AD, AD Connector (proxy) y Simple AD.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué EFS sirve para varias instancias a la vez y EBS (en general) no?
- (aplicar) ¿Qué servicio eliges para un sistema de archivos compartido de servidores Windows con Active Directory?
- (error-comun) Error común: ¿por qué elegir EFS para un cluster HPC que procesa datos de S3 suele ser peor que FSx for Lustre?
- (aplicar) ¿Cómo abaratas un sistema EFS donde la mayoría de archivos casi no se leen?
- (aplicar) Migras un NAS de NetApp que sirve NFS y SMB con snapshots y deduplicación: ¿qué servicio usas?
- (error-comun) Error común: ¿por qué no puedes montar EFS en un servidor Windows?

## Simulaciones del subtema
- clasificar: ¿EBS, EFS, FSx o S3?

## Herramientas del curso en este subtema
- decision: ¿Qué almacenamiento de AWS? — Asistente para elegir entre S3, EBS, EFS y FSx según el tipo de acceso y quién lo comparte.
