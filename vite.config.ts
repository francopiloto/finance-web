import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig as defineViteConfig } from 'vite';

import { defineConfig as defineVitestConfig, mergeConfig } from 'vitest/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['src/test/**', 'src/**/*.d.ts'],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
