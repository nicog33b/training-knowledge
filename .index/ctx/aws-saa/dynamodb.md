# Subtema: DynamoDB [aws-saa/dynamodb]
NoSQL gestionada: claves, capacidad, índices, DAX, streams, tablas globales y TTL.

## DynamoDB

Base de datos **NoSQL clave-valor/documento** totalmente gestionada, serverless, multi-AZ, con latencia de milisegundos de un dígito y escala masiva (millones de req/s, trillones de filas). Los datos se replican en 3 AZ.

### Modelo
- **Tabla** con **Primary Key**: *Partition Key* (hash) o *Partition Key + Sort Key* (compuesta). Elige claves con alta cardinalidad para evitar *hot partitions*.
- **Item** hasta **400 KB**; atributos flexibles (string, number, binary, set, list, map).
- Sin joins; el modelado se hace según los patrones de acceso.

### Capacidad
- **Provisioned**: defines RCU/WCU, con **auto scaling**; opción de capacidad reservada.
- **On-Demand**: paga por petición, sin planificar, ~2,5× más caro por unidad; para tráfico impredecible.
- 1 WCU = 1 escritura/s de hasta 1 KB; 1 RCU = 1 lectura fuertemente consistente/s (o 2 eventuales) de hasta 4 KB.
- **Burst capacity** y errores `ProvisionedThroughputExceeded` → reintento con exponential backoff.
- Lecturas: *eventually consistent* (por defecto), *strongly consistent*, *transactional*.

### Índices
- **LSI (Local Secondary Index)**: misma partition key, otra sort key; se define al crear la tabla, máx. 5.
- **GSI (Global Secondary Index)**: otra partition key/sort key; se crea cuando quieras, con su propia capacidad (si se satura, bloquea escrituras a la tabla base).

### Funciones avanzadas
- **DynamoDB Accelerator (DAX)**: caché en memoria totalmente compatible con la API, microsegundos, TTL 5 min por defecto (frente a ElastiCache para resultados agregados).
- **DynamoDB Streams**: flujo ordenado de cambios (24 h) para Lambda, replicación y notificaciones; **Kinesis Data Streams** para retención mayor.
- **Global Tables**: replicación multi-Región **activa-activa** (necesita Streams).
- **TTL**: borrado automático de items expirados (epoch) sin consumir WCU.
- **Transacciones** ACID (`TransactWriteItems`), **PartiQL** (SQL-like), escaneos paralelos.
- **Backups**: PITR 35 días, on-demand; **Export a S3** y **Import desde S3** sin consumir capacidad.
- **Clases de tabla**: Standard y Standard-IA.
- Seguridad: IAM con condiciones por item (`LeadingKeys`), KMS, VPC Gateway endpoint.

### Cuándo usar
Aplicaciones serverless, sesiones, carritos, juegos, IoT, y todo lo que necesite escala y latencia predecible. No para consultas ad-hoc complejas ni joins (→ RDS/Aurora/Redshift).

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- elasticache: ElastiCache — Redis y Memcached como caché en memoria y estrategias de caching. [secciones: ElastiCache · Redis vs Memcached · Estrategias de caching · Sesiones · Seguridad]
- lambda: AWS Lambda — Funciones sin servidor: límites, concurrencia, triggers, VPC, SnapStart y Lambda@Edge. [secciones: AWS Lambda · Límites clave (por Región / ejecución) · Invocación · Concurrencia · Rendimiento, red y seguridad · Patrones · Lambda vs contenedores]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- TTL: Time To Live. Duración tras la cual un dato guardado se considera vencido.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- Exponential backoff: Estrategia de reintentos que duplica la espera entre intentos para no saturar el servicio.
- On-Demand: Modelo de compra EC2 de pago por uso sin compromiso.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Point-in-time recovery: Restaurar una base de datos a cualquier instante dentro del periodo de retención de backups.
- Aurora: Base de datos relacional de AWS compatible con MySQL y PostgreSQL, con almacenamiento distribuido en 3 AZ y hasta 15 réplicas.
- ElastiCache: Caché en memoria gestionada con motores Redis/Valkey y Memcached.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- VPC Endpoint: Acceso privado a servicios AWS sin Internet: Gateway (S3, DynamoDB) o Interface (PrivateLink).
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Clases de almacenamiento S3: Niveles de coste/acceso de S3: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA y Glacier.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Partition Key: Clave que determina a qué shard (Kinesis) o partición (DynamoDB) va un registro.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- Primary Key: En DynamoDB, la partition key sola o combinada con una sort key; identifica cada item.
- RCU: Unidades de capacidad de DynamoDB: 1 RCU = una lectura consistente de 4 KB/s; 1 WCU = una escritura de 1 KB/s.
- GSI: Índices secundarios de DynamoDB; el global usa otras claves, el local comparte la partition key.
- DAX: Caché en memoria compatible con DynamoDB que ofrece latencia de microsegundos.
- DynamoDB Streams: Flujo ordenado de cambios de una tabla DynamoDB durante 24 horas.
- Global Tables: Replicación activa-activa de una tabla DynamoDB en varias Regiones.
- Redshift: Data warehouse columnar MPP (OLAP) basado en PostgreSQL que escala a petabytes.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué una partition key con pocos valores distintos causa una partición caliente?
- (que-pasa-si) ¿Qué pasa si superas la capacidad provisionada de escritura?
- (comparar) Compara un GSI y un LSI: ¿cuál puedes crear después de crear la tabla?
- (aplicar) ¿Cuándo pondrías DAX delante y cuándo ElastiCache?
- (comparar) Compara los modos on-demand y provisioned de DynamoDB.
- (aplicar) Quieres enviar un email cada vez que se crea un pedido en una tabla de DynamoDB: ¿cómo?
- (aplicar) Necesitas la misma tabla con escrituras en dos continentes y latencia local: ¿qué usas?
