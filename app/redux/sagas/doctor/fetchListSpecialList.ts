import { put, call, takeEvery } from "redux-saga/effects"
import _ from "lodash"
import { getListSpecialList } from "@app/services/api/functions/docter"

function* fetchListSpecialList() {
  try {
    const resData = yield call(getListSpecialList)
    yield put({
      type: "FETCH_SPECIAL_LIST_SUCCESS",
      data: resData?.data ?? [],
    })
  } catch (error) {
    yield put({
      type: "FETCH_SPECIAL_LIST_FAIL",
    })
    console.log("error_error_fetchStringeeToken", error)
  }
}

export function* watcFetchListSpecialListFilter() {
  yield takeEvery("FETCH_SPECIAL_LIST_REQUEST", fetchListSpecialList)
}
