import { site } from "./site";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(url: URL): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: url.href,
    sameAs: Object.values(site.social),
  };
}

interface BlogPostingInput {
  title: string;
  summary: string;
  publishedAt: Date;
  canonical: string;
}

export function blogPostingJsonLd({ title, summary, publishedAt, canonical }: BlogPostingInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: summary,
    datePublished: publishedAt.toISOString(),
    inLanguage: "en",
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };
}
