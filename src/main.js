import { createApp } from 'vue'
import { setLocale } from 'yup'
import { pt } from 'yup-locale-pt'
import ui from '@nuxt/ui/vue-plugin'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useAuth } from './composables/useAuth.js'
import { runMiddleware } from './middleware/index.js'
import { hello, initHello } from './plugins/hello.js'
import './style.css'
import App from './App.vue'

setLocale(pt)
initHello()
hello.utils.responseHandler(window, window.opener || window.parent)

const { fetchUser, user, isAuthenticated } = useAuth()
await fetchUser()

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const mwResult = runMiddleware(to, from)
  if (mwResult) return mwResult

  const auth = to.meta?.auth ?? true
  if (auth === 'excluded') return true
  if (auth === 'guest') {
    return isAuthenticated.value ? { path: '/' } : true
  }
  if (!user.value) return { path: '/login/' }
  return true
})

const app = createApp(App)
app.use(router)
app.use(ui)
app.mount('#app')

router.isReady().then(() => {
  const auth = router.currentRoute.value.meta?.auth ?? true
  if (auth === 'excluded') return
  if (auth === 'guest' && isAuthenticated.value) router.replace('/')
  if (auth !== 'guest' && auth !== 'excluded' && !user.value) router.replace('/login/')
})
