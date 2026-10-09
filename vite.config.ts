import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react(), tailwindcss()],
  build: { target: 'es2022', chunkSizeWarningLimit: 2500 },
  worker: { format: 'es' },
  optimizeDeps: { exclude: ['@ffmpeg/ffmpeg'] },
  server: { host: '127.0.0.1' },
});
