import { IOrder } from "@app/interface/order"

const defaultState: IState = {
  orderHistoryFilter: [],
  loading: false,
}
interface IState {
  orderHistoryFilter: IOrder[]
  loading: boolean
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_ORDER_HISTORY_FILTER_REQUEST": {
      return {
        ...state,
        loading: true,
      }
    }
    case "FETCH_ORDER_HISTORY_FILTER_FAIL": {
      return {
        ...state,
        loading: false,
      }
    }
    case "FETCH_ORDER_HISTORY_FILTER_SUCCESS": {
      return {
        ...state,
        orderHistoryFilter: action.data,
        loading: false,
      }
    }
    default:
      break
  }
  return state
}
