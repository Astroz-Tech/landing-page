import en from "./en.json";
import id from "./id.json";

export const locales = ["en", "id"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "en";

const dictionaries: Record<Lang, Record<string, string>> = { en, id };

const enKeys = Object.keys(en).sort();
const idKeys = Object.keys(id).sort();
if (enKeys.length !== idKeys.length || enKeys.some((key, index) => key !== idKeys[index])) {
  throw new Error("i18n dictionaries must have identical keys");
}

export function useTranslations(lang: Lang) {
  return (key: string): string => {
    const value = dictionaries[lang][key];
    if (value === undefined) {
      throw new Error(`Missing translation for "${key}" in "${lang}"`);
    }
    return value;
  };
}

export function isLang(value: string | undefined): value is Lang {
  return value === "en" || value === "id";
}
