const defaultState = {
  isReload: false,
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_RELOAD_QUESTION":
      return {
        ...state,
        isReload: action.data,
      }

    default:
      break
  }
  return state
}
export type IbodyUserReducers = typeof defaultState
