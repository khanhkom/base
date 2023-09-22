import { put, call, takeEvery } from "redux-saga/effects"
import _ from "lodash"
import { getListPatient } from "@app/services/api/functions/patient"

function* fetchListPatient() {
  try {
    let params = {
      page: 1,
      perPage: 20,
    }
    const resData = yield call(getListPatient, params)
    yield put({
      type: "FETCH_LIST_PATIENT_SUCCESS",
      data: resData?.data?.items ?? [],
    })
  } catch (error) {
    yield put({
      type: "FETCH_LIST_PATIENT_FAIL",
    })
    console.log("error_error_fetchStringeeToken", error)
  }
}

export function* watchFetchListPatient() {
  yield takeEvery("FETCH_LIST_PATIENT_REQUEST", fetchListPatient)
}
