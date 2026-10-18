import { getDictionary, getLang, localizeDigits } from "./i18n";
import type { Dictionary, Lang, NavKey } from "./i18n/types";
import { filterProjects, WORK_FILTERS, type WorkFilter } from "./lib/workFilter";

const NAV_ORDER: NavKey[] = [
  "about",
  "work",
  "experience",
  "skills",
  "writing",
  "contact",
];

function lookup(dict: Dictionary, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (typeof current !== "object" || current === null) return undefined;
    return (current as Record<string, unknown>)[key];
  }, dict);
}

function fillStatic(dict: Dictionary, lang: Lang): void {
  document.title = dict.meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", dict.meta.description);

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const path = el.dataset.i18n;
    if (!path) return;
    const value = lookup(dict, path);
    if (typeof value === "string") {
      el.textContent = localizeDigits(value, lang);
    }
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach((el) => {
    const path = el.dataset.i18nAria;
    if (!path) return;
    const value = lookup(dict, path);
    if (typeof value === "string") el.setAttribute("aria-label", value);
  });

  const menuOpen = lookup(dict, "header.menuOpen");
  const menuClose = lookup(dict, "header.menuClose");
  const menuToggle = document.querySelector<HTMLElement>("[data-menu-toggle]");
  if (menuToggle && typeof menuOpen === "string" && typeof menuClose === "string") {
    menuToggle.dataset.openLabel = menuOpen;
    menuToggle.dataset.closeLabel = menuClose;
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", expanded ? menuClose : menuOpen);
  }
}

function renderNav(dict: Dictionary): void {
  const markup = NAV_ORDER.map(
    (key) => `<a href="#${key}" data-nav-link="${key}">${dict.nav[key]}</a>`,
  ).join("");
  document.querySelectorAll("[data-nav]").forEach((nav) => {
    nav.innerHTML = markup;
  });
}

function renderStats(dict: Dictionary): void {
  const root = document.querySelector("[data-hero-stats]");
  if (!root) return;
  root.innerHTML = dict.hero.stats
    .map(
      (stat) =>
        `<div><dt><strong>${stat.value}</strong></dt><dd><span>${stat.label}</span></dd></div>`,
    )
    .join("");
}

function renderPrinciples(dict: Dictionary): void {
  const root = document.querySelector("[data-principles]");
  if (!root) return;
  root.innerHTML = dict.about.principles
    .map(
      (item) =>
        `<article class="principle"><h3>${item.title}</h3><p>${item.body}</p></article>`,
    )
    .join("");
}

function renderSocial(dict: Dictionary): void {
  const markup = dict.contact.social
    .map(
      (item) =>
        `<a href="${item.href}" data-placeholder="true">${item.name}</a>`,
    )
    .join("");
  document.querySelectorAll("[data-social]").forEach((node) => {
    node.innerHTML = markup;
  });
}

function renderExperience(dict: Dictionary): void {
  const root = document.querySelector("[data-timeline]");
  if (!root) return;
  root.innerHTML = dict.experience.items
    .map(
      (item) => `
        <li class="timeline-item" data-kind="${item.kind}">
          <div class="timeline-top">
            <strong>${item.title}</strong>
            <span>${item.period}</span>
          </div>
          <p class="timeline-org">${item.org}</p>
          <p>${item.body}</p>
        </li>`,
    )
    .join("");
}

function renderSkills(dict: Dictionary): void {
  const root = document.querySelector("[data-skills]");
  if (!root) return;
  root.innerHTML = dict.skills.groups
    .map(
      (group) => `
        <article class="skill-group">
          <h3>${group.title}</h3>
          ${group.items
            .map(
              (item) => `
                <div class="skill-row">
                  <div class="skill-row-top"><span>${item.name}</span></div>
                  <div class="bar" data-level="${item.level}"><span></span></div>
                </div>`,
            )
            .join("")}
        </article>`,
    )
    .join("");
}

function renderNotes(dict: Dictionary): void {
  const root = document.querySelector("[data-notes]");
  if (!root) return;
  root.innerHTML = dict.writing.notes
    .map(
      (note) => `
        <article class="note-card">
          <div class="note-meta">
            <span>${note.date}</span>
            <span>${note.read}</span>
          </div>
          <h3>${note.title}</h3>
          <p>${note.excerpt}</p>
        </article>`,
    )
    .join("");
}

function renderSubjects(dict: Dictionary): void {
  const select = document.querySelector<HTMLSelectElement>("[data-subject]");
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value=""></option>${dict.contact.subjects
    .map((item) => `<option value="${item.value}">${item.label}</option>`)
    .join("")}`;
  if ([...select.options].some((option) => option.value === current)) {
    select.value = current;
  }
}

export function renderWorkGrid(
  dict: Dictionary,
  filter: WorkFilter,
  selectedId: string | null,
): void {
  const root = document.querySelector("[data-work-grid]");
  const empty = document.querySelector("[data-work-empty]");
  if (!root) return;

  const projects = filterProjects(dict.work.projects, filter);

  root.innerHTML = projects
    .map((project) => {
      const tags = project.tags
        .map((tag) => `<span class="tag">${dict.work.filters[tag]}</span>`)
        .join("");
      const selected = project.id === selectedId ? " is-selected" : "";
      return `
        <button class="work-card${selected}" type="button" data-work-id="${project.id}" aria-expanded="${project.id === selectedId}">
          <div class="work-card-meta">
            <span>${project.role}</span>
            <span>${project.year}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="tags">${tags}</div>
        </button>`;
    })
    .join("");

  empty?.classList.toggle("is-visible", projects.length === 0);
}

export function renderWorkFilters(
  dict: Dictionary,
  filter: WorkFilter,
): void {
  const root = document.querySelector("[data-work-filters]");
  if (!root) return;
  const keys = WORK_FILTERS;
  root.innerHTML = keys
    .map(
      (key) =>
        `<button class="chip" type="button" data-filter="${key}" aria-pressed="${filter === key}">${dict.work.filters[key]}</button>`,
    )
    .join("");
}

export function renderWorkDetail(
  dict: Dictionary,
  selectedId: string | null,
): void {
  const root = document.querySelector<HTMLElement>("[data-work-detail]");
  if (!root) return;
  const project = dict.work.projects.find((item) => item.id === selectedId);
  if (!project) {
    root.hidden = true;
    root.classList.remove("is-open");
    root.innerHTML = "";
    return;
  }

  root.hidden = false;
  root.classList.add("is-open");
  root.innerHTML = `
    <div class="work-detail-head">
      <div>
        <p class="label">${project.year} · ${project.role}</p>
        <h3>${project.title}</h3>
      </div>
      <button class="btn btn-ghost" type="button" data-work-close>${dict.work.close}</button>
    </div>
    <div class="detail-grid">
      <div>
        <h4 class="label">${dict.work.detailProblem}</h4>
        <p>${project.problem}</p>
      </div>
      <div>
        <h4 class="label">${dict.work.detailApproach}</h4>
        <p>${project.approach}</p>
      </div>
      <div>
        <h4 class="label">${dict.work.detailOutcome}</h4>
        <p>${project.outcome}</p>
      </div>
    </div>`;
}

export function updateLangButtons(lang: Lang): void {
  document.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
}

export interface WorkViewState {
  filter: WorkFilter;
  selectedId: string | null;
}

export function renderAll(work: WorkViewState): Dictionary {
  const lang = getLang();
  const dict = getDictionary(lang);
  fillStatic(dict, lang);
  renderNav(dict);
  renderStats(dict);
  renderPrinciples(dict);
  renderSocial(dict);
  renderExperience(dict);
  renderSkills(dict);
  renderNotes(dict);
  renderSubjects(dict);
  renderWorkFilters(dict, work.filter);
  renderWorkGrid(dict, work.filter, work.selectedId);
  renderWorkDetail(dict, work.selectedId);
  updateLangButtons(lang);
  return dict;
}
