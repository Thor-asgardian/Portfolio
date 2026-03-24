const modal = document.getElementById("modal");
const title = document.getElementById("modal-title");
const body = document.getElementById("modal-body");

const data = {
  categorizer: {
    title: "AI Transaction Categorizer",
    overview: "Hybrid ML + rule-based system.",
    tech: "Python, TF-IDF, LIME",
    impact: "- Reduced latency\n- Explainable AI",
    scaling: "- Stateless APIs\n- ML autoscaling",
    failure: "- Rule fallback\n- Timeout handling",
    tradeoffs: "- Speed vs flexibility"
  },

  healthcare: {
    title: "Healthcare Assistant",
    overview: "RAG-based multilingual assistant.",
    tech: "Flask, FAISS",
    impact: "- Offline AI\n- Language support",
    scaling: "- Modular services",
    failure: "- STT fallback",
    tradeoffs: "- Accuracy vs latency"
  },

  scheduler: {
    title: "Distributed Scheduler",
    overview: "Priority-based job system.",
    tech: "Python",
    impact: "- Efficient execution",
    scaling: "- Worker scaling",
    failure: "- Retry logic",
    tradeoffs: "- Complexity vs speed"
  }
};

function formatList(text) {
  return text
    .split("\n")
    .map(i => `<li>${i.replace("-", "").trim()}</li>`)
    .join("");
}

function openProject(id) {
  const p = data[id];
  if (!p) return;

  title.textContent = p.title;

  body.innerHTML = `
    <h3>Overview</h3>
    <p>${p.overview}</p>

    <h3>Tech</h3>
    <p>${p.tech}</p>

    <h3>Impact</h3>
    <ul>${formatList(p.impact)}</ul>

    <h3>Scaling</h3>
    <ul>${formatList(p.scaling)}</ul>

    <h3>Failure</h3>
    <ul>${formatList(p.failure)}</ul>

    <h3>Tradeoffs</h3>
    <ul>${formatList(p.tradeoffs)}</ul>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});