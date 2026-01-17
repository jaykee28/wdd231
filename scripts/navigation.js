const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("primaryNav");

if (menuButton && nav) {
  const toggleMenu = () => {
    nav.classList.toggle("open");
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !expanded);
  };

  menuButton.addEventListener("click", toggleMenu);
  menuButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });
}
