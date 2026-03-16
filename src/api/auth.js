import api from './client.js'

export const authAPI = {
  login: (data) => api.post('/api/login', data),
  logout: () => api.post('/api/logout'),
  register: (data) => api.post('/api/register', data),
  verifyEmail: (token) => api.post('/api/verify-email', { token }),
}
