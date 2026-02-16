import axios from 'axios'

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

export default client
