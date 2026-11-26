# Subtema: Estado de la UI y datos del servidor [frontend-semi-senior/estado-y-datos-del-servidor]
Distinguir estado local, compartido y datos del servidor; caché, revalidación, estados de carga y por qué no meterlo todo en un store global.

## Estado de la UI y datos del servidor

No todo "estado" es igual. Mezclarlo es la causa de muchas aplicaciones difíciles de mantener.

### Tipos de estado
- **Local de UI**: un menú abierto, el texto de un input. Vive en el componente (`useState`).
- **Compartido de UI**: tema, usuario actual, carrito. Context o un store pequeño.
- **De la URL**: filtros, página, pestaña. Ponerlo en la URL hace que se pueda **compartir y recargar**.
- **Datos del servidor**: pedidos, productos. No son tuyos: son una **copia en caché** de algo que vive en el servidor y puede cambiar.

### Datos del servidor necesitan otra cosa
Una caché de datos del servidor necesita: **deduplicar** peticiones iguales, **cachear** por clave, saber si está **obsoleto** y **revalidar** (al volver a la pestaña, cada X tiempo), reintentos, paginación, **invalidar** tras una mutación y actualizaciones **optimistas**. Librerías como TanStack Query o SWR (y los mecanismos de frameworks como Next o Remix) resuelven esto. Meter las respuestas en un store global "a mano" obliga a reinventarlo, mal.

### Mutaciones
Tras crear o editar algo: **invalida** las consultas afectadas para que se recarguen, o actualiza la caché. La **actualización optimista** muestra el cambio al instante y lo revierte si el servidor falla: buena experiencia, más complejidad.

### Estados de carga
Distingue **primera carga** (esqueleto) de **revalidación** (mostrar datos viejos mientras llegan los nuevos). Ocultar los datos en cada revalidación hace parpadear la interfaz.

### Regla práctica
Empieza con estado **local** y súbelo solo cuando haga falta. Datos del servidor → librería de datos del servidor. Store global → solo para estado de cliente verdaderamente global.

## Glosario usado
- Context: Mecanismo de React para pasar datos a muchos componentes sin pasarlos por props nivel a nivel.
- Datos del servidor: Copia en caché de datos que viven en el servidor: necesita revalidación, invalidación y deduplicación.
- Revalidación: Volver a pedir datos cacheados para comprobar si cambiaron, mostrando mientras tanto los anteriores.
- Actualización optimista: Mostrar el resultado de una acción antes de que el servidor confirme, revirtiendo si falla.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué los datos del servidor no deberían tratarse como estado de cliente normal?
- (comparar) Compara poner el filtro en useState o en la URL.
- (aplicar) Tras crear un pedido, la lista no muestra el nuevo. ¿Qué falta?
- (que-pasa-si) ¿Qué pasa si ocultas los datos con un spinner en cada revalidación?
- (aplicar) ¿Cuándo sí tiene sentido un store global?
- (error-comun) Error común: copiar en useEffect la respuesta de la API a un store global.

## Herramientas del curso en este subtema
- decision: ¿Dónde debería vivir este estado? — Asistente para decidir entre estado local, padre común, URL, librería de datos del servidor o store global.
