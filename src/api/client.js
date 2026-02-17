import axios from 'axios'
import globalErrorMessage from './globalErrorMessage.js'

const CSRF_ENDPOINT = '/sanctum/csrf-cookie'
const SECURE_METHODS = new Set(['post', 'put', 'patch', 'delete'])

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

let csrfPromise = null

function ensureCsrfCookie() {
  if (!csrfPromise) {
    csrfPromise = client.get(CSRF_ENDPOINT)
  }
  return csrfPromise
}

function clearCsrfCache() {
  csrfPromise = null
}

client.interceptors.request.use(
  async (config) => {
    const method = (config.method || 'get').toLowerCase()
    if (SECURE_METHODS.has(method) && !config._retriedCsrf) {
      await ensureCsrfCookie()
    }
    return config
  },
  (err) => Promise.reject(err)
)

client.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const response = error.response
    const status = response?.status
    const config = error.config

    if (status === 419 && config && !config._retriedCsrf) {
      clearCsrfCache()
      config._retriedCsrf = true
      await ensureCsrfCookie()
      return client.request(config)
    }

    const message = globalErrorMessage(response?.data?.error)
    return Promise.reject({ message, status })
  }
)

client.ensureCsrfCookie = ensureCsrfCookie
export default client
