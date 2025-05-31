import { AuthUser, User } from '@/models/user'
import httpApi from '@/plugins/httpApi'
import { type HttpError } from '@/types/http-error'
import { failure, type Result, success } from '@/types/result'

export type LoginResponse = {
  accessToken: string
  user: User
}

// TODO: Talvez criar uma mônada pra lidar com esse erro, sei lá, conversa com o gepeto pra ele pensar numa boa solução pro meu contexto
export type RegisterResponse = LoginResponse
export type LoginPayload = Omit<AuthUser, "name">
export type RegisterPayload = Omit<AuthUser, "name">

/**
 * Authenticates user with email and password
 */
export const login = (payload: LoginPayload): Promise<Result<LoginResponse, HttpError>> => {
  return httpApi.post<LoginResponse>("/login", payload)
    .then(res => success(res.data))
    .catch((error: HttpError) => failure(error))
}

/**
 * Registers a new user account
 */
export const register = (payload: RegisterPayload): Promise<Result<RegisterResponse, HttpError>> => {
  return httpApi.post<LoginResponse>("/users", payload)
    .then(res => success(res.data))
    .catch((error: HttpError) => failure(error))
}
