import { getRelativeLocaleUrl } from "astro:i18n";
import type { Lang } from "../i18n";

export function getLocaleSwitchHref(pathname: string, target: Lang): string {
  const [lang, section] = pathname.split("/").filter(Boolean);
  if (lang !== "en" && lang !== "id") return getRelativeLocaleUrl(target);
  if (section === "blog" || section === "projects") return getRelativeLocaleUrl(target, section);
  return getRelativeLocaleUrl(target);
}
