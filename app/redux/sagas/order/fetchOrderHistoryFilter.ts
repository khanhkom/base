import { put, call, takeEvery } from "redux-saga/effects"
import _ from "lodash"
import { getListOrder } from "@app/services/api/functions/order"
export interface IFilterOrder {
  status?: string
  timeFrom?: string
  timeTo?: string
}
function* fetchOrderHistory({ data }: IFilterOrder) {
  try {
    let params = {
      page: 1,
      perPage: 20,
      ...data,
    }
    const resData = yield call(getListOrder, params)
    yield put({
      type: "FETCH_ORDER_HISTORY_FILTER_SUCCESS",
      data: resData?.data?.items ?? [],
    })
  } catch (error) {
    yield put({
      type: "FETCH_ORDER_HISTORY_FILTER_FAIL",
    })
    console.log("error_error_fetchStringeeToken", error)
  }
}

export function* watchFetchOrderHistoryFilter() {
  yield takeEvery("FETCH_ORDER_HISTORY_FILTER_REQUEST", fetchOrderHistory)
}
