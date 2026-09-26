import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Code ported from konnns-extension predates the React Compiler lint rules
    // in eslint-plugin-react-hooks v7. It runs correctly (the compiler is not
    // enabled), so these stay visible as warnings instead of failing lint.
    files: ["src/app/*/_tool/**", "src/shared/ui/**"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // vendored third-party bundles (tesseract, excalidraw fonts, pdf.js worker)
    "public/**",
  ]),
]);

export default eslintConfig;
