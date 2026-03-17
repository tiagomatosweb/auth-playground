<template>
  <UAuthForm
    title="Nova senha"
    description="Digite o código enviado por email e sua nova senha"
    :fields="fields"
    :schema="schema"
    loading-auto
    :submit="{ label: 'Redefinir senha', block: true }"
    @submit="onSubmit"
  >
    <template v-if="error" #validation>
      <UAlert color="error" variant="soft" :description="error" />
    </template>
  </UAuthForm>
</template>

<script setup>
import { ref } from 'vue'
import { object, string, array } from 'yup'
import { authAPI } from '@/api/auth.js'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  email: { type: String, required: true },
})

const emit = defineEmits(['success'])

const error = ref('')
const fields = [
  { name: 'code', type: 'otp', length: 6, otp: true, label: 'Código' },
  { name: 'password', type: 'password', label: 'Nova senha' },
]

const schema = object({
  code: array().of(string()).length(6).required().label('Código'),
  password: string().min(8).required().label('Nova senha'),
})

const onSubmit = async ({ data }) => {
  error.value = ''
  try {
    await authAPI.resetPassword({
      email: props.email,
      code: Array.isArray(data.code) ? data.code.join('') : data.code,
      password: data.password,
    })
    emit('success')
  } catch (e) {
    error.value = e.message
  }
}
</script>
