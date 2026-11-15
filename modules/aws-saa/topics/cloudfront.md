---
title: CloudFront
summary: "CDN: orígenes, caché, OAC, Lambda@Edge, signed URLs y geo-restricción."
order: 17
section: entrega-global
status: done
requires: []
---

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
