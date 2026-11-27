# Subtema: Global Accelerator [aws-saa/global-accelerator]
IPs anycast estáticas y enrutamiento por la red global de AWS; comparación con CloudFront.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- cloudfront: CloudFront — CDN: orígenes, caché, OAC, Lambda@Edge, signed URLs y geo-restricción. [secciones: CloudFront · Orígenes · Caché · Seguridad · Computación en el edge · Price Classes · CloudFront vs S3 Cross-Region Replication]
- route53: Route 53 — DNS gestionado: tipos de registro, políticas de enrutamiento y health checks. [secciones: Route 53 · Registros · TTL · Políticas de enrutamiento · Health Checks · Dominios de terceros]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- TTL: Time To Live. Duración tras la cual un dato guardado se considera vencido.
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Edge Location: Punto de presencia de AWS cercano al usuario final usado por CloudFront, Route 53 y Global Accelerator para cachear y enrutar tráfico.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Elastic IP: Dirección IPv4 pública estática que puedes asociar y mover entre instancias.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- NLB: Balanceador de capa 4 (TCP/UDP/TLS) de ultra rendimiento con una IP estática por AZ.
- Health Check: Sonda periódica que determina si un destino puede recibir tráfico.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Global Accelerator: Servicio con 2 IPs anycast estáticas que enruta tráfico TCP/UDP por la red global de AWS hacia tus endpoints.
- Anycast: Una misma dirección IP anunciada desde varias ubicaciones; el tráfico va a la más cercana.
- Shield: Protección DDoS: Standard (gratuita, capas 3/4) y Advanced (de pago, con equipo de respuesta y protección de costes).
- DDoS: Ataque que satura un servicio con tráfico desde muchas fuentes.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué Global Accelerator mejora la latencia aunque no cachee nada?
- (comparar) Compara Global Accelerator y CloudFront para un juego por UDP.
- (aplicar) ¿Qué ventaja dan dos IP anycast estáticas a un cliente con listas blancas de firewall?
- (que-pasa-si) ¿Qué pasa si el endpoint de una Región deja de estar sano detrás de Global Accelerator?
- (aplicar) ¿Cómo pasarías poco a poco el tráfico de una Región a otra con Global Accelerator?
- (comparar) Compara un failover con Route 53 y uno con Global Accelerator.
