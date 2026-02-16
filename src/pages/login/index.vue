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
  email: string().email().required().label('Email'),
  password: string().required().label('Senha'),
})

const onSubmit = async (payload) => {
  // TODO: submit payload.data
}
</script>
