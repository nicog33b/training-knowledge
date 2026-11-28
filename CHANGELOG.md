# Changelog

Cambios visibles de la plataforma y los cursos. El detalle de tareas está en `tasks.md`; el porqué de cada decisión, en `research/decisions/`.

## 2026-11-26 — Plataforma de estudio y 6 cursos nuevos

### Nuevo
- **Herramientas por curso** con constructores comunes (`calculadora`, `decision`, `checklist`, `comparador`, `plantilla`): cada curso declara las suyas en `modules/<id>/tools/*.yaml`; `pnpm tk tool list|new|import`. 20 herramientas en los cursos nuevos y 4 en AWS e inglés.
- **Estudiar como…** en cada subtema de cualquier curso: esquema, mapa (Mermaid) + «Haz tu mapa», tarjetas, completar huecos, «Explícalo» y pregunta previa. Mapa del curso en `/<curso>/mapa/`.
- **Repaso espaciado** (`/<curso>/repaso/`) y **tarjetas** (`/<curso>/tarjetas/`) alimentados por las marcas del lab y las tarjetas propias.
- **Rutas de aprendizaje** (`paths/*.yaml`, `/rutas/`) y nivel por curso.
- **Entrar, registro y perfil** (vista previa sin servidor; los datos quedan en el navegador).
- **Cursos**: IA dentro de aplicaciones, RAG, Ingeniería de software con IA · nivel pro, Frontend Junior, Semi Senior y Senior (60 subtemas, 360 preguntas, 12 simulaciones).

### Mejorado
- **Accesibilidad**: panel con perfiles (Dislexia, Baja visión, Concentración), ancho de línea, alto contraste, modo foco, reducir movimiento, glosario discreto, interfaz grande y lectura en voz alta. Sin filtros de color ni «lectura biónica» (sin evidencia).
- **Menú de selección**: barra minimalista con iconos, definición del glosario, crear tarjeta, escuchar, copiar con fuente y «Hazlo diagrama».
- **Chat**: dibuja diagramas Mermaid.
- **Evidencia**: 19 fuentes y 6 decisiones nuevas en `research/`.

### Corregido
- Los tooltips del glosario ensanchaban la página en móvil (scroll horizontal).
