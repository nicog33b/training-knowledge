---
title: "EC2: red, seguridad y placement groups"
summary: Security groups, IPs, ENI, placement groups, hibernación y conexión a
  instancias.
order: 5
section: computo
status: done
requires: []
---

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
