import { Alert, Modal, PermissionsAndroid, Platform, StyleSheet, View } from "react-native"
import React, { useEffect } from "react"
import { Screen } from "@app/components/Screen"
import colors from "@app/assets/colors"

// import useHookStringee from "./useHookStringee"
import {
  getStringeeToken,
  removeActionClient,
  updateStringeeClientId,
} from "@app/redux/actions/stringee"
import { useSelector } from "@app/redux/reducers"
import { useDispatch } from "react-redux"
import useHookCallKitIOS from "./hook/useHookStringeeCall"
import { StringeeClient, StringeeCall2 } from "stringee-react-native"
import notifee, { AuthorizationStatus } from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging"
import { useSafeAreaInsetsStyle } from "../useSafeAreaInsetsStyle"
import { api } from "@app/services/api"
import { KEYSTORAGE, load } from "../storage"
async function checkNotificationPermission() {
  const settings = await notifee.getNotificationSettings()

  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    console.log("Notification permissions has been authorized")
  } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    console.log("Notification permissions has been denied")
  }
}

export default function CallEventHandle() {
  console.log("CallEventHandle_CallEventHandle")
  const session = useSelector((state) => state.stringeeReducers.session)

  const actionClient = useSelector((state) => state.stringeeReducers.actionClient)
  const dispatch = useDispatch()
  const updateClientId = (id: string) => {
    dispatch(updateStringeeClientId(id))
  }

  useEffect(() => {
    // checkBatteryAndroid()
    checkNotificationPermission()
  }, [])
  const {
    clientDidConnect,
    clientDidDisConnect,
    clientDidFailWithError,
    clientDidIncomingCall2,
    clientRequestAccessToken,
    clientReceiveCustomMessage,
    client,
    unregisterPush,
    call2,
    status,
    isVideoEnable,
    isSpeaker,
    receivedLocalStream,
    receivedRemoteStream,
    signalingState,
    mediaState,
    startCall,
    isMute,
    switchPress,
    mutePress,
    speakerPress,
    videoPress,
    endPress,
    callDidChangeSignalingState,
    callDidChangeMediaState,
    callDidReceiveLocalStream,
    callDidReceiveRemoteStream,
    callDidReceiveCallInfo,
    callDidHandleOnAnotherDevice,
    callDidAudioDeviceChange,
    isVideoEnableRemote,
    syncCall,
    showCallingView,
    answeredCall,
    callState,
    isIncoming,
    setSyncCall,
    clientId,
    from,
  } = useHookCallKitIOS(updateClientId)

  useEffect(() => {
    async function loadDataLocal() {
      const dataTokenLocal = await load(KEYSTORAGE.LOGIN_DATA)
      console.log("dataTokenLocal_dataTokenLocal", dataTokenLocal)
      if (dataTokenLocal !== null) {
        api.apisauce.setHeader("access-token", dataTokenLocal?.accessToken)
        dispatch(getStringeeToken())
      } else {
        console.log("loadDataLocal_failure")
      }
    }
    loadDataLocal()
  }, [])
  useEffect(() => {
    if (session?.access_token && session?.access_token !== "") {
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
    }
    if (actionClient === "UN_REGISTER_PUSH") {
      unregisterPush()
      // dispatch(unregisterPush())
    }
  }, [actionClient])
  const $containerInsets = useSafeAreaInsetsStyle([])
  console.log("answeredCall_answeredCall", answeredCall, showCallingView, syncCall?.callId)
  return (
    <View style={$containerInsets}>
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
      <StringeeCall2
        ref={call2}
        clientId={clientId}
        eventHandlers={{
          onChangeSignalingState: callDidChangeSignalingState,
          onChangeMediaState: callDidChangeMediaState,
          onReceiveLocalStream: callDidReceiveLocalStream,
          onReceiveRemoteStream: callDidReceiveRemoteStream,
          onReceiveCallInfo: callDidReceiveCallInfo,
          onHandleOnAnotherDevice: callDidHandleOnAnotherDevice,
          onAudioDeviceChange: callDidAudioDeviceChange, ///only available on android
        }}
      />
    </View>
  )
}
