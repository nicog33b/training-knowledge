---
title: Global Accelerator
summary: IPs anycast estáticas y enrutamiento por la red global de AWS;
  comparación con CloudFront.
order: 18
section: entrega-global
status: done
requires: []
---

## Global Accelerator

Problema: los usuarios llegan a tu aplicación saltando por muchos routers públicos (más latencia y variabilidad). **Global Accelerator** da **2 direcciones IP anycast estáticas** que enrutan el tráfico hacia la **edge location más cercana**, desde donde viaja por la red privada de AWS hasta tu aplicación.

### Características
- Funciona con **ALB, NLB, EC2 y Elastic IP**, en una o varias Regiones; el destino no necesita estar en una región específica.
- **Failover rápido** (<1 min) por health checks, sin esperar al TTL del DNS.
- Mejor para aplicaciones **no HTTP** (juegos UDP, IoT con MQTT, VoIP) y para apps HTTP que requieren **IPs estáticas** (allowlist en firewalls) o failover regional determinista.
- Seguridad: Shield estándar incluido (protección DDoS).
- Se puede ajustar peso por endpoint y *traffic dial* por Región.

### Global Accelerator vs CloudFront
| | CloudFront | Global Accelerator |
|---|---|---|
| Qué hace | **Cachea** contenido en el edge | **Proxy** de red, sin caché |
| Protocolos | HTTP/HTTPS | TCP y UDP |
| Mejor para | Contenido estático y dinámico cacheable | Rendimiento global, IPs fijas, failover rápido |

Ambos usan la red global de AWS y las edge locations y protegen frente a DDoS.
