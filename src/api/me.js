import api from './client.js'

export const meAPI = {
  getMe: () => api.get('/api/me'),
}
