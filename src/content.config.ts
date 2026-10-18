import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./public/blog", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./public/projects", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().int(),
    url: z
      .string()
      .refine((value) => value.startsWith("https://"), "url must start with https://")
      .optional(),
  }),
});

const social = defineCollection({
  loader: glob({ base: "./public/social", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    platform: z.enum(["x", "github", "instagram", "linkedin"]),
    url: z
      .string()
      .refine((value) => value.startsWith("https://"), "url must start with https://"),
    image: z
      .string()
      .refine((value) => value.startsWith("/social/images/"), "image must start with /social/images/"),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects, social };
