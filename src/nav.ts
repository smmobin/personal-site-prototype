import { getDictionary } from "./i18n";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

let activeSection = "";

export function refreshNavActive(): void {
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.classList.toggle(
      "is-active",
      activeSection !== "top" && link.getAttribute("data-nav-link") === activeSection,
    );
  });
}

export function initNav(): void {
  const header = document.querySelector("[data-header]");
  const drawer = document.querySelector<HTMLElement>("[data-drawer]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  if (!drawer || !toggle) return;

  const panel = drawer.querySelector<HTMLElement>(".drawer-panel");

  const syncToggleLabel = (open: boolean): void => {
    const dict = getDictionary();
    toggle.setAttribute("aria-label", open ? dict.header.menuClose : dict.header.menuOpen);
  };

  const setOpen = (open: boolean, restoreFocus = true): void => {
    drawer.classList.toggle("is-open", open);
    drawer.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-locked", open);
    syncToggleLabel(open);
    if (open) {
      const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    } else if (restoreFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(!drawer.classList.contains("is-open"));
  });

  drawer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest("[data-drawer-close]") || target?.matches("[data-drawer-close]")) {
      setOpen(false);
    }
    if (target?.closest("a[href^='#']")) setOpen(false, false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      setOpen(false);
      return;
    }
    if (event.key !== "Tab" || !drawer.classList.contains("is-open") || !panel) return;
    const nodes = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
    );
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const onScroll = (): void => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

export function initScrollSpy(): void {
  const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
  const sync = (id: string): void => {
    activeSection = id;
    refreshNavActive();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) sync(visible.target.id);
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
}
