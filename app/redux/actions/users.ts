import { WATCH_SAVE_USER_DATA, WATCH_UPDATE_USER_DATA } from "./actionTypes"

export function setUserInformation(data: unknown) {
  return {
    type: WATCH_SAVE_USER_DATA,
    data,
  }
}

export function updateUserToRedux(data: unknown) {
  return {
    type: WATCH_UPDATE_USER_DATA,
    data,
  }
}
export function userLogin(data: unknown) {
  return {
    type: "USER_LOGIN",
    data: data,
  }
}

export function getMyProfile() {
  return {
    type: "GET_USER_INFOR_REQUEST",
  }
}
export function updateUserField(data) {
  return {
    type: "UPDATE_USER_FIELD",
    data: data,
  }
}
