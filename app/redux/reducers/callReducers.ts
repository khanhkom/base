const defaultState = {
  serial: 1,
  callId: "",
  callkitId: "",
  callCode: 0,
  rejected: false,
  answered: false,
  endedCallkit: false,
  endedStringeeCall: false,
  receivedStringeeCall: false,
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_SYNC_CALL_FIELD": {
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
