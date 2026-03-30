<template>
  <AuthLayout>
    <div v-if="magicLinkLoading" class="text-center space-y-4">
      <p class="text-muted">Validando link de login...</p>
    </div>

    <UAuthForm
      v-else
      title="Login"
      description="Digite seu email e senha para acessar sua conta"
      :fields="fields"
      :schema="schema"
      :providers="providers"
      separator="ou"
      loading-auto
      :submit="{ label: 'Entrar', block: true }"
      @submit="onSubmit"
    >
      <template v-if="magicLinkError || error" #validation>
        <UAlert color="error" variant="soft" :description="magicLinkError || error" />
      </template>

      <template #password-hint>
        <ULink to="/esqueci-senha/" class="text-primary font-medium" tabindex="-1">
          Esqueci minha senha
        </ULink>
      </template>

      <template #footer>
        <p class="text-center text-sm text-muted">
          Ainda não tem uma conta?
          <ULink :to="{ name: '/cadastrar/' }" class="font-medium underline">Cadastre-se</ULink>
        </p>
      </template>
    </UAuthForm>
  </AuthLayout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { object, string } from 'yup'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth.js'

definePage({
  meta: { auth: 'guest' },
})

const route = useRoute()
const router = useRouter()
const { login, loginWithMagicLink } = useAuth()
const error = ref('')
const magicLinkLoading = ref(false)
const magicLinkError = ref('')

watch(
  () => route.query.token,
  async (token) => {
    if (!token) return

    magicLinkLoading.value = true
    magicLinkError.value = ''
    error.value = ''
    try {
      await loginWithMagicLink(token)
      await router.replace({ name: '/' })
    } catch (e) {
      magicLinkError.value = e.message
      await router.replace({ name: '/login/', query: {} })
    } finally {
      magicLinkLoading.value = false
    }
  },
  { immediate: true },
)

const providers = [
  {
    label: 'Entrar com código',
    icon: 'i-lucide-key-round',
    onClick: () => router.push({ name: '/login-codigo/' }),
  },
  {
    label: 'Login mágico',
    icon: 'i-lucide-sparkles',
    onClick: () => router.push({ name: '/login-magico/' }),
  },
]

const fields = [
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'password', type: 'password', label: 'Senha' },
]

const schema = object({
  email: string().email().required().label('Email'),
  password: string().required().label('Senha'),
})

const onSubmit = async ({ data }) => {
  error.value = ''
  magicLinkError.value = ''
  try {
    await login(data)
    router.push({ name: '/' })
  } catch (e) {
    error.value = e.message
  }
}
</script>
