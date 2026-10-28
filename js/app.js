const frailQuestions = [
  { key: "fatiga", letter: "F", name: "Fatiga", prompt: "¿Se ha sentido cansado/a todo el tiempo o la mayor parte del tiempo en las últimas 4 semanas?", image: "assets/images/preguntas/pregunta-1.jpg", alt: "Adulto mayor descansando, como ejemplo visual de fatiga" },
  { key: "resistencia", letter: "R", name: "Resistencia", prompt: "¿Tiene dificultad para subir 10 escalones (aproximadamente) sin detenerse?", image: "assets/images/preguntas/pregunta-2.jpg", alt: "Persona mayor subiendo escaleras" },
  { key: "actividad", letter: "A", name: "Actividad ambulatoria", prompt: "¿Tiene dificultad para caminar 100 metros (aproximadamente)?", image: "assets/images/preguntas/pregunta-3.jpg", alt: "Persona mayor caminando al aire libre" },
  { key: "enfermedades", letter: "I", name: "Enfermedades", prompt: "¿Tiene más de 5 enfermedades crónicas diagnosticadas (por ejemplo: diabetes, hipertensión, artritis, etc.)?", image: "assets/images/preguntas/pregunta-4.jpg", alt: "Persona mayor en una actividad cotidiana" },
  { key: "peso", letter: "L", name: "Pérdida de peso", prompt: "¿Ha perdido más de 5% de su peso corporal en los últimos 6 meses sin proponérselo?", image: "assets/images/preguntas/pregunta-5.jpg", alt: "Persona mayor sonriendo" }
];

const snaqQuestions = [
  { key: "snaq_peso", letter: "1", name: "Pérdida involuntaria de peso", prompt: "¿Ha perdido peso involuntariamente?", detail: "Más de 6 kilos en los últimos 6 meses o más de 3 kilos en el último mes.", image: "assets/images/preguntas/snaq-pregunta-1.jpg", alt: "Persona mayor revisando su peso en una báscula" },
  { key: "snaq_apetito", letter: "2", name: "Disminución del apetito", prompt: "¿Ha disminuido su apetito en el último mes?", detail: "", image: "assets/images/preguntas/snaq-pregunta-2.jpg", alt: "Persona mayor con comida en la mesa" },
  { key: "snaq_apoyo", letter: "3", name: "Apoyo nutricional", prompt: "¿Ha recibido alimentación por sonda o suplemento nutricional oral en el último mes?", detail: "", image: "assets/images/preguntas/snaq-pregunta-3.jpg", alt: "Persona mayor con suplemento nutricional y asistencia de salud" }
];


const sarcfQuestions = [
  { key: "sarcf_fuerza", letter: "1", name: "Fuerza", prompt: "¿Tiene dificultad para levantar y cargar aproximadamente 4.5 kg (una bolsa de compras o un objeto similar)?", image: "assets/images/preguntas/sarc-f-pregunta-1.jpg", alt: "Persona mayor intentando levantar una bolsa de compras", options: [{ value: 0, label: "0 · Ninguna dificultad" }, { value: 1, label: "1 · Alguna dificultad" }, { value: 2, label: "2 · Mucha dificultad o incapaz" }] },
  { key: "sarcf_caminar", letter: "2", name: "Caminar", prompt: "¿Tiene dificultad para caminar por una habitación? Puede usar apoyo, como bastón, andadera o barandal.", image: "assets/images/preguntas/sarc-f-pregunta-2.jpg", alt: "Persona mayor caminando por una habitación", options: [{ value: 0, label: "0 · Ninguna dificultad" }, { value: 1, label: "1 · Alguna dificultad" }, { value: 2, label: "2 · Mucha dificultad o incapaz" }] },
  { key: "sarcf_levantarse", letter: "3", name: "Levantarse", prompt: "¿Tiene dificultad para levantarse de una silla o de la cama?", image: "assets/images/preguntas/sarc-f-pregunta-3.jpg", alt: "Persona mayor levantándose de una silla", options: [{ value: 0, label: "0 · Ninguna dificultad" }, { value: 1, label: "1 · Alguna dificultad" }, { value: 2, label: "2 · Mucha dificultad o incapaz" }] },
  { key: "sarcf_escaleras", letter: "4", name: "Subir escaleras", prompt: "¿Tiene dificultad para subir un tramo de 10 escalones?", image: "assets/images/preguntas/sarc-f-pregunta-4.jpg", alt: "Persona mayor subiendo escaleras", options: [{ value: 0, label: "0 · Ninguna dificultad" }, { value: 1, label: "1 · Alguna dificultad" }, { value: 2, label: "2 · Mucha dificultad o incapaz" }] },
  { key: "sarcf_caidas", letter: "5", name: "Caídas", prompt: "¿Cuántas veces se ha caído durante el último año?", image: "assets/images/preguntas/sarc-f-pregunta-5.jpg", alt: "Persona mayor que ha sufrido una caída", options: [{ value: 0, label: "0 · Ninguna" }, { value: 1, label: "1 · 1–3 veces" }, { value: 2, label: "2 · 4 o más veces" }] }
];

const homeScreen = document.getElementById("inicio");
const surveyScreen = document.getElementById("cribado");
const placeholderScreen = document.getElementById("pendiente");
const questionContainer = document.getElementById("question-container");
const startButton = document.getElementById("start-button");
const snaqButton = document.getElementById("snaq-button");
const sarcfButton = document.getElementById("sarcf-button");
const rcsButton = document.getElementById("rcs-button");
const coverButton = document.getElementById("cover-button");
const placeholderBack = document.getElementById("placeholder-back");
const placeholderHome = document.getElementById("placeholder-home");
const backButton = document.getElementById("back-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const form = document.getElementById("frail-form");
const formError = document.getElementById("form-error");
const progressText = document.getElementById("progress-text");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const resultCard = document.getElementById("result-card");
const surveyEyebrow = document.getElementById("survey-eyebrow");
const surveyTitle = document.getElementById("survey-title");
const surveyInstructions = document.getElementById("survey-instructions");

let currentQuestion = 0;
let activeScreening = "frail";
let activeQuestions = frailQuestions;
const answers = { frail: {}, snaq: {}, "sarc-f": {}, rcs: { orientation: {}, calculation: {}, recall: {} } };
let rcsStage = 0;
const rcsStages = ["words", "orientation", "calculation", "recall"];
const rcsOrientationPrompts = ["¿Qué día es hoy?", "¿En qué mes estamos?", "¿En qué año estamos?", "¿En qué lugar estamos?"];
const rcsCalculationValues = [93, 86, 79, 72, 65];

function openSurvey(type = "frail") {
  activeScreening = type;
  activeQuestions = type === "snaq" ? snaqQuestions : (type === "sarc-f" ? sarcfQuestions : (type === "rcs" ? rcsStages : frailQuestions));
  rcsStage = 0;
  currentQuestion = 0;
  resultCard.hidden = true;
  form.hidden = false;
  formError.hidden = true;
  surveyEyebrow.textContent = type === "snaq" ? "CRIBADO CLÍNICO · EVALUACIÓN NUTRICIONAL" : (type === "sarc-f" ? "CRIBADO CLÍNICO · FUERZA Y MOVILIDAD" : (type === "rcs" ? "CRIBADO CLÍNICO · MEMORIA Y COGNICIÓN" : "CRIBADO CLÍNICO DE PERSONAS MAYORES"));
  surveyTitle.innerHTML = type === "snaq" ? 'Evaluación <em>  Anorexia en el envejecimiento (SNAQ)</em>' : (type === "sarc-f" ? 'Cuestionario <em> Sarcopenia(SARC-F)</em>' : (type === "rcs" ? 'Cuestionario <em> Deterioro cognitivo(RCS)</em>' : 'Escala <em>Fragilidad(FRAIL)</em>'));
  surveyInstructions.textContent = type === "snaq"
    ? "Responde estas tres preguntas sobre el último mes y los cambios de peso. Si no estás seguro/a, consulta con un profesional de salud."
    : (type === "sarc-f" ? "Selecciona la respuesta que mejor describa tu dificultad en cada actividad. Cada pregunta suma de 0 a 2 puntos."
      : (type === "rcs" ? "La aplicación guía al evaluador por los tres elementos del RCS: recuerdo, orientación y atención/cálculo. Sigue las indicaciones y registra si cada respuesta fue correcta."
        : "Responde las cinco preguntas pensando en cómo te has sentido recientemente. No hay respuestas buenas ni malas."));
  placeholderScreen.hidden = true;
  homeScreen.hidden = true;
  homeScreen.classList.remove("is-active");
  surveyScreen.hidden = false;
  surveyScreen.classList.add("is-active");
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  placeholderScreen.hidden = true;
  surveyScreen.hidden = true;
  surveyScreen.classList.remove("is-active");
  homeScreen.hidden = false;
  homeScreen.classList.add("is-active");
  resultCard.hidden = true;
  form.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  if (activeScreening === "rcs") { renderRcsStage(); return; }
  const q = activeQuestions[currentQuestion];
  const selected = answers[activeScreening][q.key];
  const detail = q.detail ? `<p class="question-detail">${q.detail}</p>` : "";
  const options = q.options
    ? q.options.map(option => `<label class="answer-option"><input type="radio" name="${q.key}" value="${option.value}" ${selected === option.value ? "checked" : ""}><span>${option.label}</span></label>`).join("")
    : `<label class="answer-option"><input type="radio" name="${q.key}" value="1" ${selected === 1 ? "checked" : ""}><span>Sí</span></label><label class="answer-option"><input type="radio" name="${q.key}" value="0" ${selected === 0 ? "checked" : ""}><span>No</span></label>`;
  questionContainer.innerHTML = `
    <article class="question-card ${activeScreening === "snaq" ? "snaq-question-card" : ""} ${activeScreening === "sarc-f" ? "sarcf-question-card" : ""}">
      <div class="question-content">
        <div class="question-topline">
          <span class="question-number">${currentQuestion + 1}</span>
          <span class="question-tag">${q.letter} · ${q.name}</span>
        </div>
        <h3>${q.prompt}</h3>
        ${detail}
        <div class="answer-options ${q.options ? "answer-options-score" : ""}" role="radiogroup" aria-label="${q.name}">${options}</div>
      </div>
      <div class="question-photo"><img src="${q.image}" alt="${q.alt}" loading="eager"></div>
    </article>
  `;
  questionContainer.querySelectorAll(`input[name="${q.key}"]`).forEach(input => {
    input.addEventListener("change", () => {
      answers[activeScreening][q.key] = Number(input.value);
      formError.hidden = true;
    });
  });
  const total = activeQuestions.length;
  progressText.textContent = `Pregunta ${currentQuestion + 1} de ${total}`;
  const percent = Math.round(((currentQuestion + 1) / total) * 100);
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
  previousButton.disabled = currentQuestion === 0;
  nextButton.innerHTML = currentQuestion === total - 1 ? 'Ver resumen <span aria-hidden="true">✓</span>' : 'Siguiente <span aria-hidden="true">→</span>';
  formError.hidden = true;
}

function renderRcsStage() {
  const stage = rcsStages[rcsStage];
  const total = rcsStages.length;
  let content = "";
  const correctnessOptions = (name, value) => `
    <div class="answer-options" role="radiogroup" aria-label="Registrar si la respuesta fue correcta">
      <label class="answer-option"><input type="radio" name="${name}" value="1" ${value === 1 ? "checked" : ""}><span>Correcta</span></label>
      <label class="answer-option"><input type="radio" name="${name}" value="0" ${value === 0 ? "checked" : ""}><span>Incorrecta</span></label>
    </div>`;

  if (stage === "words") {
    content = `<article class="question-card rcs-card"><div class="question-content"><div class="question-topline"><span class="question-number">1</span><span class="question-tag">Recuerdo de 3 palabras</span></div><h3>Lee estas palabras a la persona y pídele que las repita.</h3><p class="question-detail">No avances hasta que haya intentado repetirlas. Después continúa con orientación y cálculo; al final preguntarás cuáles recuerda sin volver a mostrárselas.</p><div class="rcs-word-list"><span>Manzana</span><span>Mesa</span><span>Perro</span></div><p class="question-detail">Las palabras no se puntúan en esta primera repetición; se puntúa el recuerdo al final.</p></div><div class="question-photo"><img src="assets/images/preguntas/rcs-memoria.jpg" alt="Persona mayor realizando una tarea de memoria"></div></article>`;
  } else if (stage === "orientation") {
    content = `<article class="question-card rcs-card"><div class="question-content"><div class="question-topline"><span class="question-number">2</span><span class="question-tag">Orientación · máximo 4 puntos</span></div><h3>Haz estas cuatro preguntas y marca si cada respuesta fue correcta.</h3><p class="question-detail">Cada respuesta correcta suma 1 punto.</p><div class="rcs-check-list">${rcsOrientationPrompts.map((prompt, i) => `<div class="rcs-check-row"><p>${prompt}</p>${correctnessOptions(`rcs-orientation-${i}`, answers.rcs.orientation[i])}</div>`).join("")}</div></div><div class="question-photo"><img src="assets/images/preguntas/rcs-orientacion.jpg" alt="Persona mayor durante una pregunta de orientación"></div></article>`;
  } else if (stage === "calculation") {
    content = `<article class="question-card rcs-card"><div class="question-content"><div class="question-topline"><span class="question-number">3</span><span class="question-tag">Atención y cálculo · máximo 5 puntos</span></div><h3>Pide que reste 7 en 7 desde 100, hasta completar cinco respuestas.</h3><p class="question-detail">La secuencia esperada es 93, 86, 79, 72 y 65. Marca cada respuesta como correcta o incorrecta; cada acierto suma 1 punto.</p><div class="rcs-check-list">${rcsCalculationValues.map((value, i) => `<div class="rcs-check-row"><p>Respuesta ${i + 1} <span class="expected-value">(esperada: ${value})</span></p>${correctnessOptions(`rcs-calculation-${i}`, answers.rcs.calculation[i])}</div>`).join("")}</div></div><div class="question-photo"><img src="assets/images/preguntas/rcs-atencion.jpg" alt="Persona mayor realizando una tarea de atención y cálculo"></div></article>`;
  } else {
    content = `<article class="question-card rcs-card"><div class="question-content"><div class="question-topline"><span class="question-number">1</span><span class="question-tag">Recuerdo diferido · máximo 3 puntos</span></div><h3>Sin volver a mostrar la lista, pregunta cuáles palabras recuerda.</h3><p class="question-detail">Marca únicamente las palabras que la persona recordó correctamente sin ayuda. Cada palabra recordada suma 1 punto.</p><div class="rcs-recall-options">${["Manzana", "Mesa", "Perro"].map((word, i) => `<label class="rcs-recall-option"><input type="checkbox" name="rcs-recall-${i}" value="1" ${answers.rcs.recall[i] ? "checked" : ""}><span>${word}</span></label>`).join("")}</div></div><div class="question-photo"><img src="assets/images/preguntas/rcs-memoria.jpg" alt="Persona mayor recordando palabras"></div></article>`;
  }

  questionContainer.innerHTML = content;
  if (stage === "orientation") {
    rcsOrientationPrompts.forEach((_, i) => questionContainer.querySelectorAll(`input[name="rcs-orientation-${i}"]`).forEach(input => input.addEventListener("change", () => { answers.rcs.orientation[i] = Number(input.value); formError.hidden = true; })));
  }
  if (stage === "calculation") {
    rcsCalculationValues.forEach((_, i) => questionContainer.querySelectorAll(`input[name="rcs-calculation-${i}"]`).forEach(input => input.addEventListener("change", () => { answers.rcs.calculation[i] = Number(input.value); formError.hidden = true; })));
  }
  if (stage === "recall") {
    [0, 1, 2].forEach(i => questionContainer.querySelector(`input[name="rcs-recall-${i}"]`).addEventListener("change", event => { answers.rcs.recall[i] = event.target.checked; formError.hidden = true; }));
  }
  currentQuestion = rcsStage;
  progressText.textContent = `Etapa ${rcsStage + 1} de ${total}`;
  const percent = Math.round(((rcsStage + 1) / total) * 100);
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
  previousButton.disabled = rcsStage === 0;
  nextButton.innerHTML = rcsStage === total - 1 ? 'Ver resultado <span aria-hidden="true">✓</span>' : 'Continuar <span aria-hidden="true">→</span>';
  formError.hidden = true;
}

function handleRcsNext() {
  const stage = rcsStages[rcsStage];
  if (stage === "orientation" && rcsOrientationPrompts.some((_, i) => typeof answers.rcs.orientation[i] !== "number")) {
    formError.textContent = "Registra si cada respuesta de orientación fue correcta o incorrecta."; formError.hidden = false; return;
  }
  if (stage === "calculation" && rcsCalculationValues.some((_, i) => typeof answers.rcs.calculation[i] !== "number")) {
    formError.textContent = "Registra si cada una de las cinco respuestas de cálculo fue correcta o incorrecta."; formError.hidden = false; return;
  }
  if (rcsStage < rcsStages.length - 1) {
    rcsStage += 1; renderRcsStage(); window.scrollTo({ top: 0, behavior: "smooth" });
  } else { showRcsResult(); }
}

function showRcsResult() {
  const recall = [0, 1, 2].reduce((sum, i) => sum + (answers.rcs.recall[i] ? 1 : 0), 0);
  const orientation = rcsOrientationPrompts.reduce((sum, _, i) => sum + (answers.rcs.orientation[i] || 0), 0);
  const calculation = rcsCalculationValues.reduce((sum, _, i) => sum + (answers.rcs.calculation[i] || 0), 0);
  const total = recall + orientation + calculation;
  let title, description, symbol;
  if (total <= 2) { title = "Posible deterioro cognitivo"; description = "La puntuación se encuentra en el rango de 0 a 2 indicado en el material compartido. Se recomienda una evaluación completa por un profesional de salud."; symbol = "!"; }
  else if (total <= 5) { title = "Resultado en rango de deterioro leve"; description = "La puntuación se encuentra en el rango de 3 a 5 indicado en el material compartido. Se recomienda seguimiento y reevaluación por un profesional de salud."; symbol = "✳"; }
  else { title = "Función cognitiva conservada según este cribado"; description = "La puntuación se encuentra en el rango de 6 a 12 indicado en el material compartido. Si existen preocupaciones o cambios cognitivos, conviene comentarlos con un profesional de salud."; symbol = "✓"; }
  document.getElementById("result-symbol").textContent = symbol;
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-score").textContent = `Puntuación RCS: ${total} de 12 puntos`;
  document.getElementById("result-description").innerHTML = `<span class="answer-summary-line">Recuerdo de palabras: ${recall}/3</span><span class="answer-summary-line">Orientación: ${orientation}/4</span><span class="answer-summary-line">Atención y cálculo: ${calculation}/5</span><span class="answer-summary-line"><strong>Total: ${total}/12</strong></span><span class="answer-summary-line">${description}</span>`;
  document.querySelector(".result-card .eyebrow").textContent = "RESULTADO ORIENTATIVO · RCS";
  document.querySelector(".medical-note").textContent = "Interpretación basada en la imagen de referencia proporcionada: 0–2 puntos, posible deterioro cognitivo; 3–5, deterioro leve (vigilar y reevaluar); 6–12, función cognitiva conservada. Este cribado no establece un diagnóstico. La aplicación no sustituye la valoración clínica y debe revisarse con el responsable sanitario antes de su uso con pacientes.";
  finishResult();
}

function showResult() {
  if (activeScreening === "rcs") { showRcsResult(); return; }
  if (activeScreening === "snaq") {
    showSnaqResult();
    return;
  }
  if (activeScreening === "sarc-f") {
    showSarcfResult();
    return;
  }
  const total = frailQuestions.reduce((sum, q) => sum + (answers.frail[q.key] || 0), 0);
  let title, description, symbol;
  if (total === 0) {
    title = "Sin señales identificadas en este cribado";
    description = "Tus respuestas no sumaron puntos en esta aplicación de la escala. Mantén tus revisiones preventivas y consulta si notas cambios en tu fuerza, energía, movilidad o peso.";
    symbol = "♡";
  } else if (total <= 2) {
    title = "Posible prefragilidad";
    description = "Tus respuestas indican que conviene prestar atención a algunos aspectos de tu bienestar. Coméntalo con un profesional de salud para valorar tus necesidades y las medidas de apoyo adecuadas.";
    symbol = "✳";
  } else {
    title = "Posible fragilidad";
    description = "Tus respuestas sugieren que es importante solicitar una valoración por un profesional de salud, quien podrá revisar tu situación, tus enfermedades, tu movilidad, nutrición y apoyos necesarios.";
    symbol = "＋";
  }
  document.getElementById("result-symbol").textContent = symbol;
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-score").textContent = `Puntuación: ${total} de 5`;
  document.getElementById("result-description").textContent = description;
  document.querySelector(".result-card .eyebrow").textContent = "RESULTADO ORIENTATIVO";
  document.querySelector(".medical-note").textContent = "Este cuestionario es una herramienta de cribado y no sustituye una valoración médica. Comparte el resultado con un profesional de salud, especialmente si tienes dificultades nuevas o que empeoran.";
  finishResult();
}

function showSnaqResult() {
  const qLabels = ["Pérdida involuntaria de peso", "Disminución del apetito", "Alimentación por sonda o suplemento nutricional oral"];
  const resultLines = snaqQuestions.map((q, i) => `${i + 1}. ${qLabels[i]}: ${answers.snaq[q.key] === 1 ? "Sí" : "No"}`);
  document.getElementById("result-symbol").textContent = "♡";
  document.getElementById("result-title").textContent = "Resumen de respuestas SNAQ";
  document.getElementById("result-score").textContent = "Respuestas registradas: 3 de 3 preguntas";
  document.getElementById("result-description").innerHTML = resultLines.map(line => `<span class="answer-summary-line">${line}</span>`).join("");
  document.querySelector(".result-card .eyebrow").textContent = "RESUMEN · EVALUACIÓN NUTRICIONAL";
  document.querySelector(".medical-note").textContent = "La referencia que compartiste describe X = ninguna acción, XX = malnutrición moderada con intervención nutricional y XXX = malnutrición severa con intervención nutricional y tratamiento dietético. Como no contamos con la tabla completa que relaciona las respuestas con estas categorías, este prototipo no asigna una clasificación automática. Un profesional de salud debe interpretar las respuestas y decidir la intervención correspondiente.";
  finishResult();
}


function showSarcfResult() {
  const total = sarcfQuestions.reduce((sum, q) => sum + (answers["sarc-f"][q.key] || 0), 0);
  const resultLines = sarcfQuestions.map((q, i) => `${i + 1}. ${q.name}: ${answers["sarc-f"][q.key]} puntos`);
  document.getElementById("result-symbol").textContent = total >= 4 ? "!" : "✓";
  document.getElementById("result-title").textContent = total >= 4 ? "Cribado positivo: requiere valoración" : "Cribado por debajo del punto de corte";
  document.getElementById("result-score").textContent = `Puntuación SARC-F: ${total} de 10 puntos`;
  document.getElementById("result-description").innerHTML = `${resultLines.map(line => `<span class="answer-summary-line">${line}</span>`).join("")}<span class="answer-summary-line"><strong>Total: ${total}/10</strong></span>`;
  document.querySelector(".result-card .eyebrow").textContent = "RESULTADO ORIENTATIVO · SARC-F";
  document.querySelector(".medical-note").textContent = total >= 4
    ? "Según el material que compartiste, una puntuación de 4 o más sugiere riesgo de sarcopenia y requiere valoración clínica. Este resultado no confirma un diagnóstico."
    : "Según el material que compartiste, una puntuación inferior a 4 queda por debajo del punto de corte indicado. Si hay síntomas, pérdida de fuerza o preocupación clínica, consulta con un profesional de salud. Este cuestionario no sustituye una valoración diagnóstica.";
  finishResult();
}

function finishResult() {
  form.hidden = true;
  resultCard.hidden = false;
  progressText.textContent = "Cribado completado";
  progressPercent.textContent = "100%";
  progressFill.style.width = "100%";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const upcomingScreenings = {
  "rcs": { title: "RCS · Deterioro cognitivo", description: "Aquí añadiremos el cribado RCS con sus instrucciones, preguntas e imágenes. Lo prepararemos para que la interacción sea clara y la interpretación se ajuste al formulario que utilices.", icon: "✳" }
};
function openPlaceholder(key) {
  const item = upcomingScreenings[key];
  if (!item) return;
  homeScreen.hidden = true;
  surveyScreen.hidden = true;
  placeholderScreen.hidden = false;
  document.getElementById("placeholder-title").textContent = item.title;
  document.getElementById("placeholder-description").textContent = item.description;
  document.getElementById("placeholder-icon").textContent = item.icon;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-coming]").forEach(button => button.addEventListener("click", () => openPlaceholder(button.dataset.coming)));
placeholderBack.addEventListener("click", goHome);
placeholderHome.addEventListener("click", goHome);

startButton.addEventListener("click", () => openSurvey("frail"));
coverButton.addEventListener("click", () => openSurvey("frail"));
snaqButton.addEventListener("click", () => openSurvey("snaq"));
sarcfButton.addEventListener("click", () => openSurvey("sarc-f"));
rcsButton.addEventListener("click", () => openSurvey("rcs"));
backButton.addEventListener("click", goHome);
previousButton.addEventListener("click", () => {
  if (activeScreening === "rcs" && rcsStage > 0) { rcsStage -= 1; renderRcsStage(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
nextButton.addEventListener("click", () => {
  if (activeScreening === "rcs") { handleRcsNext(); return; }
  const q = activeQuestions[currentQuestion];
  if (typeof answers[activeScreening][q.key] !== "number") {
    formError.hidden = false;
    return;
  }
  if (currentQuestion < activeQuestions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    showResult();
  }
});
document.getElementById("restart-button").addEventListener("click", () => {
  if (activeScreening === "rcs") { answers.rcs = { orientation: {}, calculation: {}, recall: {} }; rcsStage = 0; }
  else { Object.keys(answers[activeScreening]).forEach(key => delete answers[activeScreening][key]); }
  currentQuestion = 0;
  resultCard.hidden = true;
  form.hidden = false;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.getElementById("print-button").addEventListener("click", () => window.print());
form.addEventListener("submit", event => event.preventDefault());
