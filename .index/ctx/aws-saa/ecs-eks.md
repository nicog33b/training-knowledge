# Subtema: ECS, Fargate, ECR y EKS [aws-saa/ecs-eks]
Orquestación de contenedores en AWS, tipos de lanzamiento, roles y App Runner.

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

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- iam: IAM: usuarios, grupos y políticas — Identidades, permisos, políticas JSON, MFA, roles y herramientas de auditoría de IAM. [secciones: IAM: Identity and Access Management · Entidades · Políticas · Política de contraseñas y MFA · Roles: casos típicos · Herramientas de seguridad de IAM]

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- IAM: Servicio global de AWS para gestionar identidades (usuarios, grupos, roles) y sus permisos mediante políticas.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- EBS: Disco de red persistente para EC2, atado a una AZ.
- EFS: Sistema de archivos NFS elástico y multi-AZ, montable en cientos de instancias Linux.
- FSx: Familia de sistemas de archivos gestionados: Windows File Server, Lustre, NetApp ONTAP y OpenZFS.
- ALB: Balanceador de capa 7 (HTTP/HTTPS/gRPC) con enrutamiento por ruta, host y headers.
- NLB: Balanceador de capa 4 (TCP/UDP/TLS) de ultra rendimiento con una IP estática por AZ.
- Target Tracking: Política de escalado que mantiene una métrica en un valor objetivo, como CPU media al 50 %.
- Multi-AZ: Réplica síncrona en otra AZ para failover automático; da alta disponibilidad, no escalado de lectura.
- PrivateLink: Tecnología para consumir o exponer servicios entre VPC de forma privada mediante ENIs.
- RAM: Servicio para compartir recursos AWS (subredes, Transit Gateway…) entre cuentas.
- S3: Almacenamiento de objetos escalable con 11 nueves de durabilidad.
- Versionado: Conserva cada versión de un objeto S3 protegiendo de borrados y sobrescrituras.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- ECR: Registro gestionado de imágenes de contenedor con escaneo de vulnerabilidades e integración IAM.
- ECS: Orquestador de contenedores propio de AWS, con lanzamiento en EC2 o Fargate.
- Fargate: Motor serverless para ejecutar contenedores en ECS o EKS sin gestionar servidores.
- Task Definition: Plantilla JSON de ECS con imagen, CPU/RAM, puertos y roles de una tarea.
- Task Role: Rol IAM que asume una tarea ECS para acceder a servicios AWS.
- EKS: Kubernetes gestionado por AWS con nodos EC2 o Fargate.
- Kubernetes: Orquestador de contenedores de código abierto.
- App Runner: Servicio para desplegar webs y APIs desde código o imagen con escalado y HTTPS automáticos.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- CloudWatch: Servicio de observabilidad: métricas, logs, alarmas y dashboards.
- EventBridge: Bus de eventos serverless que enruta eventos de AWS, SaaS y apps a targets mediante reglas.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué Fargate reduce el trabajo operativo frente a ECS sobre EC2?
- (comparar) Compara el task role y el execution role de ECS: ¿qué permite cada uno?
- (aplicar) Tu empresa ya usa Kubernetes on-premises: ¿ECS o EKS, y por qué?
