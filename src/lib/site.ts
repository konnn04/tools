/** Set NEXT_PUBLIC_SITE_URL to the production origin so canonical URLs, sitemap and OG tags are absolute. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
export const SITE_NAME = "Konnn Tools";
export const SITE_TAGLINE = "Free online tools that run in your browser";
export const SITE_DESCRIPTION =
  "Konnn Tools — free online audio editor, video editor, image editor, PDF to text (OCR), Markdown to PDF, QR code generator and whiteboard. No sign-up, no upload: everything runs in your browser.";
export const SITE_KEYWORDS = [
  "free online tools", "browser tools", "no upload", "online editor",
  "công cụ online miễn phí", "tiện ích trực tuyến", "công cụ miễn phí không cần đăng ký",
];
/** localStorage key for the light/dark preference */
export const THEME_KEY = "konnn-tools:theme";
