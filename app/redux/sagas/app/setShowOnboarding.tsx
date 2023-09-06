import { put, call, takeEvery } from "redux-saga/effects"

import AsyncStorageUtils from "@app/utils/storage"

import _ from "lodash"

function* FetchStatusOnboarding() {
  try {
    const hasShowOnboarding = yield AsyncStorageUtils.get(AsyncStorageUtils.KEY.VIEWED_ONBOARDING)
    yield put({
      type: "GET_ONBOARDING_STATUS_SUCCESS",
      payload: hasShowOnboarding !== null,
    })
  } catch (error) {
    console.log("error_error_FetchStatusOnboarding", error)
  }
}

export function* watchFetchStatusOnboarding() {
  yield takeEvery("FETCH_ONBOARDING_STATUS_REQUEST", FetchStatusOnboarding)
}
