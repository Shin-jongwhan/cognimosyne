import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cognimosyne/',  // ✅ 반드시 넣어야 GitHub Pages에서 작동
  plugins: [react()],
})