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
export function setMyAllergy(data): baseAction {
  return {
    type: "SET_MY_ALLERGY",
    data: data,
  }
}

export function setUserQuestionOnBoarding(params: unknown): baseAction {
  return {
    type: "SET_USER_PARAMS_QUESTION",
    data: params,
  }
}

export function setUserStepsOnBoardingTotal(params: unknown): baseAction {
  return {
    type: "SET_STEPS_USER_REGISTER_TOTAL",
    data: params,
  }
}
export function setUserStepsConnect(params: unknown): baseAction {
  return {
    type: "SET_HIDE_TABAR_ONBOARDING",
    data: params,
  }
}
