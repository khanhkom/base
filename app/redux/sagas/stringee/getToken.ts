import { put, call, takeEvery } from "redux-saga/effects"
import _ from "lodash"
import { createStringeeSession } from "@app/services/api/functions/stringee"

function* fetchStringeeToken() {
  try {
    const resData = yield call(createStringeeSession)
    yield put({
      type: "FETCH_STRINGEE_SESSION_SUCCESS",
      payload: resData?.data,
    })
  } catch (error) {
    console.log("error_error_fetchStringeeToken", error)
  }
}

export function* watchFetchStringeeToken() {
  yield takeEvery("FETCH_STRINGEE_SESSION_REQUEST", fetchStringeeToken)
}
