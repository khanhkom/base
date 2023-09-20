import { all, fork } from "redux-saga/effects"

import { watchFetchStringeeToken } from "./stringee/getToken"
import { watchFetchListPatient } from "./patient/watchFetchListPatient"

export default function* rootSaga() {
  yield all([fork(watchFetchStringeeToken), fork(watchFetchListPatient)])
}
