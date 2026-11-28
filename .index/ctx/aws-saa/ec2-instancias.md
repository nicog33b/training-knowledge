# Subtema: EC2: instancias y modelos de compra [aws-saa/ec2-instancias]
Tipos de instancia, AMI, user data y modelos de compra: on-demand, reservadas, spot, dedicated.

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

## Glosario usado
- CI: Integración continua: cada cambio se construye y se prueba automáticamente en un servidor antes de integrarlo.
- Zona de Disponibilidad: Uno o más centros de datos independientes dentro de una Región, con energía y red propias.
- Usuario root: Identidad creada con la cuenta de AWS con acceso total e irrestricto; debe protegerse con MFA y usarse lo mínimo.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- AMI: Plantilla regional (SO + software + configuración) para lanzar instancias EC2.
- User Data: Script que EC2 ejecuta como root solo en el primer arranque de la instancia.
- EC2 Image Builder: Servicio que automatiza la creación, prueba y distribución de AMIs.
- On-Demand: Modelo de compra EC2 de pago por uso sin compromiso.
- Reserved Instances: Compromiso de 1 o 3 años en EC2 con descuento de hasta ~72 % frente a On-Demand.
- Savings Plans: Compromiso de gasto por hora a 1-3 años que otorga descuentos; Compute Savings Plans cubre EC2, Fargate y Lambda.
- Spot Instances: Capacidad sobrante de EC2 con hasta ~90 % de descuento que AWS puede reclamar con 2 minutos de aviso.
- Spot Fleet: Conjunto de instancias Spot (y opcionalmente On-Demand) que cumple una capacidad objetivo según una estrategia.
- Dedicated Host: Servidor físico completo reservado para ti; permite control de licencias por socket o núcleo.
- Dedicated Instances: Instancias que corren en hardware dedicado a tu cuenta sin control del host físico.
- Capacity Reservation: Reserva de capacidad EC2 en una AZ concreta, sin compromiso de plazo.
- IOPS: Operaciones de lectura/escritura por segundo; medida de rendimiento de almacenamiento.
- BYOL: Usar licencias de software que ya posees en la nube.
- RAM: Servicio para compartir recursos AWS (subredes, Transit Gateway…) entre cuentas.
- Fargate: Motor serverless para ejecutar contenedores en ECS o EKS sin gestionar servidores.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- CloudFormation: Servicio de infraestructura como código que crea recursos AWS desde plantillas JSON/YAML agrupadas en stacks.
- AWS Batch: Ejecuta trabajos por lotes como contenedores con dimensionamiento automático.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué Spot es barato y qué precio pagas por ese descuento?
- (que-pasa-si) ¿Qué pasa con un trabajo largo sin checkpoints si corre en Spot y AWS reclama la instancia?
- (comparar) Compara Reserved Instances y Savings Plans: ¿cuándo conviene cada uno?
- (aplicar) Una carga estable 24/7 durante 3 años: ¿qué modelo de compra eliges y por qué?
- (comparar) Compara Dedicated Hosts y Dedicated Instances.
- (aplicar) Necesitas capacidad garantizada en una AZ para un evento de dos días, sin compromiso largo: ¿qué usas?
- (aplicar) ¿Qué familia de instancia eliges para una base de datos en memoria y cuál para cálculo intensivo?

## Simulaciones del subtema
- clasificar: Elige el modelo de compra de EC2
