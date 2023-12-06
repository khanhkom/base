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

export const verifyOTP = (body: { phone: string; code: string; fcmToken?: string }) =>
  api.apisauce
    .post(URL.VERIFY_OTP, body)
    .then((res) => res)
    .catch((err) => err)
export const getOtpV2 = (body: { phone: string; deviceId: string; otpMethod: string }) =>
  api.apisauce
    .post(URL.GET_OTP_V2, body)
    .then((res) => res)
    .catch((err) => err)

export const verifyOTPV2 = (body: {
  phone: string
  otp: string
  deviceId: string
  fcmToken?: string
}) =>
  api.apisauce
    .get(URL.VERIFY_OTP_V2, body)
    .then((res) => res)
    .catch((err) => err)

export const refreshSession = (token: string) =>
  api.apisauce
    .get(URL.REFRESH_SESSION, { token })
    .then((res) => res)
    .catch((err) => err)

export const getOtpLogin = (body: { phone: string; deviceId: string; otpMethod: string }) =>
  api.apisauce
    .post(URL.GET_OTP_LOGIN_V2, body)
    .then((res) => res)
    .catch((err) => err)

export const verifyOTPLogin = (body: {
  phone: string
  otp: string
  deviceId: string
  fcmToken?: string
}) =>
  api.apisauce
    .get(URL.VERIFY_OTP_LOGIN_V2, body)
    .then((res) => res)
    .catch((err) => err)

export const getOtpRegister = (body: { phone: string; deviceId: string; otpMethod: string }) =>
  api.apisauce
    .post(URL.GET_OTP_CREATE_V2, body)
    .then((res) => res)
    .catch((err) => err)

export const verifyOTPRegister = (body: {
  phone: string
  otp: string
  deviceId: string
  fcmToken?: string
}) =>
  api.apisauce
    .get(URL.VERIFY_OTP_CREATE_V2, body)
    .then((res) => res)
    .catch((err) => err)

export const getOtpSocial = (body: { phone: string; deviceId: string; otpMethod: string }) =>
  api.apisauce
    .post(URL.GET_OTP_SOCIAL_V2, body)
    .then((res) => res)
    .catch((err) => err)

export const verifyOTPSocial = (body: {
  phone: string
  otp: string
  deviceId: string
  fcmToken?: string
}) =>
  api.apisauce
    .get(URL.VERIFY_OTP_SOCIAL_V2, body)
    .then((res) => res)
    .catch((err) => err)

// login firebase OTP
export const checkUserFirebase = (body: { phone: string }) =>
  api.apisauce
    .post(URL.CHECK_USER_FIREBASE, body)
    .then((res) => res)
    .catch((err) => err)

export const createSessionWithFirebase = (body: {
  phone: string
  idtoken: string
  fcmToken: string
}) =>
  api.apisauce
    .post(URL.CREATE_SESSION_FIREBASE, body)
    .then((res) => res)
    .catch((err) => err)

export const updatePhoneSocial = (body: { phone: string; idtoken: string }) =>
  api.apisauce
    .put(URL.UPDATE_PHONE_SOCIAL, body)
    .then((res) => res)
    .catch((err) => err)

export const getUserInformation = () =>
  api.apisauce
    .get(URL.GET_USER_INFO)
    .then((res) => res)
    .catch((err) => err)

export const updateFullName = (body: { fullname: string }) =>
  api.apisauce
    .put(URL.UPDATE_FULLNAME, body)
    .then((res) => res)
    .catch((err) => err)

export const updateImagePatient = (body, id) =>
  api.apisauce
    .put(`${URL.UPDATE_IMAGE}/${id}`, body)
    .then((res) => res)
    .catch((err) => err)
