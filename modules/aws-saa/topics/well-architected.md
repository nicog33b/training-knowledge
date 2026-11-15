---
title: Well-Architected Framework
summary: Los seis pilares, principios de diseño y herramientas de revisión.
order: 40
section: arquitectura
status: done
requires: []
---

## Well-Architected Framework

El **AWS Well-Architected Framework** reúne mejores prácticas para diseñar y operar arquitecturas en la nube, organizadas en **seis pilares**. La **Well-Architected Tool** (consola) permite revisar cargas de trabajo y generar planes de mejora.

### Los seis pilares
1. **Excelencia operativa**: ejecutar y monitorizar sistemas y mejorar procesos. Principios: operaciones como código, cambios pequeños y reversibles, anticipar fallos, aprender de incidentes. Servicios: CloudFormation, Config, CloudWatch, X-Ray, Systems Manager.
2. **Seguridad**: proteger información y sistemas. Principios: identidad fuerte (mínimo privilegio), trazabilidad, seguridad en todas las capas, automatizar, proteger datos en tránsito y reposo, prepararse para incidentes. Servicios: IAM, KMS, GuardDuty, Shield/WAF, CloudTrail.
3. **Fiabilidad**: recuperarse de fallos y satisfacer la demanda. Principios: probar procedimientos de recuperación, recuperarse automáticamente, escalar horizontalmente, no adivinar capacidad, automatizar cambios. Servicios: Multi-AZ, Auto Scaling, Route 53, Backup, Shield.
4. **Eficiencia del rendimiento**: usar los recursos de computación con eficacia. Principios: democratizar tecnologías avanzadas, ir global en minutos, serverless, experimentar más a menudo, comprender los sistemas. Servicios: Lambda, CloudFront, ElastiCache, Global Accelerator.
5. **Optimización de costes**: evitar costes innecesarios. Principios: gestionar el consumo, pagar solo lo que uso, medir la eficiencia, dejar de gastar en el centro de datos, analizar y atribuir el gasto. Servicios: Savings Plans, Spot, Cost Explorer, Budgets, rightsizing.
6. **Sostenibilidad**: minimizar el impacto ambiental. Principios: comprender impacto, maximizar utilización, adoptar hardware más eficiente, usar servicios gestionados, reducir el volumen de datos. Servicios: Graviton, Auto Scaling, S3 lifecycle.

### Principios generales de diseño
- **Dejar de adivinar** la capacidad y **escalar** bajo demanda.
- **Probar** a escala de producción.
- **Automatizar** para experimentar fácilmente.
- **Arquitecturas evolutivas** y basadas en datos.
- **Game days** para ensayar fallos.
- **Acoplamiento débil** (colas, eventos) y **servicios en lugar de servidores**.

### AWS Well-Architected Tool y otros
- **Lens**: especializaciones (Serverless, SaaS, IoT, ML, Data Analytics).
- **Cloud Adoption Framework (CAF)**: perspectivas de negocio, personas, gobierno, plataforma, seguridad y operaciones.
- **Trusted Advisor**: comprobaciones automáticas alineadas con los pilares.
