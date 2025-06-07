import { AuthUser, User } from '@/models/user'
import httpApi from '@/services/httpApi'
import { type HttpError } from '@/types/http-error'
import { failure, type Result, success } from '@/types/result'

export type LoginResponse = {
  access_token: string
  user: User
  refresh_token: string
}

export type RegisterResponse = LoginResponse
export type LoginPayload = Omit<AuthUser, "email">
export type RegisterPayload = AuthUser

/**
 * Authenticates user with email and password
 */
export const login = (payload: LoginPayload): Promise<Result<LoginResponse, HttpError>> => {
  return httpApi.post<LoginResponse>("/users/login", payload)
    .then(res => success(res.data))
    .catch((error: HttpError) => failure(error))
}

/**
 * Registers a new user account
 */
export const register = (payload: RegisterPayload): Promise<Result<RegisterResponse, HttpError>> => {
  return httpApi.post<RegisterResponse>("/users/", payload)
    .then(res => success(res.data))
    .catch((error: HttpError) => failure(error))
}
