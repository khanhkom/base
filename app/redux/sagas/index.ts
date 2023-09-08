import { all, fork } from "redux-saga/effects"

import { watchFetchStringeeToken } from "./stringee/getToken"

export default function* rootSaga() {
  yield all([fork(watchFetchStringeeToken)])
}
