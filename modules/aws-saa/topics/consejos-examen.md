---
title: Estrategia y consejos del examen
summary: Estructura del SAA-C03, dominios, trucos de eliminación y cheat sheet
  de decisión.
order: 42
section: arquitectura
status: done
requires: []
---

## Estrategia y consejos del examen SAA-C03

### Formato
- **65 preguntas** (50 puntuadas + 15 no puntuadas), **130 minutos**, opción múltiple y respuesta múltiple (elige 2 o 3).
- Puntuación 100-1000; aprobado en **720**. Coste 150 USD; válida 3 años. Idioma español disponible; puedes pedir tiempo extra (+30 min) si no eres hablante nativo de inglés.
- Sin penalización por responder mal: **contesta todas**.

### Dominios y peso
| Dominio | Peso |
|---|---|
| 1. Diseño de arquitecturas **seguras** | 30 % |
| 2. Diseño de arquitecturas **resilientes** | 26 % |
| 3. Diseño de arquitecturas de **alto rendimiento** | 24 % |
| 4. Diseño de arquitecturas **optimizadas en costes** | 20 % |

### Técnica de resolución
1. Lee el **final** del enunciado (qué pide) y luego el escenario.
2. Subraya palabras clave: *más rentable*, *mínima carga operativa*, *alta disponibilidad*, *sin cambios en la aplicación*, *en tiempo real*, *menor latencia*, *seguro*, *minimizar downtime*.
3. **Descarta** las opciones claramente incorrectas (suelen ser 2).
4. Entre las restantes, aplica el criterio dominante. Si hay empate: **gestionado/serverless** sobre autogestionado, y la opción **más simple**.
5. Marca las dudosas y vuelve; gestiona el tiempo (~2 min por pregunta).

### Atajos de decisión
| Señal en el enunciado | Respuesta típica |
|---|---|
| Desacoplar, buffer | SQS |
| Múltiples receptores | SNS fan-out |
| Streaming en tiempo real, orden, replay | Kinesis Data Streams |
| Alta disponibilidad de BD | RDS Multi-AZ / Aurora |
| Escalar lecturas | Read Replicas / ElastiCache / DAX |
| Archivos compartidos Linux | EFS; Windows → FSx |
| Más IOPS posible | Instance Store / io2 Block Express |
| Tráfico mundial HTTP estático | CloudFront |
| IP estática global / TCP-UDP | Global Accelerator |
| Conexión privada a S3 | Gateway Endpoint |
| On-premises a AWS privado y estable | Direct Connect |
| Migrar BD | DMS (+SCT si heterogénea) |
| Datos masivos sin red | Snowball |
| DDoS | Shield; inyecciones → WAF |
| Cifrado administrado | KMS; control exclusivo → CloudHSM |
| Rotación de credenciales BD | Secrets Manager |
| Restringir cuentas | SCP |
| Ver quién hizo qué | CloudTrail; configuración → Config |
| Menor coste con interrupciones OK | Spot |
| Cargas estables 1-3 años | Savings Plans / RI |

### Errores frecuentes
- Confundir **Multi-AZ** (HA) con **Read Replica** (rendimiento).
- Olvidar que los **SG no deniegan** (usa NACL) y que **NACL no tiene estado**.
- Usar claves de acceso en EC2 en vez de **roles**.
- Elegir peering para muchas VPC en lugar de **Transit Gateway**.
- Pensar que EBS cruza AZ.

### Preparación final
Repasa los glosarios, haz un **examen de práctica completo** (el curso incluye uno), analiza cada explicación incluso de las acertadas y practica los servicios en la capa gratuita.
