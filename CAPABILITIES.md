# Conversion capability matrix

53 tools are implemented. Every enabled tool has a passing synthetic-fixture engine test. **Real-browser end-to-end validation remains pending.** Here “Engine-tested” means meaningful output verification in the Node DOM/Canvas/worker harness; it does not mean every browser, codec or file variant is fully supported. No feature is labeled universally “Fully supported” before real-browser checks.

Experimental tools have intentional fidelity limits even though their engine fixtures pass. Unsupported tools are absent from the selectable toolkit. Refer to TEST-REPORT.md for the exact executed checks.

## PDF

| Tool                  | Inputs → output                            | Status                               | Limits / behavior                                                                                                  |
| --------------------- | ------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| PDF to PNG            | pdf → png                                  | Engine-tested; browser check pending | Render every page as a crisp, lossless image.                                                                      |
| PDF to JPG            | pdf → jpg                                  | Engine-tested; browser check pending | High-resolution images from any PDF page.                                                                          |
| Images to PDF         | jpg, jpeg, png, webp, bmp, tif, tiff → pdf | Engine-tested; browser check pending | Combine images in file order, one per page.                                                                        |
| Merge PDFs            | pdf → pdf                                  | Engine-tested; browser check pending | Bring multiple documents together in file order.                                                                   |
| Split PDF             | pdf → pdf                                  | Engine-tested; browser check pending | Save each selected page as its own PDF.                                                                            |
| Extract pages         | pdf → pdf                                  | Engine-tested; browser check pending | Create a PDF from a selection of pages.                                                                            |
| Reorder pages         | pdf → pdf                                  | Engine-tested; browser check pending | Set the exact page order, including duplicates.                                                                    |
| Remove pages          | pdf → pdf                                  | Engine-tested; browser check pending | Remove a selection of pages from your PDF.                                                                         |
| Rotate PDF            | pdf → pdf                                  | Engine-tested; browser check pending | Rotate selected pages without rasterizing.                                                                         |
| Add page numbers      | pdf → pdf                                  | Engine-tested; browser check pending | Numbers are added over existing content near the bottom edge.                                                      |
| Watermark PDF         | pdf → pdf                                  | Engine-tested; browser check pending | Watermark text uses Helvetica (Latin characters). Existing content remains intact.                                 |
| PDF to text           | pdf → txt                                  | Engine-tested; browser check pending | No OCR. Scanned pages may have no text. Reading order can differ in complex layouts.                               |
| Compress PDF · raster | pdf → pdf                                  | Engine-tested; browser check pending | Lossy: removes selectable text, links, forms and vectors. May increase small files. Page dimensions are preserved. |
| PDF to DOCX · text    | pdf → docx                                 | Experimental; engine-tested          | Text only: no OCR, original layout, images, tables or fonts. Complex reading order may differ.                     |

## Images

| Tool            | Inputs → output                                                       | Status                               | Limits / behavior                                                           |
| --------------- | --------------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| Image to PNG    | jpg, jpeg, png, webp, bmp, tif, tiff → png                            | Engine-tested; browser check pending | Convert JPG, PNG, WEBP, BMP or TIFF files.                                  |
| Image to JPG    | jpg, jpeg, png, webp, bmp, tif, tiff → jpg                            | Engine-tested; browser check pending | Transparency is flattened against the selected background.                  |
| Image to WEBP   | jpg, jpeg, png, webp, bmp, tif, tiff → webp                           | Engine-tested; browser check pending | Convert JPG, PNG, WEBP, BMP or TIFF files.                                  |
| Image to BMP    | jpg, jpeg, png, webp, bmp, tif, tiff → bmp                            | Engine-tested; browser check pending | Transparency is flattened against the selected background.                  |
| Image to TIFF   | jpg, jpeg, png, webp, bmp, tif, tiff → tiff                           | Engine-tested; browser check pending | Exports uncompressed 8-bit RGBA TIFF. First input frame only.               |
| Resize images   | jpg, jpeg, png, webp, bmp, tif, tiff → selected PNG/JPG/WEBP/BMP/TIFF | Engine-tested; browser check pending | Set dimensions; leave one at zero to preserve aspect ratio.                 |
| Crop images     | jpg, jpeg, png, webp, bmp, tif, tiff → selected PNG/JPG/WEBP/BMP/TIFF | Engine-tested; browser check pending | Crop a pixel rectangle from the oriented image.                             |
| Rotate images   | jpg, jpeg, png, webp, bmp, tif, tiff → selected PNG/JPG/WEBP/BMP/TIFF | Engine-tested; browser check pending | Rotate images by 90, 180 or 270 degrees.                                    |
| Compress images | jpg, jpeg, png, webp, bmp, tif, tiff → selected JPG/WEBP              | Engine-tested; browser check pending | Lossy re-encoding. A smaller output is not guaranteed. Metadata is removed. |

## Documents

| Tool                     | Inputs → output     | Status                               | Limits / behavior                                                                                            |
| ------------------------ | ------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| TXT to PDF               | txt → pdf           | Engine-tested; browser check pending | Typeset UTF-8 text with embedded Roboto fonts.                                                               |
| TXT to DOCX              | txt → docx          | Engine-tested; browser check pending | Create an editable Word document from plain text.                                                            |
| DOCX to text             | docx → txt          | Engine-tested; browser check pending | Extract paragraphs, with formatting removed.                                                                 |
| DOCX to HTML             | docx → html         | Engine-tested; browser check pending | Preserves supported headings, tables and inline styles; Word page layout is not preserved.                   |
| DOCX to PDF · reflow     | docx → pdf          | Experimental; engine-tested          | Reflowed via Mammoth: original pagination, advanced layout, fonts, headers and footers are not preserved.    |
| HTML to PDF · reflow     | html, htm → pdf     | Engine-tested; browser check pending | Basic headings, lists, tables and embedded PNG/JPG images. No JavaScript, remote resources or arbitrary CSS. |
| HTML to DOCX · basic     | html, htm → docx    | Experimental; engine-tested          | Basic semantic content only. CSS, images, links, page layout and complex tables are omitted.                 |
| Markdown to HTML         | md, markdown → html | Engine-tested; browser check pending | Convert Markdown into a standalone, sanitized HTML file.                                                     |
| Markdown to PDF          | md, markdown → pdf  | Engine-tested; browser check pending | Typeset Markdown headings, lists and tables.                                                                 |
| Markdown to DOCX · basic | md, markdown → docx | Engine-tested; browser check pending | Basic headings, lists, bold, italic and tables. Images and links are omitted.                                |

## Spreadsheets

| Tool         | Inputs → output | Status                               | Limits / behavior                                                                                         |
| ------------ | --------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| CSV to XLSX  | csv → xlsx      | Engine-tested; browser check pending | Create a workbook from quoted, delimited text.                                                            |
| XLSX to CSV  | xlsx → csv      | Engine-tested; browser check pending | Values only; formulas use their saved results. No formula recalculation.                                  |
| XLSX to JSON | xlsx → json     | Engine-tested; browser check pending | First row is headers. Headers must be nonempty and unique. Formulas use saved results.                    |
| XLSX to HTML | xlsx → html     | Engine-tested; browser check pending | Cell values only. Styling, merged cells and charts are not reproduced.                                    |
| JSON to CSV  | json → csv      | Engine-tested; browser check pending | Nested values are serialized as JSON strings. Formula-like strings can be escaped for spreadsheet safety. |
| CSV to JSON  | csv → json      | Engine-tested; browser check pending | Headers must be nonempty and unique. Keep text types to preserve leading zeros.                           |

## Audio

| Tool           | Inputs → output                                       | Status                               | Limits / behavior                                                                                      |
| -------------- | ----------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| MP3 to WAV     | mp3 → wav                                             | Engine-tested; browser check pending | Loads a ~31 MB local WebAssembly engine on first use. Media is re-encoded; codec compatibility varies. |
| WAV to MP3     | wav → mp3                                             | Engine-tested; browser check pending | Loads a ~31 MB local WebAssembly engine on first use. Media is re-encoded; codec compatibility varies. |
| WAV to FLAC    | wav → flac                                            | Engine-tested; browser check pending | Loads a ~31 MB local WebAssembly engine on first use. Media is re-encoded; codec compatibility varies. |
| FLAC to WAV    | flac → wav                                            | Engine-tested; browser check pending | Loads a ~31 MB local WebAssembly engine on first use. Media is re-encoded; codec compatibility varies. |
| M4A to MP3     | m4a → mp3                                             | Engine-tested; browser check pending | Loads a ~31 MB local WebAssembly engine on first use. Media is re-encoded; codec compatibility varies. |
| Compress audio | mp3, wav, flac, m4a, ogg, aac → mp3                   | Engine-tested; browser check pending | Loads a ~31 MB local WebAssembly engine on first use. Media is re-encoded; codec compatibility varies. |
| Trim audio     | mp3, wav, flac, m4a, ogg, aac → selected WAV/MP3/FLAC | Engine-tested; browser check pending | Loads a ~31 MB local WebAssembly engine on first use. Media is re-encoded; codec compatibility varies. |

## Video

| Tool           | Inputs → output                         | Status                               | Limits / behavior                                                                                                       |
| -------------- | --------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| MP4 to WEBM    | mp4 → webm                              | Engine-tested; browser check pending | Single-thread FFmpeg for static-host compatibility. Short videos recommended; max 100 MB per input. DRM is unsupported. |
| WEBM to MP4    | webm → mp4                              | Engine-tested; browser check pending | Single-thread FFmpeg for static-host compatibility. Short videos recommended; max 100 MB per input. DRM is unsupported. |
| MOV to MP4     | mov → mp4                               | Engine-tested; browser check pending | Single-thread FFmpeg for static-host compatibility. Short videos recommended; max 100 MB per input. DRM is unsupported. |
| Video to MP3   | mp4, webm, mov, mkv → mp3               | Engine-tested; browser check pending | Single-thread FFmpeg for static-host compatibility. Short videos recommended; max 100 MB per input. DRM is unsupported. |
| Video to WAV   | mp4, webm, mov, mkv → wav               | Engine-tested; browser check pending | Single-thread FFmpeg for static-host compatibility. Short videos recommended; max 100 MB per input. DRM is unsupported. |
| Compress video | mp4, webm, mov, mkv → mp4               | Engine-tested; browser check pending | Single-thread FFmpeg for static-host compatibility. Short videos recommended; max 100 MB per input. DRM is unsupported. |
| Trim video     | mp4, webm, mov, mkv → selected MP4/WEBM | Engine-tested; browser check pending | Single-thread FFmpeg for static-host compatibility. Short videos recommended; max 100 MB per input. DRM is unsupported. |

## Unsupported / not implemented

| Capability                                   | Reason / alternative                                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| High-fidelity PDF ↔ DOCX page layout         | Static open-source browser libraries do not reliably recreate Word/PDF layouts; use the labeled text/reflow tools for simple content. |
| OCR / scanned PDF to editable text           | No OCR engine is bundled. PDF text extraction requires existing text.                                                                 |
| Lossless PDF image optimization              | The compression tool intentionally rebuilds raster pages, with an explicit lossy warning.                                             |
| Legacy DOC or XLS, HEIC, SVG conversion      | No reliable engine for these inputs is included. SVG input is intentionally excluded.                                                 |
| Encrypted/password PDFs or DRM media         | No password/DRM handling is implemented.                                                                                              |
| Workbook formula recalculation/macros/charts | Spreadsheet exports use cell values and cached formula results; missing results raise an error.                                       |
| Full multipage/animated image conversion     | First TIFF/image frame only; image metadata and animation are removed.                                                                |
| Guaranteed smaller compression output        | Size depends on source; larger PDF/image outputs are reported.                                                                        |
| Guaranteed offline use                       | Assets must be loaded initially and there is no offline service worker.                                                               |

## Scope of fixture coverage

- PDFs: three pages, selectable text, mixed dimensions and one rotated page. No comprehensive PDF/X, forms, annotations, bookmarks, signatures or CJK tests. PDF-lib editing may omit document-level structures. Page numbering/watermarks are placed in native page coordinates, so rotated/cropped PDFs may need a visual review.
- Images: 120×80 synthetic sources in PNG/JPG/WEBP/BMP/TIFF. PNG/WEBP alpha retention and JPG/BMP background flattening pass. EXIF orientation is requested from the browser but not fixture-tested. No color-profile, HDR/high-bit-depth, rare TIFF compression or animated-image fidelity claim.
- Documents: simple Latin/Greek/Cyrillic text, paragraphs, emphasis, headings and tables. Embedded image support uses library capabilities but is not included in the current DOCX fixture. External resources, links, CSS and active HTML are removed; complex scripts and pagination are not preserved. HTML/Markdown→DOCX omits images.
- Sheets: Unicode, quotes, multiline CSV, leading zeros, numbers/booleans, cached formula values and two worksheets with dates. No chart/style/macro preservation. CSV type inference is opt-in.
- Media: 1.2-second 440 Hz audio and 96×64 video with AAC audio, testing MP3, WAV, FLAC, M4A, MP4, MOV and WEBM. Additional OGG/Vorbis, ADTS AAC and MKV/H.264+AAC fixtures are tested for the tools accepting those formats. Other codec profiles remain unverified. WAV output is 16-bit PCM. Video outputs are H.264/AAC MP4 or VP8/Opus WEBM; aspect ratio is kept, odd dimensions are rounded down to even pixels. Short synthetic tests do not guarantee all codec profiles or long-file performance.
- UI: DOM interaction tests pass; desktop/mobile visual layout, native browser downloads, worker asset loading and Safari/Firefox/iOS/Android remain unverified.

File limits are safeguards, not memory guarantees. Always retain originals and inspect output before using critical documents.
