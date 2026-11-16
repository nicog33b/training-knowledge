# Subtema: VPC: fundamentos [aws-saa/vpc-fundamentos]
CIDR, subredes, route tables, IGW, NAT, NACL, security groups y Flow Logs.

## VPC: fundamentos

Una **VPC (Virtual Private Cloud)** es tu red privada y aislada dentro de una Región. Cada cuenta trae una **VPC por defecto** por Región (subredes públicas, acceso a Internet); puedes crear hasta 5 VPC por Región (ampliable).

### Direccionamiento
- Rango **CIDR** de la VPC: de /16 (65 536 IPs) a /28; solo rangos privados RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) son lo habitual. Se pueden añadir CIDR secundarios.
- Cada **subred** vive en **una sola AZ**; AWS reserva **5 IPs** por subred (red, router, DNS, futuro, broadcast). Subred /24 = 251 IPs utilizables.

### Componentes
- **Subred pública**: tiene ruta a un **Internet Gateway (IGW)** en su route table; las instancias necesitan IP pública/Elastic IP.
- **Subred privada**: sin ruta directa a Internet. Para salida (parches, APIs) usa un **NAT Gateway**.
- **Route Table**: reglas de enrutamiento por subred; la ruta `local` siempre existe.
- **Internet Gateway**: escalable, redundante y gestionado, une la VPC con Internet.
- **NAT Gateway**: gestionado por AWS, en una subred pública con Elastic IP, ancho de banda hasta 100 Gbps, **por AZ** (para HA se despliega uno por AZ). Cobro por hora y GB. **NAT Instance**: opción antigua autogestionada (desactivar *source/destination check*).
- **Egress-only Internet Gateway**: salida a Internet solo para **IPv6**.
- **Bastion Host**: instancia en subred pública para saltar por SSH a las privadas (alternativa moderna: Session Manager).
- **DHCP Options Set** y DNS (`enableDnsSupport`, `enableDnsHostnames`).

### Seguridad de red
| | Security Group | NACL |
|---|---|---|
| Nivel | Instancia / ENI | Subred |
| Estado | **Con estado** | **Sin estado** (reglas de ida y vuelta) |
| Reglas | Solo Allow | Allow y Deny |
| Evaluación | Todas las reglas | Por número, de menor a mayor, la primera coincidencia |
| Por defecto | Deniega entrada | NACL por defecto permite todo |

**Puertos efímeros** (1024-65535): en una NACL hay que permitirlos para el tráfico de retorno.

### Monitoreo
**VPC Flow Logs** capturan metadatos de tráfico (IP origen/destino, puertos, acción ACCEPT/REJECT) a nivel de VPC, subred o ENI; se envían a CloudWatch Logs, S3 o Kinesis Data Firehose y se consultan con Athena. Sirven para diagnosticar SG/NACL. No capturan el contenido; para eso existe **Traffic Mirroring**.

> **Tip de examen**: instancia privada que necesita salir a Internet → NAT Gateway en subred pública. Bloquear una IP concreta → NACL (los SG no pueden denegar).

## Glosario usado
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- Elastic IP: Dirección IPv4 pública estática que puedes asociar y mover entre instancias.
- ENI: Interfaz de red virtual con IP privada, SG y MAC; puede moverse entre instancias de la misma AZ.
- Session Manager: Acceso a shell de instancias sin SSH ni puertos abiertos, controlado por IAM y con logs.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- CIDR: Notación de rangos IP (p. ej. 10.0.0.0/16) donde el sufijo indica los bits de red.
- Subred: Segmento del rango de la VPC que reside en una única AZ.
- Subred pública: Subred cuya route table tiene una ruta a un Internet Gateway.
- Subred privada: Subred sin ruta directa a Internet; la salida se hace vía NAT Gateway.
- Route Table: Conjunto de reglas que determina hacia dónde se envía el tráfico de una subred.
- Internet Gateway: Componente gestionado que permite comunicación entre una VPC e Internet.
- NAT Gateway: Servicio que permite a instancias privadas iniciar tráfico saliente a Internet sin ser accesibles desde fuera.
- Egress-only Internet Gateway: Gateway que permite solo tráfico de salida IPv6 desde la VPC.
- Bastion Host: Instancia en subred pública usada como salto para administrar instancias privadas.
- NACL: Firewall sin estado a nivel de subred con reglas Allow y Deny evaluadas por número.
- Puertos efímeros: Rango 1024-65535 usado por clientes para el tráfico de retorno; debe permitirse en NACL.
- VPC Flow Logs: Registro de metadatos del tráfico IP de una VPC, subred o ENI hacia CloudWatch, S3 o Firehose.
- Traffic Mirroring: Copia el tráfico de una ENI hacia appliances de inspección para analizarlo.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Firehose: Servicio de entrega casi en tiempo real de streams a S3, Redshift, OpenSearch y otros destinos.
- Athena: Servicio serverless de consultas SQL sobre datos en S3, facturado por TB escaneado.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué en una NACL hay que abrir los puertos efímeros y en un security group no?
- (que-pasa-si) ¿Qué pasa si pones un NAT Gateway en una subred privada?
- (aplicar) Quieres bloquear una IP concreta que ataca tu web: ¿SG o NACL, y por qué?
- (comparar) ¿Qué hace que una subred sea pública o privada?
- (aplicar) ¿Cómo haces altamente disponible la salida a Internet de subredes privadas en tres AZ?
- (aplicar) Una conexión a tu instancia falla y no sabes si la bloquea el SG o la NACL: ¿cómo lo diagnosticas?

## Simulaciones del subtema
- clasificar: ¿Security Group o NACL?
