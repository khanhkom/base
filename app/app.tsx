/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("./devtools/ReactotronConfig.ts")
}
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React, { useEffect } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Appearance } from "react-native"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./theme"
import Config from "./config"
import { setLangInApp } from "./i18n"
import { PreferencesContext } from "./context/themeContext"
import { PaperProvider } from "react-native-paper"
import { colorExpandDark, colorExpandLight, darkTheme, lightTheme } from "./theme/colors/index"
import { createThemeFromSourceColor } from "./utils/m3/createMaterial3Theme"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducers from "./redux/reducers"
import Toast from "react-native-toast-message"
import rootSaga from "@app/redux/sagas"
import notifee from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging"
import { showToastMessage } from "./utils/library"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

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

async function onMessageReceived(message) {
  const data = JSON.parse(message.data.data)
  const callStatus = data.callStatus
  const from = data.from.number
  const notificationId = "11111" // YOUR_NOTIFICATION_ID
  console.log("data: " + callStatus)
  const channelId = await notifee.createChannel({
    id: "sdocter",
    name: "sdocter",
    vibration: true,
  })
  switch (callStatus) {
    case "started":
      await notifee.displayNotification({
        id: notificationId,
        title: "Incoming Call",
        body: "Call from " + from,
        android: {
          channelId,
          pressAction: {
            id: "default",
            mainComponent: "SDocter",
          },
        },
      })
      break
    case "ended":
      break
  }
}
messaging().setBackgroundMessageHandler(onMessageReceived)
messaging().onMessage((notification) => {
  console.log("notification", notification)
  if (notification?.notification?.title) {
    showToastMessage(notification?.notification?.title)
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
  const getDataDarkMode = async () => {
    const dataDarkMode: any = await storage.load(storage.KEYSTORAGE.DATA_DARKMODE)
    const dataSourceColor = await storage.load(storage.KEYSTORAGE.SOURCE_COLOR)

    const token = await messaging().getToken()
    console.log("token_token", token)

    if (dataSourceColor !== null) {
      setSourceColor(dataSourceColor)
    }
    if (!dataDarkMode || (dataDarkMode && dataDarkMode?.isDefaultSystem)) {
      setDefaultSystem(true)
      const colorScheme = Appearance.getColorScheme()
      if (colorScheme === "dark") {
        toggleTheme(true)
      } else toggleTheme(false)
    } else {
      if (dataDarkMode && dataDarkMode?.isThemeDark) {
        toggleTheme(true)
      } else toggleTheme(false)
    }
  }

  useEffect(() => {
    setLangInApp()
    getDataDarkMode()
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
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(hideSplashScreen, 500)
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null

  const linking = {
    prefixes: [prefix],
    config,
  }
  const customTheme = createThemeFromSourceColor(sourceColor)

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
              <AppNavigator
                linking={linking}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
              <Toast />
            </GestureHandlerRootView>
          </PaperProvider>
        </Provider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  )
}

export default App
