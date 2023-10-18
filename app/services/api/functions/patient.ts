import URL from "@app/services/api/url"
import { api } from "../api"
import { IBodyByPage } from "@app/interface/general"
import { ApiResponse } from "apisauce"
import { IPatient } from "@app/interface/patient"
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
export const getListPatient = (body: IBodyByPage): Promise<ApiResponse<{ items: IPatient[] }>> =>
  api.apisauce
    .get(URL.GET_PATIENT, body)
    .then((res) => res)
    .catch((err) => err)
export const getDetailPatient = (id: string): Promise<ApiResponse<IPatient>> =>
  api.apisauce
    .get(URL.GET_PATIENT_BY_ID + id)
    .then((res) => res)
    .catch((err) => err)

export const updatePatient = (
  id: string,
  body: IBodyCreatePatient,
): Promise<ApiResponse<IPatient>> =>
  api.apisauce
    .put(URL.UPDATE_PATIENT + id, body)
    .then((res) => res)
    .catch((err) => err)
