import axios, { type AxiosInstance, type AxiosError } from 'axios'

const httpAPI: AxiosInstance = axios.create()
// BUG: ta undefined
// httpAPI.defaults.baseURL = process.env.BASE_API_URL
httpAPI.defaults.baseURL = "https://2955-2804-6660-ff21-6700-1477-4047-d220-2.ngrok-free.app"

httpAPI.interceptors.request.use(
  (config) => {
    console.log('vou configurar os headers', httpAPI.defaults.baseURL)
    // TODO: Puxar as credenciais de alguma store no app e botar aqui
    return config
  },
  (error: AxiosError) => {
    console.error(error)
    Promise.reject(error)
  }
)

export default httpAPI
