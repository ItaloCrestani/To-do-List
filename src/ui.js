import { countPending, setFiltro } from "./tasks.js";

export function marcar() {
  const btnFiltro = document.querySelectorAll(".btn-filtro");

  btnFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      for (const botoes of btnFiltro) {
        botoes.classList.remove("marcada");
      }

      botao.classList.add("marcada");

      if (botao.classList.contains("pendentes")) {
        setFiltro("pendentes");
      }

      if (botao.classList.contains("concluidas")) {
        setFiltro("concluidas");
      }

      if (botao.classList.contains("todas")) {
        setFiltro("todas");
      }
    });
  });
}

export function updateCount() {
  const areaPending = document.querySelectorAll(".qtd-pend");

  areaPending.forEach((area) => {
    area.innerHTML = countPending();
  });
}
