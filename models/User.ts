export interface User {
  id: number
  username: string
  password: string
  email: string
  created_at: Date
  createdAt?: Date
  updated_at: Date
  updatedAt?: Date
  put_at: Date | null
  goal_at: Date | null
  goal: number
}

export interface LoginData {
  password: string
  email: string
}

export interface SignUpData {
  username: string
  password: string
  email: string
}
