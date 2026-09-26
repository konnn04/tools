<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Konnn Tools — guide for coding agents

Free, browser-only tools site: Next.js 16 App Router, React 19, TypeScript.
English UI only — no i18n library. The tools were ported from
[konnns-extension](https://github.com/konnn04/konnns-extension) (`src/features/site/`).
Human-facing docs: [README.md](README.md), [CONTRIBUTING.md](CONTRIBUTING.md).

## 1. Checks — run before saying you're done

```bash
pnpm typecheck   # tsc --noEmit — cheapest, run first
pnpm lint        # must have 0 errors
pnpm build       # required: some errors only appear when bundling
```

There is no test runner. Verify UI changes in a real browser (`pnpm dev`), in
both light and dark theme.

## 2. One tool = one folder

```
src/app/<tool>/
  [[...slug]]/page.tsx   # route: SEO metadata + static landing page
  _tool/                 # private folder (not routed) — ALL of the tool's code
    meta.ts              # ToolMeta: name, descriptions (EN + VI), keywords, dbName, localStorageKeys
    Client.tsx           # next/dynamic(..., { ssr: false }) loader
    lib/i18n.ts          # t() over lib/strings.json (English only)
    lib/router.ts        # useRoute / navigate / siteUrl
    lib/db.ts            # the tool's OWN Dexie database "konnn-tools-<tool>"
    engine/              # pure logic, no React
```

- A tool **never** imports another tool's folder. Shared code lives only in
  `src/shared/ui` (UI kit), `src/lib` and `src/components` (site shell).
- The shell imports nothing from a tool except `_tool/meta.ts`.
- Registry: `src/lib/tools.ts` → `TOOLS`. The home grid, sidebar, sitemap,
  storage manager and OG image read it. Adding a tool = folder + one line there.
- Storage a tool writes must be declared in its `meta.ts` (`dbName`,
  `localStorageKeys`), or the storage manager can't measure or clear it.

## 3. How the ported tools are wired

| Concern | Here | Notes |
|---|---|---|
| Rendering | `Client.tsx` with `ssr: false` | tools touch `window`, IndexedDB, canvas at import time |
| Routing | `lib/router.ts` | `/tool/<id>` via `history.pushState`; Next keeps `usePathname` in sync. `segments[1]` is the document id |
| Text | `lib/strings.json` + `lib/i18n.ts` | supports `{{var}}`, `_one`/`_other` plurals on `count`, string fallback arg |
| Data | `lib/db.ts` | one database per tool, schema version 1 |
| Theme | `<html data-color-mode>` | set by the inline script in `layout.tsx`; tokens in `globals.css` |
| Assets | `public/` | tesseract + excalidraw fonts vendored; `public/pdfjs/` copied on install |

SEO: `src/lib/seo.ts` builds metadata + JSON-LD from `meta.ts`. `ToolShell`
server-renders a visually hidden h1/description (EN + VI) because the tool
itself renders nothing on the server. `/<tool>/<id>` pages are `noindex`.

## 4. Pitfalls

- **StrictMode double-mounts effects.** Never put irreversible deletes in a
  `useEffect` cleanup. Cancelling a pending autosave loses data — flush it instead.
- **Cleanup of an effect with `[]` deps sees the first render's closure.** Use a ref.
- **React Compiler lint rules** (`react-hooks/refs`, `set-state-in-effect`, …) are
  warnings for ported code only (`eslint.config.mjs`). New code in the shell must
  pass them as errors.
- **`next.config.ts` `env`** exposes selected package.json fields to the About
  dialog. Don't import `package.json` from client code — it ships the whole file.
- **Check third-party APIs against the `.d.ts` in `node_modules`**, not memory.
- The dev badge is moved to bottom-right in `next.config.ts` because the default
  corner covers the sidebar buttons.

## 5. Commits and versions

- [Conventional Commits](https://www.conventionalcommits.org/); scope = tool id
  (`fix(video-editor): …`). Commit only when asked.
- Versions are automatic: `.github/workflows/release.yml` runs
  `scripts/release.mjs` on push to `main` (breaking → major, `feat` → minor,
  else patch) and updates `package.json` + `CHANGELOG.md`. Never bump by hand.
  Preview with `pnpm release:dry`.
