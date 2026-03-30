<template>
  <div class="space-y-4">
    <UAuthForm
      v-if="!sent"
      title="Login mágico"
      description="Digite seu email para receber um link de acesso"
      :fields="fields"
      :schema="schema"
      loading-auto
      :submit="{ label: 'Enviar link', block: true }"
      @submit="onSubmit"
    >
      <template v-if="error" #validation>
        <UAlert color="error" variant="soft" :description="error" />
      </template>
    </UAuthForm>

    <template v-else>
      <UAlert
        color="success"
        variant="soft"
        description="Se existir uma conta com esse email, enviamos um link de login. Confira sua caixa de entrada."
      />
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { object, string } from 'yup'
import { authAPI } from '@/api/auth.js'

const sent = ref(false)
const error = ref('')
const fields = [{ name: 'email', type: 'email', label: 'Email' }]

const schema = object({
  email: string().email().required().label('Email'),
})

const onSubmit = async ({ data }) => {
  error.value = ''
  try {
    await authAPI.requestLoginLink(data.email)
    sent.value = true
  } catch (e) {
    error.value = e.message
  }
}
</script>
