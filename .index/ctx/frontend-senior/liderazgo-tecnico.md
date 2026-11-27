# Subtema: Liderazgo técnico sin cargo [frontend-senior/liderazgo-tecnico]
Revisiones de código que enseñan, mentoría, estimación con incertidumbre, deuda técnica negociada y hacer crecer al equipo.

## Liderazgo técnico sin cargo

Ser senior no es solo entregar más código: es hacer que el **equipo** entregue mejor. Gran parte de ese trabajo no tiene cargo formal.

### Revisiones de código que enseñan
- Prioriza **lógica, diseño y riesgos** sobre estilo (que lo resuelva el linter).
- Explica el **porqué** y distingue lo obligatorio de la sugerencia ("nit:", "opcional:").
- Haz preguntas en vez de órdenes cuando el autor puede descubrirlo ("¿qué pasa si la lista llega vacía?").
- Revisa **pronto**: un PR esperando dos días bloquea a alguien.
- Reconoce lo bueno; el feedback solo negativo enseña a esconder.

### Mentoría
Empareja en tareas reales, deja que la otra persona **conduzca** y tú guíes, y ajusta la ayuda al nivel: ejemplos resueltos para quien empieza, problemas abiertos para quien ya sabe (y retira el andamiaje a medida que crece).

### Estimar con incertidumbre
Las estimaciones son **rangos con supuestos**, no promesas: "3–6 días si la API ya existe; si no, más". Divide en partes pequeñas, identifica las **incógnitas** y reduce la mayor primero (spike, prototipo). Comunica pronto cuando la realidad cambia.

### Deuda técnica
Hazla **visible** y conéctala con el negocio: "este módulo provoca el 40 % de nuestros bugs" convence más que "el código es feo". Negocia un porcentaje continuo de capacidad o mejoras ligadas a features que tocan esa zona.

### Multiplicar
Documenta decisiones, automatiza tareas repetitivas, escribe guías y plantillas, mejora el onboarding. Si el equipo depende de ti para todo, aún no has terminado tu trabajo de senior.

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- PR: Pull request: propuesta de cambio de código que otros revisan y prueban antes de integrarla a la rama principal.
- Promesa: Objeto que representa un valor futuro: pendiente, cumplida con un valor o rechazada con un error.
- Deuda técnica: Costo futuro de atajos o diseños que ya no encajan; se paga en lentitud y bugs hasta que se corrige.
- Spike: Investigación o prototipo acotado en el tiempo para reducir una incógnita antes de estimar o decidir.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué marcar los comentarios de revisión como «nit» u «opcional»?
- (aplicar) Da una estimación para una feature con una API que aún no existe.
- (comparar) Compara mentorizar dando la solución y guiando con preguntas.
- (que-pasa-si) ¿Qué pasa si presentas la deuda técnica como «el código es feo»?
- (por-que) ¿Por qué revisar PR pronto es parte del trabajo senior?
- (error-comun) Error común: ser el único que sabe cómo funciona una parte crítica.
