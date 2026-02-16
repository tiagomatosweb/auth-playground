import { createApp } from 'vue'
import { setLocale } from 'yup'
import { pt } from 'yup-locale-pt'
import ui from '@nuxt/ui/vue-plugin'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import './style.css'
import App from './App.vue'

setLocale(pt)

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use(ui)

app.mount('#app')