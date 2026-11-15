---
title: Elastic Load Balancing
summary: ALB, NLB, GWLB, CLB, sticky sessions, cross-zone, SSL/SNI y connection
  draining.
order: 8
section: escalabilidad
status: done
requires: []
---

## Elastic Load Balancing

Un **load balancer** reparte el tráfico entre múltiples destinos, expone un único punto de acceso (DNS), hace health checks, permite terminar SSL y es **multi-AZ** y gestionado por AWS.

### Tipos
- **ALB (Application Load Balancer)** — capa 7 (HTTP/HTTPS/gRPC/WebSocket). Enruta por *path*, *host*, header, query string, método. Destinos: instancias, IPs, Lambda, contenedores (puertos dinámicos en ECS). Ideal para microservicios. La IP del cliente llega en el header `X-Forwarded-For`. Tiene DNS fijo, no IP estática.
- **NLB (Network Load Balancer)** — capa 4 (TCP/UDP/TLS). Millones de peticiones/segundo, latencia ~100 ms, **una IP estática (o Elastic IP) por AZ**. Para rendimiento extremo o necesidad de IP fija. Destinos: instancias, IPs, ALB.
- **GWLB (Gateway Load Balancer)** — capa 3, protocolo GENEVE (puerto 6081). Enruta tráfico a appliances virtuales (firewalls, IDS/IPS, inspección profunda) de forma transparente.
- **CLB (Classic)** — generación anterior, obsoleto.

### Funciones clave
- **Health checks**: marcan destinos como sanos/no sanos según protocolo/ruta/puerto.
- **Sticky sessions (afinidad)**: el mismo cliente va al mismo destino mediante cookie (duración o cookie de aplicación). Disponible en ALB, NLB y CLB; puede desequilibrar la carga.
- **Cross-Zone Load Balancing**: reparte uniformemente entre todos los destinos de todas las AZ. ALB: activado por defecto, sin coste de transferencia entre AZ. NLB/GWLB: desactivado por defecto y se paga el tráfico inter-AZ.
- **SSL/TLS**: el LB guarda el certificado X.509 (gestionado con **ACM**) y termina TLS; puede haber varios certificados con **SNI (Server Name Indication)** — solo ALB, NLB y CloudFront.
- **Connection Draining / Deregistration Delay**: al desregistrar o marcar no sano un destino, se da tiempo (1-3600 s, 300 por defecto) a completar peticiones en vuelo.
- **Seguridad**: el SG de las instancias puede aceptar solo tráfico desde el SG del LB.

### Elegir
| Requisito | Balanceador |
|---|---|
| HTTP, rutas, microservicios | ALB |
| TCP/UDP, IP estática, ultra rendimiento | NLB |
| Appliances de seguridad de terceros | GWLB |
