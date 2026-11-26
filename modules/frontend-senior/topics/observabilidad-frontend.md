---
title: Observabilidad en el frontend
summary: Errores con contexto y source maps, RUM, logs de eventos, feature flags
  y lanzamientos graduales para detectar y revertir problemas rápido.
order: 5
section: produccion
status: done
requires: []
---

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
