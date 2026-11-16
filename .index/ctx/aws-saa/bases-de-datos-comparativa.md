# Subtema: Comparativa de bases de datos [aws-saa/bases-de-datos-comparativa]
Cuándo usar RDS, Aurora, DynamoDB, ElastiCache, DocumentDB, Neptune, Keyspaces, QLDB, Timestream y Redshift.

## Comparativa de bases de datos en AWS

AWS ofrece bases de datos especializadas ("la herramienta correcta para cada trabajo"). Para el examen, asocia cada necesidad con su servicio.

| Servicio | Tipo | Cuándo elegirlo |
|---|---|---|
| **RDS** | Relacional (OLTP) | SQL gestionado, transacciones ACID, joins; carga predecible |
| **Aurora** | Relacional (OLTP) | Más rendimiento/HA que RDS, hasta 15 réplicas, Serverless, Global |
| **DynamoDB** | NoSQL clave-valor | Escala masiva, latencia ms, serverless |
| **ElastiCache** | En memoria | Caché, sesiones, leaderboards |
| **DocumentDB** | Documentos (compatible MongoDB) | Migrar/ejecutar cargas MongoDB |
| **Neptune** | Grafos | Redes sociales, recomendaciones, detección de fraude, grafos de conocimiento (Gremlin, SPARQL, openCypher) |
| **Keyspaces** | Columnar (compatible Cassandra) | Cargas Apache Cassandra serverless con CQL |
| **QLDB** | Libro mayor inmutable | Registro verificable criptográficamente (central, a diferencia de blockchain; en proceso de retirada) |
| **Managed Blockchain** | Blockchain | Redes descentralizadas Hyperledger Fabric/Ethereum |
| **Timestream** | Series temporales | IoT, métricas operativas, telemetría |
| **Redshift** | Data warehouse (OLAP) | Analítica SQL masiva sobre columnas |
| **Athena** | Consulta serverless sobre S3 | Consultas ad-hoc sin servidores |
| **OpenSearch** | Búsqueda/analítica de logs | Búsqueda de texto, dashboards (antes Elasticsearch) |
| **MemoryDB for Redis** | Redis durable | Base de datos Redis primaria con persistencia multi-AZ |

### Detalles útiles
- **DocumentDB**: almacenamiento similar a Aurora (6 copias en 3 AZ, auto-crece hasta 128 TB), hasta 15 réplicas.
- **Neptune**: hasta 15 réplicas de lectura, miles de millones de relaciones con consultas en milisegundos.
- **Timestream**: serverless, almacenamiento en memoria + magnético con políticas de retención, funciones temporales.
- **MemoryDB**: latencia de lectura en microsegundos y escritura ms, durabilidad Multi-AZ; frente a ElastiCache que es solo caché.
- **Redshift**: columnar, MPP, Spectrum (consultar S3), Multi-AZ opcional, snapshots a S3 con copia cross-region, **Redshift Serverless**.

### Reglas de decisión
- Transacciones y SQL → RDS/Aurora. Escala y latencia fija sin esquema → DynamoDB.
- Joins complejos y analítica → Redshift. Datos ya en S3 → Athena.
- Búsqueda de texto o logs → OpenSearch.
- "Compatible con MongoDB/Cassandra" → DocumentDB/Keyspaces.
- Relaciones entre entidades → Neptune. Auditoría inmutable → QLDB. IoT temporal → Timestream.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- dynamodb: DynamoDB — NoSQL gestionada: claves, capacidad, índices, DAX, streams, tablas globales y TTL. [secciones: DynamoDB · Modelo · Capacidad · Índices · Funciones avanzadas · Cuándo usar]
- rds-aurora: RDS y Aurora — Bases relacionales gestionadas: Multi-AZ, réplicas de lectura, Aurora, RDS Proxy y backups. [secciones: RDS y Aurora · Backups y recuperación · Alta disponibilidad vs escalado de lectura · Seguridad · RDS Proxy · Aurora]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Read Replica: Copia asíncrona de solo lectura para escalar lecturas; puede estar en otra Región y promoverse.
- Aurora: Base de datos relacional de AWS compatible con MySQL y PostgreSQL, con almacenamiento distribuido en 3 AZ y hasta 15 réplicas.
- ElastiCache: Caché en memoria gestionada con motores Redis/Valkey y Memcached.
- Redis: Almacén clave-valor en memoria con estructuras avanzadas, persistencia, réplicas y Multi-AZ.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- DocumentDB: Base de datos de documentos gestionada compatible con MongoDB, con almacenamiento tipo Aurora.
- Neptune: Base de datos de grafos gestionada para relaciones complejas (recomendaciones, fraude).
- Keyspaces: Servicio serverless compatible con Apache Cassandra (CQL).
- QLDB: Base de datos de libro mayor inmutable y verificable criptográficamente.
- Managed Blockchain: Servicio para crear redes blockchain con Hyperledger Fabric o Ethereum.
- Timestream: Base de datos serverless de series temporales para IoT y telemetría.
- MemoryDB: Base de datos compatible con Redis, durable y multi-AZ, usable como almacén primario.
- Redshift: Data warehouse columnar MPP (OLAP) basado en PostgreSQL que escala a petabytes.
- Redshift Spectrum: Función de Redshift para consultar datos en S3 sin cargarlos en el cluster.
- OLTP: Procesamiento transaccional en línea: muchas operaciones cortas de lectura/escritura.
- OLAP: Procesamiento analítico en línea: consultas complejas sobre grandes volúmenes de datos.
- Athena: Servicio serverless de consultas SQL sobre datos en S3, facturado por TB escaneado.
- OpenSearch: Servicio de búsqueda y analítica de logs y texto, sucesor de Elasticsearch.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué DynamoDB escala mejor que RDS para millones de lecturas por clave?
- (aplicar) ¿Qué base eliges para un grafo de relaciones de una red social?
- (error-comun) Error común: ¿por qué Redshift no sirve como base transaccional de una tienda?
- (aplicar) ¿Qué base eliges para guardar lecturas de miles de sensores IoT por tiempo?
- (aplicar) Migras una aplicación que usa MongoDB y no quieres reescribirla: ¿qué servicio usas?
- (aplicar) Tienes Apache Cassandra on-premises y quieres dejar de gestionar servidores: ¿qué servicio usas?

## Simulaciones del subtema
- clasificar: Elige la base de datos
