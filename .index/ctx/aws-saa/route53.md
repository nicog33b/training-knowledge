# Subtema: Route 53 [aws-saa/route53]
DNS gestionado: tipos de registro, políticas de enrutamiento y health checks.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- elb: Elastic Load Balancing — ALB, NLB, GWLB, CLB, sticky sessions, cross-zone, SSL/SNI y connection draining. [secciones: Elastic Load Balancing · Tipos · Funciones clave · Elegir]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- TTL: Time To Live. Duración tras la cual un dato guardado se considera vencido.
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- Alta disponibilidad: Diseño que tolera fallos de componentes manteniendo el servicio en pie.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Load Balancer: Reparte el tráfico entrante entre varios destinos sanos y expone un único punto de entrada.
- Health Check: Sonda periódica que determina si un destino puede recibir tráfico.
- Route 53: DNS global gestionado de AWS con registro de dominios, health checks y políticas de enrutamiento.
- Hosted Zone: Contenedor de registros DNS de un dominio; pública o privada (dentro de una VPC).
- Alias: Registro de Route 53 que apunta a recursos AWS, válido en el apex, gratuito y con health checks nativos.
- CNAME: Registro DNS que apunta un nombre a otro nombre; no permitido en el apex del dominio.
- Enrutamiento ponderado: Política DNS que reparte tráfico según pesos asignados a cada registro.
- Geolocation: Política DNS que decide según el país o continente del usuario.
- Geoproximity: Política DNS por distancia entre usuario y recurso con un bias ajustable.
- Multi-value answer: Política DNS que devuelve hasta 8 registros sanos elegidos con health checks.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- CIDR: Notación de rangos IP (p. ej. 10.0.0.0/16) donde el sufijo indica los bits de red.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- API Gateway: Servicio gestionado para crear y proteger APIs REST, HTTP y WebSocket.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- Alarma de CloudWatch: Evalúa una métrica y dispara acciones (SNS, EC2, Auto Scaling) al superar un umbral.
- Elastic Beanstalk: PaaS que despliega y escala aplicaciones desde el código, gestionando EC2, ASG, ELB y más.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué un TTL alto hace que un cambio de DNS tarde en verse?
- (que-pasa-si) ¿Qué pasa con la política Failover si el primario no tiene health check?
- (comparar) Compara geolocation y latency: ¿cuál eliges para cumplir leyes de datos por país?
- (error-comun) Error común: ¿por qué multi-value answer no sustituye a un balanceador?
- (comparar) Compara un registro CNAME y un registro Alias.
- (aplicar) Quieres mandar el 10 % del tráfico a la nueva versión de tu web: ¿qué política de Route 53 usas?

## Simulaciones del subtema
- clasificar: Elige la política de enrutamiento
