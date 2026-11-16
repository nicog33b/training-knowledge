# Subtema: S3: clases, ciclo de vida y avanzado [aws-saa/s3-clases-y-avanzado]
Clases de almacenamiento, lifecycle, rendimiento, eventos, Object Lock y Access Points.

## S3: clases, ciclo de vida y avanzado

### Clases de almacenamiento
| Clase | Uso | Notas |
|---|---|---|
| **Standard** | Acceso frecuente | Baja latencia, ≥3 AZ |
| **Intelligent-Tiering** | Patrón desconocido | Mueve automáticamente entre niveles; sin cargo de recuperación |
| **Standard-IA** | Infrecuente pero rápido | ≥3 AZ, cargo por recuperación |
| **One Zone-IA** | Infrecuente, recreable | 1 AZ, 20 % más barato |
| **Glacier Instant Retrieval** | Archivo con acceso en ms | Mínimo 90 días |
| **Glacier Flexible Retrieval** | Archivo | Expedited 1-5 min, Standard 3-5 h, Bulk 5-12 h; mínimo 90 días |
| **Glacier Deep Archive** | Archivo a largo plazo | Standard 12 h, Bulk 48 h; mínimo 180 días; la más barata |

Todas con 11 nueves de durabilidad. Disponibilidad: Standard 99,99 %.

### Lifecycle Rules
- **Transition actions**: mover a otra clase tras N días.
- **Expiration actions**: eliminar objetos (también versiones antiguas, uploads multi-parte incompletos).
- Filtros por prefijo o tags. **Storage Class Analysis** ayuda a decidir la regla (Standard → Standard-IA).

### Rendimiento
- Latencia 100-200 ms; **3 500 PUT/COPY/POST/DELETE y 5 500 GET/HEAD por segundo por prefijo**, sin límite de prefijos.
- **Multi-Part Upload** (paralelismo), **S3 Transfer Acceleration** (sube a edge location más cercana y viaja por la red de AWS), **Byte-Range Fetches** (descarga en paralelo o parcial).
- **S3 Select / Glacier Select**: filtra el contenido en el servidor con SQL.

### Notificaciones de eventos
Eventos como `ObjectCreated` o `ObjectRemoved` se envían a **SNS, SQS, Lambda** o a **EventBridge** (más filtros y destinos). Requiere políticas de recurso sobre el destino.

### Seguridad y control avanzados
- **S3 Object Lock** (con versionado): modelo **WORM**. Modos *Governance* (se puede saltar con permisos) y *Compliance* (nadie, ni root). **Retention period** y **Legal Hold**.
- **Glacier Vault Lock**: política WORM inmutable para una bóveda.
- **MFA Delete**: exige MFA para borrar versiones o cambiar versionado.
- **Access Points**: endpoints con políticas propias para conjuntos de datos; pueden restringirse a una VPC. **Multi-Region Access Points** enrutan al bucket más cercano.
- **S3 Object Lambda**: modifica el objeto al recuperarlo (redactar PII, convertir formatos).
- **Requester Pays**: paga quien descarga.
- **Access Logs**, **S3 Inventory**, **Storage Lens** (métricas de uso organizacional).
- **S3 Batch Operations**: acciones masivas sobre objetos (copiar, cifrar, restaurar).

> **Tip de examen**: "datos archivo, recuperación en minutos" → Glacier Flexible Expedited; "mínimo coste, 12 h está bien" → Deep Archive; "patrones impredecibles" → Intelligent-Tiering.

## Glosario usado
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Edge Location: Punto de presencia de AWS cercano al usuario final usado por CloudFront, Route 53 y Global Accelerator para cachear y enrutar tráfico.
- Usuario root: Identidad creada con la cuenta de AWS con acceso total e irrestricto; debe protegerse con MFA y usarse lo mínimo.
- MFA: Segundo factor de autenticación (app, llave FIDO, token hardware) además de la contraseña.
- VPC: Red virtual privada y aislada de tu cuenta dentro de una Región, con rangos IP, subredes y reglas propias.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Bucket: Contenedor de objetos en S3 con nombre global único creado en una Región.
- Versionado: Conserva cada versión de un objeto S3 protegiendo de borrados y sobrescrituras.
- Clases de almacenamiento S3: Niveles de coste/acceso de S3: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA y Glacier.
- Glacier: Clases de archivo de S3 de muy bajo coste con distintos tiempos de recuperación.
- Lifecycle Rules: Reglas que transicionan objetos entre clases o los expiran automáticamente.
- Transfer Acceleration: Acelera subidas a S3 usando edge locations y la red global de AWS.
- Multi-Part Upload: Subida de un objeto en partes paralelas; recomendada >100 MB y obligatoria >5 GB.
- Byte-Range Fetch: Descarga de rangos de bytes de un objeto para paralelizar o recuperar solo una parte.
- S3 Select: Filtra el contenido de un objeto con SQL en el servidor para transferir menos datos.
- Object Lock: Impide borrar o modificar objetos durante un periodo (modo Governance o Compliance, Legal Hold).
- MFA Delete: Exige MFA para eliminar versiones o cambiar el versionado de un bucket.
- Access Point: Endpoint con política propia para simplificar el acceso a datasets compartidos de S3.
- S3 Object Lambda: Transforma los objetos con Lambda al recuperarlos desde S3.
- Storage Lens: Herramienta de visibilidad y métricas de uso de almacenamiento S3 a nivel de organización.
- Requester Pays: Configuración de bucket en la que quien descarga paga el coste de transferencia.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- SNS: Servicio pub/sub: publica en un topic y envía (push) a todos los suscriptores.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.
- PII: Información de identificación personal, como nombres, tarjetas o documentos.
- AWS Batch: Ejecuta trabajos por lotes como contenedores con dimensionamiento automático.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué Intelligent-Tiering conviene cuando no conoces el patrón de acceso?
- (que-pasa-si) ¿Qué pasa si mueves a Glacier Deep Archive datos que necesitas leer en minutos?
- (aplicar) Diseña una lifecycle rule para logs: frecuentes 30 días, raros 1 año, borrar a los 7 años.
- (aplicar) ¿Cómo subes rápido archivos de varios GB a un bucket desde otro continente?
- (comparar) Compara los modos governance y compliance de S3 Object Lock.
- (aplicar) Quieres que un cliente descargue un objeto privado durante una hora sin darle credenciales: ¿cómo?

## Simulaciones del subtema
- clasificar: Elige la clase de almacenamiento
