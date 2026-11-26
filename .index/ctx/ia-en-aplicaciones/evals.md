# Subtema: Evals: medir una app con LLM [ia-en-aplicaciones/evals]
Conjuntos de prueba, métricas deterministas y LLM como juez, regresiones al cambiar prompt o modelo; por qué sin evals no hay ingeniería.

## Evals: medir una app con LLM

Una **eval** es un conjunto de **casos de prueba** (entradas + qué se espera) que se ejecuta contra tu sistema para medir su calidad. Sin evals, cambiar un prompt o de modelo es **adivinar**.

### Construir el conjunto
- Empieza con **20–50 casos reales**: preguntas de usuarios, tickets, documentos difíciles. Añade los **fallos** que vayas encontrando (cada bug → un caso).
- Cubre lo típico, los **bordes** y lo que **no** debe hacer (rechazos, datos ajenos).
- Separa un conjunto que **no uses para ajustar** el prompt, para no sobreajustar.

### Cómo puntuar
1. **Deterministas** primero: cumple el esquema, contiene el id correcto, la cifra coincide, no supera N palabras. Baratas y fiables.
2. **LLM como juez** para lo difícil de codificar (tono, si responde la pregunta): con una **rúbrica tipo checklist** concreta, no "puntúa del 1 al 10". Valida el juez contra **etiquetas humanas** de una muestra: los jueces automáticos tienen sesgos y fallan en casos que a un humano le resultan fáciles.
3. **Humanos** para muestras periódicas y para calibrar a los otros dos.

### En el ciclo de desarrollo
- Ejecuta las evals en **CI** al cambiar prompt, modelo, herramientas o recuperación: trátalas como **tests de regresión**.
- Mira el **diff de casos** (cuáles empeoraron), no solo la media.
- En producción, registra entradas y salidas (con privacidad) y convierte el feedback negativo en casos nuevos.

## Glosario usado
- LLM: Large Language Model. Modelo entrenado con enormes cantidades de texto que genera texto prediciendo el siguiente token.
- Prompt: Texto (instrucciones, contexto, ejemplos) que se envía a un modelo de IA para obtener una respuesta.
- CI: Integración continua: cada cambio se construye y se prueba automáticamente en un servidor antes de integrarlo.
- Eval: Conjunto de casos de prueba con criterios de acierto que mide la calidad de un sistema con LLM y detecta regresiones.
- LLM como juez: Usar un modelo para puntuar salidas de otro contra una rúbrica; útil pero con sesgos que hay que validar con humanos.
- Rúbrica: Lista de criterios concretos y verificables para evaluar una respuesta.

## Preguntas sugeridas al alumno
- (por-que) ¿Por qué sin evals cambiar de modelo es adivinar?
- (comparar) Compara métricas deterministas y LLM como juez.
- (que-pasa-si) ¿Qué pasa si ajustas el prompt hasta sacar 100 % en tu único conjunto de casos?
- (aplicar) Monta la primera eval de un asistente que responde sobre la política de vacaciones.
- (por-que) ¿Por qué conviene revisar el diff de casos y no solo la puntuación media?
- (error-comun) Error común: pedir al juez «puntúa del 1 al 10 la calidad».

## Herramientas del curso en este subtema
- checklist: Checklist para lanzar una feature con IA — Lo mínimo que debería estar resuelto antes de abrir a usuarios una función con un LLM.
