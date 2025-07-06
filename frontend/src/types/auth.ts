export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  token: string
  role: "user" | "admin"
  subscriptionStatus: string
}

export interface User {
  token: string
  role: "user" | "admin"
  subscriptionStatus: string
}
