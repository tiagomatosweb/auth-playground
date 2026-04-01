import { ref, computed } from 'vue'
import { authAPI } from '@/api/auth.js'
import { meAPI } from '@/api/me.js'
import api from '@/api/client.js'

const user = ref(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  const fetchUser = async () => {
    try {
      const { data } = await meAPI.getMe()
      user.value = data
      return data
    } catch (e) {
      if (e.status === 401) {
        user.value = null
        return null
      }
      throw e
    }
  }

  const login = async (credentials) => {
    const { data } = await authAPI.login(credentials)
    user.value = data
    return data
  }

  const loginSocial = async (payload) => {
    const { data } = await authAPI.loginSocial(payload)
    user.value = data
    return data
  }

  const loginWithCode = async (payload) => {
    const { data } = await authAPI.verifyLoginCode(payload)
    user.value = data
    return data
  }

  const loginWithMagicLink = async (token) => {
    const { data } = await authAPI.verifyLoginLink(token)
    user.value = data
    return data
  }

  const logout = async () => {
    await authAPI.logout()
    user.value = null
  }

  const register = async (payload) => {
    await authAPI.register(payload)
  }

  const verifyEmail = async (token) => {
    await authAPI.verifyEmail(token)
  }

  const ensureCsrfCookie = () => api.ensureCsrfCookie()

  return {
    user,
    isAuthenticated,
    fetchUser,
    login,
    loginSocial,
    loginWithCode,
    loginWithMagicLink,
    logout,
    register,
    verifyEmail,
    ensureCsrfCookie,
  }
}
