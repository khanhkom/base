// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import RNCallKeep from "react-native-callkeep"
import messaging from "@react-native-firebase/messaging"
import * as storage from "./app/utils/storage"
import { ActionFromCallKit } from "./app/context/themeContext.ts"
import VoipPushNotification from "react-native-voip-push-notification"
import { onMessageReceived } from "./app/utils/stringee/PushNotification.ts"
console.log("awake_app::::")

RNCallKeep.addEventListener("answerCall", async () => {
  // this.answerCall()
  console.log("answerCall_answerCall")
  await storage.saveString(storage.KEYSTORAGE.ACTION_FROM_CALLKIT, ActionFromCallKit.ANSWER)
})

RNCallKeep.addEventListener("endCall", async ({ callUUID }) => {
  console.log("endCall_endCall")
  await storage.saveString(storage.KEYSTORAGE.ACTION_FROM_CALLKIT, ActionFromCallKit.REJECT)
})

VoipPushNotification.addEventListener("notification", async (notification) => {
  console.log("notification:::::", notification.getData())
  await storage.saveString(storage.KEYSTORAGE.ACTION_FROM_CALLKIT, ActionFromCallKit.ON_NOTI)
})

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}
RNCallKeep.setup({
  ios: {
    appName: "SDocter",
  },
  android: {
    alertTitle: "Permissions required",
    alertDescription: "This application needs to access your phone accounts",
    cancelButton: "Cancel",
    okButton: "ok",
    additionalPermissions: [],
    selfManaged: true,
  },
})
messaging().setBackgroundMessageHandler(async (notification) => {
  onMessageReceived(notification, true)
})

AppRegistry.registerComponent("SDocter", () => IgniteApp)
export default App
