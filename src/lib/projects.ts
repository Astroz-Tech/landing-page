import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n";

export type ProjectEntry = CollectionEntry<"projects">;

export async function getProjects(lang: Lang): Promise<ProjectEntry[]> {
  const projects = await getCollection("projects", ({ id }) => id.startsWith(`${lang}/`));
  return projects.sort(
    (a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title),
  );
}
