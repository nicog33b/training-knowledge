---
title: Uso de herramientas (tool use / function calling)
summary: "El modelo no ejecuta nada: propone llamadas a funciones que tu código
  ejecuta. Diseño de herramientas, bucle de llamadas y errores típicos."
order: 5
section: integracion
status: done
requires: []
---

## Uso de herramientas (tool use / function calling)

Con **uso de herramientas** el modelo puede pedir acciones: buscar en una base de datos, consultar el tiempo, crear un ticket. Pero **el modelo no ejecuta nada**: devuelve una **llamada propuesta** (nombre + argumentos en JSON) y **tu código** decide si la ejecuta y le devuelve el resultado.

### El bucle
1. Envías el mensaje + la **lista de herramientas** (nombre, descripción, esquema de entrada).
2. El modelo responde con texto o con una o más **llamadas a herramienta**.
3. Tu código **valida** los argumentos, ejecuta y devuelve el **resultado** como un mensaje más.
4. Repite hasta que el modelo responde sin pedir herramientas (o llegas a un **tope de pasos**).

### Diseñar buenas herramientas
- Pocas, con **propósito claro** y sin solaparse: si una persona dudaría qué herramienta usar, el modelo también.
- **Descripciones** que digan cuándo usarla y cuándo no, con ejemplos de argumentos.
- Resultados **compactos** y útiles (no volcar 5.000 filas: pagina o resume). Cada resultado gasta contexto.
- **Errores legibles**: "fecha inválida, usa AAAA-MM-DD" permite al modelo corregirse.

### Seguridad
Trata los argumentos como **entrada no confiable**: valida, aplica **mínimo privilegio** (credenciales con el permiso justo), pon **topes** (pasos, tiempo, gasto) y pide **confirmación humana** para acciones irreversibles (pagar, borrar, enviar). Un resultado de herramienta puede traer texto malicioso: es la vía de la **inyección indirecta**.
