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
