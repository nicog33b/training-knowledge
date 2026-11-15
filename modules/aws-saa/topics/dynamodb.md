---
title: DynamoDB
summary: "NoSQL gestionada: claves, capacidad, índices, DAX, streams, tablas
  globales y TTL."
order: 25
section: serverless
status: done
requires: []
---

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
