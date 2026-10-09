# Folio — local file converter

A static React + Vite + TypeScript + Tailwind CSS application with 53 real conversion/editing tools across PDFs, images, documents, spreadsheets, audio and video. Files are processed on the user's device. No backend, accounts, upload endpoint, telemetry, paid API or runtime CDN is used.

**Verification status:** 108 automated unit, conversion-engine and DOM UI tests passed. Real conversion libraries, PDF rendering, native Canvas adapters, spreadsheet workers and the actual FFmpeg WebAssembly core were exercised on synthetic fixtures. The production build and repository-subpath HTTP asset checks passed. **A real browser end-to-end run could not be completed in the delivery environment. Browser layout, mobile behavior and browser-specific worker/loading compatibility remain unverified.** This is a working implementation with tested engines, not a certification of production readiness. See [TEST-REPORT.md](TEST-REPORT.md) and [CAPABILITIES.md](CAPABILITIES.md).

## Quick start

Install **Node.js 24 or newer** and npm. Open a terminal in this extracted project directory:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://127.0.0.1:5173`. `npm ci` installs exactly the lockfile versions and copies the FFmpeg and PDF.js runtime assets into `public/`. Internet access is needed for dependency installation. The application itself never requests conversion services or sends selected file bytes to a server.

## Build and preview

```sh
npm run build
npm run preview
```

The ZIP also includes a previously generated **`dist/`** directory. Everything needed at runtime is inside `dist/`, including lazy JavaScript chunks, fonts, PDF workers/CMaps/decoders and the approximately 31 MiB single-thread FFmpeg WASM engine. No Node server is required after deployment. Do not open `dist/index.html` with `file://`; modules and workers require an HTTP(S) origin. Use the local preview command for testing.

The default Vite base is `./`, so the same build's assets resolve under a site root or a repository directory. Hash routing produces links such as `/REPOSITORY/#/tool/pdf-merge`, avoiding SPA rewrite requirements. For an explicit base path, set `VITE_BASE_PATH` at build time:

```sh
# macOS / Linux
VITE_BASE_PATH=/REPOSITORY/ npm run build
```

```powershell
# PowerShell
$env:VITE_BASE_PATH = '/REPOSITORY/'
npm run build
Remove-Item Env:VITE_BASE_PATH
```

## Manual hosting later

No repository was created, no code was committed/pushed, and nothing was deployed. There is intentionally **no automatic deployment workflow**.

When you choose to publish:

1. Build or use the included `dist/`.
2. Copy **the contents of `dist/`** to the directory your static host publishes. Keep `assets/`, `ffmpeg/`, `pdfjs/`, `licenses/` and their contents intact.
3. For GitHub Pages, a simple manual option is a publishing branch you manage yourself, with `index.html` and the other `dist/` contents at its root. Add an empty `.nojekyll` file; select that branch/root in the repository's Pages settings.
4. Alternatively, place those contents in a `docs/` directory in your own repository and select that directory for Pages. The ZIP's documentation folder is not a website build; use the actual `dist/` contents.
5. Serve JavaScript/modules with a JavaScript MIME type and `.wasm` as `application/wasm`. Use HTTPS. No cross-origin isolation headers or `SharedArrayBuffer` are required by the single-thread core.
6. Run the included Playwright suite in a browser-capable environment and try representative files at the exact published path before relying on it.

The Pages URL may be `https://USERNAME.github.io/REPOSITORY/`. Asset path checks passed for the equivalent local `/repository/` prefix; actual GitHub Pages hosting was not performed or verified.

## Usage

Choose a tool using search or a category. Select/drop files, adjust settings, then convert and download. A batch can contain at most 30 files/200 MiB total. Images and most non-media files have a 50 MiB per-file limit; media files have a 100 MiB limit. PDF jobs are capped at 1,000 pages; images at 40 megapixels. These are guardrails, not a guarantee that a device has sufficient memory.

PDF/image merge tools preserve the file order shown; use the arrows to reorder. Multiple outputs can be downloaded together as a real ZIP. PDF selections use one-based numbers and ascending ranges (`1,3-5`). Reorder accepts duplicate pages. Image crop coordinates are oriented-image pixels. Width or height zero means preserve aspect ratio using the other dimension. Both resize dimensions zero is an error.

Conversion stages and completed file/page counts are real. Media messages are from FFmpeg; any percentage is explicitly an estimate. There is no simulated progress timer. Cancellation terminates media/spreadsheet workers and is checked between other operations. Some synchronous document/PDF operations cannot be interrupted immediately.

## Tests

The application requires no native FFmpeg. **The verification suite requires `ffmpeg` and `ffprobe` on PATH**, used only to independently inspect generated media and, optionally, regenerate synthetic fixtures.

```sh
npm test                     # unit + real-engine + DOM UI integration
npm run build
npm run check:dist           # local HTTP checks under /repository/
```

For real-browser tests, use an environment with Playwright-supported Chromium and its OS libraries:

```sh
npx playwright install --with-deps chromium
npm run test:e2e
```

`npm run test:e2e` starts the local Vite app automatically. The delivery environment could not launch Chromium, so this suite is included but **not claimed as passing**. An existing browser executable can be selected using `CHROMIUM_PATH`; optional `CHROMIUM_ARGS` is a JSON array of launch arguments. Default installation is recommended.

Synthetic sample inputs are included in `public/samples/`. `npm run samples` recreates them; native FFmpeg is needed to regenerate the audio/video/alternate-image fixtures. `test-results/` is ignored in version control. Verified reports from this delivery are preserved separately in `docs/verification/`.

The Node engine harness supplies browser DOM/Canvas and worker adapters to run the production engine functions. For media it uses the real FFmpeg wrapper, official worker and bundled WASM, with file URLs in place of browser HTTP asset loading. For PDF.js it uses the same parser/rendering implementation with a Node fake worker. This verifies conversion results; it does not replace browser testing.

## Supported tools and important limits

See the full [capability matrix](CAPABILITIES.md). Highlights:

- PDF page renders, image-to-PDF, merge/split/extract/reorder/remove/rotate, numbering, watermark, selectable text extraction and lossy raster compression.
- JPG/PNG/WEBP/BMP/TIFF image input; PNG/JPG/WEBP/BMP/TIFF output; resize/crop/rotate/quality and sequential batches.
- UTF-8 TXT/Markdown/HTML/DOCX conversions with explicit semantic/reflow limits.
- CSV/XLSX/JSON/HTML spreadsheet conversions with quoted CSV, optional type inference, selected worksheets and cached formula results.
- MP3/WAV/FLAC/M4A audio and MP4/WEBM/MOV video conversions, track extraction, compression and trimming using FFmpeg WASM.

High-fidelity Word ↔ PDF layout conversion is **not** available. PDF→DOCX is selectable text only; DOCX→PDF is reflowed semantic content. Both are experimental and clearly labeled. There is no OCR. Compression is lossy and does not guarantee a smaller output. TIFF reads only the first frame and exports uncompressed 8-bit RGBA. Image metadata/color profiles and animations are not retained. Roboto PDF fonts cover Latin/Greek/Cyrillic; CJK, Indic and other complex-script fidelity is not assured. WAV output is 16-bit PCM; high-bit-depth audio may lose precision.

Remote images, CSS, scripts, SVG, and links are stripped from imported HTML to keep conversions local and prevent active content. DOCX/Markdown→PDF preserves supported headings, lists, tables and embedded PNG/JPG images, not Word pagination or arbitrary CSS. DOCX export from HTML/Markdown omits images and links. Formula recalculation, macros, charts, workbook styling and legacy XLS are unsupported. Password-protected/encrypted PDFs, damaged archives, DRM media, HEIC and legacy DOC are unsupported.

Offline availability is not guaranteed: there is no service worker. A connection is needed to load the app and lazy runtime assets initially; later offline operation depends on the browser cache.

## Project layout

```text
src/
  components/     shared upload and settings controls
  engines/        modular, real conversion engines and validation
  hooks/          conversion state, progress and cancellation
  catalog.ts      tool capabilities and input/output metadata
  pages.tsx       searchable toolkit, converter and capability pages
  styles.css      responsive light/dark design system with Tailwind
scripts/          asset copying, sample generation, static build checks
tests/            unit, engine, DOM UI and Playwright suites
public/           bundled runtime assets and synthetic samples
dist/             finished static build
docs/verification/ executed test reports (no real-browser pass claim)
```

Formatting: `npm run format`. Read [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) before redistributing bundled dependencies, particularly the GPL-licensed FFmpeg core. The application source license does not override third-party licenses.
