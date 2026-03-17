<template>
  <UAuthForm
    title="Esqueci a senha"
    description="Digite seu email para receber o código de redefinição"
    :fields="fields"
    :schema="schema"
    loading-auto
    :submit="{ label: 'Enviar código', block: true }"
    @submit="onSubmit"
  >
    <template v-if="error" #validation>
      <UAlert color="error" variant="soft" :description="error" />
    </template>
  </UAuthForm>
</template>

<script setup>
import { ref } from 'vue'
import { object, string } from 'yup'
import { authAPI } from '@/api/auth.js'

const emit = defineEmits(['next'])

const error = ref('')
const fields = [{ name: 'email', type: 'email', label: 'Email' }]

const schema = object({
  email: string().email().required().label('Email'),
})

const onSubmit = async ({ data }) => {
  error.value = ''
  try {
    await authAPI.forgotPassword(data.email)
    emit('next', data.email)
  } catch (e) {
    error.value = e.message
  }
}
</script>
