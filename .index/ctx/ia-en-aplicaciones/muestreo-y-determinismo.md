# Subtema: Muestreo: temperatura, top-p y determinismo [ia-en-aplicaciones/muestreo-y-determinismo]
Cómo elige el modelo el siguiente token, qué cambian temperatura y top-p, por qué la misma entrada da salidas distintas y cómo diseñar para eso.

## Muestreo: temperatura, top-p y determinismo

En cada paso el modelo calcula una **distribución de probabilidad** sobre el siguiente token y luego **muestrea** uno. La respuesta es una cadena de esas elecciones, por eso la misma pregunta puede dar respuestas distintas.

### Los controles
- **Temperatura**: aplana (alta) o afila (baja) la distribución. Baja → respuestas más previsibles; alta → más variedad y más riesgo de salirse.
- **Top-p** (*nucleus sampling*): solo muestrea entre los tokens que suman la probabilidad p (p. ej. 0,9). Recorta la "cola" de opciones raras.
- **Máximo de tokens de salida** y **secuencias de parada**: cortan la generación.
Ajusta **uno** de los dos (temperatura o top-p), no ambos a la vez, y algunos modelos de razonamiento fijan estos valores por ti.

### Determinismo: no lo prometas
Incluso con temperatura 0 la salida **no es garantizadamente idéntica**: cambios de versión del modelo, cálculo en paralelo y empates de probabilidad la alteran. Diseña como si fuera **no determinista**:
- **Valida** la salida con código (esquemas, reglas) en vez de esperar un texto exacto.
- Para tareas de clasificación o extracción, usa temperatura baja y **formato estructurado**.
- Para generar ideas o variantes, sube la temperatura y **genera varias** para elegir.
- En tests, compara **propiedades** ("contiene la cifra", "cumple el esquema"), no cadenas exactas: eso son las *evals*.

## Glosario usado
- Token: Unidad mínima de texto que procesa un LLM (un trozo de palabra, signo o espacio). Precio, límites y velocidad se miden en tokens.
- Temperatura: Parámetro de muestreo: baja = elige casi siempre los tokens más probables (previsible); alta = más variedad y más riesgo.
- Top-p: Muestreo que solo considera los tokens más probables cuya probabilidad acumulada llega a p (p. ej. 0,9).
- Muestreo: Elegir el siguiente token al azar según la distribución de probabilidad que calcula el modelo.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué la misma pregunta al mismo modelo puede dar dos respuestas distintas?
- (comparar) Compara temperatura baja y alta: ¿para qué usarías cada una?
- (que-pasa-si) ¿Qué pasa si escribes un test que compara la respuesta del LLM con una cadena exacta?
- (por-que) ¿Por qué no conviene ajustar temperatura y top-p a la vez?
- (aplicar) Necesitas clasificar tickets en 5 categorías de forma consistente. ¿Cómo configuras la llamada?
- (error-comun) Error común: «con temperatura 0 el modelo es determinista, así que cacheo la respuesta como verdad».

## Simulaciones del subtema
- clasificar: ¿Temperatura baja o alta?
