# Astroz — Design Specification

**Status:** Current
**Last updated:** 2026-10-17
**Scope:** Visual system, information architecture, page anatomy, copy, and acceptance criteria for the Astroz site.

`AGENTS.md` is the authority for stack, structure, and commands. This file is the authority for
appearance and wording. If they disagree about appearance or copy, this file wins; if this file
names a path or command that does not exist, `AGENTS.md` wins.

---

## 1. Product definition

Astroz is a community technology movement in Indonesia. The site is its company profile and blog:
it states the belief, explains the mission, lists the projects, and publishes writing.

The site is not a personal portfolio, a research lab, a dashboard, or a CMS. There is no photo
gallery and no donation route.

### Goals

1. State the belief within one screen.
2. Explain the mission in the community's own words.
3. List real projects with their role, stack, and destination.
4. Publish blog entries without a rebuild per post beyond the content file.
5. Serve English and Indonesian, light and dark, 360px through desktop.

### Non-goals

- No photo gallery, donation flow, newsletter, or contact form.
- No filters, pagination, tags, categories, or search.
- No project detail pages: the index card is the whole presentation.
- No invented metrics, testimonials, or client logos.
- No second design system alongside the shadcn tokens.
- No third-party embeds, analytics scripts, or animation libraries.

### Audience

| Audience | What they need |
|---|---|
| People who share the belief | A clear statement they recognise |
| Prospective collaborators | The pillars, and a way to make contact |
| Visitors evaluating the projects | What was built, in what role, where to find it |
| Readers of the blog | Entries with a date and a readable measure |

---

## 2. Voice and copy

### Source of truth

The copy is the original Astroz site's copy, restored verbatim. It is not a draft to be improved,
tightened, or rewritten in a different register. If a section needs new words, that is a product
decision, not a copy-editing one.

Two rules follow:

- **Do not paraphrase.** `ASTROZ COMM.`, `OUR MISSION`, `MOVEMENT PILLARS`, and the mission
  paragraphs are the shipped text. Keep the punctuation, including the em dashes and the ampersand.
- **Do not translate the brand furniture.** The nav labels (`Home`, `Blog`, `Projects`, `Donate`)
  and the footer line (`© {year} ALL RIGHTS RESERVED.`) are English on `/id` too, matching the
  shipped site. Body copy, headings, and meta descriptions do localize.

### Voice principles

- **Plain and declarative.** Short sentences. No hedging, no marketing adjectives.
- **First person plural.** "We" and "our", not the institutional passive.
- **Conviction before detail.** Say what is believed, then what is built.
- **Uppercase is a design element, not a typing style.** Section headings are authored in caps in
  the dictionary and rendered as-is. Everything else is sentence case.

### Naming

- Wordmark and all references: **Astroz**. Capital A, lowercase remainder.
- Never "Astroz Research", "Astroz Comm.", or a `RESEARCH` descriptor. `ASTROZ COMM.` survives only
  as the home hero headline, because it is the original site's headline.
- Metadata name: `Astroz`. Domain: `https://astroz.org`.

### Copy that is deliberately not restored

The previous site was built from the Nextfolio template. These strings were template residue, not
Astroz copy, and are excluded:

- The travel-photo gallery and its captions.
- `Getting Started with Nextfolio` and `Custom MDX Examples`.
- The home `meta-description` about a "clean, fast, and lightweight portfolio template".

---

## 3. Information architecture

### Routes

| Route | Purpose | Nav label |
|---|---|---|
| `/[lang]` | Home: hero, mission, pillars, contact | Home |
| `/[lang]/blog` | Blog index: heading, list, empty state | Blog |
| `/[lang]/blog/[slug]` | Blog entry | — |
| `/[lang]/projects` | Project index: heading, card grid | Projects |

Three top-level routes only: **Home**, **Blog**, **Projects**. Contact is a `mailto:` action, not a
fourth route. `/` redirects to `/en`.

```mermaid
flowchart LR
  Home["/[lang]"] --> Blog["/[lang]/blog"]
  Blog --> Post["/[lang]/blog/[slug]"]
  Home --> Projects["/[lang]/projects"]
  Home -. "Contact us" .-> Mail["mailto:"]
```

`/[lang]/blog/[slug]` exists and is wired, but currently emits no pages: the blog collection is
empty. Adding an MDX file under `public/blog/{en,id}/` produces entries with no other change.

### Navigation

**Desktop** — a three-column grid, `md:grid-cols-[1fr_auto_1fr]`, so the link group is centred on
the bar rather than on the space between the wordmark and the controls.

- Left: `AZ` logomark, links to the locale home. `/assets/logo-navy.png` (navy ink) in light
  mode, `/assets/logo-white.png` (foreground ink) in dark mode; swapped with `dark:hidden` /
  `dark:block`, no JavaScript. 32px tall, transparent background, `alt="Astroz"`.
- Centre: `Home`, `Blog`, `Projects` — in that order.
- Right: language toggle (`EN` / `ID`), theme toggle, `Donate` button (`mailto:`).
- Sticky, 64px tall, `bg-background/80`, `backdrop-blur`, 1px bottom border.
- Active route: `text-foreground` with a 2px `primary` underline that wipes in from the left.
- Inactive: `text-muted-foreground`.

**Mobile** — logomark, language toggle, theme toggle, menu button. The menu opens the shadcn
`Sheet` from the right with large sans links and the `Donate` button at the bottom. Focus is
trapped while open; `Esc` closes.

**Footer** — one row, hairline top border.

- Left: `Astroz` wordmark, then `© {year} ALL RIGHTS RESERVED.` in mono.
- Right: X, GitHub, Instagram, LinkedIn as 44×44 icon links, `aria-label` per network, opening in
  a new tab with `rel="noopener noreferrer"`.
- Brand marks are inline SVG in `currentColor`; Lucide has no brand icons. Do not substitute
  generic glyphs.

---

## 4. Design principles

1. **Modern, not luxury.** Sans-only type, strong weight contrast, generous whitespace, hairline
   rules. No serif display, no italic pull quotes.
2. **One accent.** Blue `--primary` marks action, active state, and focus. Everything else is
   neutral.
3. **Hairlines over shadows.** Cards are defined by 1px borders, not elevation.
4. **Type carries hierarchy.** Weight and scale do the work; no colored section bands.
5. **Images are documentary.** Any image is the community's own work. No stock photography.
6. **Motion explains.** 150–250ms transitions on hover, focus, and entrance. No parallax, no
   infinite loops, no scroll-triggered reveals that gate content behind JavaScript.
7. **Dark mode is first-class.** Every token has a dark value.

### Do / Don't

| Do | Don't |
|---|---|
| `rounded-lg` cards with `border-border` | 4px black borders and offset shadows |
| Plus Jakarta Sans headings at 600, body at 400 | Serif display type, italic pull quotes |
| Mono uppercase labels at 11px | All-caps paragraphs outside authored headings |
| One primary CTA per view | Competing colored buttons |
| A −2px hover lift on interactive cards | Scale, rotate, or parallax on cards |
| Text plus tone for status | Color as the only signal |

---

## 5. Design tokens

### Contract

Every color, radius, and font in the UI resolves through the shadcn semantic tokens in
`src/styles/global.css`. Never hardcode a hex, `oklch()`, or `rgb()` in a component.

- Brand and action: `--primary`.
- Hover tint: `--accent`.
- Metadata and secondary text: `--muted-foreground`.
- Hairlines: `--border`; focus: `--ring`.
- Radius: `--radius` plus the `--radius-*` scale.
- **Do not** add `--color-brutal-*`, `--shadow-brutal*`, or parallel color names.

### Light

| Token | Value | Notes |
|---|---|---|
| `--background` | `oklch(0.968 0.004 260)` | Off-white; never `#fff` |
| `--foreground` | `oklch(0.20 0.02 260)` | |
| `--card` | `oklch(0.988 0.002 260)` | Barely lifted off the canvas |
| `--popover` | `oklch(0.988 0.002 260)` | |
| `--primary` | `oklch(0.50 0.18 258)` | `#085dc7`; 5.90:1 against white text |
| `--primary-foreground` | `oklch(0.985 0.003 250)` | |
| `--secondary` / `--muted` | `oklch(0.96 0.008 255)` | |
| `--muted-foreground` | `oklch(0.48 0.02 258)` | ≥ 4.5:1 on background and card |
| `--accent` | `oklch(0.945 0.025 255)` | |
| `--accent-foreground` | `oklch(0.30 0.08 258)` | |
| `--border` / `--input` | `oklch(0.90 0.01 255)` | |
| `--ring` | `oklch(0.50 0.18 258)` | Tracks `--primary` |
| `--radius` | `0.75rem` | |

### Dark

| Token | Value | Notes |
|---|---|---|
| `--background` | `oklch(0.15 0.015 260)` | Deep navy-black |
| `--foreground` | `oklch(0.96 0.005 250)` | Never pure white |
| `--card` | `oklch(0.19 0.018 260)` | |
| `--primary` | `oklch(0.70 0.17 258)` | `#569dff`; 7.11:1 against dark text |
| `--primary-foreground` | `oklch(0.16 0.02 260)` | |
| `--muted-foreground` | `oklch(0.70 0.015 255)` | |
| `--border` / `--input` | `oklch(1 0 0 / 12%)`, `15%` | |
| `--ring` | `oklch(0.70 0.17 258)` | |

### Usage

| Role | Token |
|---|---|
| Page canvas | `bg-background` |
| Body text | `text-foreground` |
| Cards | `bg-card border-border` |
| Secondary text | `text-muted-foreground` |
| Links, active state | `text-primary` / `border-primary` |
| Hover tint | `bg-accent`, `bg-accent/30` |
| Focus | `ring-ring`, 2px with 2px offset |
| Status and tags | `secondary` badge, or `bg-muted` for stack tags |

---

## 6. Typography

| Role | Size | Line height | Weight | Tracking |
|---|---|---|---|---|
| Display XL (hero h1) | `clamp(3rem, 7vw, 5.5rem)` | 1.02 | 600 | -0.035em |
| Display L (page h1) | `clamp(2.5rem, 5vw, 4rem)` | 1.05 | 600 | -0.03em |
| H2 | `clamp(2rem, 3.5vw, 3rem)` | 1.1 | 600 | -0.025em |
| H2 compact (CTA) | `clamp(1.5rem, 3.5vw, 2.25rem)` | 1.15 | 600 | -0.025em |
| H3 / card title | `1.5rem` → `1.875rem` at `md` | tight | 600 | -0.01em |
| Lead | `1.125rem` | 1.65 | 400 | 0 |
| Body | `1rem` | 1.65 | 400 | 0 |
| Small | `0.875rem` | 1.5 | 400 | 0 |
| Label | `0.6875rem` | 1.2 | 500 | 0.12em, uppercase, mono |
| Micro label | `0.625rem` | 1.2 | 500 | 0.12em, uppercase, mono |

- Families: Plus Jakarta Sans (`--font-jakarta-sans`) for everything; Geist Mono
  (`--font-geist-mono`) for labels, metadata, tags, and the email address.
- **Sans-only.** No serif fallback in headings, no italic display or pull quotes. Hierarchy comes
  from weight 400/500/600 and scale.
- `text-balance` on headings, `text-pretty` on body copy.
- Prose measure `65ch`; hero lead `48ch`; CTA heading `30ch`. Never full-width paragraphs.
- Minimum body size on mobile: 16px.

---

## 7. Layout and spacing

| Property | Value |
|---|---|
| Content container | `max-w-6xl`, `px-6 md:px-8` |
| Section spacing | `py-20 md:py-28` |
| Card padding | `p-5 md:p-6` |
| CTA panel padding | `p-10 md:p-16` |
| Border | 1px `border-border` |
| Radius | Cards `rounded-lg`, buttons `rounded-lg`, tags `rounded-md` |
| Shadow | None on cards; nav and sheet only |
| Breakpoints | `sm` 640, `md` 768, `lg` 1024, `xl` 1280 |

**Grid behavior**

- Hero: single column; copy capped by the `48ch` lead measure. No image column.
- Mission: single measure column; blockquote follows the body at `65ch`.
- Pillars: wrapping tag row.
- Projects: 2 columns `md`, 3 columns `xl`.
- Blog rows: full width with a fixed 160px date column on desktop.
- Header: `md:grid-cols-[1fr_auto_1fr]`.

---

## 8. Components

Primitives are vendored shadcn-svelte: `button`, `badge`, `card`, `sheet`, `separator`. Add only
what a page needs.

### Button

| Variant | Use |
|---|---|
| `default` | The single primary action in a section |
| `outline` | Secondary action beside a primary |
| `ghost` | Nav actions, sheet close |
| `link` | Inline text links |

- Sizes: `sm` 36px, `default` 40px, `lg` 44px.
- Label weight is `font-semibold`; hover lifts −2px.
- Focus ring visible, never removed.
- Icons: Lucide 16px, `stroke-width={1.5}`, 8px gap.

### Badge

- Used for the seven movement pillars.
- `variant="secondary"`, mono 10px, uppercase, `tracking-[0.12em]`.
- Never use green/amber/red.

### Card

```
rounded-lg border border-border bg-card p-5 md:p-6
```

- Interactive card: renders as `<a>`, hover `-translate-y-0.5 border-primary/40 bg-accent/30`.
- Non-interactive card: renders as `<article>`, no hover.
- Footer row: hairline top border, mono metadata, arrow only when a destination exists.

### Section header

- Eyebrow: mono label, `text-primary`, uppercase.
- Heading: 600, `text-balance`.
- Intro: `text-muted-foreground`, `max-w-2xl`, `text-pretty`.
- Bottom hairline `border-b border-border pb-6 mb-10`.

### Project card

1. Year in mono, `text-muted-foreground`.
2. Title, 600, `text-2xl md:text-3xl`.
3. `ROLE: <role>` in mono; the role value drops to `normal-case tracking-normal text-foreground`.
4. Summary, `text-sm text-muted-foreground`, `text-pretty`.
5. Stack tags: mono 11px, `bg-muted`, `rounded-md`.
6. Footer: `VISIT PROJECT` and an `ArrowUpRight` that nudges on hover, with visually hidden
   "opens in a new tab". Only when `url` exists.

### Blog row

- Desktop: 160px date column + flexible title column.
- Date in mono, uppercase; brightens on row hover.
- Title 600, `text-2xl md:text-3xl`; slides 4px right and turns `text-primary` on hover.
- Hairline between rows; no card chrome, no summary, no category.

### Prose

- `prose prose-neutral dark:prose-invert max-w-[65ch]`.
- Headings `font-sans font-semibold`.
- Links `text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary`.
- Blockquote `border-l-2 border-primary pl-5 font-medium`, no italic.
- Code `font-mono text-sm bg-muted px-1.5 py-0.5 rounded-sm`, highlighted at build time by
  `sugar-high`.

### Motion

| Element | Effect | Timing |
|---|---|---|
| Every page: first-screen elements | `.reveal` fade + 28px rise, cascading top-to-bottom via a computed per-element delay (120ms, then +90ms each, capped at six steps) | 900ms |
| Every page: below-fold elements | Same animation, triggered once as each enters the viewport; never replays | 1000ms |
| Nav links | Underline `scaleX` 0→1 from the left | 200ms |
| Wordmark | Opacity 70% | 200ms |
| Theme toggle | Sun rotates 45°, moon −12° | 200ms |
| Buttons | Lift −2px | 200ms |
| Project card | Lift −2px, border and background tint, arrow nudge | 200ms |
| Blog row | Date brightens, title slides 4px | 200ms |
| Footer social | Icon lifts, glyph scales 1.10 | 200ms |

- Transitions use `translate`/`scale`/`rotate` longhands, not `transform`, so Tailwind v4 utilities
  and transition properties line up.
- `.reveal` is the only entrance mechanism. There is no separate heading animation; the old
  `.rise-in` keyframe set was removed so a page has one behaviour, not two.
- A single inline script in `base-layout.astro` drives it. It runs before paint and sets
  `html[data-reveal="js"]`; the hidden state is scoped to that attribute, so if the script never
  runs (no JavaScript, reduced motion, no `IntersectionObserver`) nothing is hidden.
- **First entry.** On load the script measures every `.reveal`. Elements already inside the
  viewport get an inline `--reveal-delay` of 120ms, then +90ms per element (capped at six steps),
  so the first screen performs a visible top-to-bottom cascade rather than appearing all at once.
  Those inline delays are cleared after 2s, so scrolling back to the top later uses the plain
  class-based behaviour.
- **Scrolling.** An `IntersectionObserver` adds `.is-revealed` the first time an element enters the
  viewport and then unobserves it. The animation is one-shot: scrolling past an element and back
  does not replay it.
- The reveal uses `1000ms cubic-bezier(0.16, 1, 0.3, 1)` — fast arrival, long settle. There is no
  exit transition: once revealed, an element stays visible for the life of the page.
- Under `prefers-reduced-motion: reduce` `.reveal` is set to `animation: none`,
  all transition durations collapse to `0.01ms`, and smooth scrolling is disabled.

---

## 9. Page specifications

### 9.1 Home (`/[lang]`)

| # | Section | Anatomy |
|---|---|---|
| 1 | Hero | Single column: h1, lead, four tags |
| 2 | Social feed | Section header, then a card grid from the `social` collection |
| 3 | Mission | `border-y` band: h2, two paragraphs, blockquote |
| 4 | Movement pillars | Section header, then seven badges |
| 5 | Contact CTA | Centred card: h2, then the contact button |

**Hero**

- H1: `ASTROZ COMM.` at Display XL.
- Lead: `We believe everyone has the right to help shape the future of technology.`
- Four tags, wrapping: `TECHNOLOGY FOR EVERYONE`, `OPEN TO EVERYONE`, `COMMUNITY-DRIVEN`,
  `LEARN & CREATE`. Rendered as bordered mono chips, `min-h-11`, `rounded-md`.
- No image, no eyebrow above the h1, and no action buttons: the tags are the only hero metadata.

**Social feed**

- H2 `FROM THE FEED`; intro paragraph. Section header reuses `SectionHeader`, no action link.
- Cards come from the `social` collection for the current locale, newest first, drafts excluded.
  The whole section is omitted when that locale has no entries.
- Grid `md:grid-cols-2 xl:grid-cols-3`, `gap-6`, equal-height cards.
- Card: `<a>` to `url`, `target="_blank"`, `rel="noopener noreferrer"`, `rounded-lg border
  border-border bg-card`, hover lift −2px plus `border-primary/40`, matching `project-card`.
- Thumbnail frame: `aspect-[16/10]`, `object-cover`, `loading="lazy"`, `decoding="async"`,
  `alt=""` (the title carries the meaning), hairline under the frame.
- Meta row: platform icon + platform name + `·` + date, mono 11px uppercase
  `tracking-[0.12em]`, `text-muted-foreground`.
- Title `h3` at `text-xl font-semibold`; description `text-sm text-muted-foreground`, clamped to
  two lines; `ArrowUpRight` sits bottom-right, no label.

**Mission**

- H2: `OUR MISSION`. No icon.
- Two paragraphs at `65ch`, second one `mt-4`.
- Blockquote: `border-l-2 border-primary pl-5`, quote at `text-2xl font-medium leading-snug`,
  attribution `— Napoleon Bonaparte` in mono.

**Movement pillars**

- H2 `MOVEMENT PILLARS`; intro paragraph.
- Seven badges: `TECH FOR EVERYONE`, `OPEN FOR ALL`, `COMMUNITY DRIVEN`, `LEARN & CREATE`,
  `DARE TO EXPERIMENT`, `DATA TRANSPARENCY`, `COLLABORATION`.

**Contact CTA**

- Centred panel: `flex flex-col items-center text-center`, `rounded-lg border border-border
  bg-card p-10 md:p-16`.
- H2 at H2-compact, `max-w-[30ch]`.
- One action: `Contact us` with a `Mail` icon, `mailto:` from config, `mt-8`.
- No eyebrow, no secondary button, no email address in the markup.

### 9.2 Blog index (`/[lang]/blog`)

- H1 `OUR JOURNAL`, intro paragraph.
- Rows from `getBlogPosts(lang)`, newest first, separated by hairlines.
- Empty state when the collection has no entries: dashed panel with `The first dispatch is being
  written.`, a body line, and `Back to home`. The panel is required; do not hide the section.
- No featured block, no filters, no pagination, no category or reading-time metadata.

### 9.3 Blog entry (`/[lang]/blog/[slug]`)

- Container `max-w-3xl`.
- Date in mono, uppercase.
- H1 at Display L, `text-balance`.
- Hairline, then `prose`.
- JSON-LD `BlogPosting` with `author` and `publisher` as `Organization`.
- No summary dek, category badge, reading time, citation block, tags, or prev/next navigation.
- OG image is the shared per-locale blog card: `/og/blog/{lang}.png`.

### 9.4 Projects index (`/[lang]/projects`)

- H1 `OUR PROJECTS`, intro paragraph.
- Grid: 2 columns `md`, 3 columns `xl`, `gap-6`.
- Cards from `getProjects(lang)`, sorted by `year` descending then title ascending.
- No filters, no status badges, no detail route.

### 9.5 Not found (`404`)

- `404` label, heading, body, `Go home` button. Rendered in English.

---

## 10. Internationalization

- Locales: `en` (default), `id`. `prefixDefaultLocale: true`; `/en/...` and `/id/...` are
  canonical, `/` redirects to `/en`.
- All UI copy comes from `src/i18n/{en,id}.json` through `useTranslations(lang)`. Never hardcode a
  user-facing string in a component.
- Both dictionaries must have identical key sets, in the same order; `src/i18n/index.ts` throws at
  build time when they differ.
- Resolve the locale with `isLang(Astro.params.lang)`.
- Build internal links with `getRelativeLocaleUrl()`; never concatenate `/${lang}/...`.
- Set `<html lang={lang}>`.
- Format dates with `Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", ...)`. No relative
  dates: they freeze at build time.
- The language toggle links to the same section in the other locale via `getLocaleSwitchHref()` in
  `src/lib/i18n-links.ts`. It is synchronous and only distinguishes `/blog` and `/projects`; any
  deeper path falls back to the locale home.

### Keys (59, identical in both files)

```
brand.name
nav.home, nav.blog, nav.projects, nav.donate, nav.menu
a11y.skip, a11y.themeToggle, a11y.openMenu, a11y.closeMenu, a11y.switchTo, a11y.newTab
language.en, language.id
meta.suffix, meta.home.title, meta.home.description
meta.blog.title, meta.blog.description
meta.projects.title, meta.projects.description
meta.notFound.title, meta.notFound.description
home.hero.title, home.hero.lead
home.social.title, home.social.intro
home.tags.everyone, home.tags.open, home.tags.community, home.tags.learn
home.mission.title, home.mission.body, home.mission.body2
home.mission.quote, home.mission.quoteBy
home.pillars.title, home.pillars.intro, home.pillars.everyone, home.pillars.open,
home.pillars.community, home.pillars.learn, home.pillars.experiment,
home.pillars.transparency, home.pillars.collaboration
home.cta.title, home.cta.action
blog.title, blog.intro, blog.empty.title, blog.empty.body, blog.empty.action
projects.title, projects.intro, projects.role, projects.visit
footer.rights
notFound.title, notFound.body, notFound.action
```

`footer.rights` and `meta.suffix` interpolate `{year}` and are static suffixes respectively.
`a11y.switchTo` interpolates `{language}`.

---

## 11. Accessibility

Target: WCAG 2.2 AA.

- **Contrast:** `muted-foreground` on `background`/`card` ≥ 4.5:1; `primary-foreground` on
  `primary` ≥ 4.5:1 (5.90:1 light, 7.11:1 dark); `primary` as text ≥ 4.5:1.
- **Focus:** 2px `ring-ring` with 2px offset on every interactive element.
- **Landmarks:** one `header`, `nav`, `main`, `footer`; skip link to `#main`.
- **Headings:** one `h1` per page; no skipped levels.
- **Keyboard:** the mobile sheet traps focus, closes on `Esc`, returns focus to the trigger.
- **Links:** descriptive text. External links get `rel="noopener noreferrer"` and a visually
  hidden "opens in a new tab".
- **Motion:** honor `prefers-reduced-motion: reduce`.
- **Images:** meaningful `alt`; decorative images `alt=""`.
- **Language:** `lang` per locale; the toggle has an accessible name.
- **Targets:** 44×44px minimum on touch.

---

## 12. SEO and metadata

- `site` in `astro.config.mjs` is `https://astroz.org`; absolute URLs derive from `Astro.site`.
- Per-route titles: `Astroz`, `Blog | Astroz`, `Projects | Astroz`.
- Meta descriptions are the shipped Indonesian strings `Artikel Astroz` and `Inisiatif Astroz Org`
  on both locales, because that is what the original site published.
- Canonical URLs include the locale; `hreflang` alternates for `en`, `id`, and `x-default`.
- OG images: one per locale per section, generated at build time by
  `src/pages/og/[...slug].png.ts` as `/og/{home,blog,projects}/{lang}.png`. There are no per-entry
  images.
- JSON-LD: `Organization` on home (`name`, `description`, `url`, `sameAs` social links);
  `BlogPosting` on entries.
- Sitemap via `@astrojs/sitemap`; feeds at `/rss.xml`, `/atom.xml`, `/feed.json`.
- `public/_redirects` covers `/`, `/rss`, `/atom`, `/feed`, `/json`, `/sitemap.xml`.

---

## 13. Performance

- Static output. Every route prerendered; no server runtime.
- Two hydrated islands only: theme toggle and mobile nav sheet. No other `client:*`.
- Content is visible without JavaScript: the reveal script exits early and the CSS hidden state is
  scoped to the attribute it would have set. It is the only script outside the two islands.
- Fonts: Plus Jakarta Sans (400/500/600) and Geist Mono (500) via the Astro Fonts API, latin
  subset, preloaded sans.
- Images: explicit `width`/`height`, `decoding="async"`; below-the-fold media lazy-loads.
- Code highlighting runs at build time.
- Targets: LCP < 2.0s on throttled 4G, CLS < 0.05, INP < 200ms.
- No layout shift when the theme toggle mounts; it reserves its 44px box.

---

## 14. File map

```
src/
  components/
    atoms/        code-block.astro, mdx-a.astro, mdx-img.astro, social-icon.astro
    molecules/    blog-row.astro, project-card.astro, section-header.astro,
                  social-card.astro, theme-toggle.svelte
    organisms/    site-header.astro, site-footer.astro, mobile-nav.svelte
    ui/           vendored shadcn-svelte primitives
    mdx-components.ts
  layouts/        base-layout.astro, post-layout.astro
  lib/            site.ts, blog.ts, projects.ts, social.ts, feed.ts, i18n-links.ts,
                  og-font.ts, html-entities.ts, utils.ts
  pages/
    404.astro
    [lang]/index.astro
    [lang]/blog/index.astro
    [lang]/blog/[slug].astro
    [lang]/projects/index.astro
    og/[...slug].png.ts
    robots.txt.ts, rss.xml.ts, atom.xml.ts, feed.json.ts
  styles/global.css
  content.config.ts
  i18n/{en,id}.json, i18n/index.ts
public/
  blog/{en,id}/*.mdx
  projects/{en,id}/*.mdx
  social/{en,id}/*.mdx, social/images/*
  fonts/, opengraph-image.png, _redirects
```

---

## 15. Acceptance checklist

- [ ] Three top-level routes: Home, Blog, Projects. No Photos, no Donate route, no project detail.
- [ ] Home renders hero, social feed, mission, pillars, and CTA in that order, in both locales.
- [ ] The hero is a single column and reads cleanly at 390px.
- [ ] Every user-visible string comes from the dictionaries; key sets are identical.
- [ ] No copy outside the restored original text and the specified UI strings.
- [ ] No "Astroz Research", no `RESEARCH` descriptor, no research areas.
- [ ] Blog index shows the empty panel when the collection is empty.
- [ ] Project cards show year, title, role, summary, stack, and destination.
- [ ] Footer shows the wordmark, copyright, and four social icon links.
- [ ] All colors and radii resolve through semantic tokens; light mode has no pure-white surface.
- [ ] Light and dark have equivalent hierarchy and contrast.
- [ ] 360px viewport has no horizontal overflow.
- [ ] Keyboard, focus, and reduced-motion passes complete.
- [ ] `bun run check` and `bun run build` pass.

---

## 16. Defaults for open decisions

- **Contact:** a `mailto:` action, not a form, until a real inbox and spam strategy exist. Both the
  `Donate` nav button and the `Contact us` CTA point at the same address.
- **Photos:** omitted entirely. The original gallery is not part of the current site.
- **Blog:** ships with zero entries. The route and MDX pipeline stay wired.
- **Projects:** one entry, `Astro-Search`. No detail pages; the card links out.
- **Meta descriptions:** the shipped Indonesian strings, verbatim.
- **Imagery:** none on the home page. Any future image is the community's own work; no stock
  photography.
- **Metrics:** none until there is a verifiable source.
