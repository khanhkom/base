import { IDocter } from "@app/interface/docter"
import { IOrder } from "@app/interface/order"

export function updateBodyCreateOrder(data: any) {
  return {
    type: "UPDATE_BODY_CREATE_ORDER",
    data,
  }
}

export function updateDocterCreateOrder(data: IDocter) {
  return {
    type: "UPDATE_ORDER_DOCTER",
    data,
  }
}
export function updateSeletedDateOrder(data: string) {
  return {
    type: "UPDATE_ORDER_DATE",
    data,
  }
}
export function updateSelectedTimeOrder(data) {
  return {
    type: "UPDATE_ORDER_TIME",
    data,
  }
}
export function updatePatientOrder(data) {
  return {
    type: "UPDATE_ORDER_PATIENT",
    data,
  }
}
export function updateSpecialListOrder(data) {
  return {
    type: "UPDATE_ORDER_SPECIALIST",
    data,
  }
}
