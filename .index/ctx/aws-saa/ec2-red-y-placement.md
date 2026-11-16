# Subtema: EC2: red, seguridad y placement groups [aws-saa/ec2-red-y-placement]
Security groups, IPs, ENI, placement groups, hibernación y conexión a instancias.

## EC2: red, seguridad y placement groups

### Security Groups
Firewall **con estado** a nivel de instancia/ENI. Solo reglas *Allow* (nunca Deny); todo el tráfico entrante está bloqueado y el saliente permitido por defecto. Las reglas pueden referenciar IPs/CIDR u **otros security groups**. Son regionales y asociados a una VPC. Por tener estado, si permites la entrada, la respuesta sale automáticamente.

Puertos clásicos: 22 SSH, 21 FTP, 22 SFTP, 80 HTTP, 443 HTTPS, 3389 RDP.

### Direcciones IP
- **IPv4 privada**: fija durante la vida de la instancia.
- **IPv4 pública**: cambia al detener/iniciar la instancia.
- **Elastic IP**: IPv4 pública fija que puedes reasignar entre instancias (máx. 5 por Región por defecto; mejor evitarlas y usar DNS/ELB). Desde 2024 todas las IPv4 públicas se cobran.
- **ENI (Elastic Network Interface)**: tarjeta de red virtual con IP privada, IPs secundarias, SG y MAC; se puede mover entre instancias de la misma AZ (útil para failover).

### Placement Groups
- **Cluster**: instancias juntas en una AZ y en el mismo rack → latencia y throughput máximos (10 Gbps entre nodos), pero riesgo de fallo correlacionado. HPC y big data.
- **Spread**: instancias en hardware distinto, máx. **7 por AZ por grupo**; reduce el riesgo; apps críticas.
- **Partition**: hasta 7 particiones por AZ en racks distintos, cientos de instancias; Hadoop, Cassandra, Kafka.

### Hibernación y ciclo de vida
Estados: pending → running → stopping → stopped → terminated. **Hibernate** guarda la RAM en el volumen EBS raíz (cifrado) para reanudar con procesos activos; requiere instancia compatible y límite de días (60).

### Conectarse
SSH (22), **EC2 Instance Connect** (SSH vía navegador con claves temporales) y **Session Manager** (sin puertos abiertos ni claves, con IAM y logs). **Troubleshooting**: timeout = problema de security group; "connection refused" = app caída o puerto sin escuchar.

### Metadatos
`http://169.254.169.254/latest/meta-data/` expone información de la instancia (IP, rol IAM). IMDSv2 exige token de sesión (más seguro).

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- Rol IAM: Identidad sin credenciales permanentes que puede asumir un servicio, otra cuenta o usuario; entrega credenciales temporales.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- Elastic IP: Dirección IPv4 pública estática que puedes asociar y mover entre instancias.
- ENI: Interfaz de red virtual con IP privada, SG y MAC; puede moverse entre instancias de la misma AZ.
- Placement Group: Estrategia de ubicación física de instancias: cluster, spread o partition.
- Hibernate: Estado en que EC2 guarda la RAM en EBS para reanudar luego con los procesos intactos.
- Instance Connect: Permite SSH desde el navegador usando claves efímeras enviadas por IAM.
- Session Manager: Acceso a shell de instancias sin SSH ni puertos abiertos, controlado por IAM y con logs.
- IMDS: Servicio en 169.254.169.254 que expone metadatos de la instancia; IMDSv2 exige token de sesión.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- Throughput: Volumen de datos transferido por unidad de tiempo (MB/s).
- Load Balancer: Reparte el tráfico entrante entre varios destinos sanos y expone un único punto de entrada.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- CIDR: Notación de rangos IP (p. ej. 10.0.0.0/16) donde el sufijo indica los bits de red.
- RAM: Servicio para compartir recursos AWS (subredes, Transit Gateway…) entre cuentas.
- Transfer Family: Servidores SFTP, FTPS y FTP gestionados con destino S3 o EFS.
- Keyspaces: Servicio serverless compatible con Apache Cassandra (CQL).
- EMR: Servicio de clusters gestionados de big data con Hadoop, Spark, Hive, Presto y Flink.
- MSK: Apache Kafka gestionado en tu VPC, con mensajes de hasta 10 MB.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué un placement group cluster da poca latencia pero más riesgo?
- (que-pasa-si) ¿Qué pasa con la IP pública de una instancia al pararla y arrancarla, y cómo lo evitas?
- (comparar) Compara placement groups cluster, spread y partition con un caso de uso cada uno.
- (comparar) Compara ENI, ENA y EFA.
- (que-pasa-si) ¿Qué pasa con la RAM si hibernas una instancia en vez de pararla?
- (aplicar) ¿Cómo harías un failover rápido de una aplicación que depende de una IP privada fija?
