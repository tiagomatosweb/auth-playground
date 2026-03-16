import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import VueRouter from 'vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  server: { port: 3000 },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  plugins: [
    VueRouter({ dts: 'src/route-map.d.ts' }),
    vue(),
    ui({
      ui: {
        colors: {
          neutral: 'zinc'
        },
      },
    }),
  ],
})
