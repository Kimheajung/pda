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


  plugins: [
    react(),
    tailwindcss(),
  ],

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
      // 🚨 코드 분할 완전 비활성화
      output: {
        inlineDynamicImports: true,  // ← dynamic import도 한 파일로 합침
        manualChunks: undefined,     // ← chunk 분할 금지
      },
    },

    // 하나의 번들 파일로 묶어도 경고 안 나오게
    chunkSizeWarningLimit: 999999,
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
  },

  cssMinify: true,
  assetsDir: '',
  
});
