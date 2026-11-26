# Subtema: Revisar código generado por IA [ingenieria-con-ia-pro/revisar-codigo-generado]
Qué mirar en un PR de un agente: seguridad, dependencias inventadas, tests débiles, duplicación y mantenibilidad; la responsabilidad sigue siendo humana.

## Revisar código generado por IA

El código generado **llega más rápido** que la capacidad de revisarlo. La responsabilidad sigue siendo de quien lo integra: "lo escribió la IA" no es una explicación válida en un incidente.

### Qué mirar especialmente
- **Seguridad**: validación de entradas, inyecciones (SQL, comandos, XSS), secretos en el código, permisos excesivos, criptografía casera. Los modelos reproducen patrones inseguros frecuentes en su entrenamiento.
- **Dependencias**: ¿existe ese paquete y es el que crees? Los modelos a veces **inventan nombres de paquetes**; un atacante puede registrar ese nombre con código malicioso (*slopsquatting*). Verifica cada dependencia nueva.
- **APIs inventadas o antiguas**: métodos que no existen o versiones obsoletas.
- **Tests**: ¿prueban comportamiento real o se limitan a no fallar? ¿Se modificaron tests existentes?
- **Duplicación**: el agente reescribe lo que ya existía en otro módulo en vez de reutilizarlo.
- **Alcance**: cambios que nadie pidió ("aproveché para refactorizar…").
- **Mantenibilidad**: nombres, complejidad, coherencia con las convenciones del repo.

### Cómo revisar a escala
- **PR pequeños** con descripción del porqué y de cómo se verificó.
- Automatiza lo mecánico (linters, análisis estático, escáner de dependencias y secretos) y dedica la revisión humana al **diseño** y la **lógica**.
- Una **segunda IA** puede revisar (Google, Microsoft y otros usan revisión asistida por ML), pero como apoyo: no sustituye la aprobación humana.
- Pide al autor (humano o agente) que **explique** decisiones no obvias en el PR.

### Señal de alarma
Si nadie del equipo puede explicar un trozo de código, no está revisado: está aceptado.

## Glosario usado
- Repositorio: Carpeta de un proyecto bajo control de versiones (normalmente Git) con todo su historial de cambios.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Slopsquatting: Ataque que registra nombres de paquetes que los modelos de IA inventan, para que quien instale la sugerencia descargue código malicioso.
- Linter: Herramienta que analiza el código sin ejecutarlo para detectar errores y malas prácticas de estilo.
- Análisis estático: Examinar el código sin ejecutarlo (tipos, flujos, patrones) para encontrar errores o vulnerabilidades.

## Preguntas sugeridas al alumno
- (aplicar) ¿Qué es el slopsquatting y cómo te proteges?
- (por-que) ¿Por qué el código generado necesita una revisión de seguridad específica?
- (comparar) Compara la revisión automatizada y la humana de un PR generado.
- (que-pasa-si) ¿Qué pasa si el agente «aprovecha» para refactorizar archivos que no tenían que ver?
- (por-que) ¿Por qué nadie del equipo debería integrar código que no sabe explicar?
- (error-comun) Error común: aprobar un PR del agente porque «los tests pasan».

## Herramientas del curso en este subtema
- checklist: Checklist de revisión de un PR generado por IA — Lo que hay que mirar especialmente cuando el código lo escribió un agente.
