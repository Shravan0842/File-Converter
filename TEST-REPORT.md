# Verification report

## Executed and passed

- `npm ci` / dependency installation with the included exact-version lockfile.
- `npm test`: **108 tests, 108 passed, 0 failed**. This includes 19 utility tests, 87 conversion-engine/validation tests, and 2 DOM UI tests.
- `npm run build`: TypeScript checks and Vite production compilation succeeded.
- `npm run check:dist`: 30 compiled/runtime resources were served successfully by a temporary local HTTP server under `/repository/`. Entry assets use relative paths; routing uses HashRouter. No remote host was used.
- The Vite development server was started locally and responded with the application entry HTML.

The machine-readable results are in `docs/verification/`. Test inputs in `public/samples/` are synthetic and contain no personal data. Outputs were generated during tests and independently parsed; output artifacts are reproducible by rerunning the suite.

## What the 108 tests verified

Every one of the 53 enabled tool IDs has a successful engine test. Tests validate content and structure, rather than download filenames alone:

- Three-page PDFs with mixed dimensions and a rotated page; rendered image sizes; page counts/order/rotation; dimensions preserved for edits; raster compression dimensions; selectable text; inserted numbers and watermark text.
- Real PNG/JPG/WEBP/BMP/TIFF bytes, transparent pixels, flattened JPEG/BMP pixels, resize/crop/rotation dimensions, duplicate/unusual filenames and sequential image batches. Twenty extra input/output combinations exercise JPG/WEBP/BMP/TIFF sources across five outputs.
- Generated DOCX ZIP/XML parts, heading/text/table content; Unicode PDF text using embedded fonts; sanitized HTML and standalone outputs.
- CSV quoting, multiline fields, Unicode, leading zeros, optional typing, safe headers, formula escaping, XLSX round trips, selected second worksheet, dates and cached formula results.
- Audio/video conversion using the **actual FFmpeg WebAssembly core**, official wrapper and worker protocol with Node worker adapters. Native `ffprobe` independently confirms codecs, stream dimensions and durations. Native FFmpeg PCM decoding confirms exact audio equality for the 16-bit WAV→FLAC and FLAC→WAV fixtures.
- Malformed PDFs, mismatched image signatures, out-of-range selections, removing all pages, invalid crops, duplicate headers, missing worksheets, invalid trim times, pre-cancellation and actual FFmpeg worker termination.
- Search/category behavior and the image converter's upload→error→correct settings→real output→download→reset workflow in a DOM environment. The downloaded image's bytes decode to the expected dimensions.

## Browser verification gap

The real-browser Playwright suite was attempted. It did not execute conversion assertions successfully: no preinstalled Chromium executable was available, normal browser downloads were unusable, and a separately obtained Chromium executable crashed in the restricted environment. The environment has no `/proc`, which Chromium ordinarily requires. A separate browser-service attempt also timed out.

**No real-browser suite pass, visual/mobile layout verification, Safari/Firefox/iOS/Android compatibility or deployed GitHub Pages success is claimed.** The test count above refers exclusively to successful Node/DOM/Canvas/worker tests. These use real production engines, but browser asset-loading/security behavior still needs validation. Run `npm run test:e2e` on a browser-capable machine before considering production use.

The included Playwright suite has 82 tests covering the engines, image-source matrix, security/errors/cancellation, desktop downloads/ZIP and mobile overflow. It is not part of the 108 passing tests.

## Test environment and dependency notes

Node 24; Vite 7; TypeScript 5.9; PDF.js 6 legacy browser build for bundled compatibility polyfills; pdf-lib; pdfmake; Mammoth; docx; ExcelJS; Papa Parse; UTIF; jsdom; native Skia Canvas; single-thread FFmpeg core 0.12.10.

Production dependency audit: no high/critical findings at the final audit. Three moderate entries concern Mammoth's CLI-only argparse/sprintf dependency chain with no upstream fix reported by npm. The browser entry is `mammoth.browser`, not the CLI. The audit JSON is included for inspection; this is not a blanket security certification. The application sanitizes document HTML, disallows remote conversion resources and uses current PDF.js rather than a flagged vulnerable release.

Large/corrupt/hostile files can still consume significant CPU or memory before a decoder returns. ZIP-based DOCX/XLSX decompression limits, arbitrary codecs, complex TIFFs/PDFs, complex scripts and high-fidelity documents are not comprehensively validated by this small synthetic fixture set.
