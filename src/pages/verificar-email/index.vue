<template>
  <AuthLayout>
    <div class="text-center space-y-4">
      <template v-if="isLoading">
        <p class="text-muted">Verificando seu email...</p>
      </template>

      <template v-else-if="error">
        <UAlert color="error" variant="soft" :description="error.message" />
        <ULink :to="{ name: '/login/' }" class="text-sm font-medium underline">Ir para login</ULink>
      </template>
      
      <template v-else>
        <UAlert color="success" variant="soft" description="Email verificado com sucesso." />
        <ULink :to="{ name: '/login/' }" class="text-sm font-medium underline">Fazer login</ULink>
      </template>
    </div>
  </AuthLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth.js'

definePage({
  meta: { auth: 'excluded', middleware: 'requireToken' },
})

const route = useRoute()
const { verifyEmail } = useAuth()

const { isLoading, error } = useAsyncState(
  () => verifyEmail(route.query.token),
  undefined
)
</script>
