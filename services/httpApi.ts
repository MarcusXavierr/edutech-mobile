import { createHttpError, type HttpError } from '@/types/http-error'
import axios, { type AxiosInstance } from 'axios'
import event from '@/utils/event'

const httpAPI: AxiosInstance = axios.create()
// BUG: ta undefined
// httpAPI.defaults.baseURL = process.env.BASE_API_URL
httpAPI.defaults.baseURL = "http://18.209.31.113:8080"

httpAPI.interceptors.request.use(
  (config) => {
    console.log('vou configurar os headers', httpAPI.defaults.baseURL, config.url)
    return config
  }
)

httpAPI.interceptors.response.use(
  (response) => response,
  (error: unknown): Promise<never> => {
    let httpError: HttpError

    if (axios.isAxiosError(error)) {
      httpError = createHttpError(
        error.response?.status ?? 0,
        error.message,
        error.response?.data
      )
    } else {
      httpError = createHttpError(
        0,
        error instanceof Error ? error.message : 'Unknown error occurred',
        undefined
      )
    }

    if (httpError.status === 401) {
      event.emit('shouldLogout', true)
    }
    return Promise.reject(httpError)
  }
)

export default httpAPI
