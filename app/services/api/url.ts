import { DEFAULT_API_CONFIG } from "./api-config"
export const ROOT = DEFAULT_API_CONFIG.url_prod
const URL_LOGIN = {
  GET_OTP: "pin/getOtp",
  VERIFY_OTP: "pin/verifyOtp",
}
const URL_PATIENT = {
  CREATE_PATIENT: "patient",
}
const LOCATION = {
  PROVINCES_GET_ALL: "provinces/getAll",
  DISTRICTS_GET_BY_PROVINCE: "districts/getByProvince",
  WARDS_GET_BY_DISTRICT: "wards/getByDistrict",
}
const URL = {
  ...URL_LOGIN,
  ...URL_PATIENT,
  ...LOCATION,
  LOGIN: `account/login`,
  CREATE_SESSION: "session/createSession",
  CREATE_SESSION_STRINGEE: "stringee/createClientSession",
}
export default URL
