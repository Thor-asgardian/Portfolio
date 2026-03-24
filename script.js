const modal = document.getElementById("modal");
const title = document.getElementById("modal-title");
const body = document.getElementById("modal-body");

let currentProject = null;

/* ================= DATA ================= */
const data = {
  categorizer: {
    title: "AI Transaction Categorizer",

    overview: "High-throughput classification using hybrid ML + rule system.",

    tech: "Python, TF-IDF, Ensemble Models, LIME",

    impact: `
- Reduced latency by 40%
- Improved confidence scoring
- Offline deployment ready
`,

    scaling: `
- Stateless APIs for horizontal scaling
- Rule engine reduces ML load
- ML container autoscaling
`,

    failure: `
- ML failure → fallback rules
- Timeout handling
- Low confidence rejection
`,

    tradeoffs: `
- Rules = fast but rigid
- ML = flexible but slower
- Hybrid balances both
`
  },

  healthcare: {
    title: "Healthcare Assistant",

    overview: "RAG-based multilingual assistant with offline support.",

    tech: "Flask, LangChain, FAISS, HuggingFace",

    impact: `
- Offline AI capability
- Reduced cloud dependency
- Regional language support
`,

    scaling: `
- Vector DB sharding
- Stateless pipeline
- Modular services
`,

    failure: `
- STT failure → text fallback
- Retrieval failure → direct LLM
- Latency skip retrieval
`,

    tradeoffs: `
- RAG improves accuracy but adds latency
- Local inference limits scalability
`
  }
};

/* ================= HELPERS ================= */

function formatList(text) {
  return text
    .split("\n")
    .filter(l => l.trim())
    .map(l => `<li>${l.replace("-", "").trim()}</li>`)
    .join("");
}

function getDiagram(id) {
  if (id === "categorizer") {
    return `
      <div class="flow">
        <div>Input</div>
        <div>Preprocess</div>
        <div>Rules</div>
        <div>ML</div>
        <div>Confidence</div>
        <div>Output</div>
      </div>
    `;
  }

  if (id === "healthcare") {
    return `
      <div class="flow">
        <div>User</div>
        <div>STT</div>
        <div>Query</div>
        <div>FAISS</div>
        <div>LLM</div>
        <div>TTS</div>
      </div>
    `;
  }

  return "";
}

/* ================= TABS ================= */

function renderTabs(projectId) {
  const p = data[projectId];

  return `
    <div class="tabs">
      <button onclick="switchTab('overview')">Overview</button>
      <button onclick="switchTab('architecture')">Architecture</button>
      <button onclick="switchTab('scaling')">Scaling</button>
      <button onclick="switchTab('failure')">Failure</button>
      <button onclick="switchTab('tradeoffs')">Tradeoffs</button>
    </div>

    <div id="tab-content"></div>
  `;
}

function switchTab(tab) {
  const p = currentProject;
  const container = document.getElementById("tab-content");

  if (!p || !container) return;

  if (tab === "overview") {
    container.innerHTML = `
      <p>${p.overview}</p>
      <h4>Tech</h4>
      <p>${p.tech}</p>
      <h4>Impact</h4>
      <ul class="list">${formatList(p.impact)}</ul>
    `;
  }

  if (tab === "architecture") {
    container.innerHTML = `
      <div class="diagram">${getDiagram(currentProjectKey)}</div>
    `;
  }

  if (tab === "scaling") {
    container.innerHTML = `
      <ul class="list">${formatList(p.scaling)}</ul>
    `;
  }

  if (tab === "failure") {
    container.innerHTML = `
      <ul class="list">${formatList(p.failure)}</ul>
    `;
  }

  if (tab === "tradeoffs") {
    container.innerHTML = `
      <ul class="list">${formatList(p.tradeoffs)}</ul>
    `;
  }
}

/* ================= MODAL ================= */

let currentProjectKey = null;

function openProject(id) {
  const p = data[id];
  if (!p) return;

  currentProject = p;
  currentProjectKey = id;

  title.textContent = p.title;

  body.innerHTML = renderTabs(id);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  switchTab("overview");
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

/* ================= UX ================= */

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".section").forEach(sec => {
  observer.observe(sec);
});