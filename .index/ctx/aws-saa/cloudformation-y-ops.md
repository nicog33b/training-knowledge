# Subtema: CloudFormation y operaciones [aws-saa/cloudformation-y-ops]
IaC con CloudFormation, CDK, Elastic Beanstalk, Systems Manager, OpsWorks.

## CloudFormation y operaciones

### CloudFormation
**Infraestructura como código (IaC)** declarativa: describes los recursos en plantillas JSON/YAML y CloudFormation los crea como una **stack**, en el orden correcto y de forma repetible. Gratis (pagas los recursos).
- Beneficios: control de versiones, revisión por *pull request*, estimación de costes (por tags), reproducibilidad entre cuentas/Regiones, destrucción limpia al borrar la stack.
- **Partes de la plantilla**: `Parameters`, `Mappings`, `Resources` (obligatoria), `Outputs`, `Conditions`, `Metadata`; funciones intrínsecas como `Ref`, `Fn::GetAtt`, `Fn::Sub`, `Fn::ImportValue`.
- **Change Sets**: previsualiza cambios antes de aplicar la actualización.
- **Rollback** automático si falla la creación; `DeletionPolicy` (Retain/Snapshot) protege recursos al borrar.
- **StackSets**: despliega stacks en múltiples cuentas y Regiones a la vez.
- **Drift Detection**: detecta cambios manuales respecto a la plantilla.
- **Nested stacks** (reutilización) y **cross-stack references** (Export/ImportValue). **Custom Resources** con Lambda.
- **CDK (Cloud Development Kit)**: define la infraestructura en lenguajes (TypeScript, Python, Java…) que se *sintetiza* en plantillas CloudFormation. **SAM** simplifica serverless.

### Elastic Beanstalk
**PaaS**: subes tu código (Java, .NET, Node, PHP, Python, Ruby, Go, Docker) y Beanstalk aprovisiona EC2, ASG, ELB, RDS y monitorización. Sigues controlando los recursos subyacentes. Modos: *Web Server tier* y *Worker tier* (procesa colas SQS). Políticas de despliegue: All at once, Rolling, Rolling con batch adicional, Immutable, Traffic splitting (canary), **Blue/Green** (intercambio de URL). Gratis; pagas los recursos.

### Systems Manager (SSM)
Gestión operativa de flotas EC2 e híbridas mediante el **SSM Agent** (preinstalado en Amazon Linux y requiere rol IAM):
- **Run Command** (ejecutar comandos sin SSH), **Session Manager** (shell seguro), **Patch Manager**, **State Manager**, **Inventory**.
- **Automation** (runbooks para tareas como reiniciar instancias o crear AMIs).
- **Parameter Store** y **OpsCenter**.
- Resuelve con eficiencia "gestionar parches en cientos de servidores sin acceso SSH".

### OpsWorks
Chef y Puppet gestionados para configurar servidores (en retirada). Si ves Chef/Puppet en el examen → OpsWorks.

### CI/CD de AWS
CodeCommit (repos Git, descontinuado para nuevos clientes), **CodeBuild** (compilación), **CodeDeploy** (despliegue a EC2/on-prem/Lambda/ECS con in-place o blue/green), **CodePipeline** (orquestación), **CodeArtifact** (paquetes).

### Elegir
Plantillas declarativas → CloudFormation; simplemente "sube tu código" → Beanstalk; operar flotas → Systems Manager; infraestructura con lenguajes de programación → CDK.

## Subtemas relacionados (solo resumen; el cuerpo con leer_subtema)
- identidad-organizaciones: Organizations, IAM Identity Center y Control Tower — Multi-cuenta, SCP, federación, Directory Service y gobierno. [secciones: Organizations, IAM Identity Center y Control Tower · AWS Organizations · IAM avanzado · IAM Identity Center (antes AWS SSO) · Directory Service · Control Tower y gobierno]

## Glosario usado
- Rol IAM: Identidad sin credenciales permanentes que puede asumir un servicio, otra cuenta o usuario; entrega credenciales temporales.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Session Manager: Acceso a shell de instancias sin SSH ni puertos abiertos, controlado por IAM y con logs.
- Snapshot: Copia incremental de un volumen EBS (o base de datos) almacenada en S3 gestionado por AWS.
- Load Balancer: Reparte el tráfico entrante entre varios destinos sanos y expone un único punto de entrada.
- Auto Scaling Group: Grupo de instancias EC2 con tamaño mínimo/deseado/máximo que se autorrepara y escala.
- RDS: Servicio de bases de datos relacionales gestionadas: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2.
- SQS: Cola de mensajes gestionada para desacoplar productores y consumidores; modelo pull.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- ECS: Orquestador de contenedores propio de AWS, con lanzamiento en EC2 o Fargate.
- Lambda: Cómputo serverless que ejecuta funciones bajo demanda, hasta 15 minutos, facturadas por ms.
- Serverless: Modelo donde AWS gestiona la infraestructura y se escala automáticamente; pagas por uso.
- CloudWatch Synthetics: Scripts programados (canaries) que prueban APIs y sitios web de forma continua.
- Parameter Store: Almacén seguro y jerárquico de configuración y secretos de Systems Manager, con versionado.
- Systems Manager: Conjunto de herramientas para operar flotas: Session Manager, Parameter Store, Patch Manager, Run Command, Automation.
- CloudFormation: Servicio de infraestructura como código que crea recursos AWS desde plantillas JSON/YAML agrupadas en stacks.
- IaC: Gestionar infraestructura mediante archivos de definición versionables y automatizables.
- Change Set: Vista previa de los cambios que una actualización aplicaría a una stack de CloudFormation.
- StackSets: Despliega stacks de CloudFormation en múltiples cuentas y Regiones a la vez.
- Drift Detection: Detecta cambios manuales en recursos respecto a la plantilla de CloudFormation.
- CDK: Framework para definir infraestructura en lenguajes de programación que genera plantillas CloudFormation.
- SAM: Extensión de CloudFormation que simplifica definir aplicaciones serverless.
- Elastic Beanstalk: PaaS que despliega y escala aplicaciones desde el código, gestionando EC2, ASG, ELB y más.
- Run Command: Función de Systems Manager para ejecutar comandos en flotas sin SSH.
- Patch Manager: Automatiza la aplicación de parches del SO en instancias gestionadas.
- OpsWorks: Servicio gestionado de Chef y Puppet para configuración de servidores.
- CodeDeploy: Servicios CI/CD de AWS: construcción (CodeBuild), despliegue (CodeDeploy), orquestación (CodePipeline).
- AWS Batch: Ejecuta trabajos por lotes como contenedores con dimensionamiento automático.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué un change set evita sorpresas al actualizar un stack?
- (que-pasa-si) ¿Qué pasa con los recursos si borras un stack sin DeletionPolicy Retain?
- (comparar) Compara Elastic Beanstalk y CloudFormation: ¿cuánto controlas en cada uno?
- (aplicar) Tienes que desplegar la misma plantilla en 20 cuentas y 3 Regiones: ¿cómo lo haces?
- (que-pasa-si) ¿Qué pasa si alguien cambia a mano un security group que creó CloudFormation?
- (comparar) Compara Session Manager de Systems Manager con un bastion SSH para entrar en instancias privadas.
