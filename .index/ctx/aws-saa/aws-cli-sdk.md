# Subtema: AWS CLI y SDK [aws-saa/aws-cli-sdk]
Cómo interactuar con AWS por línea de comandos y código: credenciales, perfiles, CloudShell y buenas prácticas.

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

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Región: Ubicación geográfica de AWS compuesta por varias Zonas de Disponibilidad aisladas.
- MFA: Segundo factor de autenticación (app, llave FIDO, token hardware) además de la contraseña.
- Access Key: Par Access Key ID + Secret Access Key que firma peticiones a la API de AWS desde CLI/SDK.
- Credential Report: CSV a nivel de cuenta con el estado de las credenciales (contraseñas, claves, MFA) de todos los usuarios IAM.
- AWS CLI: Herramienta de línea de comandos para llamar a la API de AWS, configurada con aws configure.
- SDK: Biblioteca por lenguaje (boto3, JS, Java…) para llamar a la API de AWS desde código.
- CloudShell: Terminal gratuita en el navegador con la CLI preinstalada y las credenciales de la sesión de consola.
- Exponential backoff: Estrategia de reintentos que duplica la espera entre intentos para no saturar el servicio.
- EC2: Servicio de máquinas virtuales (IaaS) bajo demanda de AWS.
- Contenedor: Paquete aislado de aplicación y dependencias que comparte el kernel del host.
- Throttling: Limitación de la tasa de peticiones; el exceso se rechaza (HTTP 429).
- AWS Config: Registra la configuración de recursos y evalúa su cumplimiento con reglas.
- IAM Identity Center: Inicio de sesión único para varias cuentas AWS y apps, con permission sets e IdPs externos.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué CloudShell no necesita que configures credenciales?
- (que-pasa-si) ¿Qué pasa si subes a un repositorio público el archivo ~/.aws/credentials?
- (aplicar) ¿Cómo elegirías un perfil distinto para cada cuenta desde la CLI?
- (comparar) Compara la CLI y los SDK: ¿cuándo usas cada uno?
- (por-que) ¿Por qué una app en EC2 con rol puede acabar usando otras credenciales que las del rol?
- (aplicar) ¿Cómo compruebas si tienes permiso para lanzar una instancia sin lanzarla de verdad?
