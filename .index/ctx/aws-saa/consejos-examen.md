# Subtema: Estrategia y consejos del examen [aws-saa/consejos-examen]
Estructura del SAA-C03, dominios, trucos de eliminación y cheat sheet de decisión.

## Estrategia y consejos del examen SAA-C03

### Formato
- **65 preguntas** (50 puntuadas + 15 no puntuadas), **130 minutos**, opción múltiple y respuesta múltiple (elige 2 o 3).
- Puntuación 100-1000; aprobado en **720**. Coste 150 USD; válida 3 años. Idioma español disponible; puedes pedir tiempo extra (+30 min) si no eres hablante nativo de inglés.
- Sin penalización por responder mal: **contesta todas**.

### Dominios y peso
| Dominio | Peso |
|---|---|
| 1. Diseño de arquitecturas **seguras** | 30 % |
| 2. Diseño de arquitecturas **resilientes** | 26 % |
| 3. Diseño de arquitecturas de **alto rendimiento** | 24 % |
| 4. Diseño de arquitecturas **optimizadas en costes** | 20 % |

### Técnica de resolución
1. Lee el **final** del enunciado (qué pide) y luego el escenario.
2. Subraya palabras clave: *más rentable*, *mínima carga operativa*, *alta disponibilidad*, *sin cambios en la aplicación*, *en tiempo real*, *menor latencia*, *seguro*, *minimizar downtime*.
3. **Descarta** las opciones claramente incorrectas (suelen ser 2).
4. Entre las restantes, aplica el criterio dominante. Si hay empate: **gestionado/serverless** sobre autogestionado, y la opción **más simple**.
5. Marca las dudosas y vuelve; gestiona el tiempo (~2 min por pregunta).

### Atajos de decisión
| Señal en el enunciado | Respuesta típica |
|---|---|
| Desacoplar, buffer | SQS |
| Múltiples receptores | SNS fan-out |
| Streaming en tiempo real, orden, replay | Kinesis Data Streams |
| Alta disponibilidad de BD | RDS Multi-AZ / Aurora |
| Escalar lecturas | Read Replicas / ElastiCache / DAX |
| Archivos compartidos Linux | EFS; Windows → FSx |
| Más IOPS posible | Instance Store / io2 Block Express |
| Tráfico mundial HTTP estático | CloudFront |
| IP estática global / TCP-UDP | Global Accelerator |
| Conexión privada a S3 | Gateway Endpoint |
| On-premises a AWS privado y estable | Direct Connect |
| Migrar BD | DMS (+SCT si heterogénea) |
| Datos masivos sin red | Snowball |
| DDoS | Shield; inyecciones → WAF |
| Cifrado administrado | KMS; control exclusivo → CloudHSM |
| Rotación de credenciales BD | Secrets Manager |
| Restringir cuentas | SCP |
| Ver quién hizo qué | CloudTrail; configuración → Config |
| Menor coste con interrupciones OK | Spot |
| Cargas estables 1-3 años | Savings Plans / RI |

### Errores frecuentes
- Confundir **Multi-AZ** (HA) con **Read Replica** (rendimiento).
- Olvidar que los **SG no deniegan** (usa NACL) y que **NACL no tiene estado**.
- Usar claves de acceso en EC2 en vez de **roles**.
- Elegir peering para muchas VPC en lugar de **Transit Gateway**.
- Pensar que EBS cruza AZ.

### Preparación final
Repasa los glosarios, haz un **examen de práctica completo** (el curso incluye uno), analiza cada explicación incluso de las acertadas y practica los servicios en la capa gratuita.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- rds-aurora: RDS y Aurora — Bases relacionales gestionadas: Multi-AZ, réplicas de lectura, Aurora, RDS Proxy y backups. [secciones: RDS y Aurora · Backups y recuperación · Alta disponibilidad vs escalado de lectura · Seguridad · RDS Proxy · Aurora]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- Access Key: Par Access Key ID + Secret Access Key que firma peticiones a la API de AWS desde CLI/SDK.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Reserved Instances: Compromiso de 1 o 3 años en EC2 con descuento de hasta ~72 % frente a On-Demand.
- Savings Plans: Compromiso de gasto por hora a 1-3 años que otorga descuentos; Compute Savings Plans cubre EC2, Fargate y Lambda.
- Spot Instances: Capacidad sobrante de EC2 con hasta ~90 % de descuento que AWS puede reclamar con 2 minutos de aviso.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- io2: Volúmenes EBS SSD de IOPS aprovisionados para bases de datos críticas; soportan Multi-Attach.
- Instance Store: Disco físico del host con IOPS extremos pero efímero: los datos se pierden al parar o fallar.
- EFS: Sistema de archivos NFS elástico y multi-AZ, montable en cientos de instancias Linux.
- FSx: Familia de sistemas de archivos gestionados: Windows File Server, Lustre, NetApp ONTAP y OpenZFS.
- IOPS: Operaciones de lectura/escritura por segundo; medida de rendimiento de almacenamiento.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Read Replica: Copia asíncrona de solo lectura para escalar lecturas; puede estar en otra Región y promoverse.
- Aurora: Base de datos relacional de AWS compatible con MySQL y PostgreSQL, con almacenamiento distribuido en 3 AZ y hasta 15 réplicas.
- ElastiCache: Caché en memoria gestionada con motores Redis/Valkey y Memcached.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- NACL: Firewall sin estado a nivel de subred con reglas Allow y Deny evaluadas por número.
- VPC Peering: Conexión privada 1 a 1 entre dos VPC; sin solapamiento de CIDR y no transitiva.
- VPC Endpoint: Acceso privado a servicios AWS sin Internet: Gateway (S3, DynamoDB) o Interface (PrivateLink).
- Direct Connect: Enlace de red físico dedicado y privado entre tu centro de datos y AWS.
- Transit Gateway: Hub regional transitivo que interconecta VPC y redes on-premises en topología estrella.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Global Accelerator: Servicio con 2 IPs anycast estáticas que enruta tráfico TCP/UDP por la red global de AWS hacia tus endpoints.
- Snow Family: Dispositivos físicos para migrar datos offline o computar en el edge: Snowcone, Snowball Edge y Snowmobile.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Fan-out: Patrón que replica un mensaje de un topic SNS a múltiples colas SQS o destinos.
- Kinesis Data Streams: Servicio de streaming en tiempo real con shards, retención configurable y replay.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- DAX: Caché en memoria compatible con DynamoDB que ofrece latencia de microsegundos.
- CloudTrail: Registra las llamadas a la API de AWS (quién, qué, cuándo) para auditoría y cumplimiento.
- AWS Config: Registra la configuración de recursos y evalúa su cumplimiento con reglas.
- KMS: Servicio gestionado para crear y controlar claves criptográficas, integrado con IAM y auditado con CloudTrail.
- CloudHSM: Módulo de seguridad de hardware dedicado donde solo tú controlas las claves (FIPS 140-2 Nivel 3).
- Secrets Manager: Servicio para almacenar secretos con rotación automática y replicación multi-Región.
- Shield: Protección DDoS: Standard (gratuita, capas 3/4) y Advanced (de pago, con equipo de respuesta y protección de costes).
- DDoS: Ataque que satura un servicio con tráfico desde muchas fuentes.
- WAF: Firewall de capa 7 que filtra HTTP/S por IP, geografía, SQLi, XSS y límites de tasa.
- SCP: Política de Organizations que limita los permisos máximos de cuentas u OUs; no concede permisos.
- DMS: Migra bases de datos con replicación continua y mínimo downtime.
- SCT: Convierte esquemas y código entre motores de base de datos distintos.
- Acoplamiento débil: Diseño en que los componentes se comunican mediante colas o eventos para fallar y escalar de forma independiente.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué conviene descartar primero las opciones con más carga operativa?
- (aplicar) Ante 'mínimo coste' y 'mínimo esfuerzo operativo' a la vez, ¿cómo decides?
- (error-comun) Error común: ¿qué palabras del enunciado indican que piden alta disponibilidad y no escalado?
