# AGENTS.md

Operating rules for coding agents in this repository. Read this file and `DESIGN.md` before
changing anything.

## 1. What this repository is

Astroz is a community technology movement. This repository is its company profile and blog: a
static, bilingual (EN/ID), light/dark site. It is not a personal portfolio, dashboard, or CMS.

Three top-level routes only: **Home**, **Blog**, **Projects**. There is no photo gallery and no
donate route.

`DESIGN.md` is the authority for visual system, tokens, typography, layout, components, voice and
copy, information architecture, i18n copy, accessibility, SEO, performance, and acceptance
criteria. This file is the authority for stack, structure, commands,
and engineering conventions. If the two disagree about appearance or wording, `DESIGN.md` wins. If
`DESIGN.md` names a path or command that does not exist, this file wins.

## 2. Stack (locked)

| Concern | Decision |
|---|---|
| Framework | Astro 7, `output: "static"` |
| Integrations | `@astrojs/mdx`, `@astrojs/svelte`, `@astrojs/sitemap` |
| Interactivity | Svelte 5, only the two islands in §4 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, `@tailwindcss/typography`, `tw-animate-css` |
| Components | shadcn-svelte: `button`, `badge`, `card`, `sheet`, `separator` |
| Icons | `@lucide/astro` in `.astro`; `@lucide/svelte` in Svelte |
| Content | Astro content collections with `glob()` and Zod; MDX in `public/blog` and `public/projects` |
| Code highlighting | `sugar-high` at build time |
| Feeds | `feed` |
| OG images | `satori` + `@resvg/resvg-js` |
| Package manager | Bun 1.4.3 (`"packageManager": "bun@1.4.3"`); `bun.lock` is the only lockfile |
| TypeScript | strict (`astro/tsconfigs/strict`); no `any`, no `as Type` |
| Hosting | Cloudflare Pages: build `bun run build`, output `dist/` |

Do not add React, Next.js, `next/*`, `react-*`, `next-themes`, `next-mdx-remote`, `animejs`,
`@vercel/*`, or a second design system.

## 3. Change rules

- **Propose before code.** For any code change, first present a concrete proposal: files to
  change, approach, and verification. Wait for human approval. Read-only investigation is allowed.
- **Simplest change wins.** Do not add an abstraction, wrapper, dependency, state layer, config, or
  file until a concrete need exists. Reuse existing helpers. Delete dead code and obsolete paths
  instead of keeping them "for reference".
- **No unsafe types.** Never write `any` or `as Type` assertions. Use Zod schemas, discriminated
  unions, type guards (`isLang`), and a local `Props` type for every `.astro` component that reads
  `Astro.props`. `as const` is allowed. Do not add `@ts-ignore` or `@ts-expect-error`.
- **One small file beats a framework.** If a change needs more than one new file, justify it in the
  proposal.

## 4. Rendering rules

- `.astro` by default. Every route is prerendered; there is no server runtime.
- Exactly two hydrated islands:
  - `src/components/molecules/theme-toggle.svelte` — `client:load`
  - `src/components/organisms/mobile-nav.svelte` — `client:load`, wraps the shadcn-svelte `Sheet`
- No other component gets a `client:*` directive without a documented reason in the proposal and
  commit message.
- Language switching is an `<a>` to the equivalent locale path. No JavaScript, no spinner, no flag
  emoji.
- Content must be visible without JavaScript. No `opacity: 0` + reveal scripts.
- No animation library. CSS transitions only, 150–250ms, disabled under
  `prefers-reduced-motion: reduce`.

## 5. Project structure (atomic design)

```
astro.config.mjs            # site, i18n, fonts, Tailwind, $lib aliases, sitemap
components.json             # shadcn-svelte aliases
src/
  components/
    atoms/                  # single elements: mdx-a, mdx-img, code-block
    molecules/              # composed units: section-header, blog-row, project-card,
                            # theme-toggle
    organisms/              # page regions: site-header, site-footer, mobile-nav
    ui/                     # vendored shadcn-svelte primitives; do not hand-edit
    mdx-components.ts       # MDX component registry
  layouts/                  # templates: base-layout, post-layout
  lib/                      # site, blog, projects, feed, i18n-links, og-font,
                            # html-entities, utils
  pages/                    # routes, feeds, robots, OG endpoint
  i18n/{en,id}.json
  i18n/index.ts
  styles/global.css
  content.config.ts
public/
  _redirects
  opengraph-image.png
  fonts/                    # vendored Plus Jakarta Sans TTFs (400, 600) for OG rendering
  blog/{en,id}/*.mdx        # blog entries (may be empty)
  projects/{en,id}/*.mdx    # project entries
```

Routes:

```
src/pages/
  index.astro                # redirect to /en
  404.astro
  [lang]/index.astro
  [lang]/blog/index.astro
  [lang]/blog/[slug].astro
  [lang]/projects/index.astro
  og/[...slug].png.ts
  robots.txt.ts
  rss.xml.ts
  atom.xml.ts
  feed.json.ts
```

Rules:

- Application code lives in `src/`. Tooling/config files (`astro.config.mjs`, `components.json`,
  `tsconfig.json`, `package.json`) stay at the repository root. Non-code assets and MDX content
  live in `public/`.
- Components follow atoms → molecules → organisms. Templates are `src/layouts`; routes are
  `src/pages`. Do not add a second component tree.
- `ui/` is the only vendored tree. Do not restructure or hand-edit it. Add primitives with
  `bunx shadcn-svelte@latest add <component>`.
- Blog and project MDX are locale-scoped by folder: `public/blog/{en,id}/<slug>.mdx` and
  `public/projects/{en,id}/<slug>.mdx`. An entry with no translation does not appear in that
  locale's index; never render untranslated content under a translated URL.
- `public/` is copied verbatim, so MDX files are also reachable at
  `/blog/<lang>/<slug>.mdx` and `/projects/<lang>/<slug>.mdx`. Frontmatter and bodies are public;
  never put secrets in them.
- Delete a legacy file when its replacement lands. No parallel implementations.

`public/_redirects` contains exactly:

```
/ /en 302
/rss /rss.xml 301
/atom /atom.xml 301
/feed /rss.xml 301
/json /feed.json 301
/sitemap.xml /sitemap-index.xml 301
```

## 6. Styling and components

- Every color, radius, and font resolves through the shadcn semantic tokens in
  `src/styles/global.css` (DESIGN §5). Never hardcode hex, `oklch()`, or `rgb()` in a component.
- Never reintroduce `--color-brutal-*`, `--shadow-brutal*`, 4px borders, offset shadows, Oswald, or
  colored section bands.
- Use `cn()` from `src/lib/utils.ts` for conditional classes.
- Typography, spacing, radii, and component anatomy come from DESIGN §6–§8. Do not invent a second
  scale.
- Prose: `prose prose-neutral dark:prose-invert max-w-[65ch]`.
- shadcn-svelte: `components.json` aliases are `$lib/components`, `$lib/components/ui`,
  `$lib/utils`, `$lib/hooks`. `bunx shadcn-svelte@latest init` overwrites `src/styles/global.css`;
  do not run it again without restoring the tokens.
- Code blocks: `markdown.syntaxHighlight: false`; render MDX code through
  `src/components/atoms/code-block.astro`, which calls `sugar-high`'s `highlight()` at build time.
- Icons: Lucide, 16px, `stroke-width={1.5}`, 8px gap. Never use emoji as an icon.

## 7. Internationalization

- Locales: `en` (default), `id`. `prefixDefaultLocale: true`; `/en/...` and `/id/...` are
  canonical. `/` redirects to `/en` via `src/pages/index.astro` and `public/_redirects`.
- All UI copy comes from `src/i18n/en.json` and `src/i18n/id.json` through
  `useTranslations(lang)` in `src/i18n/index.ts`. Never hardcode user-facing strings in a
  component.
- Both dictionaries must have identical key sets; `src/i18n/index.ts` throws at build time when
  they differ.
- Resolve the locale with `isLang(Astro.params.lang)`; unknown segments must not render.
- Build internal links with `getRelativeLocaleUrl()` from `astro:i18n`. Never concatenate
  `/${lang}/...` by hand.
- Set `<html lang={lang}>`.
- Format dates and numbers with `Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", ...)`. No
  relative dates; they freeze at build time.
- The language toggle links to the same path in the other locale. If that entry does not exist,
  link to the other locale's section index. `getLocaleSwitchHref()` in `src/lib/i18n-links.ts`
  owns this logic; it is synchronous and only distinguishes the `/blog` and `/projects` sections.

## 8. Content

- `src/content.config.ts` defines `blog` and `projects` with `glob()` loaders and Zod schemas.
  Invalid frontmatter fails the build.
- Blog frontmatter: `title`, `summary`, `publishedAt` (ISO date), `draft` (optional boolean,
  default `false`). The blog collection may be empty; `/blog` renders its empty panel instead.
- Project frontmatter: `title`, `summary`, `role`, `year` (integer), `stack` (string array,
  default `[]`), `url` (optional, `https://` only). Projects have no detail route: the index card
  is the whole presentation, linking out to `url` when it exists.
- Delete a legacy file when its replacement lands. No parallel implementations.

## 9. Accessibility, SEO, performance

- Meet DESIGN §11 (WCAG 2.2 AA): one `h1`, one `header`/`nav`/`main`/`footer`, skip link to
  `#main`, visible focus, 44px touch targets, meaningful `alt`, focus trap in the sheet,
  reduced-motion support.
- Every page sets a canonical URL including the locale and `hreflang` alternates for `en`, `id`,
  and `x-default`. `src/layouts/base-layout.astro` owns this.
- Absolute URLs come from `Astro.site` (set `site` in `astro.config.mjs`). Never hardcode a domain
  in a component.
- JSON-LD: `Organization` on home, `BlogPosting` on posts (author `Organization`).
- Feeds: keep `/rss.xml`, `/atom.xml`, `/feed.json`; `public/_redirects` covers `/rss`, `/atom`,
  `/feed`, `/json`.
- `@astrojs/sitemap` generates `sitemap-index.xml`; `public/_redirects` covers `/sitemap.xml`.
- No client JavaScript on static routes beyond the two islands. Budgets: LCP < 2.0s on throttled
  4G, CLS < 0.05, INP < 200ms (DESIGN §13).
- Images: explicit dimensions and `sizes`; lazy-load below the fold; reserve media frames to
  prevent CLS.

## 10. Commands and done criteria

```bash
bun install
bun run dev        # astro dev
bun run build      # astro build -> dist/
bun run preview    # astro preview
bun run check      # astro check; zero errors required
bunx shadcn-svelte@latest add <component>
```

Cloudflare Pages: build command `bun run build`, output directory `dist/`, `BUN_VERSION=1.4.3`.

A change is done when:

1. The proposal was approved.
2. `bun run check` and `bun run build` pass.
3. The affected route exists in `dist/` with the expected HTML.
4. No item in DESIGN §15 regresses.
5. No forbidden dependency, token, `any`, `as Type` assertion, or unapproved `client:*` directive
   was added.
