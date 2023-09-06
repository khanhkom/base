import { all, fork } from "redux-saga/effects"

import { watchFetchLogIn } from "./users/userAuthSaga"
import { watchFetchStatusOnboarding } from "./app/setShowOnboarding"
import { watchFetchTotalUser } from "./totalUser"

export default function* rootSaga() {
  yield all([fork(watchFetchLogIn), fork(watchFetchStatusOnboarding), fork(watchFetchTotalUser)])
}
