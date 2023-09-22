const defaultState = {
  session: {
    access_token: "",
    exp: 0,
  },
  clientId: "",
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
    default:
      break
  }
  return state
}
