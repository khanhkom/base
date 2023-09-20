import URL from "@app/services/api/url"
import { api } from "../api"
import { IBodyByPage } from "@app/interface/general"
import { ApiResponse } from "apisauce"
import { IDocter } from "@app/interface/docter"

export const getListDocter = (body: IBodyByPage): Promise<ApiResponse<{ items: IDocter[] }>> =>
  api.apisauce
    .get(URL.GET_DOCTER, body)
    .then((res) => res)
    .catch((err) => err)

export const getDetailDocter = (id: string): Promise<ApiResponse<IDocter>> =>
  api.apisauce
    .get(URL.GET_DOCTER_DETAIL + id)
    .then((res) => res)
    .catch((err) => err)
