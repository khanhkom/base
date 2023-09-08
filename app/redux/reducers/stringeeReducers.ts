const defaultState = {
  session: {
    access_token: "",
    exp: 0,
  },
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_STRINGEE_SESSION_SUCCESS": {
      return {
        ...state,
        session: action.payload,
      }
    }

    default:
      break
  }
  return state
}
