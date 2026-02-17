<template>
  <AuthLayout>
    <UAuthForm
      title="Login"
      description="Digite seu email e senha para acessar sua conta"
      :fields="fields"
      :schema="schema"
      loading-auto
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth.js'

definePage({
  meta: { auth: 'guest' },
})

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

const onSubmit = async ({ data }) => {
  error.value = ''
  try {
    await login(data)
    router.push({ name: '/' })
  } catch (e) {
    error.value = e.message
  }
}
</script>
