import { PermissionsAndroid, Platform, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import HeaderHome from "./Item/Header"
import { Screen } from "@app/components/Screen"
import ItemUtilities from "./Item/ItemUtilities"
import BannerCarousel from "./Item/BannerCarousel"
import TopDocter from "./Item/TopDocter"
import TopPackage from "./Item/TopPackage"
import HotNews from "./Item/HotNews"
import colors from "@app/assets/colors"
// import useHookStringee from "./useHookStringee"
import { useDispatch } from "react-redux"
import { getOrderHistory } from "@app/redux/actions/actionOrder"
import notifee, { AuthorizationStatus } from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging"
import { getStringeeToken } from "@app/redux/actions/stringee"
async function checkNotificationPermission() {
  const settings = await notifee.getNotificationSettings()

  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    console.log("Notification permissions has been authorized")
  } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    console.log("Notification permissions has been denied")
  }
}

export default function HomeScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false)

  const dispatch = useDispatch()

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

  useEffect(() => {
    // checkBatteryAndroid()
    requestUserPermission()
    checkNotificationPermission()
  }, [])

  const requestPermission = () => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ])
      .then((result) => {
        if (
          result["android.permission.CAMERA"] &&
          result["android.permission.RECORD_AUDIO"] === "granted"
        ) {
          setPermissionGranted(true)
        }
      })
      .catch((err) => {
        console.log("requestPermission_error", err)
      })
  }

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
  }, [])

  return (
    <Screen preset="scroll" style={styles.container}>
      <HeaderHome onSearch={onSearch} />
      <ItemUtilities />
      <BannerCarousel />
      <TopDocter />
      <TopPackage />
      <HotNews />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
