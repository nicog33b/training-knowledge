# training-knowledge

Base para muchos sistemas de aprendizaje (certificaciones, temas de frameworks, etc.) con glosario compartido.

```bash
pnpm install
pnpm tk new module aws-dva --title "AWS Developer Associate" --summary "..." --kind certification
pnpm tk new topic aws-dva lambda --title "Lambda" --summary "Funciones serverless"
pnpm tk glossary add aws-dva "Cold start" --def "Latencia extra al iniciar una instancia nueva."
pnpm tk lab import aws-dva lab.yaml            # preguntas sugeridas + simulaciones
pnpm tk ask aws-saa sqs "¿por qué se duplican mensajes?" --dry   # ver el prompt del tutor
pnpm tk ask aws-saa sqs "¿y con FIFO?" --provider openai          # mismo tutor con ChatGPT
pnpm tk gasto                   # cuánto llevamos gastado en IA, por modelo (también en el header)
pnpm dev        # web (glosario, laboratorio) + chat flotante; claves de Claude/ChatGPT/… en .env (ver .env.example)
pnpm dev:fake   # igual, con el tutor en modo prueba (no gasta API)
pnpm test
```

Ver [CLAUDE.md](CLAUDE.md) para el protocolo de contexto y la arquitectura.

- `research/` — evidencia que respalda cada decisión de diseño (fuentes con datos y límites + decisiones razonadas).
- `tasks.md` — registro de avance y pendientes.
