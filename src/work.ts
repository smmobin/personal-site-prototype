import { getDictionary } from "./i18n";
import { isWorkFilter, resolveSelectedId } from "./lib/workFilter";
import {
  renderWorkDetail,
  renderWorkFilters,
  renderWorkGrid,
  type WorkViewState,
} from "./render";

export function initWork(state: WorkViewState): void {
  const section = document.querySelector("#work");
  if (!section) return;

  const paint = (): void => {
    const dict = getDictionary();
    renderWorkFilters(dict, state.filter);
    renderWorkGrid(dict, state.filter, state.selectedId);
    renderWorkDetail(dict, state.selectedId);
  };

  section.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const filterBtn = target?.closest<HTMLElement>("[data-filter]");
    if (filterBtn) {
      const next = filterBtn.dataset.filter;
      if (!isWorkFilter(next)) return;
      state.filter = next;
      state.selectedId = resolveSelectedId(
        getDictionary().work.projects,
        next,
        state.selectedId,
      );
      paint();
      return;
    }

    if (target?.closest("[data-work-close]")) {
      state.selectedId = null;
      paint();
      return;
    }

    const card = target?.closest<HTMLElement>("[data-work-id]");
    if (!card?.dataset.workId) return;
    state.selectedId = state.selectedId === card.dataset.workId ? null : card.dataset.workId;
    paint();
    if (state.selectedId) {
      document.querySelector("[data-work-detail]")?.scrollIntoView({ block: "nearest" });
    }
  });
}
