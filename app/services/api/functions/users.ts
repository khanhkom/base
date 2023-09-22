import URL from "@app/services/api/url"
import { api } from "../api"
import { ApiResponse } from "apisauce"
import { ISession } from "@app/interface/auth"
interface IBodyLoginSocial {
  base: "google" | "facebook"
  token: string
}
export const login = (body) =>
  api.apisauce
    .post(URL.CREATE_SESSION, body)
    .then((res) => res)
    .catch((err) => err)

export const loginSocial = (body: IBodyLoginSocial): Promise<ApiResponse<ISession>> =>
  api.apisauce
    .post(URL.LOGIN_SOCIAL, body)
    .then((res) => res)
    .catch((err) => err)
export const getOtp = (body: { phone: string }) =>
  api.apisauce
    .post(URL.GET_OTP, body)
    .then((res) => res)
    .catch((err) => err)

export const verifyOTP = (body: { phone: string; code: string; role: "patient" | "doctor " }) =>
  api.apisauce
    .post(URL.VERIFY_OTP, body)
    .then((res) => res)
    .catch((err) => err)
