<template>
  <AuthLayout>
    <UAuthForm
      title="Criar conta"
      description="Preencha os dados abaixo para se cadastrar"
      :fields="fields"
      :schema="schema"
      loading-auto
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string, ref as yupRef } from 'yup'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth.js'

definePage({
  meta: { auth: 'excluded' },
})

const router = useRouter()
const { register } = useAuth()
const error = ref('')

const fields = [
  { name: 'first_name', type: 'text', label: 'Primeiro nome' },
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'password', type: 'password', label: 'Senha' },
  { name: 'password_confirmation', type: 'password', label: 'Confirmar senha' },
]

const schema = object({
  first_name: string().required().label('Primeiro nome'),
  email: string().email().required().label('Email'),
  password: string().min(8).required().label('Senha'),
  password_confirmation: string().required().oneOf([yupRef('password')]).label('Confirmar senha'),
})

const onSubmit = async ({ data }) => {
  error.value = ''
  const { first_name, email, password } = data
  try {
    await register({
      first_name,
      email,
      password,
    })
    router.push({ name: '/login/' })
  } catch (e) {
    error.value = e.message
  }
}
</script>
