import { DEFAULT_API_CONFIG } from "./api-config"
export const ROOT = DEFAULT_API_CONFIG.url_prod

const URL = {
  LOGIN: `account/login`,
  CREATE_SESSION: "session/createSession",
  CREATE_SESSION_STRINGEE: "stringee/createClientSession",
}
export default URL
