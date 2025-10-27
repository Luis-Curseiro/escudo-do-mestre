// --- Troca de abas ---
const tabs = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// --- Anotações ---
const notesArea = document.getElementById("notesArea");
notesArea.value = localStorage.getItem("mestre_notes") || "";

notesArea.addEventListener("input", () => {
  localStorage.setItem("mestre_notes", notesArea.value);
});

// --- Iniciativa ---
const initiativeList = document.getElementById("initiativeList");
const addInitiative = document.getElementById("addInitiative");
const clearInitiative = document.getElementById("clearInitiative");
const initiativeInput = document.getElementById("initiativeInput");

function renderInitiative() {
  const data = JSON.parse(localStorage.getItem("mestre_initiative") || "[]");
  initiativeList.innerHTML = "";
  data.forEach((name, index) => {
    const li = document.createElement("li");
    li.textContent = name;
    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = () => {
      data.splice(index, 1);
      localStorage.setItem("mestre_initiative", JSON.stringify(data));
      renderInitiative();
    };
    li.appendChild(del);
    initiativeList.appendChild(li);
  });
}

addInitiative.addEventListener("click", () => {
  const name = initiativeInput.value.trim();
  if (!name) return;
  const data = JSON.parse(localStorage.getItem("mestre_initiative") || "[]");
  data.push(name);
  localStorage.setItem("mestre_initiative", JSON.stringify(data));
  initiativeInput.value = "";
  renderInitiative();
});

clearInitiative.addEventListener("click", () => {
  if (confirm("Limpar toda a lista de iniciativa?")) {
    localStorage.removeItem("mestre_initiative");
    renderInitiative();
  }
});

renderInitiative();

// --- Rolagens ---
const diceButtons = document.querySelectorAll(".dice-buttons button");
const diceResult = document.getElementById("diceResult");

diceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sides = parseInt(btn.dataset.dice);
    const roll = Math.floor(Math.random() * sides) + 1;
    diceResult.textContent = `🎲 Rolou ${btn.textContent}: ${roll}`;
  });
});
