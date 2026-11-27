---
title: "Muestreo: temperatura, top-p y determinismo"
summary: Cómo elige el modelo el siguiente token, qué cambian temperatura y
  top-p, por qué la misma entrada da salidas distintas y cómo diseñar para eso.
order: 2
section: fundamentos
status: done
requires: []
---

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
