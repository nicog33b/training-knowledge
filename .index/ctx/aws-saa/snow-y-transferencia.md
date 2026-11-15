# Subtema: Snow Family, Storage Gateway y DataSync [aws-saa/snow-y-transferencia]
Mover datos a AWS: Snowcone/Snowball/Snowmobile, Storage Gateway, DataSync y Transfer Family.

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

## Glosario usado
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- st1: Volúmenes EBS HDD: st1 para throughput, sc1 para acceso infrecuente; no sirven como arranque.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- EFS: Sistema de archivos NFS elástico y multi-AZ, montable en cientos de instancias Linux.
- FSx: Familia de sistemas de archivos gestionados: Windows File Server, Lustre, NetApp ONTAP y OpenZFS.
- NFS: Protocolo de archivos en red típico de Linux/Unix.
- SMB: Protocolo de archivos en red típico de Windows.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Glacier: Clases de archivo de S3 de muy bajo coste con distintos tiempos de recuperación.
- Lifecycle Rules: Reglas que transicionan objetos entre clases o los expiran automáticamente.
- Snow Family: Dispositivos físicos para migrar datos offline o computar en el edge: Snowcone, Snowball Edge y Snowmobile.
- Storage Gateway: Servicio híbrido que expone S3/EBS/FSx a sistemas locales vía NFS, SMB, iSCSI o VTL con caché local.
- DataSync: Servicio para transferir y sincronizar grandes volúmenes entre on-premises y AWS con un agente.
- Transfer Family: Servidores SFTP, FTPS y FTP gestionados con destino S3 o EFS.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Directory Service: Directorios gestionados: Managed Microsoft AD, AD Connector (proxy) y Simple AD.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué a veces es más rápido enviar un Snowball por camión que subir por la red?
- (comparar) Compara DataSync y Storage Gateway: ¿migrar una vez o integrar de forma continua?
- (aplicar) Tienes 80 TB y una línea de 100 Mbps: ¿qué servicio usas y por qué?
