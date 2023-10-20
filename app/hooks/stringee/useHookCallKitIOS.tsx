import React, { useState, useEffect, useRef } from "react"
import { AppState, PermissionsAndroid, Platform } from "react-native"
import RNCallKeep from "react-native-callkeep"
import VoipPushNotification from "react-native-voip-push-notification"
// import uuid from "react-native-uuid"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import SyncCall from "@app/screens/Demo/SyncCall"
import UUIDGenerator from "react-native-uuid-generator"
import messaging from "@react-native-firebase/messaging"

const iOS = Platform.OS === "ios" ? true : false

const useHookCallKitIOS = (updateClientId) => {
  const client = useRef(null)

  const [pushToken, setPushToken] = useState("")
  const [syncCall, setSyncCall] = useState(null)
  const [permissionGranted, setPermissionGranted] = useState(false)

  const [fakeCallIds, setFakeCallIds] = useState([])
  const [allSyncCalls, setAllSyncCalls] = useState([])
  const [callState, setCallState] = useState("")
  const [endTimeout, setEndTimeout] = useState(null)
  const [registeredToken, setRegisteredToken] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)

  const [userId, setUserId] = useState("")
  const [callId, setCallId] = useState("")
  const [from, setFrom] = useState("")
  const stringeeCall = useRef(null)

  const deleteSyncCallIfNeed = () => {
    // Implement the deleteSyncCallIfNeed function...
    if (syncCall == null) {
      console.log("SyncCall is deleted")
      return
    }

    if (syncCall.isEnded()) {
      // cache lai call da xu ly
      addSyncCallToCacheArray(syncCall)
      setSyncCall(null)
    } else {
      console.log(
        "deleteSyncCallIfNeed, endedCallkit: " +
          syncCall.endedCallkit +
          " endedStringeeCall: " +
          syncCall.endedStringeeCall,
      )
    }
  }

  const addSyncCallToCacheArray = (sCall) => {
    // Xoa call cu neu da save
    const newAllSyncCalls = allSyncCalls.filter(
      (call) => !(call.callId == sCall.callId && call.serial == sCall.serial),
    )

    newAllSyncCalls.push(sCall)
    setAllSyncCalls(newAllSyncCalls)
  }

  const removeSyncCallInCacheArray = (callId, serial) => {
    // Xoa call cu neu da save
    const newAllSyncCalls = allSyncCalls.filter(
      (call) => !(call.callId == callId && call.serial == serial),
    )
    setAllSyncCalls(newAllSyncCalls)
  }

  // Kiem tra xem call da duoc xu ly lan nao chua
  const handledCall = (callId, serial) => {
    // Xoa call cu neu da save
    const newAllSyncCalls = allSyncCalls.filter(
      (call) => call.callId == callId && call.serial == serial,
    )
    return newAllSyncCalls != null && newAllSyncCalls.length > 0
  }

  const startEndTimeout = () => {
    if (endTimeout == null || syncCall != null) {
      const timeoutId = setTimeout(() => {
        if (syncCall == null) {
          return
        }

        // Sau 3s tu khi connected ma chua nhan duoc call thi end call
        if (!syncCall.receivedStringeeCall) {
          // End callkit
          if (syncCall.callkitId != "") {
            RNCallKeep.endCall(syncCall.callkitId)
          }
          addSyncCallToCacheArray(syncCall)

          setSyncCall(null)
        }
      }, 5000)

      setEndTimeout(timeoutId)
    }
  }
  const stopEndTimeout = () => {
    if (endTimeout != null) {
      clearTimeout(endTimeout)
      setEndTimeout(null)
    }
  }
  const registerListener = (token) => {
    console.log("LAY DUOC VOIP TOKEN: " + token)
    setPushToken(token)
    registerTokenForStringee(token)
  }

  const notificationListener = (notification) => {
    const callKitUUID = notification.getData().uuid
    const callSerial = notification.getData().serial
    const callId = notification.getData().callId
    console.log("Notification CallSerial: " + callSerial + " callId: " + callId)

    // Neu call da duoc xu ly roi thi end callkit vua show
    if (handledCall(callId, callSerial)) {
      RNCallKeep.endCall(callKitUUID)
      removeSyncCallInCacheArray(callId, callSerial)
      deleteSyncCallIfNeed()
      return
    }

    // Chua co sync call thi tao
    if (syncCall == null) {
      // Chua co call thi khoi tao
      const newSyncCall = new SyncCall()
      newSyncCall.callId = callId
      newSyncCall.serial = callSerial
      newSyncCall.callkitId = callKitUUID
      setSyncCall(newSyncCall)
      return
    }
    // Co sync call roi nhung thong tin cuoc goi khong trung khop => end callkit vua show
    if (!syncCall.isThisCall(callId, callSerial)) {
      console.log("END CALLKIT KHI NHAN DUOC PUSH, PUSH MOI KHONG PHAI SYNC CALL")
      RNCallKeep.endCall(callKitUUID)
      return
    }

    // Co sync call roi + thong tin cuoc goi trung khop nhung da show callkit roi => end callkit vua show
    if (syncCall.showedCallkit() && !syncCall.showedFor(callKitUUID)) {
      console.log("END CALLKIT KHI NHAN DUOC PUSH, SYNC CALL DA SHOW CALLKIT")
      RNCallKeep.endCall(callKitUUID)
      return
    }
  }

  const displayIncomingCallListener = ({ callUUID }) => {
    if (fakeCallIds.includes(callUUID)) {
      RNCallKeep.endCall(callUUID)
      const newFakeCallIds = fakeCallIds.filter((uuid) => uuid != callUUID)
      setFakeCallIds(newFakeCallIds)
      console.log("END FAKE CALL, UUID: " + callUUID + " fakeCallIds: " + fakeCallIds.toString)
    }

    deleteSyncCallIfNeed()
  }

  const clientDidIncomingCall2 = async ({
    callId,
    from,
    to,
    fromAlias,
    toAlias,
    callType,
    isVideoCall,
    customDataFromYourServer,
    serial,
  }) => {
    setFrom(from)
    setCallId(callId)
    setCallState("Incoming Call")
    console.log(
      "clientDidIncomingCall2-" +
        callId +
        " from-" +
        from +
        " to-" +
        to +
        " fromAlias-" +
        fromAlias +
        " toAlias-" +
        toAlias +
        " isVideoCall-" +
        isVideoCall +
        "callType-" +
        callType +
        "customDataFromYourServer-" +
        customDataFromYourServer,
      serial,
    )
    navigate("CallScreenHook", {
      callId: callId,
      clientId: client?.current?.getId(),
      isVideoCall: true,
      from: from,
      to: userId,
      isIncoming: true,
    })
    console.log("syncCall_syncCall", syncCall)

    if (syncCall == null) {
      console.log("Call + Show new call kit")
      const newSyncCall = new SyncCall()
      newSyncCall.callId = callId
      newSyncCall.serial = serial
      // newSyncCall.callkitId = uuid.v1()
      newSyncCall.callkitId = Math.round(Math.random() * 100).toString()
      newSyncCall.receivedStringeeCall = true
      let uuid = await UUIDGenerator.getRandomUUID()
      console.log("uuid_uuid", uuid)
      // Callkit
      // RNCallKeep.displayIncomingCall(uuid, "Stringee", fromAlias, "generic", true)
      setSyncCall(newSyncCall)

      // answerCallAction()
      return
    }
    // Cuoc goi moi toi khong phai la current sync call
    // Alert.alert('INCOMING CALL, callId: ' + this.state.syncCall?.callId + ' serial: ' + this.state.syncCall.serial);

    if (!syncCall.isThisCall(callId, serial)) {
      console.log("INCOMING CALL -> REJECT, CUOC GOI MOI KHONG TRUNG VOI SYNC CALL")
      stringeeCall?.current.reject(callId, (status, code, message) => {})
      return
    }
    if (syncCall.rejected) {
      // nguoi dung da click nut reject cuoc goi
      console.log("INCOMING CALL -> REJECT, NGUOI DUNG DA REJECT CUOC GOI")
      stringeeCall?.current.reject(callId, (status, code, message) => {})
      return
    }
    // Da show callkit => update UI
    if (syncCall.callkitId !== "") {
      console.log("Call + Update")
      RNCallKeep.updateDisplay(syncCall.callkitId, fromAlias, "")

      const newSyncCall = syncCall
      newSyncCall.callId = callId
      newSyncCall.receivedStringeeCall = true
      setSyncCall(newSyncCall)
      return
    }

    // Chua show callkit thi show
    const newSyncCall = syncCall
    newSyncCall.callId = callId
    newSyncCall.serial = serial
    // newSyncCall.callkitId = uuid.v1()
    newSyncCall.callkitId = Math.round(Math.random() * 100).toString()
    newSyncCall.receivedStringeeCall = true
    setSyncCall(newSyncCall)
  }

  useEffect(() => {
    if (iOS) {
      VoipPushNotification.registerVoipToken()

      VoipPushNotification.addEventListener("register", registerListener)
      VoipPushNotification.addEventListener("notification", notificationListener)
    }
  }, [])

  const clientDidConnect = async ({ userId }) => {
    console.log("clientDidConnect02 - " + userId, client?.current?.getId?.())
    if (iOS) {
      VoipPushNotification.registerVoipToken()
    } else {
      const token = await messaging().getToken()
      console.log("UPDATE_TOKEN_ANDROID", token)
      client?.current?.registerPush(
        token,
        __DEV__ ? false : true, // isProduction: false: In development, true: In Production.
        true, // only for iOS
        (status, code, message) => {
          console.log(message)
        },
      )
    }
    setUserId(userId)

    updateClientId(client?.current?.getId?.())

    /*
              Handle cho truong hop A goi B, nhung A end call rat nhanh, B nhan duoc push nhung khong nhan duoc incoming call
              ==> Sau khi ket noi den Stringee server 3s ma chua nhan duoc cuoc goi thi xoa Callkit Call va syncCall
            **/
    startEndTimeout()
    if (pushToken == "") {
      console.log("PUSH TOKEN IS INVALID")
      return
    }

    if (registeredToken) {
      console.log("DA GUI PUSH TOKEN TOI STRINGEE SERVER")
      return
    }

    registerTokenForStringee(pushToken)
  }

  const clientDidDisConnect = () => {
    stopEndTimeout()
  }

  const clientDidFailWithError = (error) => {
    // Handle onFailWithError event...
  }

  const clientRequestAccessToken = () => {
    // Handle onRequestAccessToken event...
  }

  const _callIncomingCall = (call) => {
    // Handle onIncomingCall event...
  }

  // Receive custom message
  const clientReceiveCustomMessage = ({ data }) => {
    console.log("_clientReceiveCustomMessage: " + data)
  }

  const registerTokenForStringee = (token) => {
    console.log("token_A", token)
    client?.current?.registerPush(
      token,
      __DEV__ ? false : true, // isProduction: false: In development, true: In Production.
      true, // (iOS) isVoip: true: Voip PushNotification. Stringee supports this push notification.
      (status, code, message) => {
        console.log(message)
        setRegisteredToken(status)
      },
    )
  }

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!")
      RNCallKeep.checkSpeaker().then(
        function (speaker) {
          console.log("RNCallKeep.checkSpeaker " + speaker)
        },
        function (error) {
          console.log(error.message)
        },
      )
    }

    setAppState(nextAppState)
    console.log("App state " + appState)
  }
  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange)
  }, [])

  const _muteAction = () => {
    // Implement the muteAction function...
  }
  const clientEventHandlers = {
    onConnect: clientDidConnect,
    onDisConnect: clientDidDisConnect,
    onFailWithError: clientDidFailWithError,
    onRequestAccessToken: clientRequestAccessToken,
    onIncomingCall: _callIncomingCall,
  }

  const requestPermission = () => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ])
      .then((result) => {
        console.log("result_result", result)
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

  return {
    clientDidConnect,
    clientDidDisConnect,
    clientDidFailWithError,
    clientDidIncomingCall2,
    clientRequestAccessToken,
    clientReceiveCustomMessage,
    client,
    permissionGranted,
    requestPermission,
    clientEventHandlers,
  }
}

export default useHookCallKitIOS
