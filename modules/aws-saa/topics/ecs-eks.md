---
title: ECS, Fargate, ECR y EKS
summary: Orquestación de contenedores en AWS, tipos de lanzamiento, roles y App Runner.
order: 23
section: contenedores
status: done
requires: []
---

## Contenedores: ECS, Fargate, ECR y EKS

Un **contenedor** empaqueta una aplicación con sus dependencias y corre aislado sobre el kernel del host (Docker). Se almacenan imágenes en registros: Docker Hub o **ECR**.

### ECR (Elastic Container Registry)
Registro privado o público de imágenes, integrado con IAM, con escaneo de vulnerabilidades, versionado por tags, cifrado y replicación cross-region/cross-account. Respaldado por S3.

### ECS (Elastic Container Service)
Orquestador propio de AWS (no usa Kubernetes). Conceptos:
- **Cluster**, **Task Definition** (JSON con imagen, CPU/RAM, puertos, variables, rol), **Task** (instancia en ejecución) y **Service** (mantiene N tareas, se integra con ALB y Auto Scaling).
- **Tipos de lanzamiento**:
  - **EC2**: gestionas el cluster de instancias (con el *ECS Agent* que las registra).
  - **Fargate**: **serverless**, sin gestionar servidores; solo defines CPU/RAM por tarea y pagas por recursos.
- **Roles IAM**: *Task Role* (permisos de la aplicación, por tarea) y *EC2 Instance Profile* (para el agente en EC2: ECR, CloudWatch Logs…). Execution Role para Fargate (descarga de imagen, logs).
- **Almacenamiento de datos**: EFS montado en tareas (compatible con Fargate; persistente y compartido multi-AZ). S3 no se puede montar como FS.
- **Balanceo**: ALB (puertos dinámicos de host) es el recomendado; NLB para alto rendimiento o PrivateLink.
- **Escalado**: *Service Auto Scaling* (target tracking CPU/RAM/ALB request count) para tareas y *Cluster Capacity Provider* para las instancias.
- **Invocación por eventos**: EventBridge puede lanzar tareas ECS (por S3 uploads o cron).

### EKS (Elastic Kubernetes Service)
Kubernetes gestionado (open source, portable entre clouds). Tipos de nodos: **Managed Node Groups** (EC2 gestionados por AWS), **Self-managed nodes** y **Fargate** (pods sin nodos). Almacenamiento: EBS CSI, EFS CSI, FSx. Estructura: Control Plane gestionado, *Pods*, *Deployments*. Útil cuando la empresa ya usa Kubernetes. **EKS Anywhere** lo lleva on-premises.

### AWS App Runner
Despliegue completamente gestionado de aplicaciones web/APIs desde código o imagen de contenedor: balanceo, escalado, HTTPS y red sin tocar infraestructura.

### Elegir
| Escenario | Servicio |
|---|---|
| Contenedores simples, lo más sencillo | ECS + Fargate |
| Kubernetes existente / portabilidad | EKS |
| Mínima configuración para una web/API | App Runner |
| Registro de imágenes | ECR |
