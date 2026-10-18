import type { APIRoute } from "astro";
import { buildFeed } from "../lib/feed";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("Set `site` in astro.config.mjs");
  const feed = await buildFeed(site);
  return new Response(feed.json1(), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
