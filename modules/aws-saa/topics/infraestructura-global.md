---
title: Infraestructura global
summary: Regiones, AZs y cómo lograr alta disponibilidad.
order: 1
section: fundamentos
requires: []
status: done
---

## Regiones, AZs y Edge Locations

AWS organiza su infraestructura en **Regiones** (ubicaciones geográficas como `eu-west-1` o `us-east-1`). Cada Región contiene como mínimo **3 Zonas de Disponibilidad (AZ)**, que son uno o más centros de datos aislados entre sí con energía, red y refrigeración propias, conectados por fibra de baja latencia. Además existen **Edge Locations** (más de 400 puntos de presencia) usadas por CloudFront, Route 53 y Global Accelerator para acercar contenido al usuario.

### Cómo elegir una Región
1. **Cumplimiento y gobernanza de datos**: los datos no salen de una Región a menos que tú lo decidas.
2. **Latencia**: cerca de tus usuarios.
3. **Servicios disponibles**: no todas las Regiones tienen todos los servicios (lo nuevo llega primero a us-east-1).
4. **Precio**: varía entre Regiones (São Paulo es bastante más cara que us-east-1).

### Alcance de los servicios
- **Globales**: IAM, Route 53, CloudFront, WAF, Organizations.
- **Regionales**: la mayoría (EC2, S3 —el bucket vive en una Región aunque su nombre sea global—, RDS, Lambda…).
- **Por AZ**: subredes, instancias EC2, volúmenes EBS.

### Alta disponibilidad
Desplegar en **más de una AZ** es la base de la alta disponibilidad: si una AZ falla, el tráfico sigue en las demás. Si necesitas sobrevivir a la caída de una Región entera, hablamos de **recuperación de desastres** multi-región (ver tema correspondiente).

### Modelo de responsabilidad compartida
- **AWS** es responsable de la seguridad *de* la nube: hardware, instalaciones, red global, hipervisor.
- **Tú** eres responsable de la seguridad *en* la nube: datos, configuración de IAM, firewalls (security groups), parches del SO en EC2, cifrado.
- En servicios gestionados (RDS, Lambda) AWS asume más capas, pero los datos y los permisos siguen siendo tuyos.

> **Tip de examen**: "tolerar fallo de un centro de datos" → Multi-AZ. "Reducir latencia global" → CloudFront/Global Accelerator/réplicas en otra Región. "Cumplir residencia de datos" → elegir Región.
