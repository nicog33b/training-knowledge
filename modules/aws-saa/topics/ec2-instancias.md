---
title: "EC2: instancias y modelos de compra"
summary: "Tipos de instancia, AMI, user data y modelos de compra: on-demand,
  reservadas, spot, dedicated."
order: 4
section: computo
status: done
requires: []
---

## EC2: Elastic Compute Cloud

EC2 ofrece máquinas virtuales (IaaS) bajo demanda. Eliges SO, CPU, RAM, almacenamiento, red y reglas de firewall.

### Familias de instancias
| Familia | Uso | Ejemplos |
|---|---|---|
| Propósito general | Equilibrio CPU/RAM | T3, M5, M7g |
| Optimizadas para cómputo | HPC, batch, juegos | C5, C7g |
| Optimizadas para memoria | BBDD en memoria, caché, big data | R5, X1, z1d |
| Optimizadas para almacenamiento | IOPS altos, DWH | I3, D2, H1 |
| Cómputo acelerado | GPU, ML, gráficos | P4, G5, Inf1 |

Las instancias **T** son *burstable*: acumulan créditos de CPU y gastan al necesitar picos.

### AMI y User Data
- **AMI**: plantilla (SO + software) para lanzar instancias. Son regionales; puedes copiarlas entre Regiones. Pueden ser públicas, propias o del Marketplace.
- **User Data**: script que se ejecuta **una sola vez** en el primer arranque, como root (instalar paquetes, descargar archivos).
- **EC2 Image Builder**: automatiza la creación, prueba y distribución de AMIs.

### Modelos de compra
- **On-Demand**: pago por segundo (Linux/Windows), sin compromiso. Para cargas cortas e impredecibles.
- **Reserved Instances (1 o 3 años)**: hasta ~72 % de descuento; *Convertible* permite cambiar familia (hasta ~66 %). Pago total, parcial o sin adelanto.
- **Savings Plans**: compromiso de gasto ($/hora) a 1-3 años; más flexible (Compute Savings Plan aplica a EC2, Fargate y Lambda).
- **Spot Instances**: hasta ~90 % de descuento; AWS puede **reclamarlas con aviso de 2 minutos**. Ideales para trabajos tolerantes a fallos (batch, análisis, CI). Se piden mediante *Spot Request* (one-time/persistent) o *Spot Fleet*.
- **Dedicated Hosts**: servidor físico completo para ti; control de licencias por socket/núcleo (BYOL), requisitos de cumplimiento.
- **Dedicated Instances**: hardware dedicado, sin control de placement del host.
- **Capacity Reservations**: reserva capacidad en una AZ sin compromiso de plazo (se paga On-Demand tengas o no instancias).

> **Tip de examen**: carga estable de largo plazo → Reserved/Savings Plans; tolera interrupciones → Spot; licencias por núcleo → Dedicated Host; carga impredecible y corta → On-Demand.
