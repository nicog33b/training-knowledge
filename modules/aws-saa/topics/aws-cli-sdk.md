---
title: AWS CLI y SDK
summary: "Cómo interactuar con AWS por línea de comandos y código: credenciales,
  perfiles, CloudShell y buenas prácticas."
order: 3
section: fundamentos
status: done
requires: []
---

## AWS CLI, SDK y CloudShell

Hay tres formas de acceder a AWS: la **Consola de administración** (web, protegida por contraseña + MFA), la **CLI** y los **SDK**; las dos últimas se protegen con **access keys** (Access Key ID + Secret Access Key), que tratas como una contraseña.

### AWS CLI
Herramienta de línea de comandos que llama a la API pública de AWS. Se configura con `aws configure` (key, secret, Región por defecto, formato de salida) y guarda en `~/.aws/credentials` y `~/.aws/config`.

```bash
aws configure --profile dev
aws s3 ls --profile dev
aws sts get-caller-identity   # ¿quién soy?
```

- **Perfiles** con nombre para varias cuentas/roles.
- **Orden de credenciales**: opciones de línea de comandos → variables de entorno → archivo de credenciales → config → credenciales de contenedor → **rol de la instancia EC2** (perfil de instancia).
- **MFA con CLI**: `aws sts get-session-token` devuelve credenciales temporales.

### SDK
Bibliotecas por lenguaje (JavaScript, Python/boto3, Java, Go…) para llamar a la API desde código. Si no defines Región, usa `us-east-1` por defecto. Dentro de AWS el SDK recoge automáticamente credenciales del rol asignado.

### CloudShell
Terminal en el navegador, gratuita, con la CLI preinstalada y las credenciales de tu sesión de consola; 1 GB de almacenamiento persistente por Región.

### Buenas prácticas
- Nunca guardes claves en el código ni en repositorios.
- En AWS usa **roles**; fuera de AWS considera IAM Identity Center o credenciales temporales.
- Rota las access keys y desactiva las no usadas (Credential Report).
- Para reintentos, el SDK implementa **exponential backoff** ante errores 5xx y de throttling.
