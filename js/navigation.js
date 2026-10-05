export function initNavigation() {
  const toggle = document.querySelector(".header__toggle");
  const nav = document.querySelector("#navigation");
  const desktop = matchMedia("(min-width: 64rem)");
  let open = false;
  const sync = () => {
    nav.hidden = !desktop.matches && !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open
      ? "Zamknij menu"
      : "Otwórz menu";
  };
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    open = !open;
    sync();
  });
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    open = false;
    sync();
    const target = document.querySelector(link.getAttribute("href"));
    if (target && !desktop.matches) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && open) {
      open = false;
      sync();
      toggle.focus();
    }
  });
  desktop.addEventListener("change", () => {
    if (!desktop.matches && nav.contains(document.activeElement))
      toggle.focus();
    open = false;
    sync();
  });
  sync();
}
