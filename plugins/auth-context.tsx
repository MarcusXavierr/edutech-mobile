import { User } from "@/models/user"
import { login, LoginPayload, LoginResponse, register, RegisterPayload, RegisterResponse } from "@/services/auth.service"
import { createContext, useContext } from "react"

type AuthContextType = {
  user?: User,
  token?: string
  signUp: (payload: RegisterPayload) => Promise<RegisterResponse>,
  signIn: (payload: LoginPayload) => Promise<LoginResponse>
}

const AuthContext = createContext<AuthContextType|undefined>(undefined)

export function AuthProvider({children}: {children: React.ReactNode}) {
  return <>
    <AuthContext.Provider value={{user: undefined, token: '', signUp: register, signIn: login}}>
      {children}
    </AuthContext.Provider>
  </>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be inside AuthProvider")
  }

  return context
}


