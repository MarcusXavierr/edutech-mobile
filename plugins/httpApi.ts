import { createHttpError, type HttpError } from '@/types/http-error'
import axios, { type AxiosInstance } from 'axios'

const httpAPI: AxiosInstance = axios.create()
// BUG: ta undefined
// httpAPI.defaults.baseURL = process.env.BASE_API_URL
httpAPI.defaults.baseURL = "https://3a5c-2804-6660-ff21-6700-1477-4047-d220-2.ngrok-free.app"

httpAPI.interceptors.request.use(
  (config) => {
    console.log('vou configurar os headers', httpAPI.defaults.baseURL)
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

    return Promise.reject(httpError)
  }
)

export default httpAPI
