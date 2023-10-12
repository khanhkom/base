import URL from "@app/services/api/url"
import { api } from "../api"
import { ApiResponse } from "apisauce"
import { IOrderHistory } from "@app/interface/order"
import { IRatingDoctorDetail, IRatingOrder } from "@app/interface/rating"
interface IBodyRating {
  orderId: string
  description: string
  criteria: string[]
  score: string
}
interface IGetRatingDoctor {
  userId: string
  score?: number
  page: number
  perPage: number
}
export const getRatingByOrderId = (
  orderId: string,
): Promise<ApiResponse<{ items: IOrderHistory[] }>> =>
  api.apisauce
    .get(URL.GET_RATING_BY_ORDER + orderId)
    .then((res) => res)
    .catch((err) => err)

export const sendRatingOrder = (order: IBodyRating): Promise<ApiResponse<IRatingOrder>> =>
  api.apisauce
    .post(URL.SEND_RATING_ORDER, order)
    .then((res) => res)
    .catch((err) => err)
export const getRatingByOrderDoctorId = (
  params: IGetRatingDoctor,
): Promise<ApiResponse<{ items: IRatingDoctorDetail[] }>> =>
  api.apisauce
    .get(URL.GET_RATING_BY_DOCTOR, params)
    .then((res) => res)
    .catch((err) => err)
