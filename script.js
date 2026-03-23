let currentProject = null;
let currentTab = "overview";

/* ================= PROJECT DATA ================= */
const projects = {
  categorizer: {
    title: "AI Transaction Categorizer",

    overview: `
      <p>End-to-end ML pipeline converting raw transactions into structured categories.</p>
    `,

    architecture: `
      <ul>
        <li>Synthetic Data Generation</li>
        <li>TF-IDF Vectorization</li>
        <li>Ensemble Models</li>
        <li>Rule Engine (early exit)</li>
        <li>Confidence Scoring</li>
      </ul>
    `,

    tech: `
      <p>Python, Streamlit, LIME, TF-IDF, Ensemble Learning</p>
    `,

    impact: `
      <p>Explainable AI system with real-time inference and offline enterprise deployment.</p>
    `
  },

  healthcare: {
    title: "AI Healthcare Assistant",

    overview: `
      <p>Bilingual AI assistant enabling voice + text interaction in English & Kannada.</p>
    `,

    architecture: `
      <ul>
        <li>Speech-to-Text (STT)</li>
        <li>Natural Language Processing</li>
        <li>RAG (FAISS / Chroma)</li>
        <li>Response Generation</li>
        <li>Text-to-Speech (TTS)</li>
      </ul>
    `,

    tech: `
      <p>Flask, LangChain, HuggingFace, FAISS, Gradio</p>
    `,

    impact: `
      <p>Privacy-focused local AI system with multilingual conversational capability.</p>
    `
  }
};

/* ================= OPEN PROJECT ================= */
function openProject(id) {
  currentProject = projects[id];
  currentTab = "overview";

  const modal = document.getElementById("modal");
  modal.style.display = "block";

  document.getElementById("modal-title").innerText = currentProject.title;

  renderTab();
  highlightTab();
}

/* ================= TAB SWITCH ================= */
function switchTab(tab) {
  currentTab = tab;
  renderTab();
  highlightTab();
}

/* ================= RENDER CONTENT ================= */
function renderTab() {
  const body = document.getElementById("modal-body");
  body.innerHTML = currentProject[currentTab];
}

/* ================= ACTIVE TAB UI ================= */
function highlightTab() {
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.classList.remove("active");
  });

  const activeBtn = document.querySelector(`.tabs button[onclick="switchTab('${currentTab}')"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

/* ================= CLOSE MODAL ================= */
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* ================= CLICK OUTSIDE ================= */
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
};

/* ================= CARD TILT (IMPROVED) ================= */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      perspective(600px)
      rotateX(${ -y * 8 }deg)
      rotateY(${ x * 8 }deg)
      scale(1.02)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
  });
});