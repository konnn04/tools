import type { NextConfig } from "next";
import pkg from "./package.json";

const repoUrl = pkg.repository.url.replace(/^git\+/, "").replace(/\.git$/, "");

const nextConfig: NextConfig = {
  // the dev badge's default corner (bottom-left) covers the sidebar's buttons
  devIndicators: { position: "bottom-right" },
  // Only these package.json fields reach the browser (About dialog) — the
  // whole file would ship the dependency list in the bundle.
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
    NEXT_PUBLIC_APP_AUTHOR: pkg.author.name,
    NEXT_PUBLIC_APP_AUTHOR_URL: pkg.author.url,
    NEXT_PUBLIC_APP_LICENSE: pkg.license,
    NEXT_PUBLIC_APP_REPO: repoUrl,
    NEXT_PUBLIC_APP_ISSUES: pkg.bugs.url,
  },
};

export default nextConfig;
