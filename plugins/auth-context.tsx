import { User } from "@/models/user"
import { login, LoginPayload, register, RegisterPayload, type LoginResponse, type RegisterResponse } from "@/services/auth.service"
import { type HttpError } from "@/types/http-error"
import { type Result } from "@/types/result"
import { createContext, useContext } from "react"

type AuthContextType = {
  user?: User,
  token?: string
  signUp: (payload: RegisterPayload) => Promise<Result<RegisterResponse, HttpError>>,
  signIn: (payload: LoginPayload) => Promise<Result<LoginResponse, HttpError>>
}

const AuthContext = createContext<AuthContextType|undefined>(undefined)

export function AuthProvider({children}: {children: React.ReactNode}) {
  return (
    <AuthContext.Provider value={{
      user: undefined, 
      token: '', 
      signUp: register, 
      signIn: login
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be inside AuthProvider")
  }

  return context
}


