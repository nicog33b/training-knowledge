# Subtema: EBS e Instance Store [aws-saa/ebs]
Volúmenes EBS, tipos, snapshots, cifrado, Multi-Attach e Instance Store.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- infraestructura-global: Infraestructura global — Regiones, AZs y cómo lograr alta disponibilidad. [secciones: Regiones, AZs y Edge Locations · Cómo elegir una Región · Alcance de los servicios · Alta disponibilidad · Modelo de responsabilidad compartida]
- kms-cifrado: KMS, CloudHSM y gestión de secretos — Cifrado con KMS, SSM Parameter Store, Secrets Manager, ACM y CloudHSM. [secciones: KMS, CloudHSM y gestión de secretos · Conceptos de cifrado · AWS KMS (Key Management Service) · CloudHSM · SSM Parameter Store · Secrets Manager · AWS Certificate Manager (ACM) · Elegir]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- gp3: Volúmenes EBS SSD de uso general; gp3 permite fijar IOPS y throughput sin depender del tamaño.
- io2: Volúmenes EBS SSD de IOPS aprovisionados para bases de datos críticas; soportan Multi-Attach.
- st1: Volúmenes EBS HDD: st1 para throughput, sc1 para acceso infrecuente; no sirven como arranque.
- Multi-Attach: Permite conectar un volumen io1/io2 a hasta 16 instancias de la misma AZ.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- Recycle Bin: Retiene snapshots y AMIs eliminados por un tiempo para poder recuperarlos.
- Fast Snapshot Restore: Elimina la latencia de inicialización de un volumen restaurado desde snapshot.
- Data Lifecycle Manager: Servicio que automatiza la creación y retención de snapshots EBS y AMIs.
- Instance Store: Disco físico del host con IOPS extremos pero efímero: los datos se pierden al parar o fallar.
- EFS: Sistema de archivos NFS elástico y multi-AZ, montable en cientos de instancias Linux.
- IOPS: Operaciones de lectura/escritura por segundo; medida de rendimiento de almacenamiento.
- Throughput: Volumen de datos transferido por unidad de tiempo (MB/s).
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué no puedes adjuntar un volumen EBS a una instancia de otra AZ?
- (que-pasa-si) ¿Qué pasa con los datos de un Instance Store si paras la instancia?
- (aplicar) ¿Cómo moverías un volumen EBS a otra Región?
- (comparar) Compara gp3 e io2: ¿cuándo se justifica pagar IOPS aprovisionadas?
- (que-pasa-si) ¿Qué pasa con los volúmenes EBS cuando terminas la instancia?
- (comparar) Compara st1 y sc1: ¿para qué sirve cada HDD?
- (aplicar) ¿Cómo cifras un volumen EBS existente que se creó sin cifrar?
