import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import { getLang, isLang, setLang } from "./i18n";
import { renderAll, type WorkViewState } from "./render";
import { initNav, initScrollSpy, refreshNavActive } from "./nav";
import { initWork } from "./work";
import { initForm } from "./form";

const workState: WorkViewState = {
  filter: "all",
  selectedId: null,
};

function paint(): void {
  renderAll(workState);
  refreshNavActive();
  document.documentElement.classList.add("is-ready");
}

setLang(getLang());
paint();
initNav();
initScrollSpy();
initWork(workState);
initForm();

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  const langBtn = target?.closest<HTMLButtonElement>("[data-lang]");
  if (langBtn?.dataset.lang && isLang(langBtn.dataset.lang)) {
    setLang(langBtn.dataset.lang);
    paint();
    document.dispatchEvent(new Event("localechange"));
    return;
  }

  if (target?.closest("a[data-placeholder]")) {
    event.preventDefault();
  }
});
