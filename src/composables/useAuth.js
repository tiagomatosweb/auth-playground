import { ref, computed } from 'vue'
import api from '@/api/client.js'

const user = ref(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/api/me')
      user.value = data
      return data
    } catch (e) {
      if (e.response?.status === 401) {
        user.value = null
        return null
      }
      throw e
    }
  }

  const login = async (credentials) => {
    const { data } = await api.post('/api/login', credentials)
    user.value = data
    return data
  }

  const logout = async () => {
    await api.post('/api/logout')
    user.value = null
  }

  const register = async (payload) => {
    await api.post('/api/register', payload)
  }

  return {
    user,
    isAuthenticated,
    fetchUser,
    login,
    logout,
    register,
  }
}
