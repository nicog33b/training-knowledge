---
title: ElastiCache
summary: Redis y Memcached como caché en memoria y estrategias de caching.
order: 11
section: datos-relacionales
status: done
requires: []
---

## ElastiCache

Caché **en memoria** gestionada (Redis o Memcached) para aliviar la carga de bases de datos y reducir latencia a submilisegundo. Requiere cambios en el código de la aplicación.

### Redis vs Memcached
| | Redis / Valkey | Memcached |
|---|---|---|
| Alta disponibilidad | Multi-AZ con failover automático | No |
| Réplicas de lectura | Sí | No |
| Persistencia | Sí (AOF, snapshots/backups) | No |
| Estructuras | Sets, sorted sets, listas, hashes | Claves-valor simples |
| Escalado | Cluster mode, sharding | Multi-nodo con sharding |
| Multihilo | No | Sí |
| Autenticación | **Redis AUTH**, IAM, ACLs | SASL |

Caso típico Redis: tablas de clasificación (**sorted sets**), sesiones, colas. Memcached: caché simple, distribuida y volátil.

### Estrategias de caching
- **Lazy Loading (cache-aside)**: la app consulta la caché; en *miss* lee de la BD y escribe en caché. Solo se cachea lo pedido, pero hay datos obsoletos (*stale*) y penalización en el miss.
- **Write-Through**: cada escritura en BD actualiza también la caché. Datos frescos, pero coste de escritura y caché con datos no leídos.
- Se combinan con **TTL** para expirar datos.

### Sesiones
Patrón de **session store**: guardar la sesión de usuario en ElastiCache o DynamoDB para que cualquier instancia de una aplicación stateless pueda atender al usuario.

### Seguridad
Security groups, cifrado en tránsito (TLS) y en reposo, IAM para administración. Para la caché de DynamoDB existe **DAX**; para APIs, la caché de API Gateway.
