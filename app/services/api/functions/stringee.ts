import URL from "@app/services/api/url"
import { api } from "../api"
export const createStringeeSession = () =>
  api.apisauce
    .post(URL.CREATE_SESSION_STRINGEE)
    .then((res) => res)
    .catch((err) => err)
