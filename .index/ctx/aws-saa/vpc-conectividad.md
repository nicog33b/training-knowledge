# Subtema: VPC: conectividad [aws-saa/vpc-conectividad]
Peering, endpoints, PrivateLink, VPN, Direct Connect, Transit Gateway y IPv6.

## VPC: conectividad

### VPC Peering
Conecta dos VPC de forma privada como si fueran la misma red, entre cuentas y Regiones. **CIDR sin solapamiento**, **no es transitivo** (A↔B y B↔C no implica A↔C) y requiere actualizar las route tables en ambos lados.

### VPC Endpoints
Acceso privado a servicios AWS sin salir a Internet:
- **Gateway Endpoint**: solo **S3 y DynamoDB**, gratuito, se añade a la route table.
- **Interface Endpoint** (ENI con **PrivateLink**): la mayoría de servicios AWS y servicios de terceros; se paga por hora y GB; usa un SG.

**PrivateLink** expone un servicio de tu VPC a miles de VPC consumidoras sin peering, NAT ni IGW (requiere NLB en el proveedor).

### Conexión con on-premises
- **Site-to-Site VPN**: túneles IPsec cifrados por Internet público; rápido de montar. Usa un **Virtual Private Gateway (VGW)** en AWS y un **Customer Gateway (CGW)** en tu lado. Con ECMP sobre Transit Gateway se agrega ancho de banda.
- **Direct Connect (DX)**: enlace físico dedicado y privado (1, 10, 100 Gbps) desde tu centro de datos hasta AWS; menor latencia y ancho de banda consistente. Tarda semanas/meses en aprovisionarse. **No está cifrado por defecto** → VPN sobre DX para cifrar. *Dedicated* vs *Hosted* connections. **Direct Connect Gateway** conecta DX con varias VPC en distintas Regiones.
- **Client VPN**: acceso remoto de usuarios (OpenVPN) a recursos en AWS u on-premises.
- **VPN CloudHub**: varios sitios remotos conectados entre sí vía VGW.

### Transit Gateway
Hub regional que interconecta miles de VPC y redes on-premises con topología **estrella**, **transitiva**, con route tables propias, soporte **multicast** y ECMP para VPN; se comparte entre cuentas con RAM. Sustituye a mallas de peering.

### IPv6 y otros
IPv6 en VPC es opcional y los direccionamientos son todos públicos; se usa Egress-Only IGW para solo salida. **VPC Sharing (RAM)**: compartir subredes entre cuentas de la misma Organization. **Traffic Mirroring** copia tráfico de ENI a appliances de análisis.

### Elegir
| Necesidad | Solución |
|---|---|
| Conectar 2 VPC | Peering |
| Conectar muchas VPC/on-prem | Transit Gateway |
| Acceso privado a S3/DynamoDB gratis | Gateway Endpoint |
| Exponer un servicio a otras VPC | PrivateLink |
| Conexión rápida y cifrada a on-prem | Site-to-Site VPN |
| Ancho de banda estable, baja latencia | Direct Connect |

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- vpc-fundamentos: VPC: fundamentos — CIDR, subredes, route tables, IGW, NAT, NACL, security groups y Flow Logs. [secciones: VPC: fundamentos · Direccionamiento · Componentes · Seguridad de red · Monitoreo]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- ENI: Interfaz de red virtual con IP privada, SG y MAC; puede moverse entre instancias de la misma AZ.
- NLB: Balanceador de capa 4 (TCP/UDP/TLS) de ultra rendimiento con una IP estática por AZ.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- CIDR: Notación de rangos IP (p. ej. 10.0.0.0/16) donde el sufijo indica los bits de red.
- Subred: Segmento del rango de la VPC que reside en una única AZ.
- Route Table: Conjunto de reglas que determina hacia dónde se envía el tráfico de una subred.
- Internet Gateway: Componente gestionado que permite comunicación entre una VPC e Internet.
- NAT Gateway: Servicio que permite a instancias privadas iniciar tráfico saliente a Internet sin ser accesibles desde fuera.
- Egress-only Internet Gateway: Gateway que permite solo tráfico de salida IPv6 desde la VPC.
- Traffic Mirroring: Copia el tráfico de una ENI hacia appliances de inspección para analizarlo.
- VPC Peering: Conexión privada 1 a 1 entre dos VPC; sin solapamiento de CIDR y no transitiva.
- VPC Endpoint: Acceso privado a servicios AWS sin Internet: Gateway (S3, DynamoDB) o Interface (PrivateLink).
- PrivateLink: Tecnología para consumir o exponer servicios entre VPC de forma privada mediante ENIs.
- Site-to-Site VPN: Túneles IPsec cifrados entre tu red on-premises y una VPC a través de Internet.
- Virtual Private Gateway: Extremo AWS de una conexión VPN o Direct Connect asociado a una VPC.
- Customer Gateway: Recurso que representa el dispositivo VPN de tu lado.
- Direct Connect: Enlace de red físico dedicado y privado entre tu centro de datos y AWS.
- Client VPN: VPN gestionada para que usuarios remotos accedan a recursos de AWS u on-premises.
- Transit Gateway: Hub regional transitivo que interconecta VPC y redes on-premises en topología estrella.
- RAM: Servicio para compartir recursos AWS (subredes, Transit Gateway…) entre cuentas.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- DynamoDB: Base de datos NoSQL clave-valor gestionada y serverless con latencia de milisegundos de un dígito.
- Organizations: Servicio para gestionar varias cuentas AWS con facturación consolidada, OUs y SCPs.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el VPC peering no es transitivo y qué problema causa con muchas VPC?
- (que-pasa-si) ¿Qué pasa con el tráfico a S3 desde una subred privada si añades un gateway endpoint?
- (comparar) Compara Site-to-Site VPN y Direct Connect en tiempo de puesta en marcha, coste y estabilidad.
- (aplicar) Conectas 30 VPC y una oficina: ¿peering o Transit Gateway?
- (aplicar) Quieres ofrecer un servicio a VPC de otras cuentas sin peering y sin exponer toda tu red: ¿qué usas?
- (aplicar) ¿Cómo das redundancia a una conexión Direct Connect?
- (comparar) Compara un gateway endpoint y un interface endpoint.
