export function setFirstOpenApp() {
  return {
    type: "SET_FIRST_OPEN_APP",
  }
}
export function setLoginedApp(isLogin: boolean) {
  return {
    type: "SET_LOGINED_APP",
    data: isLogin,
  }
}

export function getStatusOnboarding() {
  return {
    type: "FETCH_ONBOARDING_STATUS_REQUEST",
  }
}
export function setRouteNameNavigation(data: string) {
  return {
    type: "ROUTE_NAME_NAVIGATION",
    data: data,
  }
}
