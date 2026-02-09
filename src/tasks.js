import { saveList } from "./localStorage.js";
import { updateCount } from "./ui.js";

export let listaTarefas = [];
let filtroAtual = "todas";

export function setFiltro(novoFiltro) {
  filtroAtual = novoFiltro;
  filtrar();
}

function handleTask() {
  const inputTarefa = document.querySelector(".input-tarefa");

  const tarefa = inputTarefa.value;

  if (!tarefa || !tarefa.trim()) return;

  let objeto = {
    id: Date.now(),
    text: tarefa.trim(),
    completed: false,
  };

  listaTarefas.push(objeto);
  filtrar();

  inputTarefa.focus();
  inputTarefa.value = "";
}

export function addTask() {
  const inputTarefa = document.querySelector(".input-tarefa");
  const btnAdd = document.querySelector(".adicionar");

  btnAdd.addEventListener("click", handleTask);

  inputTarefa.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleTask();
    }
  });
}

export function removeTask() {
  const tarefasArea = document.querySelector(".tarefas");

  tarefasArea.addEventListener("click", (e) => {
    const el = e.target;

    const btn = el.closest(".excluir");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    listaTarefas = listaTarefas.filter((task) => task.id !== id);

    filtrar();
  });
}

export function editTask() {
  const tarefasArea = document.querySelector(".tarefas");

  tarefasArea.addEventListener("click", (e) => {
    const el = e.target;

    const btn = el.closest(".editar");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    const taskSelect = listaTarefas.find((task) => task.id === id);

    const novoValor = prompt(`Alterar tarefa: ${taskSelect.text}`);
    if (!novoValor || !novoValor.trim()) return;

    taskSelect.text = novoValor.trim();

    filtrar();
  });
}

export function markTask() {
  const tarefasArea = document.querySelector(".tarefas");

  tarefasArea.addEventListener("click", (e) => {
    const checkBox = e.target.closest(".check-box");
    if (!checkBox) return;

    const id = Number(checkBox.dataset.id);

    let task = listaTarefas.find((task) => task.id === id);

    task.completed = !task.completed;

    filtrar();
  });
}

function filtrar() {
  if (filtroAtual === "pendentes") {
    renderTasks(listaTarefas.filter((task) => !task.completed));
    saveList();
    return;
  }

  if (filtroAtual === "concluidas") {
    renderTasks(listaTarefas.filter((task) => task.completed));
    saveList();
    return;
  }

  renderTasks(listaTarefas);
  saveList();
}

export function removeConc() {
  const btnDel = document.querySelector(".del-conc");

  btnDel.addEventListener("click", () => {
    listaTarefas = listaTarefas.filter((tasks) => !tasks.completed);

    filtrar();
  });
}

export function renderTasks(tasks) {
  const tarefasArea = document.querySelector(".tarefas");

  tarefasArea.innerHTML = "";

  for (const objeto of tasks) {
    const checked = objeto.completed ? "checked" : "";
    const classe = objeto.completed ? "concluida" : "";

    const liHtml = `<li>
                <div class="tarefa-box">
                  <input type="checkbox" class="check-box" data-id="${objeto.id}" ${checked}/>
                  <span class="tarefa ${classe}" title="${objeto.text}">${objeto.text}</span>
                </div>
  
                <div class="utilidades">
                  <button class="editar" data-id="${objeto.id}">
                    <ion-icon name="pencil-outline"></ion-icon>
                  </button>
                  <button class="excluir" data-id="${objeto.id}">
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </div>
              </li>`;

    tarefasArea.innerHTML += liHtml;
  }
  countPending();
  updateCount();
}

export function countPending() {
  return listaTarefas.filter((task) => !task.completed).length;
}

export function setListTasks(tasks) {
  listaTarefas.length = 0;
  listaTarefas.push(...tasks);
}
