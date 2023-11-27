import { Alert, PermissionsAndroid, Platform, StyleSheet } from "react-native"
import React, { useEffect } from "react"
import HeaderHome from "./Item/Header"
import { Screen } from "@app/components/Screen"
import ItemUtilities from "./Item/ItemUtilities"
import BannerCarousel from "./Item/BannerCarousel"
import TopDocter from "./Item/TopDocter"
import TopPackage from "./Item/TopPackage"
import HotNews from "./Item/HotNews"
import colors from "@app/assets/colors"
import {
  getStringeeToken,
  removeActionClient,
  unregisterPush,
  updateStringeeClientId,
} from "@app/redux/actions/stringee"
import { useSelector } from "@app/redux/reducers"
import { useDispatch } from "react-redux"
import { getOrderHistory } from "@app/redux/actions/actionOrder"
import useHookCallKitIOS from "@app/hooks/stringee/useHookCallKitIOS"
import { StringeeClient } from "stringee-react-native"
import notifee, { AuthorizationStatus } from "@notifee/react-native"
import { translate } from "@app/i18n/translate"
import messaging from "@react-native-firebase/messaging"
import { getMyProfile } from "@app/redux/actions"
async function checkNotificationPermission() {
  const settings = await notifee.getNotificationSettings()

  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    console.log("Notification permissions has been authorized")
  } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    console.log("Notification permissions has been denied")
  }
}

export default function HomeScreen() {
  const session = useSelector((state) => state.stringeeReducers.session)

  const actionClient = useSelector((state) => state.stringeeReducers.actionClient)
  const dispatch = useDispatch()
  const updateClientId = (id: string) => {
    dispatch(updateStringeeClientId(id))
  }
  async function requestUserPermission() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)

    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log("Authorization status:", authStatus)
    }
  }

  const checkBatteryAndroid = async () => {
    const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled()
    if (batteryOptimizationEnabled) {
      // 2. ask your users to disable the feature
      Alert.alert(
        translate("home.optimize_pin"),
        translate("home.optimize_pin_desc"),
        [
          // 3. launch intent to navigate the user to the appropriate screen
          {
            text: translate("common.setting"),
            onPress: async () => await notifee.openNotificationSettings(),
          },
          {
            text: translate("common.cancel"),
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false },
      )
    }
  }
  useEffect(() => {
    // checkBatteryAndroid()
    const timeout = setTimeout(() => {
      requestUserPermission()
    }, 1000)
    checkNotificationPermission()
    return () => clearTimeout(timeout)
  }, [])
  const {
    clientDidConnect,
    clientDidDisConnect,
    clientDidFailWithError,
    clientDidIncomingCall2,
    clientRequestAccessToken,
    clientReceiveCustomMessage,
    client,
    permissionGranted,
    requestPermission,
    unregisterPush,
  } = useHookCallKitIOS(updateClientId)
  console.log("permissionGranted", permissionGranted)

  React.useEffect(() => {
    if (!permissionGranted) {
      if (Platform.OS === "android") {
        requestPermission()
      }
    }
  }, [])

  /** search bar */
  const onSearch = async (keyword) => {}
  /** */

  useEffect(() => {
    dispatch(getStringeeToken())
    dispatch(getOrderHistory())
    dispatch(getMyProfile())
  }, [])
  useEffect(() => {
    if (session?.access_token && session?.access_token !== "" && Platform.OS === "android") {
      dispatch(removeActionClient())
      client?.current?.connect(session?.access_token)
    }
  }, [session?.access_token])

  useEffect(() => {
    if (actionClient === "REFRESH_CLIENT") {
      if (session?.access_token && session?.access_token !== "") {
        client?.current?.connect(session?.access_token)
      }
      // dispatch(refreshClient())
      dispatch(removeActionClient())
    }
    //logout
    if (actionClient === "UN_REGISTER_PUSH") {
      unregisterPush()
      // dispatch(unregisterPush())
      dispatch(removeActionClient())
    }
  }, [actionClient])

  return (
    <Screen preset="scroll" style={styles.container}>
      <HeaderHome onSearch={onSearch} />
      <ItemUtilities />
      <BannerCarousel />
      <TopDocter />
      <TopPackage />
      <HotNews />
      {Platform.OS === "android" && (
        <StringeeClient
          ref={client}
          eventHandlers={{
            onConnect: clientDidConnect,
            onDisConnect: clientDidDisConnect,
            onFailWithError: clientDidFailWithError,
            onIncomingCall: clientDidIncomingCall2,
            onIncomingCall2: clientDidIncomingCall2,
            onRequestAccessToken: clientRequestAccessToken,
            onCustomMessage: clientReceiveCustomMessage,
          }}
          // If you use a premise server, put your host and port here to connect
          // serverAddresses={new StringeeServerAddress('host', port)}
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
