# Subtema: Infraestructura global [aws-saa/infraestructura-global]
Regiones, AZs y cómo lograr alta disponibilidad.

## Regiones, AZs y Edge Locations

AWS organiza su infraestructura en **Regiones** (ubicaciones geográficas como `eu-west-1` o `us-east-1`). Cada Región contiene como mínimo **3 Zonas de Disponibilidad (AZ)**, que son uno o más centros de datos aislados entre sí con energía, red y refrigeración propias, conectados por fibra de baja latencia. Además existen **Edge Locations** (más de 400 puntos de presencia) usadas por CloudFront, Route 53 y Global Accelerator para acercar contenido al usuario.

### Cómo elegir una Región
1. **Cumplimiento y gobernanza de datos**: los datos no salen de una Región a menos que tú lo decidas.
2. **Latencia**: cerca de tus usuarios.
3. **Servicios disponibles**: no todas las Regiones tienen todos los servicios (lo nuevo llega primero a us-east-1).
4. **Precio**: varía entre Regiones (São Paulo es bastante más cara que us-east-1).

### Alcance de los servicios
- **Globales**: IAM, Route 53, CloudFront, WAF, Organizations.
- **Regionales**: la mayoría (EC2, S3 —el bucket vive en una Región aunque su nombre sea global—, RDS, Lambda…).
- **Por AZ**: subredes, instancias EC2, volúmenes EBS.

### Alta disponibilidad
Desplegar en **más de una AZ** es la base de la alta disponibilidad: si una AZ falla, el tráfico sigue en las demás. Si necesitas sobrevivir a la caída de una Región entera, hablamos de **recuperación de desastres** multi-región (ver tema correspondiente).

### Modelo de responsabilidad compartida
- **AWS** es responsable de la seguridad *de* la nube: hardware, instalaciones, red global, hipervisor.
- **Tú** eres responsable de la seguridad *en* la nube: datos, configuración de IAM, firewalls (security groups), parches del SO en EC2, cifrado.
- En servicios gestionados (RDS, Lambda) AWS asume más capas, pero los datos y los permisos siguen siendo tuyos.

> **Tip de examen**: "tolerar fallo de un centro de datos" → Multi-AZ. "Reducir latencia global" → CloudFront/Global Accelerator/réplicas en otra Región. "Cumplir residencia de datos" → elegir Región.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- rds-aurora: RDS y Aurora — Bases relacionales gestionadas: Multi-AZ, réplicas de lectura, Aurora, RDS Proxy y backups. [secciones: RDS y Aurora · Backups y recuperación · Alta disponibilidad vs escalado de lectura · Seguridad · RDS Proxy · Aurora]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- Edge Location: Punto de presencia de AWS cercano al usuario final usado por CloudFront, Route 53 y Global Accelerator para cachear y enrutar tráfico.
- Modelo de responsabilidad compartida: AWS protege la nube (hardware, red, hipervisor); el cliente protege lo que pone en ella (datos, IAM, SO, configuración).
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- Route 53: DNS global gestionado de AWS con registro de dominios, health checks y políticas de enrutamiento.
- Subred: Segmento del rango de la VPC que reside en una única AZ.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket: Contenedor de objetos en S3 con nombre global único creado en una Región.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Global Accelerator: Servicio con 2 IPs anycast estáticas que enruta tráfico TCP/UDP por la red global de AWS hacia tus endpoints.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- WAF: Firewall de capa 7 que filtra HTTP/S por IP, geografía, SQLi, XSS y límites de tasa.
- Organizations: Servicio para gestionar varias cuentas AWS con facturación consolidada, OUs y SCPs.
- Disaster Recovery: Estrategias para restaurar sistemas tras un fallo grave: Backup & Restore, Pilot Light, Warm Standby, Multi-Site.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué desplegar en dos AZ protege contra un fallo que una sola AZ no puede cubrir?
- (que-pasa-si) ¿Qué pasa si eliges una Región solo por precio y tus usuarios están en otro continente?
- (comparar) ¿En qué se diferencian una Región, una AZ y una Edge Location en lo que alojan?
- (aplicar) En el modelo de responsabilidad compartida, ¿quién parchea el SO de una EC2 y quién el de RDS?
