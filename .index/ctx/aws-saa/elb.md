# Subtema: Elastic Load Balancing [aws-saa/elb]
ALB, NLB, GWLB, CLB, sticky sessions, cross-zone, SSL/SNI y connection draining.

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

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Security Group: Firewall con estado a nivel de instancia/ENI; solo reglas Allow, entrada bloqueada por defecto.
- Elastic IP: Dirección IPv4 pública estática que puedes asociar y mover entre instancias.
- Load Balancer: Reparte el tráfico entrante entre varios destinos sanos y expone un único punto de entrada.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- NLB: Balanceador de capa 4 (TCP/UDP/TLS) de ultra rendimiento con una IP estática por AZ.
- GWLB: Balanceador de capa 3 (GENEVE) para desplegar y escalar appliances virtuales de red y seguridad.
- Health Check: Sonda periódica que determina si un destino puede recibir tráfico.
- Sticky Sessions: Enruta al mismo cliente siempre al mismo destino mediante una cookie.
- Cross-Zone Load Balancing: Distribuye el tráfico uniformemente entre destinos de todas las AZ habilitadas.
- SNI: Extensión TLS que permite servir varios certificados en un mismo listener según el hostname solicitado.
- Connection Draining: Tiempo que se da a las peticiones en vuelo para terminar antes de retirar un destino.
- GENEVE: Protocolo de encapsulación (puerto 6081) usado por Gateway Load Balancer.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- ECS: Orquestador de contenedores propio de AWS, con lanzamiento en EC2 o Fargate.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- ACM: Servicio que aprovisiona y renueva automáticamente certificados TLS para ELB, CloudFront y API Gateway.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué un NLB puede darte una IP estática por AZ y un ALB no?
- (que-pasa-si) ¿Qué pasa con la IP del cliente cuando pasa por un ALB, y cómo la recupera la aplicación?
- (error-comun) Error común: ¿por qué activar sticky sessions puede desequilibrar la carga?

## Simulaciones del subtema
- clasificar: ¿ALB, NLB o GWLB?
