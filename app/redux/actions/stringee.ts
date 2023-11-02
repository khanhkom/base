export function getStringeeToken() {
  return {
    type: "FETCH_STRINGEE_SESSION_REQUEST",
  }
}
export function updateStringeeClientId(data: string) {
  return {
    type: "UPDATE_CLIENT_ID",
    data,
  }
}
export function unregisterPush() {
  return {
    type: "UN_REGISTER_PUSH",
  }
}
export function refreshClient() {
  return {
    type: "REFRESH_CLIENT",
  }
}
export function removeActionClient() {
  return {
    type: "REMOVE_ACTION_CLIENT",
  }
}
