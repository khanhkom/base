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
import { getOrderHistory } from "@app/redux/actions/actionOrder"
import useHookCallKitIOS from "./hook/useHookStringeeCall"
import { StringeeClient, StringeeCall2 } from "stringee-react-native"
import notifee, { AuthorizationStatus } from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging"
import CallScreen from "./hook/CallModal"
import { useSafeAreaInsetsStyle } from "../useSafeAreaInsetsStyle"
import { api } from "@app/services/api"
import { KEYSTORAGE, load } from "../storage"
import BackgroundTimer from "react-native-background-timer"
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
    call2,
    status,
    isVideoEnable,
    isSpeaker,
    showAnswerBtn,
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
    answerCallAction,
    isIncoming,
    setSyncCall,
    clientId,
    from,
  } = useHookCallKitIOS(updateClientId)

  console.log("permissionGranted", permissionGranted)
  React.useEffect(() => {
    if (!permissionGranted) {
      if (Platform.OS === "android") {
        requestPermission()
      }
    }
  }, [])

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
      BackgroundTimer.runBackgroundTimer(() => {
        //code that will be called every 3 seconds
        client?.current?.connect(session?.access_token)
      }, 60000)
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer() //after this call all code on background stop run.
    }
  }, [session?.access_token])

  useEffect(() => {
    if (actionClient === "REFRESH_CLIENT") {
      if (session?.access_token && session?.access_token !== "") {
        client?.current?.connect(session?.access_token)
      }
      dispatch(removeActionClient())
      // dispatch(refreshClient())
    }
    if (actionClient === "UN_REGISTER_PUSH") {
      unregisterPush()
      dispatch(removeActionClient())
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCallingView}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
        }}
      >
        <CallScreen
          hasLocalStream={receivedLocalStream}
          hasRemoteStream={receivedRemoteStream}
          stringeeCallId={syncCall != null ? syncCall.callId : ""}
          isAnswered={answeredCall}
          isVideoEnableRemote={isVideoEnableRemote}
          callState={callState}
          endButtonHandler={() => {
            endPress(true)
          }}
          rejectButtonHandler={() => {
            endPress(false)
          }}
          from={from}
          acceptButtonHandler={() => {
            var newSyncCall = syncCall
            newSyncCall.answered = true
            setSyncCall(newSyncCall)
            answerCallAction()
          }}
          isIncoming={isIncoming}
          switchCameraHandler={switchPress}
          isSpeaker={isSpeaker}
          speakerButtonHandler={speakerPress}
          isMute={isMute}
          muteButtonHandler={mutePress}
          enableVideo={isVideoEnable}
          enableVideoButtonHandler={videoPress}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    position: "absolute",
  },
})
