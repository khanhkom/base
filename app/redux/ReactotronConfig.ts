import AsyncStorage from "@react-native-async-storage/async-storage"
import { NativeModules } from "react-native"
import Reactotron from "reactotron-react-native"
import { reactotronRedux } from "reactotron-redux"
import sagaPlugin from "reactotron-redux-saga"

// eslint-disable-next-line no-undef
const dev = __DEV__
let scriptHostname
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL
  scriptHostname = scriptURL.split("://")[1].split(":")[0]
}
function configure() {
  Reactotron.configure({
    name: "Eatsy Network",
    host: scriptHostname,
  })
    .setAsyncStorageHandler(AsyncStorage) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(sagaPlugin())
    .use(reactotronRedux())

  connectConsoleToReactotron()
  return Reactotron.connect()
}

function connectConsoleToReactotron() {
  if (!dev) {
    return null
  }
}

export default {
  configure,
}
