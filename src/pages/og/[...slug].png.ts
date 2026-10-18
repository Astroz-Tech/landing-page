import type { APIRoute } from "astro";
import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { loadJakarta } from "../../lib/og-font";
import { locales, useTranslations } from "../../i18n";

interface OgProps {
  title: string;
  eyebrow: string;
}

export async function getStaticPaths() {
  const paths: { params: { slug: string }; props: { title: string; eyebrow: string } }[] = [];

  for (const lang of locales) {
    const t = useTranslations(lang);
    paths.push({
      params: { slug: `home/${lang}` },
      props: { title: t("home.hero.title"), eyebrow: t("brand.name") },
    });
    paths.push({
      params: { slug: `blog/${lang}` },
      props: { title: t("blog.title"), eyebrow: t("brand.name") },
    });
    paths.push({
      params: { slug: `projects/${lang}` },
      props: { title: t("projects.title"), eyebrow: t("brand.name") },
    });
  }

  return paths;
}

export const GET: APIRoute<OgProps> = async ({ props, site }) => {
  const { title, eyebrow } = props;
  const { regular, semibold } = await loadJakarta();
  if (!site) throw new Error("Set `site` in astro.config.mjs");
  const host = site.host;

  const svg = await satori(
    html`<div
      style="display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%;padding:64px;background:#fbfcfe;color:#11161f;font-family:'Plus Jakarta Sans';"
    >
      <div
        style="display:flex;font-size:22px;letter-spacing:0.12em;text-transform:uppercase;color:#073777;"
      >
        ${eyebrow}
      </div>
      <div style="display:flex;font-size:64px;font-weight:600;letter-spacing:-0.03em;line-height:1.05;max-width:1000px;">${title}</div>
      <div style="display:flex;font-size:22px;color:#575e69;">${host}</div>
    </div>`,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Plus Jakarta Sans", data: regular, weight: 400, style: "normal" },
        { name: "Plus Jakarta Sans", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );

  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
