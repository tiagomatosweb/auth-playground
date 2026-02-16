<template>
  <AuthLayout>
    <UAuthForm
      title="Entrar"
      description="Digite seu email e senha para acessar sua conta"
      :fields="fields"
      :schema="schema"
      :submit="{ label: 'Entrar', block: true }"
      @submit="onSubmit"
    />
  </AuthLayout>
</template>

<script setup>
import { object, string } from 'yup'
import AuthLayout from '@/layouts/AuthLayout.vue'

const fields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Senha',
  },
]

const schema = object({
  email: string().email('Email inválido').required('Email obrigatório'),
  password: string().required('Senha obrigatória'),
})

async function onSubmit(payload) {
  // TODO: submit payload.data
}
</script>
