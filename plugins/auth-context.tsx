import { User } from "@/models/user"
import { login, LoginPayload, register, RegisterPayload, type LoginResponse, type RegisterResponse } from "@/services/auth.service"
import { type HttpError } from "@/types/http-error"
import { type Result } from "@/types/result"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from "react"
import httpApi from "./httpApi"

type AuthContextType = {
  user?: User,
  token?: string,
  isAuthenticated: boolean,
  isLoading: boolean,
  signUp: (payload: RegisterPayload) => Promise<Result<RegisterResponse, HttpError>>,
  signIn: (payload: LoginPayload) => Promise<Result<LoginResponse, HttpError>>,
  signOut: () => Promise<void>,
  debugStorage: () => Promise<void>,
}

const AuthContext = createContext<AuthContextType|undefined>(undefined)

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

// TODO: Refatorar esse componente para ficar mais enxuto
export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Loads authentication data from storage on app start
   */
  useEffect(() => {
    loadAuthData()
  }, [])

  /**
   * Updates httpApi headers when token changes
   */
  useEffect(() => {
    if (token) {
      httpApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete httpApi.defaults.headers.common['Authorization']
    }
  }, [token])

  const loadAuthData = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY)
      ])

      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Failed to load auth data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveAuthData = async (token: string, user: User) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEY, token),
        AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
      ])
      setToken(token)
      setUser(user)
    } catch (error) {
      console.error('Failed to save auth data:', error)
      throw error
    }
  }

  const clearAuthData = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(TOKEN_KEY),
        AsyncStorage.removeItem(USER_KEY)
      ])
      setToken(undefined)
      setUser(undefined)
    } catch (error) {
      console.error('Failed to clear auth data:', error)
    }
  }

  /**
   * Handles user registration with automatic login
   */
  const handleSignUp = async (payload: RegisterPayload): Promise<Result<RegisterResponse, HttpError>> => {
    const result = await register(payload)

    if (result.success) {
      await saveAuthData(result.data.accessToken, result.data.user)
    }

    return result
  }

  /**
   * Handles user login with token persistence
   */
  const handleSignIn = async (payload: LoginPayload): Promise<Result<LoginResponse, HttpError>> => {
    const result = await login(payload)

    if (result.success) {
      await saveAuthData(result.data.accessToken, result.data.user)
    }

    return result
  }

  /**
   * Handles user logout with data cleanup
   */
  const handleSignOut = async () => {
    await clearAuthData()
  }

  /**
   * Debug function to log all AsyncStorage auth data
   */
  const debugStorage = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY)
      ])

      console.log('=== AsyncStorage Debug ===')
      console.log('Stored Token:', storedToken)
      console.log('Stored User:', storedUser)
      console.log('Parsed User:', storedUser ? JSON.parse(storedUser) : null)
      console.log('Current State Token:', token)
      console.log('Current State User:', user)
      console.log('Is Authenticated:', !!token && !!user)
      console.log('========================')
    } catch (error) {
      console.error('Debug storage error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!token && !!user,
      isLoading,
      signUp: handleSignUp,
      signIn: handleSignIn,
      signOut: handleSignOut,
      debugStorage,
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
