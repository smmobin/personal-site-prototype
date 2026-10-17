import { en } from "./en";
import { fa } from "./fa";
import type { Dictionary, Lang } from "./types";

export type { Dictionary, Lang } from "./types";

const STORAGE_KEY = "persona-lang";
const dictionaries: Record<Lang, Dictionary> = { en, fa };

export function isLang(value: string | null): value is Lang {
  return value === "en" || value === "fa";
}

export function getLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

export function setLang(lang: Lang): Dictionary {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  return dictionaries[lang];
}

export function getDictionary(lang: Lang = getLang()): Dictionary {
  return dictionaries[lang];
}

export function localizeDigits(value: string, lang: Lang): string {
  if (lang !== "fa") return value;
  return value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)] ?? digit);
}
