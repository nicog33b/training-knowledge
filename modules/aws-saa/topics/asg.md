---
title: Auto Scaling Groups
summary: Grupos de escalado, launch templates, políticas de escalado y ciclo de
  vida de instancias.
order: 9
section: escalabilidad
status: done
requires: []
---

## Auto Scaling Groups

Un **ASG** mantiene el número deseado de instancias EC2 entre un mínimo y un máximo, sustituye las no sanas y escala según la demanda. Se integra con ELB (registra automáticamente instancias en el target group) y es **gratuito** (pagas los recursos creados).

### Launch Template
Define AMI, tipo de instancia, user data, EBS, security groups, rol IAM, red y claves. Soporta versiones y **mezcla de On-Demand y Spot**. Sustituye a las *Launch Configurations* (obsoletas).

### Parámetros
`MinSize`, `DesiredCapacity`, `MaxSize`; subredes en varias AZ (balancea entre ellas); health checks de EC2 y/o de ELB (si el ELB lo marca no sano, el ASG reemplaza la instancia).

### Políticas de escalado
- **Target tracking**: mantén una métrica en un valor (p. ej. CPU media al 50 %). La más simple.
- **Simple / Step scaling**: reglas basadas en alarmas de CloudWatch (si CPU > 70 % añade 2).
- **Scheduled**: acciones programadas (picos conocidos, viernes por la tarde).
- **Predictive**: usa ML sobre el histórico para escalar con antelación.
- Métricas habituales: CPU, `RequestCountPerTarget`, tráfico de red; **métricas personalizadas** (p. ej. memoria o longitud de cola SQS).
- **Cooldown** (300 s por defecto): periodo en que no se lanzan nuevos escalados para dejar estabilizar.

### Hooks y refresco
- **Lifecycle hooks**: pausan una instancia en `Pending:Wait` o `Terminating:Wait` para ejecutar tareas (instalar, extraer logs).
- **Instance Refresh**: actualiza todas las instancias con una nueva plantilla de forma gradual (min healthy %).
- **Warm pools**: instancias preinicializadas para reducir el tiempo de escalado.
- **Terminación**: por defecto se elimina de la AZ con más instancias, la de configuración más antigua.

> **Tip de examen**: "escalar según la cola SQS" → métrica personalizada (backlog por instancia). "Alta disponibilidad web" → ALB + ASG multi-AZ.
