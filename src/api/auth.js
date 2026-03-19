import api from './client.js'

export const authAPI = {
  login: (data) => api.post('/api/login', data),
  logout: () => api.post('/api/logout'),
  register: (data) => api.post('/api/register', data),
  verifyEmail: (token) => api.post('/api/verify-email', { token }),
  forgotPassword: (email) => api.post('/api/forgot-password', { email }),
  resetPassword: (data) => api.post('/api/reset-password', data),
  requestLoginCode: (email) => api.post('/api/login-codes/request', { email }),
  verifyLoginCode: (data) => api.post('/api/login-codes/verify', data),
}
