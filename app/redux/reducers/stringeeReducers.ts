const defaultState = {
  session: {
    access_token: "",
    exp: 0,
  },
  clientId: "",
  // REFRESH_CLIENT, UN_REGISTER_PUSH,
  actionClient: "",
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_STRINGEE_SESSION_SUCCESS": {
      return {
        ...state,
        session: action.payload,
      }
    }
    case "UPDATE_CLIENT_ID": {
      return {
        ...state,
        clientId: action.data,
      }
    }
    case "UN_REGISTER_PUSH": {
      return {
        ...state,
        actionClient: "UN_REGISTER_PUSH",
      }
    }
    case "REFRESH_CLIENT": {
      return {
        ...state,
        actionClient: "REFRESH_CLIENT",
      }
    }
    case "REMOVE_ACTION_CLIENT": {
      return {
        ...state,
        actionClient: "",
      }
    }
    default:
      break
  }
  return state
}
