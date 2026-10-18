import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;

export async function getProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection("projects");
  return projects.sort(
    (a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title),
  );
}
