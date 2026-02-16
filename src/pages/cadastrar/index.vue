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
import { object, string, ref as yupRef } from 'yup'
import AuthLayout from '@/layouts/AuthLayout.vue'

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
  // TODO: submit payload.data
}
</script>
