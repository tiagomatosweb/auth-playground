<template>
  <AuthLayout>
    <div class="space-y-4">
      <LoginCodeStep1 v-if="step === 1" @next="onNext" />
      <LoginCodeStep2 v-else :email="email" @success="router.push({ name: '/' })" />

      <p v-if="step === 1" class="text-center text-sm text-muted">
        Quer usar senha?
        <ULink :to="{ name: '/login/' }" class="font-medium underline">Fazer login</ULink>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginCodeStep1 from '@/components/login-code/LoginCodeStep1.vue'
import LoginCodeStep2 from '@/components/login-code/LoginCodeStep2.vue'

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
