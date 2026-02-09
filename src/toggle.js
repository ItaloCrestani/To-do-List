export function toggle() {
  const mode = document.querySelector(".mode");
  const icon = document.querySelector(".icon");

  mode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      icon.name = "sunny-outline";
      return;
    }

    icon.name = "moon-outline";
  });
}
