# Subtema: Cómo funciona un agente de código [ingenieria-con-ia-pro/como-funciona-un-agente-de-codigo]
El bucle leer-pensar-actuar-verificar, las herramientas (leer, buscar, editar, ejecutar), el contexto que consume y por qué falla.

## Cómo funciona un agente de código

Un **agente de código** (Claude Code, Copilot en modo agente, Codex, Cursor…) es un LLM en un **bucle** con **herramientas** sobre tu repositorio. Entenderlo evita esperar magia y explica sus fallos.

### El bucle
1. **Leer** la petición y el contexto inicial (instrucciones del repo, archivos abiertos).
2. **Explorar**: buscar archivos, leerlos, listar directorios (herramientas de lectura y búsqueda).
3. **Actuar**: editar archivos, ejecutar comandos (tests, build, linter).
4. **Observar** el resultado (salida de los tests, errores de compilación) y decidir el siguiente paso.
5. Repetir hasta cumplir el objetivo, quedarse sin ideas o llegar a un **límite**.

### El contexto es el recurso escaso
Todo lo que el agente lee, ejecuta y escribe **ocupa contexto**: archivos largos, salidas de tests verbosas, historiales de error. Con el contexto lleno el agente **olvida** instrucciones iniciales, repite intentos y degrada (*context rot*). Por eso importan las sesiones **cortas y enfocadas**, los resúmenes y delegar exploraciones a **subagentes**.

### Por qué falla
- **Falta de contexto implícito**: convenciones del equipo, decisiones históricas, "esto no se toca porque…". Si no está escrito, no lo sabe.
- **Verificación débil**: si no hay tests o no puede ejecutarlos, "termina" cuando el código **parece** correcto.
- **Objetivo ambiguo**: hace algo razonable que no era lo que querías.
- **Atajos**: para poner los tests en verde puede **modificar los tests** o hacer casos especiales.

### La consecuencia práctica
El trabajo del ingeniero se desplaza a **especificar** (qué y por qué), **curar el contexto** y **diseñar la verificación**. El agente es rápido produciendo; tú eres responsable de que lo producido sea correcto.

## Glosario usado
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Repositorio: Carpeta de un proyecto bajo control de versiones (normalmente Git) con todo su historial de cambios.
- Context rot: Pérdida de precisión del modelo para usar información concreta a medida que el contexto crece.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Agente de código: LLM en un bucle con herramientas sobre un repositorio: lee, busca, edita archivos y ejecuta comandos hasta cumplir una tarea.
- Subagente: Agente lanzado por otro para una subtarea con su propio contexto; devuelve solo la conclusión.
- Linter: Herramienta que analiza el código sin ejecutarlo para detectar errores y malas prácticas de estilo.

## Preguntas sugeridas al alumno
- (aplicar) Describe el bucle de un agente de código.
- (por-que) ¿Por qué una sesión muy larga de agente empeora con el tiempo?
- (que-pasa-si) ¿Qué pasa si el agente no puede ejecutar los tests del proyecto?
- (comparar) Compara un fallo por falta de contexto y uno por objetivo ambiguo.
- (por-que) ¿Por qué un agente puede modificar los tests para «terminar»?
- (error-comun) Error común: «el agente es lento, mejor le doy todo el repositorio en el prompt».
