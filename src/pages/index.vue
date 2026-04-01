<template>
  <AuthLayout>
    <UCard>
      <div class="space-y-4 text-center">
        <h1 class="text-xl font-semibold">Hello World</h1>

        <UAvatar
          v-if="user?.avatar"
          :src="user.avatar"
          :alt="avatarAlt"
          size="5xl"
          class="mx-auto"
        />

        <pre
          v-if="user"
          class="rounded-lg bg-neutral-100 p-4 text-left font-mono text-xs text-neutral-800 ring-1 ring-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-800 max-h-80 overflow-auto"
        ><code>{{ userJson }}</code></pre>

        <UButton variant="soft" block @click="onLogout">
          Sair
        </UButton>
      </div>
    </UCard>
  </AuthLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth.js'

definePage({
  meta: { auth: true },
})

const router = useRouter()
const { user, logout } = useAuth()

const userJson = computed(() =>
  user.value ? JSON.stringify(user.value, null, 2) : '',
)

const avatarAlt = computed(() => {
  const u = user.value
  if (!u) return ''
  return String(u.name || u.email || 'User')
})

const onLogout = async () => {
  await logout()
  router.push({ name: '/login/' })
}
</script>