// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import RNCallKeep from "react-native-callkeep"

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
  },
})

AppRegistry.registerComponent("SDocter", () => IgniteApp)
export default App
