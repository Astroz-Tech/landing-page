import { getCollection, type CollectionEntry } from "astro:content";

export type SocialEntry = CollectionEntry<"social">;

export async function getSocialPosts(): Promise<SocialEntry[]> {
  const posts = await getCollection("social", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}
