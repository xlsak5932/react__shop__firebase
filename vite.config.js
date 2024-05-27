import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './', // 프로젝트의 루트 디렉토리 설정
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html', // 상대 경로로 지정
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
});
