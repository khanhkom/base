/* eslint-disable import/first */

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("./devtools/ReactotronConfig.ts")
}
import { OrientationLocker, PORTRAIT } from "react-native-orientation-locker"
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React, { useEffect } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Alert, Platform } from "react-native"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import { setLangInApp } from "./i18n"
import { PreferencesContext } from "./context/themeContext"
import { PaperProvider } from "react-native-paper"
import { colorExpandLight, lightTheme } from "./theme/colors/index"
import { createThemeFromSourceColor } from "./utils/m3/createMaterial3Theme"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducers from "./redux/reducers"
import Toast from "react-native-toast-message"
import rootSaga from "@app/redux/sagas"
import messaging from "@react-native-firebase/messaging"
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"
import codePush from "react-native-code-push"
import NoInternetComponent from "./components/no-internet"
import { onMessageReceived } from "./utils/stringee/PushNotification"
import CallEventHandle from "./utils/stringee/CallEventHandle"
import {
  NotificationChannel,
  createNotificationChannelUtils,
} from "./utils/notification/HandleCreateChannel"
import { navigate } from "@app/navigators/navigationUtilities"
import notifee, { EventType } from "@notifee/react-native"
import { handlePressOpenNotification } from "./utils/notification/NotificationHelpers"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
createNotificationChannelUtils(NotificationChannel.GENERAL)

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

/**
 * This is the root component of our app.
 */

messaging().onMessage(onMessageReceived)
notifee.onForegroundEvent((event) => {
  console.log("event_event", event)
  if (event.type === EventType.PRESS) {
    handlePressOpenNotification(event?.detail?.notification)
  }
})
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded] = useFonts(customFontsToLoad)
  const [isThemeDark, setIsThemeDark] = React.useState(true)
  const [sourceColor, setSourceColor] = React.useState("#183E9F")
  const [isDefaultSystem, setIsDefaultSystem] = React.useState(false)
  const setDefaultSystem = React.useCallback(
    (value: boolean) => {
      return setIsDefaultSystem(value)
    },
    [isDefaultSystem],
  )
  const setSourceColorM3 = React.useCallback(
    (value: string) => {
      return setSourceColor(value)
    },
    [isDefaultSystem],
  )
  const toggleTheme = React.useCallback(
    (value: boolean) => {
      return setIsThemeDark(value)
    },
    [isThemeDark],
  )

  useEffect(() => {
    setLangInApp()
  }, [])
  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      setDefaultSystem,
      isDefaultSystem,
      setSourceColorM3,
      sourceColor,
    }),
    [toggleTheme, isThemeDark, isDefaultSystem, setDefaultSystem, sourceColor, setSourceColorM3],
  )
  const { rehydrated } = useInitialRootStore(() => {
    setTimeout(hideSplashScreen, 500)
  })

  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null

  const linking = {
    prefixes: [prefix],
    config,
  }
  const customTheme = createThemeFromSourceColor(sourceColor)
  codePush.checkForUpdate().then((update) => {
    if (!update) {
      console.log("The app is up to date!")
    } else {
      Alert.alert("Cập nhật", "Cập nhật phiên bản mới ngay!", [
        {
          text: "Ok",
          onPress: () => {
            codePush.sync()
          },
        },
        {
          text: "Hủy",
        },
      ])
      console.log("An update is available! Should we download it?")
    }
  })

  // const theme = isThemeDark
  //   ? { ...darkTheme, colors: { ...customTheme.dark, ...colorExpandDark } }
  //   : { ...lightTheme, colors: { ...customTheme.light, ...colorExpandLight } }
  const theme = { ...lightTheme, colors: { ...customTheme.light, ...colorExpandLight } }
  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PreferencesContext.Provider value={preferences}>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              {Platform.OS === "ios" && <CallEventHandle />}
              <AppNavigator
                linking={linking}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
              <Toast />
              <NoInternetComponent />
              <OrientationLocker orientation={PORTRAIT} />
            </GestureHandlerRootView>
          </PaperProvider>
        </Provider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  )
}

export default codePush(App)
