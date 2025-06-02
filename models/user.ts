export type User = {
  id: string
  email: string
  username: string
}

export type AuthUser = Omit<User, "id"> & { password: string }
