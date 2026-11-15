---
title: "VPC: fundamentos"
summary: CIDR, subredes, route tables, IGW, NAT, NACL, security groups y Flow Logs.
order: 13
section: red
status: done
requires: []
---

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
