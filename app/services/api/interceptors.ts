import { resetRoot } from "@app/navigators/navigationUtilities"
import { KEYSTORAGE, remove } from "@app/utils/storage"
import { api } from "./api"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { Alert } from "react-native"
let isResettingRoot = false

export const setAPIInterceptors = (APIClient) => {
  APIClient.addMonitor(async (monitor) => {
    // ...
    // error Unauthorized
    // console.log("monitor_monitor", monitor)
    if (monitor.status === 401 && !isResettingRoot) {
      await remove(KEYSTORAGE.LOGIN_DATA)
      // navigate("Login")
      Alert.alert(
        "Phiên đăng nhập của bạn đã hết hạn",
        "Số điện thoại đã đăng nhập vào một thiết bị mới. Vui lòng đăng nhập lại",
      )
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
