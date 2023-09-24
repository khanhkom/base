import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import HeaderHome from "./Item/Header"
import { Screen } from "@app/components/Screen"
import ItemUtilities from "./Item/ItemUtilities"
import BannerCarousel from "./Item/BannerCarousel"
import TopDocter from "./Item/TopDocter"
import TopPackage from "./Item/TopPackage"
import HotNews from "./Item/HotNews"
import colors from "@app/assets/colors"
import useHookStringee from "./useHookStringee"
import { getStringeeToken, updateStringeeClientId } from "@app/redux/actions/stringee"
import messaging from "@react-native-firebase/messaging"
import { useSelector } from "@app/redux/reducers"
import { useDispatch } from "react-redux"
import { StringeeClient } from "stringee-react-native"
import { getOrderHistory } from "@app/redux/actions/actionOrder"

export default function HomeScreen() {
  const session = useSelector((state) => state.stringeeReducers.session)
  const dispatch = useDispatch()
  const updateClientId = (id: string) => {
    dispatch(updateStringeeClientId(id))
  }
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
  } = useHookStringee(updateClientId)

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
    async function updateTokenFi() {
      const token = await messaging().getToken()
      console.log("AAAAA", token)
      client?.current?.registerPush(
        token,
        false, // only for iOS
        false, // only for iOS
        (status, code, message) => {
          console.log(message)
        },
      )
    }
    if (session?.access_token !== "") {
      setTimeout(() => {
        updateTokenFi()
      }, 500)
    }
  }, [session?.access_token])
  useEffect(() => {
    dispatch(getStringeeToken())
    dispatch(getOrderHistory())
  }, [])
  useEffect(() => {
    if (session?.access_token !== "") {
      client?.current?.connect(session?.access_token)
    }
  }, [session?.access_token])

  return (
    <Screen preset="scroll" style={styles.container}>
      <HeaderHome onSearch={onSearch} />
      <ItemUtilities />
      <BannerCarousel />
      <TopDocter />
      <TopPackage />
      <HotNews />
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
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
