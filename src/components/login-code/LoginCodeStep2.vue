<template>
  <UAuthForm
    title="Entrar com código"
    description="Digite o código enviado por email"
    :fields="fields"
    :schema="schema"
    loading-auto
    :submit="{ label: 'Entrar', block: true }"
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
import { useAuth } from '@/composables/useAuth.js'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  email: { type: String, required: true },
})

const emit = defineEmits(['success'])

const { loginWithCode } = useAuth()
const error = ref('')

const fields = [{ name: 'code', type: 'otp', length: 6, otp: true, label: 'Código' }]

const schema = object({
  code: array().of(string()).length(6).required().label('Código'),
})

const onSubmit = async ({ data }) => {
  error.value = ''
  try {
    await loginWithCode({
      email: props.email,
      code: Array.isArray(data.code) ? data.code.join('') : data.code,
    })
    emit('success')
  } catch (e) {
    error.value = e.message
  }
}
</script>
