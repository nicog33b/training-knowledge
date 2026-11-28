---
title: Estado de la UI y datos del servidor
summary: Distinguir estado local, compartido y datos del servidor; caché,
  revalidación, estados de carga y por qué no meterlo todo en un store global.
order: 4
section: datos-y-calidad
status: done
requires: []
---

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
