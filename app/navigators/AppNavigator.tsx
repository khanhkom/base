import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, View, useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import { TabNavigator } from "./TabNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "@app/theme/colors/colors"
import { LoginScreen } from "../screens"
import DetailSick from "@app/screens/DetailSick"
import Login from "@app/screens/Auth/Login"
import VerifyOTP from "@app/screens/Auth/Register/VerifyOTP"
import ConfirmName from "@app/screens/Auth/Register/ConfirmName"
import CreateProfile from "@app/screens/Auth/Register/CreateProfile"
import Call2Screen from "@app/screens/Demo/Call2Screen"
import R from "@app/assets"
import { KEYSTORAGE, load } from "@app/utils/storage"
import { setLoginedApp } from "@app/redux/actions"
import { useDispatch } from "react-redux"
import { useSelector } from "@app/redux/reducers"
import { api } from "@app/services/api"
import CallScreen from "@app/screens/Demo/CallScreen"
import ChatScreen from "@app/screens/Demo/ChatScreen"
import Conversations from "@app/screens/Demo/Conversations"
import ChatDetail from "@app/screens/Demo/ChatDetail"
import CousultOnline from "@app/screens/Booking/CousultOnline"
import ConsultNow from "@app/screens/Booking/ConsultNow"
import DocterInformation from "@app/screens/Docter/DocterInformation"
import SelectCalendar from "@app/screens/Booking/MakeBooking/SelectCalendar"
import SelectTimeBooking from "@app/screens/Booking/MakeBooking/SelectTimeBooking"
import CreateMedicalRecord from "@app/screens/Booking/MakeBooking/CreateMedicalRecord"
import BookingSuccess from "@app/screens/Booking/BookingSuccess"
import SelectPatientRecord from "@app/screens/Booking/MakeBooking/SelectPatientRecord"
import SelectSpecialist from "@app/screens/Booking/MakeBooking/SelectSpecialist"
import DocterReviews from "@app/screens/Docter/DocterReviews"
import DetailBooking from "@app/screens/Booking/DetailBooking"
import CallVideo from "@app/screens/CallVideo"
export type AppStackParamList = {
  TabNavigator: undefined
  Profile: undefined
  Video: undefined
  History: undefined
  Login: undefined
  DetailSick: undefined
  VerifyOTP: undefined
  ConfirmName: undefined
  CreateProfile: undefined
  Call2Screen: undefined
  CallScreen: undefined

  ChatScreen: undefined
  Conversations: undefined
  ChatDetail: undefined
  CousultOnline: undefined
  ConsultNow: undefined
  DocterInformation: undefined

  SelectCalendar: undefined
  SelectTimeBooking: undefined
  CreateMedicalRecord: undefined
  BookingSuccess: undefined
  SelectPatientRecord: undefined
  SelectSpecialist: undefined
  DocterReviews: undefined
  DetailBooking: undefined
  CallVideo: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  // @demo remove-block-start
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  const isLoggedIn = useSelector((state) => state.appReducers.isLoggedIn)

  // @demo remove-block-end
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      // initialRouteName={isAuthenticated ? "TabNavigator" : "Login"} // @demo remove-current-line

      initialRouteName={isLoggedIn ? "TabNavigator" : "Login"} // @demo remove-current-line
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="DetailSick" component={DetailSick} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ConfirmName" component={ConfirmName} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Call2Screen" component={Call2Screen} />
      <Stack.Screen name="CallScreen" component={CallScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="Conversations" component={Conversations} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
      <Stack.Screen name="CousultOnline" component={CousultOnline} />
      <Stack.Screen name="ConsultNow" component={ConsultNow} />
      <Stack.Screen name="DocterInformation" component={DocterInformation} />
      <Stack.Screen name="SelectCalendar" component={SelectCalendar} />
      <Stack.Screen name="SelectTimeBooking" component={SelectTimeBooking} />
      <Stack.Screen name="CreateMedicalRecord" component={CreateMedicalRecord} />
      <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
      <Stack.Screen name="SelectPatientRecord" component={SelectPatientRecord} />
      <Stack.Screen name="SelectSpecialist" component={SelectSpecialist} />
      <Stack.Screen name="DocterReviews" component={DocterReviews} />
      <Stack.Screen name="DetailBooking" component={DetailBooking} />
      <Stack.Screen name="CallVideo" component={CallVideo} />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()
  const [loadToken, setLoadToken] = useState(true)
  const dispatch = useDispatch()
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))
  useEffect(() => {
    async function loadDataLocal() {
      const dataTokenLocal = await load(KEYSTORAGE.LOGIN_DATA)
      console.log("dataTokenLocal", dataTokenLocal)
      if (dataTokenLocal !== null) {
        console.log("dataTokenLocal", dataTokenLocal)
        api.apisauce.setHeader("access-token", dataTokenLocal?.accessToken)
        dispatch(setLoginedApp(true))
        setLoadToken(false)
      } else {
        dispatch(setLoginedApp(false))
        setLoadToken(false)
      }
    }
    loadDataLocal()
  }, [])

  if (loadToken) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ActivityIndicator color={R.colors.primary} size="small" />
      </View>
    )
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
