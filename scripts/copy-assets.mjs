// Copies the pdf.js worker into /public so it is served same-origin and always
// matches the installed pdfjs-dist version. Runs on `pnpm install`.
import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
mkdirSync("public/pdfjs", { recursive: true });
copyFileSync(require.resolve("pdfjs-dist/build/pdf.worker.min.mjs"), "public/pdfjs/pdf.worker.min.mjs");
