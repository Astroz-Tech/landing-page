import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n";

export type BlogEntry = CollectionEntry<"blog">;

export function blogEntryLang(entry: BlogEntry): Lang {
  return entry.id.startsWith("id/") ? "id" : "en";
}

export function blogEntrySlug(entry: BlogEntry): string {
  return entry.id.split("/").slice(1).join("/");
}

export async function getBlogPosts(lang: Lang): Promise<BlogEntry[]> {
  const posts = await getCollection(
    "blog",
    ({ data, id }) => id.startsWith(`${lang}/`) && !data.draft,
  );
  return posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
