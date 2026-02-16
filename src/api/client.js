import axios from 'axios'
import globalErrorMessage from './globalErrorMessage.js'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

client.defaults.xsrfCookieName = 'XSRF-TOKEN'
client.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const response = error.response
    const message = globalErrorMessage(response?.data?.error)
    const status = response?.status

    return Promise.reject({ message, status })
  }
)

export default client
