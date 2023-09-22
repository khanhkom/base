export interface ISession {
  accessToken: string
  refreshToken: string
  expiresIn: number
  refreshExpiresIn: number
  isNewUser?: boolean
}
