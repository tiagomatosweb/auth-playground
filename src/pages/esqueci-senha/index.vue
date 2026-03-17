<template>
  <AuthLayout>
    <div class="space-y-4">
      <ForgotPasswordStep1
        v-if="step === 1"
        @next="onNext"
      />
      <ForgotPasswordStep2
        v-else
        :email="email"
        @success="router.push({ name: '/login/' })"
      />
      <p v-if="step === 1" class="text-center text-sm text-muted">
        Lembrou a senha?
        <ULink :to="{ name: '/login/' }" class="font-medium underline">Fazer login</ULink>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import ForgotPasswordStep1 from '@/components/forgot-password/ForgotPasswordStep1.vue'
import ForgotPasswordStep2 from '@/components/forgot-password/ForgotPasswordStep2.vue'

definePage({
  meta: { auth: 'guest' },
})

const router = useRouter()
const step = ref(1)
const email = ref('')

const onNext = (emailValue) => {
  email.value = emailValue
  step.value = 2
}
</script>
