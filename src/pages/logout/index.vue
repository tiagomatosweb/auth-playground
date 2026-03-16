<template>
  <AuthLayout>
    <UCard>
      <p class="text-center text-muted">Saindo...</p>
    </UCard>
  </AuthLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth.js'

definePage({
  meta: { auth: true },
})

const router = useRouter()
const { logout } = useAuth()

onMounted(async () => {
  await logout()
  router.replace({ name: '/login/' })
})
</script>

