# Subtema: Observabilidad en el frontend [frontend-senior/observabilidad-frontend]
Errores con contexto y source maps, RUM, logs de eventos, feature flags y lanzamientos graduales para detectar y revertir problemas rápido.

## Observabilidad en el frontend

Cuando algo falla en producción, el frontend es una **caja negra** que corre en miles de dispositivos distintos. La observabilidad es poder responder "¿qué les pasa a los usuarios ahora?" sin reproducirlo en tu máquina.

### Errores
- Captura de **errores no controlados** y promesas rechazadas, con **source maps** para ver el código original.
- **Contexto**: versión desplegada, ruta, navegador, acciones previas (*breadcrumbs*), id de usuario anonimizado y feature flags activas.
- Agrupación y alertas por **tasa** (errores por sesión), no por cada error suelto.
- Error boundaries en la UI: que un componente roto no tumbe la página entera y quede registrado.

### Rendimiento y comportamiento
- **RUM** de Core Web Vitals por página y release.
- Eventos de producto clave (embudo de compra, uso de features) para detectar caídas que no lanzan errores ("el botón funciona pero nadie completa el pago").
- Correlación con el backend mediante un **id de traza** en las peticiones.

### Lanzar con red
- **Feature flags**: desplegar código apagado y encenderlo para un porcentaje de usuarios.
- **Despliegue gradual** (1 % → 10 % → 100 %) vigilando errores y métricas; **revertir** rápido apagando el flag o volviendo a la versión anterior.
- Compatibilidad entre versiones: un usuario con la pestaña abierta puede tener el **JS viejo** contra la API nueva.

### Privacidad
No registres datos personales ni contenido de formularios; enmascara en grabaciones de sesión; cumple la normativa y el consentimiento.

### Lo que cambia ser senior
No solo arreglas el bug: preguntas por qué no se detectó antes y añades la **alerta**, el **test** o el **dashboard** que lo habría detectado.

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Promesa: Objeto que representa un valor futuro: pendiente, cumplida con un valor o rechazada con un error.
- Source map: Archivo que relaciona el código generado con el original para depurar y leer errores.
- Core Web Vitals: Métricas de experiencia de Google: LCP (carga), INP (respuesta) y CLS (estabilidad), medidas en campo al percentil 75.
- RUM: Medición del rendimiento y los errores en los navegadores de usuarios reales.
- Error boundary: Componente que captura errores de sus hijos al renderizar y muestra una alternativa en lugar de romper toda la página.
- Breadcrumbs: Registro de las acciones previas del usuario que acompaña a un informe de error.
- Feature flag: Interruptor que activa o desactiva una funcionalidad en producción sin desplegar código.
- Despliegue gradual: Activar un cambio para un porcentaje creciente de usuarios vigilando métricas para revertir a tiempo.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué los errores del frontend necesitan source maps?
- (comparar) Compara feature flags y ramas largas para lanzar una funcionalidad.
- (aplicar) Planifica el lanzamiento de un nuevo checkout.
- (que-pasa-si) ¿Qué pasa con usuarios que tienen la pestaña abierta cuando despliegas una API incompatible?
- (por-que) ¿Por qué medir eventos de producto además de errores?
- (error-comun) Error común: registrar el contenido de los formularios para depurar.

## Herramientas del curso en este subtema
- checklist: Checklist de lanzamiento seguro en frontend — Antes de abrir una funcionalidad importante a todos los usuarios.
