// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/green/',

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@page': path.resolve(__dirname, './src/page'),
      '@store': path.resolve(__dirname, './src/store'),
      '@util': path.resolve(__dirname, './src/util'),
      '@zustand': path.resolve(__dirname, './src/zustand'),
    },
  },

  build: {
    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks: {},   // ← 🔥 chunk splitting 완전 OFF
      },
    },

    // 경고 완화
    chunkSizeWarningLimit: 5000,
  },

  css: {
    devSourcemap: true,
  },

  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
    global: 'globalThis',
  },

  optimizeDeps: {
    include: ['ag-grid-react', 'ag-grid-community'],
  }
});
