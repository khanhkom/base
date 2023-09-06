import URL from "@app/services/api/url"
import { api } from "../api"
export const login = (body) =>
  api.apisauce
    .post(URL.LOGIN, body)
    .then((res) => res)
    .catch((err) => err)
