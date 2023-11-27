import { put, call, takeEvery } from "redux-saga/effects"
import _ from "lodash"
import { getUserInformation } from "@app/services/api/functions/users"

function* fetchUserInfo() {
  try {
    const resData = yield call(getUserInformation)
    yield put({
      type: "FETCH_USER_INFO_SUCCESS",
      payload: resData?.data,
    })
  } catch (error) {
    console.log("error_error_fetchStringeeToken", error)
  }
}

export function* watchFetchUserInfo() {
  yield takeEvery("FETCH_USER_INFO_REQUEST", fetchUserInfo)
}
