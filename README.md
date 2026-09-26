# Konnn Tools

Free online tools that run entirely in your browser — no sign-up, no upload.
Your files never leave your device; your work is saved in the browser (IndexedDB).

| Tool | Route | What it does |
|---|---|---|
| Audio Editor | `/audio-editor` | cut, split, fade, effects, record, export WAV/MP3 |
| Video Editor | `/video-editor` | trim, join, crop, text/audio overlays, export MP4/WebM/GIF |
| Image Editor | `/image-editor` | paste a screenshot, annotate, blur, layers, export PNG/JPEG |
| PDF to Text | `/pdf-to-text` | extract text per page, OCR for scans (English / Vietnamese) |
| Markdown to PDF | `/markdown-pdf` | live preview, PDF with selectable text |
| QR Code Generator | `/qr-generator` | styled QR codes with logos and frames, PNG/SVG |
| Whiteboard | `/whiteboard` | hand-drawn diagrams (Excalidraw), PNG/SVG |

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck && pnpm lint && pnpm build
```

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the production origin (e.g. `https://tools.example.com`)
before `pnpm build` — canonical URLs, the sitemap and Open Graph tags use it.
Runs anywhere Next.js runs (`pnpm start`, Vercel, Docker).

## Versioning

Semantic versions are bumped automatically from Conventional Commits on every
push to `main`. See [CONTRIBUTING.md](CONTRIBUTING.md#versioning) and
[CHANGELOG.md](CHANGELOG.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Coding agents: see [AGENTS.md](AGENTS.md).

## License

[MIT](LICENSE) © konnn04
