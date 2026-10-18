import { Feed } from "feed";
import { site } from "./site";
import { getBlogPosts } from "./blog";

export async function buildFeed(baseUrl: URL) {
  const feed = new Feed({
    title: site.name,
    description: site.description,
    id: baseUrl.href,
    link: baseUrl.href,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${site.name}`,
    generator: "Astroz",
    feedLinks: {
      rss: new URL("/rss.xml", baseUrl).href,
      atom: new URL("/atom.xml", baseUrl).href,
      json: new URL("/feed.json", baseUrl).href,
    },
  });

  for (const post of await getBlogPosts()) {
    const link = new URL(`/blog/${post.id}/`, baseUrl).href;
    feed.addItem({
      title: post.data.title,
      id: link,
      link,
      description: post.data.summary,
      date: post.data.publishedAt,
    });
  }

  return feed;
}
