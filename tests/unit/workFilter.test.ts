import { describe, expect, it } from "vitest";
import { en } from "../../src/i18n/en";
import {
  filterProjects,
  isWorkFilter,
  resolveSelectedId,
} from "../../src/lib/workFilter";

describe("workFilter", () => {
  it("recognizes only known lanes", () => {
    expect(isWorkFilter("all")).toBe(true);
    expect(isWorkFilter("ai")).toBe(true);
    expect(isWorkFilter("other")).toBe(false);
    expect(isWorkFilter(undefined)).toBe(false);
  });

  it("keeps every project on all, and AI-tagged ones on the ai lane", () => {
    const all = filterProjects(en.work.projects, "all");
    const ai = filterProjects(en.work.projects, "ai");
    expect(all).toHaveLength(6);
    expect(ai.map((project) => project.id).sort()).toEqual(["nava", "paper"]);
  });

  it("clears a selection that is hidden by the next filter", () => {
    expect(resolveSelectedId(en.work.projects, "ai", "shade")).toBeNull();
    expect(resolveSelectedId(en.work.projects, "ai", "nava")).toBe("nava");
  });
});
