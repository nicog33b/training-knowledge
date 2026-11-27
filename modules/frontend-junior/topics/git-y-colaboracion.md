---
title: Git y colaboración
summary: Commits pequeños con buenos mensajes, ramas, pull requests, resolver
  conflictos y revisar código de otros.
order: 9
section: oficio
status: done
requires: []
---

## Git y colaboración

**Git** guarda la historia del proyecto como una serie de **commits** (fotos del código con autor, fecha y mensaje). Saber usarlo bien es lo que más se nota de un junior en un equipo.

### Commits
- **Pequeños y con un solo propósito**: más fáciles de revisar, revertir y entender.
- **Mensaje** que explique el **porqué**, no solo el qué: "Corrige el doble envío del formulario de pago al pulsar Enter" mejor que "fix".
- `git status` y `git diff` antes de cada commit: no subas archivos que no tocaste, secretos ni archivos generados.

### Ramas y pull requests
- Trabaja en una **rama** por tarea a partir de la principal actualizada.
- Abre un **pull request** pronto (aunque sea borrador) con descripción: qué, por qué, cómo probarlo, capturas si hay interfaz.
- **Integra** a menudo la rama principal en la tuya para que los conflictos sean pequeños.

### Conflictos
Ocurren cuando dos ramas cambian las mismas líneas. Git marca ambas versiones; tú decides el resultado **entendiendo** los dos cambios (habla con quien hizo el otro si dudas), y luego compilas y pruebas. Nunca resuelvas quedándote con "lo mío" por defecto.

### Revisar y ser revisado
- Al pedir revisión: PR pequeño, contexto claro, tests incluidos, sin cambios no relacionados.
- Al recibir comentarios: no es personal; pregunta lo que no entiendas y responde a cada punto.
- Al revisar: busca errores de lógica, casos límite, claridad y tests; sé concreto y amable ("¿qué pasa si la lista está vacía?").

### Comandos que te salvan
`git restore` (descartar cambios locales), `git stash` (guardar temporalmente), `git log --oneline`, `git revert` (deshacer un commit ya compartido creando otro). Evita reescribir la historia de ramas compartidas.
