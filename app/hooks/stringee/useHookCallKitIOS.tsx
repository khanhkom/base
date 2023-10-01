import React, { useState, useEffect, useRef } from "react"
import { AppState, PermissionsAndroid, Platform } from "react-native"
import RNCallKeep from "react-native-callkeep"
import VoipPushNotification from "react-native-voip-push-notification"
// import uuid from "react-native-uuid"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import SyncCall from "@app/screens/Demo/SyncCall"
import UUIDGenerator from "react-native-uuid-generator"

const iOS = Platform.OS === "ios" ? true : false

const useHookCallKitIOS = (updateClientId) => {
  const client = useRef(null)

  const [pushToken, setPushToken] = useState("")
  const [syncCall, setSyncCall] = useState(null)
  const [showCallingView, setShowCallingView] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)

  const [isActivateAudioSession, setIsActivateAudioSession] = useState(false)
  const [isMute, setIsMute] = useState(false)
  const [fakeCallIds, setFakeCallIds] = useState([])
  const [answeredCall, setAnsweredCall] = useState(false)
  const [allSyncCalls, setAllSyncCalls] = useState([])
  const [callState, setCallState] = useState("")
  const [endTimeout, setEndTimeout] = useState(null)
  const [registeredToken, setRegisteredToken] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)

  const [userId, setUserId] = useState("")
  const [callId, setCallId] = useState("")
  const [from, setFrom] = useState("")
  const stringeeCall = useRef(null)

  const endCallAndUpdateView = () => {
    // End callkit call
    if (syncCall != null && syncCall.callkitId != "") {
      RNCallKeep.endCall(syncCall.callkitId)
    }
    // End tat ca ongoing call cho chac
    RNCallKeep.endAllCalls()

    // reset trang thai va view
    setCallState("Ended")

    // Xoa sync call neu can
    deleteSyncCallIfNeed()

    // Show CallScreen them 0.5s de hien thi trang thai ended (Cho giong native call cua ios)
    setTimeout(() => {
      goBack()
    }, 500)
  }
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
  const activateAudioSessionListener = (data) => {
    setIsActivateAudioSession(true)
    // answerCallAction()
  }

  const removeSyncCallInCacheArray = (callId, serial) => {
    // Xoa call cu neu da save
    const newAllSyncCalls = allSyncCalls.filter(
      (call) => !(call.callId == callId && call.serial == serial),
    )
    setAllSyncCalls(newAllSyncCalls)
  }

  const startCallActionListener = ({ handle, callUUID, name }) => {
    // Code for didReceiveStartCallAction event...
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

  const clientDidIncomingCall2 =async ({
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
    navigate("CallScreen", {
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
     let uuid= await UUIDGenerator.getRandomUUID()
     console.log("uuid_uuid",uuid)
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
      // setShowCallingView(true)
      // navigate("CallScreen", {
      //   callId: callId,
      //   clientId: client?.current?.getId(),
      //   isVideoCall: true,
      //   from: from,
      //   to: userId,
      //   isIncoming: true,
      // })

      // answerCallAction()
      return
    }

    // Chua show callkit thi show
    const newSyncCall = syncCall
    newSyncCall.callId = callId
    newSyncCall.serial = serial
    // newSyncCall.callkitId = uuid.v1()
    newSyncCall.callkitId = Math.round(Math.random() * 100).toString()
    newSyncCall.receivedStringeeCall = true

    // Callkit
    // RNCallKeep.displayIncomingCall(newSyncCall.callkitId, "Stringee", fromAlias, "generic", true)
    setSyncCall(newSyncCall)
    // setShowCallingView(true)
    // Call screen
    // navigate("CallScreen", {
    //   callId: callId,
    //   clientId: client?.current?.getId(),
    //   isVideoCall: true,
    //   from: from,
    //   to: userId,
    //   isIncoming: true,
    // })
    // answerCallAction()
  }
  const setMutedCallActionListener = ({ muted, callUUID }) => {
    if (muted != isMute) {
      _muteAction()
    }
  }

  const answerCallListener = ({ callUUID }) => {
    // if (syncCall == null) {
    //   return
    // }

    // if (callUUID != syncCall.callkitId) {
    //   return
    // }
    RNCallKeep.backToForeground()
    RNCallKeep.endAllCalls()

    const newSyncCall = syncCall

    setSyncCall(newSyncCall)
    console.log("ZZZZZZZZ")
    navigate("CallScreen", {
      callId: callId,
      clientId: client?.current?.getId(),
      isVideoCall: true,
      from: from,
      to: userId,
      isIncoming: true,
      answered: true,
    })
    // answerCallAction()
  }

  const endCallListener = ({ callUUID }) => {
    console.log("EVENT END CALLKIT, callUUID: " + callUUID)

    if (syncCall == null) {
      console.log("EVENT END CALLKIT - syncCall = null")
      return
    }

    if (syncCall.callkitId == "" || callUUID != syncCall.callkitId) {
      console.log("EVENT END CALLKIT - uuid khac, callkitId: " + syncCall.callkitId)
      return
    }

    const newSyncCall = syncCall
    newSyncCall.endedCallkit = true
    newSyncCall.rejected = true

    setSyncCall(newSyncCall)

    console.log(
      "EVENT END CALLKIT, syncCall: " +
        syncCall +
        " callId: " +
        syncCall?.callId +
        " callCode: " +
        syncCall.callCode,
    )

    if (syncCall?.callId != "" && syncCall.callCode != 3 && syncCall.callCode != 4) {
      if (answeredCall) {
        console.log("HANGUP CALL KHI END CALLKIT")
        //stringeeCall
      } else {
        console.log("REJECT CALL KHI END CALLKIT")
        //reject
      }
    }

    deleteSyncCallIfNeed()
  }

  useEffect(() => {
    if (iOS) {
      VoipPushNotification.registerVoipToken()

      VoipPushNotification.addEventListener("register", registerListener)
      VoipPushNotification.addEventListener("notification", notificationListener)
    }
    // RNCallKeep.addEventListener("didDisplayIncomingCall", displayIncomingCallListener)
    // RNCallKeep.addEventListener("didActivateAudioSession", activateAudioSessionListener)
    // RNCallKeep.addEventListener("didReceiveStartCallAction", startCallActionListener)
    // RNCallKeep.addEventListener("didPerformSetMutedCallAction", setMutedCallActionListener)
    // RNCallKeep.addEventListener("answerCall", answerCallListener)
    // RNCallKeep.addEventListener("endCall", endCallListener)
  }, [])

  const clientDidConnect = ({ userId }) => {
    console.log("clientDidConnect02 - " + userId, client?.current?.getId?.())

    if (iOS) {
      VoipPushNotification.registerVoipToken()
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

  const _callDidChangeSignalingState = ({ callId, code, reason, sipCode, sipReason }) => {
    console.log(
      "_callDidChangeSignalingState " +
        " callId-" +
        callId +
        "code-" +
        code +
        " reason-" +
        reason +
        " sipCode-" +
        sipCode +
        " sipReason-" +
        sipReason,
    )
    if (syncCall != null) {
      const newSyncCall = syncCall
      newSyncCall.callCode = code

      // Neu la end hoac reject call thi cap nhat trang thai endedStringeeCall cho sync call
      if (code == 3 || code == 4) {
        newSyncCall.endedStringeeCall = true
      }
      setCallState(reason)
      setSyncCall(newSyncCall)
    } else {
      setCallState(reason)
    }

    switch (code) {
      case 3:
        // Rejected
        endCallAndUpdateView()
        break
      case 4:
        // Ended
        endCallAndUpdateView()
        break
    }
  }

  // Invoked when the call media state changes
  const _callDidChangeMediaState = ({ callId, code, description }) => {
    console.log(
      "_callDidChangeMediaState" +
        " callId-" +
        callId +
        "code-" +
        code +
        " description-" +
        description,
    )
    switch (code) {
      case 0:
        setCallState("Started")
        break
      case 1:
        break
    }
  }
  // Receive custom message
  const clientReceiveCustomMessage = ({ data }) => {
    console.log("_clientReceiveCustomMessage: " + data)
  }

  const _callDidReceiveLocalStream = (call) => {
    // Handle onReceiveLocalStream event...
  }

  const _callDidReceiveRemoteStream = (call) => {
    // Handle onReceiveRemoteStream event...
  }

  const _didReceiveDtmfDigit = (call, dtmf) => {
    // Handle onReceiveDtmfDigit event...
  }

  const _didReceiveCallInfo = (call, callInfo) => {
    // Handle onReceiveCallInfo event...
  }

  const _didHandleOnAnotherDevice = ({ callId, code, description }) => {
    console.log("_didHandleOnAnotherDevice " + callId + "***" + code + "***" + description)
  }

  const registerTokenForStringee = (token) => {
    console.log("token_A", token)
    client?.current?.registerPush(
      token,
      false, // isProduction: false: In development, true: In Production.
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

  const callEventHandlers = {
    onChangeSignalingState: _callDidChangeSignalingState,
    onChangeMediaState: _callDidChangeMediaState,
    onReceiveLocalStream: _callDidReceiveLocalStream,
    onReceiveRemoteStream: _callDidReceiveRemoteStream,
    onReceiveDtmfDigit: _didReceiveDtmfDigit,
    onReceiveCallInfo: _didReceiveCallInfo,
    onHandleOnAnotherDevice: _didHandleOnAnotherDevice,
  }
  const requestPermission = () => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]).then((result) => {
      if (
        result["android.permission.CAMERA"] &&
        result["android.permission.RECORD_AUDIO"] === "granted"
      ) {
        setPermissionGranted(true)
      }
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
    callEventHandlers,
  }
}

export default useHookCallKitIOS
