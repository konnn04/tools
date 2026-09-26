import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...TOOLS.map((t) => ({ url: `${SITE_URL}${t.path}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
