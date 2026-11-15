# Subtema: ElastiCache [aws-saa/elasticache]
Redis y Memcached como caché en memoria y estrategias de caching.

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

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- TTL: Time To Live. Duración tras la cual un dato guardado se considera vencido.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Read Replica: Copia asíncrona de solo lectura para escalar lecturas; puede estar en otra Región y promoverse.
- ElastiCache: Caché en memoria gestionada con motores Redis/Valkey y Memcached.
- Redis: Almacén clave-valor en memoria con estructuras avanzadas, persistencia, réplicas y Multi-AZ.
- Memcached: Caché clave-valor en memoria, multihilo y sin persistencia ni replicación.
- Lazy Loading: Estrategia de caché que carga datos solo al ocurrir un miss.
- Write-Through: Estrategia que actualiza la caché cada vez que se escribe en la base de datos.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- DAX: Caché en memoria compatible con DynamoDB que ofrece latencia de microsegundos.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué lazy loading puede devolver datos viejos y cómo lo mitiga un TTL?
- (que-pasa-si) ¿Qué pasa con la caché si el nodo de Memcached se reinicia?
- (comparar) Compara Redis y Memcached: ¿cuál eliges para sesiones que no pueden perderse?
