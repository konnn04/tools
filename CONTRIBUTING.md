# Contributing to Konnn Tools

Thanks for helping! Bug reports, feature ideas, docs and code are all welcome.

## Getting started

```bash
pnpm install     # also copies the pdf.js worker into public/pdfjs
pnpm dev         # http://localhost:3000
```

Before opening a pull request:

```bash
pnpm typecheck
pnpm lint
pnpm build       # some problems only show up when bundling
```

## Project structure

```
src/
  app/
    layout.tsx, page.tsx      # site shell and home page
    <tool>/
      [[...slug]]/page.tsx    # route + SEO metadata
      _tool/                  # everything the tool needs (private, not routed)
        meta.ts               # name, description, keywords, storage it owns
        Client.tsx            # client-only loader
        lib/                  # the tool's own router, strings, database
  components/                 # site shell: sidebar, settings, storage manager, about
  lib/                        # tool registry, SEO helpers, site constants
  shared/ui/                  # UI kit used by every tool
public/                       # vendored assets (tesseract, excalidraw fonts)
scripts/                      # install + release scripts
```

**Rule:** a tool never imports from another tool's folder. If two tools need the
same code, copy it or move it to `src/shared/`. Deleting a tool's folder (and its
line in `src/lib/tools.ts`) must not break anything else.

### Adding a tool

1. Create `src/app/<tool>/_tool/` with `meta.ts`, `Client.tsx` and the tool's code.
2. Create `src/app/<tool>/[[...slug]]/page.tsx` (copy an existing one).
3. Add the tool's `meta` to `TOOLS` in `src/lib/tools.ts`.

The home grid, sidebar, sitemap and storage manager all read `TOOLS`.

## Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>(<optional scope>): <description>
```

| Type | Use for |
|---|---|
| `feat` | a new feature |
| `fix` | a bug fix |
| `perf` | a performance improvement |
| `refactor` | a code change that is neither a fix nor a feature |
| `docs` | documentation only |
| `style` | formatting only |
| `test` | tests |
| `chore` | tooling, dependencies |
| `ci` | CI configuration |

Use the tool id as the scope: `feat(video-editor): add speed control`,
`fix(pdf-to-text): handle encrypted files`.

## Versioning

Versions follow [Semantic Versioning](https://semver.org/) and are **automatic**.
Every push to `main` runs `.github/workflows/release.yml`, which calls
`scripts/release.mjs`. It reads the commits since the last `v*` tag:

| Commits since last release contain | Bump |
|---|---|
| `BREAKING CHANGE:` in a body, or `type!:` | major |
| at least one `feat` | minor |
| anything else | patch |

It then updates `package.json` and `CHANGELOG.md`, commits
`chore(release): vX.Y.Z [skip ci]`, tags `vX.Y.Z` and publishes a GitHub release.
Don't edit the version by hand.

Preview the next release locally with `pnpm release:dry`. To force a level, run
the Release workflow manually (Actions → Release → Run workflow) and pick one.

## Reporting bugs

Use the issue templates. Include your browser and version, and the app version
(sidebar → About).
