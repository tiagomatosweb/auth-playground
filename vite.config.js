import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import VueRouter from 'unplugin-vue-router/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(), 
    ui()
  ],
})
