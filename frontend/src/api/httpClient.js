import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 10000,
  headers: { Accept: 'application/json' },
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiMessage = error.response?.data?.error?.message
    const normalizedError = new Error(
      apiMessage || 'No fue posible conectar con el servidor. Intenta nuevamente.',
    )
    normalizedError.status = error.response?.status
    normalizedError.cause = error
    return Promise.reject(normalizedError)
  },
)
