const defaultState = {
  user: {
    token: "string",
    message: "string",
    personId: "string",
    profileId: "string",
    masterPersonId: "string",
    birthday: new Date(),
    accountStatus: 1,
    weight: 60,
    height: 180,
    activitylevel: 2,
    bodyInfomation: 1,
  },
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "WATCH_SAVE_USER_DATA":
      return {
        ...state,
        user: action.data,
      }
    case "SET_STEPS_USER_REGISTER_TOTAL": {
      return {
        ...state,
        stepOnBoarding: action.data,
      }
    }
    case "SET_HIDE_TABAR_ONBOARDING": {
      return {
        ...state,
        ...action.data,
      }
    }

    default:
      break
  }
  return state
}
export type IbodyUserReducers = typeof defaultState
