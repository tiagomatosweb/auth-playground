import { createApp } from 'vue'
import { setLocale } from 'yup'
import { pt } from 'yup-locale-pt'
import ui from '@nuxt/ui/vue-plugin'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useAuth } from './composables/useAuth.js'
import './style.css'
import App from './App.vue'

setLocale(pt)

const { fetchUser, user, isAuthenticated } = useAuth()
await fetchUser()

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = to.meta?.auth ?? true
  if (auth === 'excluded') return next()
  if (auth === 'guest') return isAuthenticated.value ? next({ path: '/' }) : next()
  if (!user.value) return next({ path: '/login' })
  next()
})

const app = createApp(App)
app.use(router)
app.use(ui)
app.mount('#app')

router.isReady().then(() => {
  const auth = router.currentRoute.value.meta?.auth ?? true
  if (auth === 'excluded') return
  if (auth === 'guest' && user.value) router.replace('/')
  if (auth !== 'guest' && auth !== 'excluded' && !user.value) router.replace('/login')
})
