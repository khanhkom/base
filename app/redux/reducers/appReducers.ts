const defaultState = {
  firstOpenApp: true,
  isLoggedIn: false,
  showedOnboarding: false,
  //routeName
  routeName: "LoginScreen",
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_FIRST_OPEN_APP": {
      return {
        ...state,
        firstOpenApp: false,
      }
    }
    case "GET_ONBOARDING_STATUS_SUCCESS": {
      return {
        ...state,
        showedOnboarding: action.payload,
      }
    }

    case "SET_LOGINED_APP": {
      return {
        ...state,
        isLoggedIn: action.data,
      }
    }
    case "ROUTE_NAME_NAVIGATION": {
      return {
        ...state,
        routeName: action.data ?? "",
      }
    }
    default:
      break
  }
  return state
}
