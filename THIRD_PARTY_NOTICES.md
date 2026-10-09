# Third-party notices

Folio application source is MIT licensed. Dependency code, fonts and runtime binaries retain their own licenses. `package-lock.json` identifies the exact delivered versions; `public/licenses/` and `dist/licenses/` include available upstream notices.

| Component                                                          | License / attribution                                                                                  |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| React, React DOM, React Router, Vite, Tailwind, TypeScript tooling | MIT (individual packages retain copyright notices)                                                     |
| Lucide React                                                       | ISC; icons by the Lucide contributors                                                                  |
| pdf-lib                                                            | MIT                                                                                                    |
| Mozilla PDF.js                                                     | Apache-2.0; bundled CMaps, standard fonts and decoders retain their included notices                   |
| pdfmake                                                            | MIT; its bundled Roboto fonts retain Google's Apache-2.0 font license                                  |
| docx                                                               | MIT                                                                                                    |
| Mammoth                                                            | BSD-2-Clause                                                                                           |
| ExcelJS                                                            | MIT                                                                                                    |
| Papa Parse                                                         | MIT                                                                                                    |
| JSZip                                                              | MIT or GPL-3.0-or-later (MIT option used for library integration)                                      |
| DOMPurify                                                          | Apache-2.0 or MPL-2.0                                                                                  |
| Marked                                                             | MIT                                                                                                    |
| UTIF                                                               | MIT, including upstream decoder dependencies                                                           |
| @ffmpeg/ffmpeg JavaScript wrapper                                  | MIT                                                                                                    |
| @ffmpeg/core 0.12.10                                               | GPL-2.0-or-later, as declared by the distributed package; contains FFmpeg and external codec libraries |

The complete GPL-2.0 text is in `public/licenses/GPL-2.0.txt`. The FFmpeg core is an unmodified copy of the published single-thread package. It includes encoders such as x264, libvpx, libmp3lame and libopus. It is not a permissively licensed replacement for the original FFmpeg/codec licensing terms.

Upstream corresponding-source/build information:

- https://github.com/ffmpegwasm/ffmpeg.wasm (wrapper, core build recipes and dependency build scripts; use release/tag corresponding to core 0.12.10)
- https://github.com/ffmpegwasm/ffmpeg.wasm-core (FFmpeg core source history)
- https://ffmpegwasm.netlify.app/docs/faq/ (upstream explanation of core and wrapper licenses)
- https://ffmpeg.org/legal.html (FFmpeg licensing information)

Keep notices and satisfy the applicable licenses, including corresponding-source obligations, when you choose to redistribute/host the runtime. This ZIP does not include the full C/C++ source trees of FFmpeg and every codec dependency. No hosting/distribution to a public site was performed as part of this task.

Testing-only dependencies (jsdom, @napi-rs/canvas, Playwright, Vitest and Testing Library) are listed in `devDependencies` and are not loaded by the deployed application. Their notices remain in their installed npm packages.
