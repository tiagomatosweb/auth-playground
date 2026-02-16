<template>
  <AuthLayout>
    <UAuthForm
      title="Criar conta"
      description="Preencha os dados abaixo para se cadastrar"
      :fields="fields"
      :schema="schema"
      :submit="{ label: 'Cadastrar', block: true }"
      @submit="onSubmit"
    >
      <template v-if="error" #validation>
        <UAlert color="error" variant="soft" :description="error" />
      </template>
      <template #footer>
        <p class="text-center text-sm text-muted">
          Já tem uma conta?
          <ULink :to="{ name: '/login/' }" class="font-medium underline">Login</ULink>
        </p>
      </template>
    </UAuthForm>
  </AuthLayout>
</template>

<script setup>
definePage({
  meta: { auth: 'excluded' },
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string, ref as yupRef } from 'yup'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth.js'

const router = useRouter()
const { register, login } = useAuth()
const error = ref('')

const fields = [
  { name: 'name', type: 'text', label: 'Nome' },
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'password', type: 'password', label: 'Senha' },
  { name: 'password_confirmation', type: 'password', label: 'Confirmar senha' },
]

const schema = object({
  name: string().required().label('Nome'),
  email: string().email().required().label('Email'),
  password: string().min(8).required().label('Senha'),
  password_confirmation: string().required().oneOf([yupRef('password')]).label('Confirmar senha'),
})

const onSubmit = async (payload) => {
  error.value = ''
  const { name, email, password } = payload.data
  try {
    await register({
      first_name: name,
      email,
      password,
    })
    await login({ email, password })
    router.push({ name: '/' })
  } catch (e) {
    const msg = e.response?.data?.message ?? e.response?.data?.errors ?? 'Falha ao cadastrar. Tente novamente.'
    error.value = typeof msg === 'object' ? Object.values(msg).flat().join(' ') : msg
  }
}
</script>
