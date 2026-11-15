---
title: "VPC: conectividad"
summary: Peering, endpoints, PrivateLink, VPN, Direct Connect, Transit Gateway y IPv6.
order: 14
section: red
status: done
requires: []
---

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
