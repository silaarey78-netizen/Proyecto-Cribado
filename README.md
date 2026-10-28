# Cribados Saludables

Proyecto web inicial de cribado clínico, hecho con HTML, CSS y JavaScript sin frameworks ni base de datos.

## Cómo abrirlo
1. Descomprime `cribados_saludables.zip`.
2. Abre la carpeta `cribados_saludables` en Visual Studio Code.
3. Abre `index.html` en el navegador. Recomendado: usar la extensión **Live Server** de VS Code y pulsar **Go Live**.
4. La portada circular abre el cribado FRAIL. Las respuestas se guardan solo en la memoria de la página mientras está abierta; no se envían a ningún servidor.

## Estructura
- `index.html`: estructura de la página.
- `css/styles.css`: diseño, colores, responsividad y estilos de impresión.
- `js/app.js`: preguntas, navegación, puntuación y resultado.
- `assets/images/portada-envejecimiento.png`: portada aportada.
- `assets/images/preguntas/`: recortes de referencia visual para cada pregunta.
- `assets/images/referencia-frail-completa.png`: imagen original completa de referencia.

## Importante sobre el cuestionario
Este prototipo es una base de diseño y funcionamiento. Antes de usarlo con pacientes, valida con el responsable clínico la redacción, la interpretación de la escala, la privacidad y el procedimiento de resguardo de resultados. El resultado mostrado es orientativo y no es un diagnóstico.

## Personalización
Edita las preguntas y su texto en `js/app.js`; cambia colores y tamaños en `css/styles.css`; coloca nuevas imágenes en `assets/images/`.


## Menú principal de cribados
La portada incluye cuatro tarjetas: Fragilidad (FRAIL), SNAQ, SARC-F y RCS. FRAIL está conectado al formulario funcional existente. SNAQ, SARC-F y RCS muestran una pantalla temporal y se conectarán a sus formularios cuando se incorporen las preguntas, imágenes e instrucciones de puntuación correspondientes.

## SNAQ incorporado
La tarjeta SNAQ abre ahora un cuestionario funcional de tres preguntas Sí/No, con imágenes separadas, navegación, validación de respuestas y resumen imprimible. La clasificación X/XX/XXX no se asigna automáticamente porque la información compartida no incluye la tabla completa de correspondencia entre respuestas y nivel de intervención. El resumen muestra las respuestas y la leyenda disponible para revisión profesional.

Imágenes de referencia SNAQ guardadas en `assets/images/referencia-snaq-preguntas.png` y `assets/images/referencia-snaq-parametros.png`; recortes visuales por pregunta en `assets/images/preguntas/snaq-pregunta-1.jpg` a `snaq-pregunta-3.jpg`.


## SARC-F incorporado
La tarjeta SARC-F abre un cuestionario de cinco preguntas con respuestas puntuadas de 0 a 2. El sistema suma un total de 0 a 10 y señala que una puntuación de 4 o más requiere valoración clínica, según la imagen de referencia compartida. El resultado es orientativo y no es un diagnóstico. Las imágenes individuales se encuentran en `assets/images/preguntas/sarc-f-pregunta-1.jpg` a `sarc-f-pregunta-5.jpg`; la imagen original está en `assets/images/referencia-sarc-f-completa.png`.


## RCS — Rapid Cognitive Screen
El RCS está integrado en cuatro pasos interactivos: presentación de las palabras para aprenderlas, orientación (4 ítems), atención/cálculo (5 restas seriadas) y recuerdo diferido (3 palabras). El evaluador marca si cada respuesta de orientación y cálculo fue correcta y, al final, las palabras recordadas sin ayuda. La puntuación máxima es 12 y la interpretación mostrada sigue los rangos del material de referencia aportado. Antes de utilizarlo con pacientes, el responsable clínico debe verificar la versión del instrumento, su aplicación y sus criterios de interpretación.
