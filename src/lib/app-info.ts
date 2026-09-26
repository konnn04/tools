/** Project info from package.json, injected at build time by next.config.ts. */
export const APP_INFO = {
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.0.0",
  author: process.env.NEXT_PUBLIC_APP_AUTHOR ?? "",
  authorUrl: process.env.NEXT_PUBLIC_APP_AUTHOR_URL ?? "",
  license: process.env.NEXT_PUBLIC_APP_LICENSE ?? "",
  repo: process.env.NEXT_PUBLIC_APP_REPO ?? "",
  issues: process.env.NEXT_PUBLIC_APP_ISSUES ?? "",
};

/** Open-source projects the tools are built on — credited in the About dialog. */
export const CREDITS = [
  { name: "Next.js", url: "https://nextjs.org" },
  { name: "Excalidraw", url: "https://github.com/excalidraw/excalidraw" },
  { name: "Fabric.js", url: "https://github.com/fabricjs/fabric.js" },
  { name: "Mediabunny", url: "https://github.com/Vanilagy/mediabunny" },
  { name: "PDF.js", url: "https://github.com/mozilla/pdf.js" },
  { name: "Tesseract.js", url: "https://github.com/naptha/tesseract.js" },
  { name: "CodeMirror", url: "https://codemirror.net" },
  { name: "markdown-it", url: "https://github.com/markdown-it/markdown-it" },
  { name: "qr-code-styling", url: "https://github.com/kozakdenys/qr-code-styling" },
  { name: "Dexie", url: "https://dexie.org" },
  { name: "Lucide", url: "https://lucide.dev" },
];
