export interface ISession {
  accessToken: string
  refreshToken: string
  expiresIn: number
  refreshExpiresIn: number
  isNewUser?: boolean
  isVerified?: boolean
  isNeedUpdatePhone?: boolean
}

export interface IUser {
  createdAt: string
  fcmToken: string
  isActive: boolean
  phone: string
  role: string
  sessionToken: string
  updatedAt: string
  isVerified: boolean
  id: string
}
