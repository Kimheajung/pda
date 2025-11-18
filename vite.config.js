// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  /*  플러그인
      테일윈드
   */
  base: '/green/',   // git 저장소명으로 변경!
  plugins: [react(), tailwindcss()],



  /*  경로 별칭
      '../../src/api/apiService' => '@api/apiService' 변경해서 사용
   */
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

  // 개발 서버
  // server: {
  //   port: 3000, // 포트 지정
  //   open: true, // npm run dev 시 브라우저 자동 오픈
  //   host: true, // 네트워크 공유 - http://(실행한 PC IP):3000 로 다른 PC에서 접속 가능
  //   hmr: {
  //     overlay: true, // 브라우저에 에러 팝업 표시 (default옵션 명시)
  //   },
  // },

  /*  AG Grid + React 18 번들 최적화
      - 분리 전 (모두 하나로)
      main.js (2.5MB) ← 처음 로딩 느림!

      - 분리 후
      vendor.js (50KB)  ← React (캐싱)
      aggrid.js (1.2MB) ← AG Grid (한 번만)
      main.js (10KB)    ← 내 코드
   */
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // AG Grid 번들 분리 (필수!)
          if (id.includes('ag-grid')) return 'aggrid';
          // PrimeReact 관련 분리
          if (
            id.includes('primereact') ||
            id.includes('primeflex') ||
            id.includes('primeicons')
          )
            return 'prime';
          // React + ReactDOM 분리
          if (id.includes('react') || id.includes('react-dom')) return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 1000, // AG Grid가 커서 "청크가 500KB 초과" 경고 무시
  },

  /* CSS 최적화 
      F12 → Sources → style.css:123 ← 정확한 라인 표시
      Tailwind 클래스 추적 쉬움
  */
  css: {
    devSourcemap: true, // 개발 중 CSS 디버깅
  },

  /* 환경변수
      컴포넌트에서
      console.log(__APP_VERSION__); // "1.0.0"

      빌드 시 환경별 버전
      .env.development → __APP_VERSION__: 'dev-1.0.0'
      .env.production → __APP_VERSION__: 'prod-1.0.0'
   */
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
    global: 'globalThis', // 브라우저 호환성 향상
  },

  /* AG Grid 메모리 최적화 
      - 생략 시
      - AG Grid가 매번 재컴파일
      - Hot Reload 3~5초 지연
      - 메모리 2배 사용

      - include 추가 후
      - Vite가 미리 컴파일 저장
      - Hot Reload 0.3초
      - 메모리 30% 절약
  */
  optimizeDeps: {
    include: ['ag-grid-react', 'ag-grid-community'],
  },
});
