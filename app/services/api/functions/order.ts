import URL from "@app/services/api/url"
import { api } from "../api"
import { ApiResponse } from "apisauce"
import { IDocter } from "@app/interface/docter"
import { IOrder, IOrderHistory } from "@app/interface/order"
import { IBodyByPage } from "@app/interface/general"

export const getListOrder = (body: IBodyByPage): Promise<ApiResponse<{ items: IOrderHistory[] }>> =>
  api.apisauce
    .get(URL.GET_ORDER, body)
    .then((res) => res)
    .catch((err) => err)

export const createOrder = (order: IOrder): Promise<ApiResponse<IDocter>> =>
  api.apisauce
    .post(URL.CREATE_ORDER, order)
    .then((res) => res)
    .catch((err) => err)
export const updateOrder = (id: string, order: IOrder): Promise<ApiResponse<IDocter>> =>
  api.apisauce
    .put(URL.UPDATE_ORDER + id, order)
    .then((res) => res)
    .catch((err) => err)
export const getDetailOrder = (id: string): Promise<ApiResponse<IOrderHistory>> =>
  api.apisauce
    .get(URL.GET_DETAIL_ORDER + id)
    .then((res) => res)
    .catch((err) => err)

export const cancelOrder = (
  id: string,
  body: { description: string },
): Promise<ApiResponse<IOrderHistory>> =>
  api.apisauce
    .put(URL.CANCEL_ORDER + id, body)
    .then((res) => res)
    .catch((err) => err)
