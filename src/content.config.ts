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
    role: z.string(),
    year: z.number().int(),
    stack: z.array(z.string()).default([]),
    url: z
      .string()
      .refine((value) => value.startsWith("https://"), "url must start with https://")
      .optional(),
  }),
});

export const collections = { blog, projects };
