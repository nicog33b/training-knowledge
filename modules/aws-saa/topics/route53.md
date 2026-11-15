---
title: Route 53
summary: "DNS gestionado: tipos de registro, políticas de enrutamiento y health checks."
order: 12
section: dns
status: done
requires: []
---

## Route 53

DNS gestionado, de alta disponibilidad y escalable; único servicio AWS con **SLA del 100 %**. Es también registrador de dominios y ofrece health checks. Es un servicio global.

### Registros
Cada registro tiene dominio/subdominio, tipo, valor, **TTL** y política de enrutamiento. Tipos: **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias a otro hostname; no válido en el *apex* `ejemplo.com`), **NS** (servidores de nombres de la zona).
- **Hosted zones**: *públicas* (Internet) y *privadas* (dentro de una VPC).
- **Alias**: extensión de AWS; apunta a recursos AWS (ELB, CloudFront, API Gateway, S3 website, Elastic Beanstalk…), **funciona en el apex**, es gratuito, tiene health checks nativos y no admite TTL (lo define el servicio). No puede apuntar a un DNS de EC2.

### TTL
Tiempo que los resolvers cachean la respuesta. TTL alto = menos tráfico y coste, pero cambios más lentos; TTL bajo = cambios rápidos. Obligatorio salvo en Alias.

### Políticas de enrutamiento
- **Simple**: un registro, puede devolver varios valores (el cliente elige uno); sin health checks.
- **Weighted**: reparto por pesos (pruebas A/B, migraciones graduales); peso 0 = no recibe tráfico.
- **Latency**: al recurso con menor latencia para el usuario.
- **Failover**: activo-pasivo con health check del primario.
- **Geolocation**: según ubicación del usuario (país/continente); localización de contenido, cumplimiento; requiere registro por defecto.
- **Geoproximity**: según distancia a los recursos, con *bias* para ampliar o reducir (requiere Traffic Flow).
- **IP-based**: según el CIDR de origen del cliente.
- **Multi-value answer**: hasta 8 registros sanos con health checks (no sustituye a un ELB).

### Health Checks
Comprueban endpoints públicos (HTTP/HTTPS/TCP), **otros health checks (calculated)** o alarmas de CloudWatch (para recursos privados). Más de ~18 checkers globales; sano si ≥18 % responden.

### Dominios de terceros
Puedes comprar el dominio en otro registrador y usar Route 53 como DNS cambiando los NS.
