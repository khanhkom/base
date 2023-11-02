import { DEFAULT_API_CONFIG } from "./api-config"
export const ROOT = DEFAULT_API_CONFIG.url_prod
const URL_LOGIN = {
  GET_OTP: "pin/getOtp",
  GET_OTP_V2: "pin/v2/generateOtp",

  GET_OTP_LOGIN_V2: "pin/v2/generateLoginOtp",
  VERIFY_OTP_LOGIN_V2: "pin/v2/verifyOtpForLogin",

  GET_OTP_CREATE_V2: "pin/v2/generateCreateAccountOtp",
  VERIFY_OTP_CREATE_V2: "pin/v2/verifyOtpForCreateAccount",

  GET_OTP_SOCIAL_V2: "pin/v2/generateOtpForLinkAccountWithPhone",
  VERIFY_OTP_SOCIAL_V2: "pin/v2/verifyOtpForCreateAccount",

  VERIFY_OTP: "pin/verifyOtp",
  VERIFY_OTP_V2: "pin/v2/verifyOtpForLogin",
  LOGIN_SOCIAL: "session/createSessionWithOAuth2",
}
const URL_PATIENT = {
  CREATE_PATIENT: "patient",
  GET_PATIENT: "patient",
  GET_PATIENT_BY_ID: "patient/",
  UPDATE_PATIENT: "patient/",
}
const URL_DOCTER = {
  GET_DOCTER: "doctor",
  GET_DOCTER_DETAIL: "doctor/",
  GET_LIST_SPECIAL_LIST: "specialist/specialist",
  GET_DOCTOR_CALENDAR: "doctor/",
}
const ORDER = {
  GET_ORDER: "order",
  GET_DETAIL_ORDER: "order/",
  CREATE_ORDER: "order",
  UPDATE_ORDER: "order/",
  CANCEL_ORDER: "order/cancel/",
}
const URL_RESULT = {
  GET_RESULT_BY_ORDER: "result/order/",
  GET_RESULT_BY_ID: "result/",
  GET_RESULT_ALL: "result",
}
const LOCATION = {
  PROVINCES_GET_ALL: "provinces/getAll",
  DISTRICTS_GET_BY_PROVINCE: "districts/getByProvince",
  WARDS_GET_BY_DISTRICT: "wards/getByDistrict",
}
const RATING = {
  SEND_RATING_ORDER: "rating",
  GET_RATING_BY_ORDER: "rating/order/",
  GET_RATING_BY_DOCTOR: "rating",
}
const NOTIFICATION = {
  GET_NOTIFICATION: "notification",
}
const URL = {
  ...URL_LOGIN,
  ...URL_PATIENT,
  ...LOCATION,
  ...URL_DOCTER,
  ...ORDER,
  ...URL_RESULT,
  ...RATING,
  ...NOTIFICATION,
  LOGIN: `account/login`,
  CREATE_SESSION: "session/createSession",
  REFRESH_SESSION: "session/refreshSession",
  CREATE_SESSION_STRINGEE: "stringee/createClientSession",
}
export default URL
