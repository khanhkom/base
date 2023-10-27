import { put, call, takeEvery } from "redux-saga/effects"
import _ from "lodash"
import { createStringeeSession } from "@app/services/api/functions/stringee"
import { trackEvent } from "@app/services/mixpanel"
import { EventName } from "@app/services/mixpanel/eventName"

function* fetchStringeeToken() {
  try {
    const resData = yield call(createStringeeSession)
    yield put({
      type: "FETCH_STRINGEE_SESSION_SUCCESS",
      payload: resData?.data,
    })
    trackEvent(EventName.stringee_get_token_success, resData?.data)
  } catch (error) {
    trackEvent(EventName.stringee_get_token_failure, error)
    console.log("error_error_fetchStringeeToken", error)
  }
}

export function* watchFetchStringeeToken() {
  yield takeEvery("FETCH_STRINGEE_SESSION_REQUEST", fetchStringeeToken)
}
