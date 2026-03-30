<template>
  <AuthLayout>
    <div class="space-y-4">
      <LoginMagicLinkStep1 />

      <p class="text-center text-sm text-muted">
        Quer usar senha?
        <ULink :to="{ name: '/login/' }" class="font-medium underline">Fazer login</ULink>
      </p>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginMagicLinkStep1 from '@/components/login-magic/LoginMagicLinkStep1.vue'

definePage({
  meta: { auth: 'guest' },
})
</script>
