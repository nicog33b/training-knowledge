# Subtema: Efectos: sincronizar con el exterior [frontend-semi-senior/efectos-y-sincronizacion]
useEffect sirve para sincronizar con sistemas externos, no para derivar datos; dependencias, limpieza y cuándo no necesitas un efecto.

## Efectos: sincronizar con el exterior

`useEffect` sirve para **sincronizar** un componente con algo **externo a React**: una suscripción, un temporizador, un widget no-React, una conexión. No es "código que se ejecuta después de renderizar para lo que sea".

### Anatomía
```js
useEffect(() => {
  const conexion = crearConexion(salaId);
  conexion.conectar();
  return () => conexion.desconectar(); // limpieza
}, [salaId]); // dependencias
```
- Se ejecuta tras el render cuando cambian sus **dependencias**.
- La **limpieza** se ejecuta antes del siguiente efecto y al desmontar. En desarrollo, React monta-desmonta-monta para **revelar** efectos sin limpieza.
- Las dependencias deben incluir **todo** lo reactivo que el efecto usa. Mentir al array (omitir algo) produce valores **viejos** (closures obsoletas).

### Cuándo NO necesitas un efecto
- **Derivar datos**: `const filtrados = items.filter(...)` al renderizar, no un efecto que copia a otro estado.
- **Responder a un evento**: la lógica de "al hacer clic en comprar" va en el **manejador**, no en un efecto que vigila un estado.
- **Resetear estado** al cambiar una prop: usa una `key` distinta en el componente.
- **Cargar datos**: posible con efecto (con cancelación y manejo de carreras), pero mejor una librería de datos del servidor o lo que ofrezca tu framework.

### Carreras al cargar datos
Si el usuario cambia rápido de filtro, una respuesta antigua puede llegar después de la nueva. Ignórala en la limpieza (bandera `ignorar = true`) o cancela con `AbortController`.

### Señal de alarma
Un efecto que actualiza un estado que es dependencia de otro efecto que actualiza otro estado… es una **cadena de efectos**: renders extra y bugs difíciles. Casi siempre se puede calcular durante el render o en el manejador del evento.

## Glosario usado
- React: Librería para construir interfaces como funciones del estado, con componentes y reconciliación del DOM.
- Props: Datos de solo lectura que un componente recibe de su padre.
- useEffect: Hook de React para sincronizar un componente con un sistema externo, con dependencias y función de limpieza.
- Closure obsoleta: Función que recuerda un valor antiguo porque se creó en un render anterior (típico al omitir dependencias).
- Datos del servidor: Copia en caché de datos que viven en el servidor: necesita revalidación, invalidación y deduplicación.

## Preguntas sugeridas al alumno
- (por-que) ¿Para qué sirve realmente useEffect?
- (que-pasa-si) ¿Qué pasa si omites una dependencia que el efecto usa?
- (comparar) Compara filtrar una lista con un efecto + estado o al renderizar.
- (aplicar) Al hacer clic en «Comprar» hay que enviar un evento de analítica. ¿Efecto o manejador?
- (por-que) ¿Por qué React monta, desmonta y vuelve a montar en desarrollo?
- (error-comun) Error común: cadenas de efectos que actualizan estados que disparan otros efectos.
