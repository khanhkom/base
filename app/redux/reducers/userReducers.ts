const defaultState = {
  user: {
    createdAt: "",
    fcmToken: "",
    isActive: false,
    phone: "",
    role: "",
    sessionToken: "",
    updatedAt: "",
    isVerified: false,
    id: "",
  },
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "WATCH_SAVE_USER_DATA":
      return {
        ...state,
        user: action.data,
      }
    case "FETCH_USER_INFO_SUCCESS":
      return {
        ...state,
        user: action.payload,
      }

    case "UPDATE_USER_FIELD":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.data,
        },
      }
    case "REMOVE_USER_DATA":
      return {
        ...state,
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
    default:
      break
  }
  return state
}
export type IbodyUserReducers = typeof defaultState
