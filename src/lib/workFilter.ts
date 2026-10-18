import type { WorkTag } from "../i18n/types";

export type WorkFilter = "all" | WorkTag;

export const WORK_FILTERS: WorkFilter[] = ["all", "product", "interface", "ai"];

export function isWorkFilter(value: string | undefined): value is WorkFilter {
  return (
    value === "all" || value === "product" || value === "interface" || value === "ai"
  );
}

export function filterProjects<T extends { tags: WorkTag[] }>(
  projects: T[],
  filter: WorkFilter,
): T[] {
  if (filter === "all") return projects;
  return projects.filter((project) => project.tags.includes(filter));
}

export function resolveSelectedId<T extends { id: string; tags: WorkTag[] }>(
  projects: T[],
  filter: WorkFilter,
  selectedId: string | null,
): string | null {
  if (!selectedId) return null;
  return filterProjects(projects, filter).some((project) => project.id === selectedId)
    ? selectedId
    : null;
}
