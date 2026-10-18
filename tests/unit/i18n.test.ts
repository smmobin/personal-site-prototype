import { beforeEach, describe, expect, it } from "vitest";
import { en } from "../../src/i18n/en";
import { fa } from "../../src/i18n/fa";
import { getDictionary, isLang, localizeDigits, setLang } from "../../src/i18n";

describe("i18n", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  });

  it("treats only en and fa as languages", () => {
    expect(isLang("en")).toBe(true);
    expect(isLang("fa")).toBe(true);
    expect(isLang("de")).toBe(false);
  });

  it("maps ASCII digits to Persian digits only in fa", () => {
    expect(localizeDigits("v0.1 · 48", "en")).toBe("v0.1 · 48");
    expect(localizeDigits("v0.1 · 48", "fa")).toBe("v۰.۱ · ۴۸");
  });

  it("keeps FA and EN dictionaries aligned", () => {
    expect(fa.work.projects.map((project) => project.id)).toEqual(
      en.work.projects.map((project) => project.id),
    );
    expect(Object.keys(fa.nav)).toEqual(Object.keys(en.nav));
    expect(Object.keys(fa.contact.errors)).toEqual(Object.keys(en.contact.errors));
  });

  it("persists language and flips document direction", () => {
    setLang("fa");
    expect(localStorage.getItem("persona-lang")).toBe("fa");
    expect(document.documentElement.lang).toBe("fa");
    expect(document.documentElement.dir).toBe("rtl");
    expect(getDictionary().brand).toBe(fa.brand);
  });
});
