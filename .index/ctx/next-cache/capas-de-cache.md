# Subtema: Las capas de caché [next-cache/capas-de-cache]
Qué cachea Next.js y dónde vive cada capa.

## Visión general

Next.js combina varias capas. El Data Cache guarda resultados de `fetch` en el servidor,
mientras que el Router Cache vive en el cliente y reduce la latencia al navegar.

## Cuándo se vence algo

Los datos se vencen por TTL o por Revalidación explícita. Una API lenta se beneficia mucho de esto.

## Glosario usado
- API: Application Programming Interface. Contrato por el cual un programa expone funciones a otro.
- Latencia: Tiempo que tarda una petición en recibir respuesta.
- TTL: Time To Live. Duración tras la cual un dato guardado se considera vencido.
- Revalidación: Proceso de marcar datos cacheados como obsoletos para regenerarlos bajo demanda o por tiempo.
- Data Cache: Caché persistente del servidor que guarda resultados de fetch entre peticiones y despliegues.
- Router Cache: Caché en memoria del cliente que guarda segmentos de rutas ya visitadas para navegar más rápido.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué el Data Cache vive en el servidor y el Router Cache en el cliente?
- (que-pasa-si) ¿Qué pasa con un dato cacheado si la API cambia antes de que venza el TTL?
- (comparar) Compara vencer por TTL y revalidar de forma explícita: ¿cuándo usarías cada una?
