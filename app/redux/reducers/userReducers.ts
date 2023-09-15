const defaultState = {
  user: {
    name: "",
    gender: "",
    birthday: "",
    mail: "",
    province: "",
    city: "",
    ward: "",
    address: "",
    phone: "",
  },
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "WATCH_SAVE_USER_DATA":
      return {
        ...state,
        user: action.data,
      }
    case "UPDATE_USER_FIELD":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.data,
        },
      }
    default:
      break
  }
  return state
}
export type IbodyUserReducers = typeof defaultState
