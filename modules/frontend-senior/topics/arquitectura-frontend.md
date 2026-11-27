---
title: Arquitectura frontend a escala
summary: Organizar por dominio, límites entre módulos, monorepos, contratos y
  cuándo (casi nunca) compensan los microfrontends.
order: 2
section: arquitectura
status: done
requires: []
---

## Arquitectura frontend a escala

Con 5 personas cualquier estructura funciona; con 50 y tres años de historia, la arquitectura decide si el equipo avanza o se pisa.

### Organizar por dominio
Agrupa por **funcionalidad de negocio** (`checkout/`, `catalogo/`, `cuenta/`) más que por tipo técnico (`components/`, `hooks/`, `utils/`). Cada dominio contiene sus componentes, estado, llamadas a API y tests. Lo verdaderamente compartido (design system, utilidades, cliente HTTP) vive en paquetes comunes.

### Límites explícitos
- Cada módulo expone una **API pública** (un `index`) y oculta su interior.
- Reglas de dependencia **comprobadas por herramientas** (linters de imports, reglas del monorepo): `checkout` puede usar `design-system`, pero no los internos de `cuenta`.
- Dependencias en **una sola dirección**: los paquetes base no importan de las features.

### Monorepos
Un **monorepo** con herramientas de workspaces (pnpm, Nx, Turborepo) permite compartir código con versionado sencillo, cambios atómicos entre paquetes y CI que solo construye y prueba **lo afectado**. Costo: herramientas y disciplina de límites.

### Contratos
Tipos generados desde el esquema de la API (OpenAPI, GraphQL) o esquemas compartidos (zod): el frontend se entera **al compilar** de que la API cambió.

### Microfrontends
Dividir la app en partes **desplegables por separado** por equipos distintos. Resuelven un problema **organizativo** (muchos equipos autónomos que no pueden coordinar despliegues), no técnico. Costos: duplicación de dependencias, consistencia visual, rendimiento, enrutado y estado compartido. Con pocos equipos, un **monolito modular** bien delimitado suele ser mejor.

### Señales de que la arquitectura falla
Cambios pequeños que tocan muchos módulos, miedo a borrar código, builds lentas para todos y conflictos constantes entre equipos.
