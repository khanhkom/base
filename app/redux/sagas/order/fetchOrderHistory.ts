import { put, call, takeEvery } from "redux-saga/effects"
import _ from "lodash"
import { getListOrder } from "@app/services/api/functions/order"

function* fetchOrderHistory() {
  try {
    let params = {
      page: 1,
      perPage: 20,
    }
    const resData = yield call(getListOrder, params)
    yield put({
      type: "FETCH_ORDER_HISTORY_SUCCESS",
      data: resData?.data?.items ?? [],
    })
  } catch (error) {
    yield put({
      type: "FETCH_ORDER_HISTORY_FAIL",
    })
    console.log("error_error_fetchStringeeToken", error)
  }
}

export function* watchFetchOrderHistory() {
  yield takeEvery("FETCH_ORDER_HISTORY_REQUEST", fetchOrderHistory)
}
