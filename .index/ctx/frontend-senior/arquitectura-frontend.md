# Subtema: Arquitectura frontend a escala [frontend-senior/arquitectura-frontend]
Organizar por dominio, límites entre módulos, monorepos, contratos y cuándo (casi nunca) compensan los microfrontends.

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

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- HTTP: Protocolo de petición-respuesta de la web: el cliente envía un método (GET, POST…) a una URL y el servidor responde con un código de estado y un cuerpo.
- CI: Integración continua: cada cambio se construye y se prueba automáticamente en un servidor antes de integrarlo.
- Conflicto: Situación en la que dos ramas cambian las mismas líneas y Git necesita que una persona decida el resultado.
- zod: Librería para declarar esquemas que validan datos en ejecución y de los que se deriva el tipo de TypeScript.
- Monolito modular: Una sola aplicación desplegable organizada en módulos con límites y APIs internas claras.
- Microfrontends: Dividir una aplicación frontend en partes desplegables por separado por equipos distintos.
- Design system: Conjunto de tokens, componentes, patrones y documentación que hace consistente la interfaz de un producto.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué organizar por dominio y no por tipo técnico?
- (que-pasa-si) ¿Qué pasa si cualquier módulo puede importar los internos de otro?
- (comparar) Compara un monolito modular con microfrontends.
- (aplicar) ¿Cómo detectas antes del despliegue que la API cambió un campo?
- (por-que) ¿Por qué un monorepo necesita CI que construya «solo lo afectado»?
- (error-comun) Error común: adoptar microfrontends con un solo equipo para «estar preparados».
