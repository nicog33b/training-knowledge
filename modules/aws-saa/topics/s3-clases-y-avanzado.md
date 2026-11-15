---
title: "S3: clases, ciclo de vida y avanzado"
summary: Clases de almacenamiento, lifecycle, rendimiento, eventos, Object Lock
  y Access Points.
order: 16
section: s3
status: done
requires: []
---

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
