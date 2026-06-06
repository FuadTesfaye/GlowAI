const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can fail in private contexts; the app should still work.
    }
  },
};

const dom = {
  root: document.documentElement,
  themeToggle: document.querySelector("#themeToggle"),
  selfieInput: document.querySelector("#selfieInput"),
  previewFrame: document.querySelector("#previewFrame"),
  imagePreview: document.querySelector("#imagePreview"),
  analyzeButton: document.querySelector("#analyzeButton"),
  analysisStatus: document.querySelector("#analysisStatus"),
  signalList: document.querySelector("#signalList"),
  glowScore: document.querySelector("#glowScore"),
  heroScore: document.querySelector("#heroScore"),
  ringProgress: document.querySelector("#ringProgress"),
  contributors: document.querySelector("#contributors"),
  recommendations: document.querySelector("#recommendations"),
  wellnessForm: document.querySelector("#wellnessForm"),
  sleepInput: document.querySelector("#sleepInput"),
  waterInput: document.querySelector("#waterInput"),
  stressInput: document.querySelector("#stressInput"),
  moodInput: document.querySelector("#moodInput"),
  nutritionInput: document.querySelector("#nutritionInput"),
  sleepOutput: document.querySelector("#sleepOutput"),
  waterOutput: document.querySelector("#waterOutput"),
  stressOutput: document.querySelector("#stressOutput"),
  chatForm: document.querySelector("#chatForm"),
  chatInput: document.querySelector("#chatInput"),
  chatWindow: document.querySelector("#chatWindow"),
  saveProgress: document.querySelector("#saveProgress"),
  trendChart: document.querySelector("#trendChart"),
  progressList: document.querySelector("#progressList"),
};

const signalLabels = {
  acne: "Acne severity",
  dryness: "Dryness",
  oiliness: "Oiliness",
  darkCircles: "Dark circles",
  fatigue: "Skin fatigue",
};

const defaultSignals = {
  acne: 42,
  dryness: 48,
  oiliness: 39,
  darkCircles: 62,
  fatigue: 58,
};

const defaultHistory = [
  { date: "Week 1", score: 61 },
  { date: "Week 2", score: 64 },
  { date: "Week 3", score: 68 },
  { date: "Week 4", score: 70 },
  { date: "Week 5", score: 72 },
];

let state = {
  signals: storage.get("glowai.signals", defaultSignals),
  history: storage.get("glowai.history", defaultHistory),
  selectedFile: null,
  score: 72,
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function labelFromScore(value, reverse = false) {
  const score = reverse ? 100 - value : value;
  if (score >= 78) return "Good";
  if (score >= 55) return "Fair";
  if (score >= 35) return "Watch";
  return "Low";
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  dom.root.dataset.theme = nextTheme;
  dom.themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
  dom.themeToggle.setAttribute(
    "aria-label",
    nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
  );
  storage.set("glowai.theme", nextTheme);
}

function initTheme() {
  applyTheme(storage.get("glowai.theme", "light"));
}

function hashFile(file) {
  const source = `${file?.name || "sample"}-${file?.size || 1000}-${file?.lastModified || 7}`;
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash << 5) - hash + source.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function analyzeFile(file) {
  const seed = hashFile(file);
  return {
    acne: 22 + (seed % 47),
    dryness: 24 + ((seed >> 3) % 52),
    oiliness: 18 + ((seed >> 5) % 55),
    darkCircles: 28 + ((seed >> 7) % 50),
    fatigue: 30 + ((seed >> 9) % 48),
  };
}

function renderSignals() {
  dom.signalList.innerHTML = Object.entries(state.signals)
    .map(([key, value]) => {
      const level = labelFromScore(value, true);
      return `
        <article class="signal-card">
          <span>${signalLabels[key]}</span>
          <strong>${level}</strong>
          <div class="bar" aria-label="${signalLabels[key]} ${value} out of 100">
            <i style="width: ${value}%"></i>
          </div>
        </article>
      `;
    })
    .join("");
}

function readWellness() {
  return {
    sleep: Number(dom.sleepInput.value),
    water: Number(dom.waterInput.value),
    stress: Number(dom.stressInput.value),
    mood: dom.moodInput.value,
    nutrition: dom.nutritionInput.value,
  };
}

function calculateScore() {
  const wellness = readWellness();
  const skinAverage =
    Object.values(state.signals).reduce((total, value) => total + (100 - value), 0) /
    Object.values(state.signals).length;
  const sleepScore = clamp((wellness.sleep / 8) * 100, 0, 100);
  const hydrationScore = clamp((wellness.water / 8) * 100, 0, 100);
  const stressScore = clamp(100 - wellness.stress * 10, 0, 100);
  const moodScore = { energized: 92, balanced: 78, tired: 52, anxious: 45 }[wellness.mood];
  const nutritionScore = { wholeFoods: 90, mixed: 72, lowIron: 50, highSugar: 43 }[wellness.nutrition];

  return Math.round(
    skinAverage * 0.34 +
      sleepScore * 0.18 +
      hydrationScore * 0.17 +
      stressScore * 0.16 +
      moodScore * 0.07 +
      nutritionScore * 0.08,
  );
}

function contributorText() {
  const wellness = readWellness();
  const sleep = wellness.sleep >= 7 ? "Good" : wellness.sleep >= 5 ? "Fair" : "Poor";
  const hydration = wellness.water >= 8 ? "Good" : wellness.water >= 5 ? "Moderate" : "Low";
  const stress = wellness.stress >= 7 ? "High" : wellness.stress >= 4 ? "Moderate" : "Low";
  const nutrition =
    wellness.nutrition === "wholeFoods"
      ? "Strong"
      : wellness.nutrition === "mixed"
        ? "Mixed"
        : "Needs support";
  return { sleep, hydration, stress, nutrition };
}

function updateScore() {
  state.score = calculateScore();
  dom.glowScore.textContent = state.score;
  dom.heroScore.textContent = state.score;
  const circumference = 427;
  dom.ringProgress.style.strokeDashoffset = String(circumference - (state.score / 100) * circumference);

  const contributors = contributorText();
  dom.contributors.innerHTML = `
    <span>Sleep: ${contributors.sleep}</span>
    <span>Hydration: ${contributors.hydration}</span>
    <span>Stress: ${contributors.stress}</span>
    <span>Nutrition: ${contributors.nutrition}</span>
  `;
  renderRecommendations();
}

function renderWellnessOutputs() {
  dom.sleepOutput.textContent = `${dom.sleepInput.value}h`;
  dom.waterOutput.textContent = `${dom.waterInput.value} cups`;
  dom.stressOutput.textContent = `${dom.stressInput.value}/10`;
}

function buildRecommendations() {
  const wellness = readWellness();
  const items = [];

  if (wellness.water < 6 || state.signals.dryness > 55) {
    items.push({
      tag: "Hydration",
      title: "Raise water intake steadily",
      body: "Aim for 6-8 cups today and pair it with water-rich meals like cucumber, oranges, watermelon, or light soups.",
    });
  }

  if (wellness.sleep < 6 || state.signals.darkCircles > 58 || state.signals.fatigue > 58) {
    items.push({
      tag: "Recovery",
      title: "Protect your sleep window",
      body: "Keep a consistent bedtime, reduce late caffeine, and track whether dark circles soften after three better nights.",
    });
  }

  if (wellness.stress > 6 || wellness.mood === "anxious") {
    items.push({
      tag: "Stress",
      title: "Add a low-friction reset",
      body: "Try a ten-minute walk, breathing routine, or journaling break. Stress can increase oil production and breakouts.",
    });
  }

  if (wellness.nutrition === "lowIron" || state.signals.fatigue > 60) {
    items.push({
      tag: "Local foods",
      title: "Support iron and skin energy",
      body: "Consider lentils, spinach, beans, teff, moringa, shiro, eggs, or lean meat, paired with vitamin C when possible.",
    });
  }

  if (state.signals.oiliness > 55 || state.signals.acne > 50) {
    items.push({
      tag: "Skincare",
      title: "Keep acne care gentle",
      body: "Use a mild cleanser, non-comedogenic moisturizer, and daily SPF. Patch test black soap or stronger actives first.",
    });
  }

  items.push({
    tag: "Affordable",
    title: "Prioritize available basics",
    body: "Look for fragrance-light cleanser, shea-based moisturizer when dry, sunscreen, and simple niacinamide products where available locally.",
  });

  return items.slice(0, 3);
}

function renderRecommendations() {
  dom.recommendations.innerHTML = buildRecommendations()
    .map(
      (item) => `
        <article class="recommendation-card">
          <span class="tag">${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </article>
      `,
    )
    .join("");
}

function renderHistory() {
  const history = state.history.slice(-7);
  dom.trendChart.innerHTML = history
    .map(
      (item) => `
        <div class="trend-bar" style="height: ${clamp(item.score, 12, 100)}%">
          <span>${item.score}</span>
        </div>
      `,
    )
    .join("");

  dom.progressList.innerHTML = history
    .slice()
    .reverse()
    .map(
      (item) => `
        <div class="progress-item">
          <div class="progress-copy">
            ${item.thumbnail ? `<img src="${item.thumbnail}" alt="Saved selfie thumbnail for ${item.date}" />` : ""}
            <div>
              <strong>${item.date}</strong>
              <span>${item.note || "Weekly Glow Score"}</span>
            </div>
          </div>
          <strong>${item.score}/100</strong>
        </div>
      `,
    )
    .join("");
}

function captureThumbnail() {
  if (!dom.imagePreview.src || dom.previewFrame.classList.contains("is-empty")) return "";
  const canvas = document.createElement("canvas");
  const size = 160;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.drawImage(dom.imagePreview, 0, 0, size, size);
  return canvas.toDataURL("image/jpeg", 0.72);
}

function saveProgressPoint() {
  const date = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date());
  const thumbnail = captureThumbnail();
  state.history = [
    ...state.history,
    {
      date,
      score: state.score,
      note: thumbnail ? "Selfie check-in saved" : "Wellness check-in saved",
      thumbnail,
    },
  ].slice(-7);
  storage.set("glowai.history", state.history);
  renderHistory();
}

function addMessage(author, text) {
  const message = document.createElement("div");
  message.className = `message ${author === "You" ? "user" : "bot"}`;
  message.innerHTML = `<span>${author}</span><p>${text}</p>`;
  dom.chatWindow.appendChild(message);
  dom.chatWindow.scrollTop = dom.chatWindow.scrollHeight;
}

function coachReply(question) {
  const text = question.toLowerCase();
  const contributors = contributorText();

  if (text.includes("acne") || text.includes("pimple") || text.includes("breakout")) {
    return `Breakouts can be linked to oil balance, stress, sleep disruption, hormones, or high-sugar weeks. Your current stress reads ${contributors.stress.toLowerCase()}, so start with sleep, stress resets, a gentle cleanser, and non-comedogenic moisturizer before adding stronger actives.`;
  }

  if (text.includes("dry") || text.includes("hydration") || text.includes("water")) {
    return `Dryness often improves when you combine water intake with barrier care. Increase fluids gradually, use a gentle cleanser, and consider a simple shea-based or ceramide-style moisturizer if your skin feels tight.`;
  }

  if (text.includes("dark") || text.includes("circle") || text.includes("tired")) {
    return `Dark circles and skin fatigue can reflect sleep debt, stress, dehydration, allergies, or low iron. Try improving sleep consistency and consider iron-rich foods such as lentils, spinach, teff, beans, shiro, eggs, or lean meat.`;
  }

  if (text.includes("food") || text.includes("nutrition") || text.includes("diet")) {
    return `For localized skin support, focus on whole meals: lentils, beans, teff, moringa, greens, avocado, nuts, eggs, fish where available, and vitamin C fruits. Keep high-sugar spikes occasional if acne is active.`;
  }

  if (text.includes("product") || text.includes("routine")) {
    return `Keep the routine simple: gentle cleanser, moisturizer matched to dryness or oiliness, and SPF in the morning. Patch test locally available options, especially black soap, exfoliants, and fragrance-heavy products.`;
  }

  return `Your skin signals and wellness habits work together. Today I would focus on the lowest contributor first: sleep, hydration, stress, or nutrition. Small consistent changes usually beat a complicated routine.`;
}

function bindEvents() {
  dom.themeToggle.addEventListener("click", () => {
    applyTheme(dom.root.dataset.theme === "dark" ? "light" : "dark");
  });

  dom.selfieInput.addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (!file) return;
    state.selectedFile = file;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      dom.imagePreview.src = reader.result;
      dom.previewFrame.classList.remove("is-empty");
      dom.analysisStatus.textContent = "Ready";
    });
    reader.readAsDataURL(file);
  });

  dom.analyzeButton.addEventListener("click", () => {
    state.signals = analyzeFile(state.selectedFile);
    storage.set("glowai.signals", state.signals);
    dom.analysisStatus.textContent = state.selectedFile ? "Analyzed" : "Demo sample";
    renderSignals();
    updateScore();
  });

  dom.wellnessForm.addEventListener("input", () => {
    renderWellnessOutputs();
    updateScore();
  });

  dom.chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = dom.chatInput.value.trim();
    if (!question) return;
    addMessage("You", question);
    dom.chatInput.value = "";
    window.setTimeout(() => addMessage("GlowAI", coachReply(question)), 220);
  });

  dom.saveProgress.addEventListener("click", saveProgressPoint);
}

function init() {
  initTheme();
  bindEvents();
  renderSignals();
  renderWellnessOutputs();
  updateScore();
  renderHistory();
  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init();
