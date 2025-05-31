import { AuthUser, User } from '@/models/user'
import httpApi from '../plugins/httpApi'

export type LoginResponse = {
  accessToken: string
  user: User
}

// TODO: Talvez criar uma mônada pra lidar com esse erro, sei lá, conversa com o gepeto pra ele pensar numa boa solução pro meu contexto
export type RegisterResponse = LoginResponse
export type LoginPayload = Omit<AuthUser, "name">
export type RegisterPayload = Omit<AuthUser, "name">

// TODO: Pensar numa validação de erros pra cá
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await httpApi.post<LoginResponse>("/login", payload)
  return res.data
}

// INFO: Só vamos omitir o nome temporariamente
export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  console.log('fui chamado', payload)
  const res = await httpApi.post<LoginResponse>("/users", payload)
  return res.data
}
