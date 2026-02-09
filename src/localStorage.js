import { listaTarefas, setListTasks } from "./tasks.js";

export function saveList() {
  const tasksJSON = JSON.stringify(listaTarefas);
  localStorage.setItem("tasks", tasksJSON);
}

export function loadList() {
  const savedTasks = localStorage.getItem("tasks");

  if (!savedTasks) return;

  const tasks = JSON.parse(savedTasks);

  setListTasks(tasks);
}
3