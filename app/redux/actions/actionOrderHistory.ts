import { IFilterOrder } from "../sagas/order/fetchOrderHistoryFilter"

export function getOrderHistoryFilter(data: IFilterOrder) {
  return {
    type: "FETCH_ORDER_HISTORY_FILTER_REQUEST",
    data: data,
  }
}
