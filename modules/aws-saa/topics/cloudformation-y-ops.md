---
title: CloudFormation y operaciones
summary: IaC con CloudFormation, CDK, Elastic Beanstalk, Systems Manager, OpsWorks.
order: 38
section: otros
status: done
requires: []
---

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
