export type User = {
  id: number
  email: string
  name?: string
}

export type AuthUser = Omit<User, "id"> & { password: string }
