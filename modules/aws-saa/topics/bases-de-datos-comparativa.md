---
title: Comparativa de bases de datos
summary: Cuándo usar RDS, Aurora, DynamoDB, ElastiCache, DocumentDB, Neptune,
  Keyspaces, QLDB, Timestream y Redshift.
order: 28
section: datos-especializados
status: done
requires: []
---

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
