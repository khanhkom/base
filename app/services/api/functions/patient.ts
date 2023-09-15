import URL from "@app/services/api/url"
import { api } from "../api"
export interface IBodyCreatePatient {
  name: string
  gender: "male" | "female"
  birthday: string
  mail: string
  province: string
  city: string
  ward: string
  address: string
}
export const createPatient = (body: IBodyCreatePatient) =>
  api.apisauce
    .post(URL.CREATE_PATIENT, body)
    .then((res) => res)
    .catch((err) => err)
