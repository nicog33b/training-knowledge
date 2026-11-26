# Subtema: CloudFront [aws-saa/cloudfront]
CDN: orígenes, caché, OAC, Lambda@Edge, signed URLs y geo-restricción.

## CloudFront

**CloudFront** es la CDN de AWS: cachea contenido en cientos de **Edge Locations** para reducir latencia y proteger el origen. Incluye protección DDoS (con Shield) e integración con WAF.

### Orígenes
- **S3 bucket**: distribución de archivos y subidas (con *OAC — Origin Access Control*, que sustituye a OAI, para que el bucket solo sea accesible desde CloudFront).
- **Origen personalizado (HTTP)**: ALB, instancia EC2 (pública), sitio estático S3, cualquier servidor HTTP.
- **Origin Groups**: origen primario + secundario para failover automático.

### Caché
- El contenido se cachea según la **Cache Key** (por defecto host + ruta); puedes incluir headers, cookies y query strings con **Cache Policy**. **Origin Request Policy** define qué se reenvía al origen sin formar parte de la clave.
- **TTL** por objeto: `Cache-Control` / `Expires` del origen o valores min/default/max.
- **Invalidaciones**: `CreateInvalidation` borra objetos de la caché (`/*` o rutas concretas).
- **Cache hit ratio**: métrica clave; más alto = menos carga al origen.

### Seguridad
- **Geo-restriction**: allow/block list por país.
- **Signed URLs** (un archivo) y **Signed Cookies** (varios archivos) para contenido privado/premium con expiración. No confundir con S3 pre-signed URL (usa los permisos de quien firma).
- **Field-level encryption** para cifrar campos sensibles en el edge.
- **HTTPS** entre cliente-edge y edge-origen; certificados en ACM (la región debe ser **us-east-1**).

### Computación en el edge
- **CloudFront Functions**: JS ligeras, sub-ms, a millones de peticiones/s; manipulación de headers/URL, reescrituras, validaciones simples.
- **Lambda@Edge**: Node.js/Python, más potente (hasta 5-30 s), acceso a red/SDK; personalizar respuestas, autenticación, A/B.

### Price Classes
All (todas las edge), 200 (excluye las más caras) y 100 (solo las más baratas) para ahorrar coste.

### CloudFront vs S3 Cross-Region Replication
CloudFront: contenido global estático **cacheado** (TTL), ideal para archivos estáticos disponibles en todas partes. CRR: replicación casi en tiempo real hacia Regiones concretas, para contenido dinámico de baja latencia en pocas Regiones.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- s3-fundamentos: S3: fundamentos y seguridad — Buckets, objetos, bucket policies, versionado, replicación y cifrado. [secciones: S3: fundamentos y seguridad · Buckets y objetos · Seguridad y acceso · Versionado · Replicación · Cifrado]

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- TTL: Time To Live. Duración tras la cual un dato guardado se considera vencido.
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Edge Location: Punto de presencia de AWS cercano al usuario final usado por CloudFront, Route 53 y Global Accelerator para cachear y enrutar tráfico.
- SDK: Biblioteca por lenguaje (boto3, JS, Java…) para llamar a la API de AWS desde código.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket: Contenedor de objetos en S3 con nombre global único creado en una Región.
- Pre-signed URL: URL temporal firmada que otorga acceso a un objeto con los permisos de quien la generó.
- Replicación S3: Copia asíncrona de objetos a otro bucket en otra Región (CRR) o en la misma (SRR); requiere versionado.
- CloudFront: Red de distribución de contenido global que cachea objetos en edge locations para reducir latencia.
- OAC: Mecanismo para que un bucket S3 solo acepte peticiones procedentes de CloudFront.
- Origin Group: Par de orígenes primario y secundario de CloudFront con failover automático.
- Cache Key: Conjunto de elementos (host, ruta, headers, cookies, query strings) que identifica un objeto cacheado.
- Invalidación: Operación que elimina objetos de la caché de CloudFront antes de su TTL.
- Signed URL: URL o cookie firmada de CloudFront que da acceso temporal a contenido privado.
- Geo-restriction: Bloqueo o permiso de acceso a CloudFront según el país del usuario.
- CloudFront Functions: Funciones JavaScript ligeras ejecutadas en el edge con latencia sub-milisegundo.
- Lambda@Edge: Funciones Lambda que se ejecutan en edge locations de CloudFront para personalizar peticiones y respuestas.
- Price Class: Opción de CloudFront para limitar las edge locations usadas y reducir el coste.
- ACM: Servicio que aprovisiona y renueva automáticamente certificados TLS para ELB, CloudFront y API Gateway.
- Shield: Protección DDoS: Standard (gratuita, capas 3/4) y Advanced (de pago, con equipo de respuesta y protección de costes).
- DDoS: Ataque que satura un servicio con tráfico desde muchas fuentes.
- WAF: Firewall de capa 7 que filtra HTTP/S por IP, geografía, SQLi, XSS y límites de tasa.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué OAC impide que alguien salte CloudFront y lea directo del bucket?
- (que-pasa-si) ¿Qué pasa con el contenido cacheado si actualizas un archivo en el origen y el TTL es de 24 h?
- (comparar) Compara signed URLs y signed cookies: ¿cuál para un archivo y cuál para muchos?
- (que-pasa-si) ¿Qué pasa si el origen de CloudFront deja de responder?
- (aplicar) Por licencias, un vídeo no puede verse desde ciertos países: ¿cómo lo resuelves en CloudFront?
- (comparar) Compara CloudFront Functions y Lambda@Edge.
