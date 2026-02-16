<template>
  <AuthLayout>
    <UAuthForm
      title="Login"
      description="Digite seu email e senha para acessar sua conta"
      :fields="fields"
      :schema="schema"
      :submit="{ label: 'Entrar', block: true }"
      @submit="onSubmit"
    >
      <template v-if="error" #validation>
        <UAlert color="error" variant="soft" :description="error" />
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
definePage({
  meta: { auth: 'guest' },
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth.js'

const router = useRouter()
const { login } = useAuth()
const error = ref('')

const fields = [
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'password', type: 'password', label: 'Senha' },
]

const schema = object({
  email: string().email().required().label('Email'),
  password: string().required().label('Senha'),
})

const onSubmit = async (payload) => {
  error.value = ''
  try {
    await login(payload.data)
    router.push({ name: '/' })
  } catch (e) {
    const msg = e.response?.data?.message ?? e.response?.data?.errors ?? 'Falha ao entrar. Tente novamente.'
    error.value = typeof msg === 'object' ? Object.values(msg).flat().join(' ') : msg
  }
}
</script>
