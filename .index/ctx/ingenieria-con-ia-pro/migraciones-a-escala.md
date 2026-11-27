# Subtema: Migraciones a escala con LLM (caso Google) [ingenieria-con-ia-pro/migraciones-a-escala]
Cómo Google migra miles de archivos con LLM: buscar los sitios, generar cambios, validar con build y tests, y revisión humana; qué porcentaje hizo el modelo.

## Migraciones a escala con LLM (caso Google)

Google ha publicado cómo usa LLM para **migraciones de código** en su monorepo (arXiv 2501.06972 y 2504.09691, FSE 2025). Es uno de los casos industriales mejor documentados.

### Qué migraron
Cambios mecánicos pero enormes: identificadores de 32 a 64 bits, **JUnit3 → JUnit4**, Joda-Time → java.time, limpieza de flags experimentales. En su estudio de **39 migraciones** de 3 desarrolladores durante 12 meses, el LLM generó el **74,45 %** de los cambios de código y el **69,46 %** de las ediciones. La migración de JUnit (5.359 archivos, 149.000 líneas) se hizo en **3 meses**, con una estimación de la **mitad** de tiempo, incluso revisándolo todo.

### Cómo lo hacen (el patrón)
1. **Encontrar** los sitios a cambiar con herramientas deterministas (búsqueda en el código, análisis estático), no con el LLM.
2. **Generar** el cambio con el LLM, archivo a archivo, con el contexto relevante.
3. **Validar** automáticamente: compila, pasan los tests, cumple los linters. Si falla, reintentar con el error.
4. **Revisión humana** de los cambios antes de integrarlos, en lotes manejables.

### La lección principal
Los propios autores afirman que **un LLM con prompts simples no basta** salvo para las migraciones más triviales. El valor está en el **pipeline**: descubrimiento determinista + generación + verificación automática + revisión. El LLM es una pieza, no el sistema.

### Cómo aplicarlo en tu equipo
Para migraciones (actualizar un framework, cambiar una API interna): escribe un script que **liste** los sitios, pide al agente que migre en **lotes** pequeños, ejecuta build y tests en cada lote y revisa PR por lote. Mide cuánto del cambio necesitó corrección humana.

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Monorepo: Un único repositorio que contiene muchos proyectos o servicios de una organización.
- Migración de código: Cambio sistemático de muchos archivos para adoptar otra API, librería o versión.
- Linter: Herramienta que analiza el código sin ejecutarlo para detectar errores y malas prácticas de estilo.
- Análisis estático: Examinar el código sin ejecutarlo (tipos, flujos, patrones) para encontrar errores o vulnerabilidades.

## Preguntas sugeridas al alumno
- (aplicar) ¿Qué parte del trabajo hizo el LLM en las migraciones de Google y qué parte no?
- (por-que) ¿Por qué los autores dicen que prompts simples no bastan para migraciones?
- (comparar) Compara descubrir los sitios a migrar con un LLM o con herramientas deterministas.
- (aplicar) Planifica migrar 400 archivos de una API interna antigua a la nueva.
- (que-pasa-si) ¿Qué pasa si migras todo en un único PR gigante?
- (error-comun) Error común: tomar el «50 % menos de tiempo» de Google como la ganancia esperada para cualquier tarea.
