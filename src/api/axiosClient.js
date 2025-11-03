import axios from 'axios'

// Use '/api' which will be proxied by Vite in dev and Netlify in production
// This avoids CORS issues by making requests appear to come from the same origin
const BASE_URL = '/api';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
console.log('✅ API Base URL:', BASE_URL)

// Attach token
client.interceptors.request.use(cfg => {
  const token = localStorage.getItem('accessToken')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// Refresh on 401
let isRefreshing = false
let queue = []

function processQueue(error, token = null) {
  queue.forEach(p => {
    if (error) p.reject(error)
    else p.resolve(token)
  })
  queue = []
}

client.interceptors.response.use(res => res, async err => {
  const original = err.config
  if (err.response && err.response.status === 401 && !original._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject })
      }).then(token => {
        original.headers.Authorization = 'Bearer ' + token
        return client(original)
      })
    }
    original._retry = true
    isRefreshing = true
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      isRefreshing = false
      return Promise.reject(err)
    }
    try {
      const resp = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken })
      const { accessToken, refreshToken: newRefresh } = resp.data
      localStorage.setItem('accessToken', accessToken)
      if (newRefresh) localStorage.setItem('refreshToken', newRefresh)
      client.defaults.headers.common.Authorization = 'Bearer ' + accessToken
      processQueue(null, accessToken)
      return client(original)
    } catch (e) {
      processQueue(e, null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return Promise.reject(e)
    } finally {
      isRefreshing = false
    }
  }
  return Promise.reject(err)
})

export default client
