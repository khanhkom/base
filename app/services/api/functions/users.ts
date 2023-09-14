import URL from "@app/services/api/url"
import { api } from "../api"
export const login = (body) =>
  api.apisauce
    .post(URL.CREATE_SESSION, body)
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
