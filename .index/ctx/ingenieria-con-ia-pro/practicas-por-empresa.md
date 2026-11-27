# Subtema: Qué hacen Google, Microsoft, Anthropic y SpaceX [ingenieria-con-ia-pro/practicas-por-empresa]
Lo publicado por cada empresa sobre trabajar con IA, con su fuente y su límite; y lo que NO se sabe (SpaceX solo tiene ofertas de empleo públicas).

## Qué hacen Google, Microsoft, Anthropic y SpaceX

Lo que **publican** las empresas sobre cómo trabajan con IA, con su fuente y su límite. Regla del curso: si no hay fuente pública, se dice.

### Google
- **Migraciones con LLM** en su monorepo: pipeline de descubrimiento determinista + generación + validación automática + revisión humana; ~74 % de los cambios generados por el modelo en 39 migraciones (FSE 2025).
- **DORA**: su programa de investigación sobre entrega de software; el informe 2025 describe la IA como **amplificador** y propone un modelo de 7 capacidades para aprovecharla.
- Límite: estudios de caso internos, sin grupo de control.

### Microsoft
- **Ensayo controlado de Copilot** (Microsoft Research y GitHub, 2023): 55,8 % más rápido en una tarea nueva y acotada.
- **Pautas de interacción humano-IA** (Amershi et al., CHI 2019): 18 pautas para diseñar sistemas con IA (dejar claro qué puede hacer, permitir corregir, pedir feedback, avisar de cambios).
- Límite: el ensayo es una tarea única y pequeña; no predice el efecto en bases de código grandes.

### Anthropic
- **Building effective agents** (2024): workflows antes que agentes, empezar simple, patrones de orquestación.
- **Context engineering** (2025): contexto mínimo de alta señal, recuperación justo a tiempo.
- **MCP** (2024): estándar abierto para conectar herramientas y datos.
- Límite: guías de un proveedor, basadas en su experiencia con clientes.

### SpaceX
No hay publicaciones de SpaceX sobre su metodología de ingeniería con IA. Lo público son **ofertas de empleo** que describen: una plataforma interna para que los ingenieros **escriban código más rápido** con IA mediante gateways seguros, **revisión de código y automatización de PR con IA**, **guardarraíles** de seguridad, y en ingeniería de vehículos, IA para acelerar desarrollo y pruebas de software, diseño de aviónica y revisión de datos de vuelo, con modelos internos, RAG y herramientas agénticas. Es una señal de **intención**, no de práctica verificada. Desconfía de cursos que afirman conocer "el método SpaceX".

### Lo común
Contexto curado, verificación automática, revisión humana, seguridad por diseño y **medir** el efecto. Ninguna empresa seria publica "deja que la IA lo haga sola".

## Glosario usado
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Agente: Sistema en el que el LLM decide en bucle el siguiente paso y qué herramientas usar hasta cumplir el objetivo.
- Workflow: Sistema donde LLM y herramientas siguen caminos predefinidos en el código (encadenar, enrutar, paralelizar…).
- MCP: Model Context Protocol: estándar abierto (2024) para que apps de IA usen herramientas, recursos y prompts expuestos por servidores.
- Guardarraíl: Control que limita lo que un sistema de IA puede hacer o decir: validaciones, filtros, topes, confirmaciones.
- RAG: Recuperar fragmentos relevantes de una base de documentos y dárselos al modelo como contexto para responder.
- Context engineering: Curar el conjunto mínimo de información de alta señal que el modelo necesita en cada momento: qué se carga siempre, qué bajo demanda y qué nunca.
- Monorepo: Un único repositorio que contiene muchos proyectos o servicios de una organización.
- DORA: Programa de investigación (Google) y sus métricas de entrega: frecuencia de despliegue, tiempo de entrega, tasa de fallos y tiempo de recuperación.
- Ensayo controlado aleatorizado: Experimento que asigna al azar quién recibe el tratamiento (p. ej. usar IA) para medir su efecto causal.
- Migración de código: Cambio sistemático de muchos archivos para adoptar otra API, librería o versión.

## Preguntas sugeridas al alumno
- (aplicar) ¿Qué se sabe públicamente de cómo SpaceX trabaja con IA en software?
- (comparar) Compara lo que aportan las publicaciones de Google, Microsoft y Anthropic.
- (por-que) ¿Por qué desconfiar de un curso que enseña «el método SpaceX para programar con IA»?
- (por-que) ¿Qué tienen en común las prácticas que sí están documentadas?
- (que-pasa-si) ¿Qué pasa si aplicas en tu startup el pipeline de migraciones de Google tal cual?
- (error-comun) Error común: citar «la IA ya escribe la mayoría del código en las grandes empresas» como objetivo para tu equipo.
