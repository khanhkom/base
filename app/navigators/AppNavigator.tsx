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
import DetailSick from "@app/screens/DetailSick"
import Login from "@app/screens/Auth/Login"
import VerifyOTP from "@app/screens/Auth/Register/VerifyOTP"
import ConfirmName from "@app/screens/Auth/Register/ConfirmName"
import CreatePatient from "@app/screens/CreatePatient"
import CallScreen from "@app/screens/CallScreen/Call2Screen"
import R from "@app/assets"
import { KEYSTORAGE, load } from "@app/utils/storage"
import { setLoginedApp } from "@app/redux/actions"
import { useDispatch } from "react-redux"
import { useSelector } from "@app/redux/reducers"
import { api } from "@app/services/api"
import ChatScreen from "@app/screens/Demo/ChatScreen"
import Conversations from "@app/screens/Demo/Conversations"
import ChatDetail from "@app/screens/Demo/ChatDetail"
import CousultOnline from "@app/screens/Booking/CousultOnline"
import SearchDocter from "@app/screens/Docter/SearchDocter"
import DocterInformation from "@app/screens/Docter/DocterInformation"
import SelectCalendar from "@app/screens/Booking/MakeBooking/SelectCalendar"
import SelectTimeBooking from "@app/screens/Booking/MakeBooking/SelectTimeBooking"
import CompleteBooking from "@app/screens/Booking/MakeBooking/CompleteBooking"
import BookingSuccess from "@app/screens/Booking/BookingSuccess"
import SelectPatientRecord from "@app/screens/Booking/MakeBooking/SelectPatientRecord"
import SelectSpecialist from "@app/screens/Booking/MakeBooking/SelectSpecialist"
import DocterReviews from "@app/screens/Docter/DocterReviews"
import DetailBooking from "@app/screens/Booking/DetailBooking"
import CallVideo from "@app/screens/CallVideo"
import RatingDocter from "@app/screens/Docter/RatingDocter"
import CancelBooking from "@app/screens/Booking/CancelBooking"
import ExaminationResults from "@app/screens/Patient/ExaminationResults"
import ExaminationHistory from "@app/screens/Result/ExaminationHistory"
import SelectPatientHistory from "@app/screens/Result/SelectPatientHistory"
import DetailExamination from "@app/screens/Patient/DetailExamination"
import SelectLocation from "@app/screens/Auth/Register/SelectLocation"
import Notification from "@app/screens/Notification"
import VerifyPhoneNumber from "@app/screens/Auth/Register/VerifyPhoneNumber"
import Account from "@app/screens/Account"
import PatientProfile from "@app/screens/Patient/PatientProfile"
import DetailPatient from "@app/screens/Patient/DetailPatient"
import UpdateAccount from "@app/screens/Account/UpdateAccount"
import SearchHome from "@app/screens/SearchHome"
import { DetailConversation } from "@app/screens/Conversation/DetailConversation"
import { ChatWithSupport } from "@app/screens/Conversation/ChatWithSupport"
import ChatProfile from "@app/screens/Conversation/ChatProfile"
import SearchConversation from "@app/screens/Conversation/SearchConversation"

export type AppStackParamList = {
  TabNavigator: undefined
  Profile: undefined
  Video: undefined
  History: undefined
  Login: undefined
  DetailSick: undefined
  VerifyOTP: undefined
  ConfirmName: undefined
  VerifyPhoneNumber: undefined
  Account: undefined
  CreatePatient: undefined
  CallScreen: undefined

  ChatScreen: undefined
  Conversations: undefined
  ChatDetail: undefined
  CousultOnline: undefined
  SearchDocter: undefined
  DocterInformation: undefined

  SelectCalendar: undefined
  SelectTimeBooking: undefined
  SelectCalendarAgain: undefined
  SelectTimeBookingAgain: undefined

  CompleteBooking: undefined
  BookingSuccess: undefined
  SelectPatientRecord: undefined
  SelectPatientRecordAgain: undefined
  SelectSpecialist: undefined
  SelectSpecialistAgain: undefined
  SearchDocterAgain: undefined

  DocterReviews: undefined
  DetailBooking: undefined
  CallVideo: undefined
  RatingDocter: undefined
  CancelBooking: undefined

  ExaminationResults: undefined
  ExaminationHistory: undefined
  DetailExamination: undefined

  SelectLocation: undefined
  Notification: undefined
  SelectPatientHistory: undefined
  PatientProfile: undefined
  DetailPatient: undefined
  UpdateAccount: undefined
  SearchHome: undefined
  DetailConversation: undefined
  ChatWithSupport: undefined
  ChatProfile: undefined
  SearchConversation: undefined
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
      <Stack.Screen name="CreatePatient" component={CreatePatient} />
      <Stack.Screen name="CallScreen" component={CallScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="Conversations" component={Conversations} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
      <Stack.Screen name="CousultOnline" component={CousultOnline} />
      <Stack.Screen name="SearchDocter" component={SearchDocter} />
      <Stack.Screen name="SearchDocterAgain" component={SearchDocter} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
      <Stack.Screen name="DetailPatient" component={DetailPatient} />
      <Stack.Screen name="UpdateAccount" component={UpdateAccount} />
      <Stack.Screen name="SearchHome" component={SearchHome} />
      <Stack.Screen name="DetailConversation" component={DetailConversation} />
      <Stack.Screen name="ChatWithSupport" component={ChatWithSupport} />
      <Stack.Screen name="ChatProfile" component={ChatProfile} />
      <Stack.Screen name="SearchConversation" component={SearchConversation} />

      <Stack.Screen name="DocterInformation" component={DocterInformation} />
      <Stack.Screen name="SelectCalendar" component={SelectCalendar} />
      <Stack.Screen name="SelectCalendarAgain" component={SelectCalendar} />
      <Stack.Screen name="SelectTimeBooking" component={SelectTimeBooking} />
      <Stack.Screen name="SelectTimeBookingAgain" component={SelectTimeBooking} />

      <Stack.Screen name="CompleteBooking" component={CompleteBooking} />
      <Stack.Screen name="BookingSuccess" component={BookingSuccess} />
      <Stack.Screen name="SelectPatientRecord" component={SelectPatientRecord} />
      <Stack.Screen name="SelectPatientRecordAgain" component={SelectPatientRecord} />

      <Stack.Screen name="SelectSpecialist" component={SelectSpecialist} />
      <Stack.Screen name="SelectSpecialistAgain" component={SelectSpecialist} />

      <Stack.Screen name="DocterReviews" component={DocterReviews} />
      <Stack.Screen name="DetailBooking" component={DetailBooking} />
      <Stack.Screen name="CallVideo" component={CallVideo} />
      <Stack.Screen name="RatingDocter" component={RatingDocter} />
      <Stack.Screen name="CancelBooking" component={CancelBooking} />
      <Stack.Screen name="ExaminationResults" component={ExaminationResults} />
      <Stack.Screen name="ExaminationHistory" component={ExaminationHistory} />
      <Stack.Screen name="SelectPatientHistory" component={SelectPatientHistory} />
      <Stack.Screen name="DetailExamination" component={DetailExamination} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
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
      if (dataTokenLocal !== null) {
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
