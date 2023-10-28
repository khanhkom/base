import { resetRoot } from "@app/navigators/navigationUtilities"
import { KEYSTORAGE, remove } from "@app/utils/storage"
import { api } from "./api"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
let isResettingRoot = false

export const setAPIInterceptors = (APIClient) => {
  APIClient.addMonitor(async (monitor) => {
    // ...
    // error Unauthorized
    console.log("monitor_monitor", monitor)
    if (monitor.status === 401 && !isResettingRoot) {
      await remove(KEYSTORAGE.LOGIN_DATA)
      // navigate("Login")
      resetRoot({
        index: 0,
        routes: [{ name: "Login" }],
      })
      api.apisauce.setHeader("access-token", "")
      await GoogleSignin.signOut()
      isResettingRoot = false
    }
  })
}
