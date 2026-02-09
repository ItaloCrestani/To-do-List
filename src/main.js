import { toggle } from "./toggle.js";
import { marcar } from "./ui.js";
import { addTask, removeTask, editTask, markTask, removeConc, renderTasks, listaTarefas } from "./tasks.js";
import { loadList } from "./localStorage.js";

loadList();
renderTasks(listaTarefas);
toggle();
addTask();
removeTask();
editTask();
markTask();
marcar();
removeConc();