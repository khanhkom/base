import URL from "@app/services/api/url"
import { api } from "../api"
import { ApiResponse } from "apisauce"
import { IDocter } from "@app/interface/docter"
import { IOrder } from "@app/interface/order"

export const getListOrder = (): Promise<ApiResponse<{ items: IOrder[] }>> =>
  api.apisauce
    .get(URL.GET_ORDER)
    .then((res) => res)
    .catch((err) => err)

export const createOrder = (order: IOrder): Promise<ApiResponse<IDocter>> =>
  api.apisauce
    .post(URL.CREATE_ORDER, order)
    .then((res) => res)
    .catch((err) => err)
