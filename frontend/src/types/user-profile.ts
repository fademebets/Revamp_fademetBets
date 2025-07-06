export interface User {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  subscriptionStatus?: string
  subscriptionEndDate?: string | null
}

export interface UpdateProfileRequest {
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
}

export interface UpdateProfileResponse {
  message: string
  user: User
}

export interface ChangePasswordRequest {
  newPassword: string
}

export interface ChangePasswordResponse {
  message: string
}

export interface ApiError {
  message: string
  error?: string
}


export type UnsubscribeResponse = {
  message: string;
}
