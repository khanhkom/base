import URL from "@app/services/api/url"
import { api } from "../api"
import { ApiResponse } from "apisauce"
import { IOrderResult } from "@app/interface/result"
import { IOrder, IOrderHistory } from "@app/interface/order"
import { IBodyByPage } from "@app/interface/general"

export const getDetailResultByOrder = (
  id: string,
): Promise<ApiResponse<{ result: IOrderResult; order: IOrderHistory }>> =>
  api.apisauce
    .get(URL.GET_RESULT_BY_ORDER + id)
    .then((res) => res)
    .catch((err) => err)

export const getAllResults = (
  params: IBodyByPage,
): Promise<ApiResponse<{ result: IOrderResult; order: IOrderHistory }[]>> =>
  api.apisauce
    .get(URL.GET_RESULT_ALL, params)
    .then((res) => res)
    .catch((err) => err)
