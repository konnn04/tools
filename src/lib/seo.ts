import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";
import type { ToolMeta } from "./tool-meta";

export function toolMetadata(tool: ToolMeta, opts: { isDocument?: boolean } = {}): Metadata {
  const title = `${tool.name} — Free Online`;
  return {
    title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: tool.path },
    // "/tool/<id>" is one visitor's own document in their browser; only the tool page itself belongs in search
    robots: opts.isDocument ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url: tool.path,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description: tool.description,
      locale: "en_US",
      alternateLocale: ["vi_VN"],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description: tool.description },
  };
}

/** schema.org WebApplication + breadcrumb for a tool page. */
export function toolJsonLd(tool: ToolMeta) {
  const url = `${SITE_URL}${tool.path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      alternateName: tool.nameVi,
      url,
      description: tool.description,
      applicationCategory: tool.category === "media" ? "MultimediaApplication" : "UtilitiesApplication",
      operatingSystem: "Any (web browser)",
      browserRequirements: "Requires JavaScript and a modern browser",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: tool.features,
      inLanguage: "en",
      keywords: tool.keywords.join(", "),
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: tool.name, item: url },
      ],
    },
  ];
}
