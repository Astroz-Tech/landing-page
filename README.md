# Astroz

Static, bilingual (EN/ID) company profile and blog for Astroz.

- Astro 7, `output: "static"`, prerendered routes only
- Svelte 5 islands for the theme toggle and the mobile sheet
- Tailwind CSS v4 with shadcn-svelte semantic tokens
- Content collections for blog entries and projects
- Hosted on Cloudflare Pages (`bun run build` → `dist/`)

## Commands

```bash
bun install
bun run dev        # astro dev
bun run build      # astro build -> dist/
bun run preview    # astro preview
bun run check      # astro check; zero errors required
```

## Layout

```
astro.config.mjs        site, i18n, fonts, Tailwind, $lib aliases, sitemap
components.json         shadcn-svelte aliases
src/
  components/atoms/     mdx-a, mdx-img, code-block
  components/molecules/ section-header, blog-row, project-card, theme-toggle
  components/organisms/ site-header, site-footer, mobile-nav
  components/ui/        shadcn-svelte primitives
  components/mdx-components.ts
  content.config.ts     collection schemas
  i18n/{en,id}.json     dictionaries, identical key sets
  layouts/              base-layout.astro, post-layout.astro (templates)
  lib/                  site, blog, projects, feed, i18n-links, og-font,
                        html-entities, utils
  pages/                routes, feeds, robots, OG images
  styles/global.css     design tokens
public/
  _redirects            Cloudflare redirects
  hero.png              home hero image
  blog/{en,id}/         blog entries (MDX; may be empty)
  projects/{en,id}/     project entries (MDX)
  fonts/                Plus Jakarta Sans TTFs for OG images
```

## Conventions

`AGENTS.md` is authoritative for framework, layout, commands, and conventions; `DESIGN.md` is
authoritative for appearance, voice, and acceptance criteria. Read both before changing anything.

Content lives in MDX frontmatter. Blog entries are locale-scoped by folder, so an entry without a
translation never appears under the other locale's URL. The blog collection may be empty; `/blog`
then renders its empty panel. Projects have no detail route — the index card links out to `url`.

## Deployment

Cloudflare Pages: build command `bun run build`, output directory `dist/`. Set
`BUN_VERSION=1.4.3` in the Pages project environment so CI matches local.
