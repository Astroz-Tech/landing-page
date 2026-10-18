import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n";

export type SocialEntry = CollectionEntry<"social">;

export async function getSocialPosts(lang: Lang): Promise<SocialEntry[]> {
  const posts = await getCollection(
    "social",
    ({ data, id }) => id.startsWith(`${lang}/`) && !data.draft,
  );
  return posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}
