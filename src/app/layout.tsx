import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SideRail } from "@/components/SideRail";
import { THEME_SCRIPT } from "@/components/theme";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "@/shared/ui/ui.css";
import "./globals.css";
import "@/components/shell.css";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${SITE_TAGLINE}`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["vi_VN"],
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1622" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <div className="site">
          <SideRail />
          <main className="site__main">{children}</main>
        </div>
      </body>
    </html>
  );
}
