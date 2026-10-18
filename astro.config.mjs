import { fileURLToPath } from "node:url";
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

const SITE = "https://astroz.org";

export default defineConfig({
  site: SITE,
  output: "static",
  server: {
    allowedHosts: [".ngrok-free.app", ".ngrok.app", ".ngrok.io"],
  },
  integrations: [
    mdx(),
    svelte(),
    sitemap({
      filter: (page) =>
        !page.includes("/og/") && !/\.(xml|json|txt)$/.test(page) && !page.endsWith("/404/"),
    }),
  ],
  markdown: { syntaxHighlight: false },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Plus Jakarta Sans",
      cssVariable: "--font-jakarta-sans",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: [500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: "$lib/components/ui",
          replacement: fileURLToPath(
            new URL("./src/components/ui", import.meta.url),
          ),
        },
        {
          find: "$lib/components",
          replacement: fileURLToPath(
            new URL("./src/components", import.meta.url),
          ),
        },
        {
          find: "$lib/utils",
          replacement: fileURLToPath(
            new URL("./src/lib/utils", import.meta.url),
          ),
        },
        {
          find: "$lib/hooks",
          replacement: fileURLToPath(
            new URL("./src/lib/hooks", import.meta.url),
          ),
        },
        {
          find: "$lib",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    },
  },
});
