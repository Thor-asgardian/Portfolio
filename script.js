const modal = document.getElementById("modal");
const title = document.getElementById("modal-title");
const body = document.getElementById("modal-body");

const data = {

  categorizer: {
    title: "AI Transaction Categorizer",
    overview: "Hybrid ML + rule-based system",
    tech: "Python, TF-IDF, LIME",
    impact: "- 40% latency reduction\n- Explainability"
  },

  healthcare: {
    title: "Healthcare Assistant",
    overview: "RAG multilingual assistant",
    tech: "FAISS, Flask",
    impact: "- Offline AI\n- Voice interface"
  },

  scheduler: {
    title: "Distributed Scheduler",
    overview: "Priority job execution system",
    tech: "Python, Queues",
    impact: "- Efficient execution\n- Scalable workers"
  },

  quantum: {
    title: "Quantum-Classical Hybrid HPC System",
    overview: "Hybrid architecture integrating quantum accelerators with classical HPC systems for optimization workloads.",
    tech: "Qiskit • Hybrid Scheduling • Distributed HPC • Variational Circuits",
    impact: `
    - 2x speedup in optimization tasks
    - Reduced classical compute load
    `,
    scaling: `
    - Distributed classical nodes
    - Quantum batching
    `,
    failure: `
    - Noise mitigation
    - Classical fallback
    `
  }
};

function list(text) {
  return text.split("\\n").map(i => `<li>${i.replace("-", "").trim()}</li>`).join("");
}

function openProject(id) {
  const p = data[id];
  if (!p) return;

  title.textContent = p.title;

  body.innerHTML = `
    <h3>Overview</h3>
    <p>${p.overview}</p>

    ${id === "quantum" ? `
    <h3>Architecture</h3>
    <div class="flow">
      <div>Workload</div>
      <div>Hybrid Scheduler</div>
      <div>Task Split</div>
      <div>Quantum Exec</div>
      <div>Classical Exec</div>
      <div>Merge</div>
    </div>
    ` : ""}

    <h3>Tech</h3>
    <p>${p.tech}</p>

    <h3>Impact</h3>
    <ul>${list(p.impact)}</ul>

    ${p.scaling ? `<h3>Scaling</h3><ul>${list(p.scaling)}</ul>` : ""}
    ${p.failure ? `<h3>Failure</h3><ul>${list(p.failure)}</ul>` : ""}
  `;

  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}