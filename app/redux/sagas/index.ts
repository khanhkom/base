import { all, fork } from "redux-saga/effects"

import { watchFetchStringeeToken } from "./stringee/getToken"
import { watchFetchListPatient } from "./patient/watchFetchListPatient"
import { watchFetchOrderHistory } from "./order/fetchOrderHistory"
import { watchFetchOrderHistoryFilter } from "./order/fetchOrderHistoryFilter"

export default function* rootSaga() {
  yield all([
    fork(watchFetchStringeeToken),
    fork(watchFetchListPatient),
    fork(watchFetchOrderHistory),
    fork(watchFetchOrderHistoryFilter),
  ])
}
