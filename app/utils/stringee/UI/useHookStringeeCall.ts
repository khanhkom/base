import React, { useState, useEffect, useRef } from "react"
import { AppState, PermissionsAndroid, Platform } from "react-native"
import RNCallKeep from "react-native-callkeep"
import VoipPushNotification from "react-native-voip-push-notification"
// import uuid from "react-native-uuid"
import SyncCall from "@app/screens/Demo/SyncCall"
import UUIDGenerator from "react-native-uuid-generator"
import messaging from "@react-native-firebase/messaging"
import notifee from "@notifee/react-native"
import { ActionFromCallKit } from "@app/context/themeContext"
import RNNotificationCall from "react-native-full-screen-notification-incoming-call"
import * as storage from "@app/utils/storage"
import MediaManager from "@app/utils/MediaManager"
import InCallManager from "react-native-incall-manager"

const iOS = Platform.OS === "ios" ? true : false

//isIncoming
const useHookCallKitIOS = (updateClientId) => {
  const client = useRef(null)

  const [pushToken, setPushToken] = useState("")
  const [androidPushToken, setAndroidPushToken] = useState("")
  const [syncCall, setSyncCall] = useState(null)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [isIncoming, setIsIncoming] = useState(false)

  const [fakeCallIds, setFakeCallIds] = useState([])
  const [allSyncCalls, setAllSyncCalls] = useState([])
  const [callState, setCallState] = useState("")
  const [endTimeout, setEndTimeout] = useState(null)
  const [registeredToken, setRegisteredToken] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)
  const [answeredCall, setAnsweredCall] = useState(false)

  const [userId, setUserId] = useState("")
  const [callId, setCallId] = useState("")
  const [clientId, setClientId] = useState("")

  const [from, setFrom] = useState("")
  const [status, setStatus] = useState("")
  const [isMute, setIsMute] = useState(false)
  const [isVideoEnable, setIsVideoEnable] = useState(true)
  const [isSpeaker, setIsSpeaker] = useState(true)
  const [showAnswerBtn, setShowAnswerBtn] = useState(false)
  const [showCallingView, setShowCallingView] = useState(false)
  const [isActivateAudioSession, setIsActivateAudioSession] = useState(false)
  const [receivedLocalStream, setReceivedLocalStream] = useState(false)
  const [receivedRemoteStream, setReceivedRemoteStream] = useState(false)
  const [isVideoEnableRemote, setIsVideoEnableRemote] = useState(true)
  const [signalingState, setSignalingState] = useState(-1)
  const [mediaState, setMediaState] = useState(-1)
  const call2 = useRef(React.createRef())
  const [isInited, setInited] = useState(false)
  const [callUUID, setCallUUID] = useState("")
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
  // listener
  useEffect(() => {
    RNCallKeep.addEventListener(
      "didDisplayIncomingCall",
      ({ error, callUUID, handle, localizedCallerName, hasVideo, fromPushKit, payload }) => {
        // Call back khi show callkit cho incoming call thanh cong, end fakeCall da show o day
        if (fakeCallIds.includes(callUUID)) {
          RNCallKeep.endCall(callUUID)
          var newFakeCallIds = fakeCallIds.filter((uuid) => uuid != callUUID)
          setFakeCallIds(newFakeCallIds)
          console.log("END FAKE CALL, UUID: " + callUUID + " fakeCallIds: " + fakeCallIds.toString)
        }

        deleteSyncCallIfNeed()
        if (error) {
        }
      },
    )

    RNCallKeep.addEventListener("didActivateAudioSession", (data) => {
      setIsActivateAudioSession(true)
      answerCallAction()
    })

    RNCallKeep.addEventListener("didReceiveStartCallAction", ({ handle, callUUID, name }) => {})

    RNCallKeep.addEventListener("didPerformSetMutedCallAction", ({ muted, callUUID }) => {
      if (muted != isMute) {
        mutePress()
      }
    })

    RNCallKeep.addEventListener("answerCall", ({ callUUID }) => {
      if (syncCall == null) {
        return
      }
      // Alert.alert('Người dùng click answer, Sync CallKitId: ' + this.state.syncCall.callkitId + ' callUUID: ' + callUUID.toLowerCase());

      if (callUUID != syncCall.callkitId) {
        return
      }

      // Luu lai hanh dong answer cua nguoi dung
      var newSyncCall = syncCall
      newSyncCall.answered = true
      setSyncCall(newSyncCall)

      // Answer call neu can
      answerCallAction()
    })

    RNCallKeep.addEventListener("endCall", ({ callUUID }) => {
      console.log("EVENT END CALLKIT, callUUID: " + callUUID, syncCall)

      if (syncCall == null) {
        console.log("EVENT END CALLKIT - syncCall = null")
        return
      }

      if (syncCall.callkitId == "" || callUUID != syncCall.callkitId) {
        console.log("EVENT END CALLKIT - uuid khac, callkitId: " + syncCall.callkitId)
        return
      }

      // Cap nhat trang thai cho syncCall
      var newSyncCall = syncCall
      newSyncCall.endedCallkit = true
      newSyncCall.rejected = true
      setSyncCall(newSyncCall)

      // StringeeCall van chua duoc end thi can end
      console.log(
        "EVENT END CALLKIT, syncCall: " +
          syncCall +
          " callId: " +
          syncCall.callId +
          " callCode: " +
          syncCall.callCode,
      )
      if (syncCall.callId != "" && syncCall.callCode != 3 && syncCall.callCode != 4) {
        InCallManager.stopRingtone()
        if (answeredCall) {
          console.log("HANGUP CALL KHI END CALLKIT")
          call2?.current.hangup(syncCall.callId, (status, code, message) => {
            console.log("stringeeCall.hangup: " + message)
            if (status) {
              // Sucess
            } else {
              // Fail
            }
          })
        } else {
          console.log("REJECT CALL KHI END CALLKIT")
          call2?.current.reject(this.state.syncCall.callId, (status, code, message) => {
            console.log("stringeeCall.reject: " + message)
            if (status) {
              // Sucess
            } else {
              // Fail
            }
          })
        }
      }

      deleteSyncCallIfNeed()
    })
  }, [])
  //end listen

  // listen android
  // handle call android when app background
  useEffect(() => {
    console.log("isInited_isInited", isInited)
    if (isInited && Platform.OS === "android") {
      RNNotificationCall.addEventListener("answer", async (data) => {
        console.log("press answer____", callUUID)
        RNNotificationCall.backToApp()
        const { callUUID, payload } = data
        var newSyncCall = syncCall
        newSyncCall.answered = true
        setSyncCall(newSyncCall)

        call2?.current.answer(callId, (status, code, message) => {
          // setAnsweredCall(true)
          // setTimeout(() => {
          //   setAnsweredCall(true)
          //   setShowCallingView(true)
          // }, 1000)
          // s
          console.log("call did answer " + status + " - message: " + message)
          if (status) {
            // Sucess
          } else {
            // Fail
          }
        })
        await storage.saveString(storage.KEYSTORAGE.ACTION_FROM_CALLKIT, ActionFromCallKit.NONE)
      })
      RNNotificationCall.addEventListener("endCall", async (data) => {
        const { callUUID, endAction, payload } = data
        call2.current.reject(callId, (status, code, message) => {
          console.log("reject: " + message + "--------" + callId)
          if (Platform.OS === "android") {
            dismissCallingView()
          }
        })
        endCallAndUpdateView()
      })
    }
    return () => {
      RNNotificationCall.removeEventListener("answer")
      RNNotificationCall.removeEventListener("endCall")
    }
  }, [call2, isInited, callId, syncCall])
  //
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
  const unregisterPush = () => {
    const token = Platform.OS === "android" ? androidPushToken : pushToken
    client?.current?.unregisterPush(token, (status, code, message) => {
      console.log("unregisterPush", status, code, message)
    })
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
    console.log("startRingtone_startRingtone")
    InCallManager.startRingtone("_BUNDLE_") // or _DEFAULT_ or system filename with extension

    setUserId(userId)
    setCallState("Incoming Call")
    setIsIncoming(true)
    // Chua show callkit thi show
    if (syncCall == null) {
      console.log("Call + Show new call kit")
      var newSyncCall = new SyncCall()
      newSyncCall.callId = callId
      newSyncCall.serial = serial
      newSyncCall.callkitId = await UUIDGenerator.getRandomUUID()
      newSyncCall.receivedStringeeCall = true

      // Callkit
      RNCallKeep.displayIncomingCall(newSyncCall.callkitId, "Stringee", fromAlias, "generic", true)

      // Call screen
      setSyncCall(newSyncCall)
      setShowCallingView(true)

      call2?.current?.initAnswer(callId, (status, code, message) => {
        setInited(status)
        console.log(message)
      })

      answerCallAction()
      return
    }

    // Cuoc goi moi toi khong phai la current sync call
    // Alert.alert('INCOMING CALL, callId: ' + this.state.syncCall.callId + ' serial: ' + this.state.syncCall.serial);

    if (!syncCall.isThisCall(callId, serial)) {
      console.log("INCOMING CALL -> REJECT, CUOC GOI MOI KHONG TRUNG VOI SYNC CALL")
      call2?.current.reject(callId, (status, code, message) => {})
      return
    }

    if (syncCall.rejected) {
      // nguoi dung da click nut reject cuoc goi
      console.log("INCOMING CALL -> REJECT, NGUOI DUNG DA REJECT CUOC GOI")
      call2?.current.reject(callId, (status, code, message) => {})
      return
    }

    // Da show callkit => update UI
    if (syncCall.callkitId != "") {
      console.log("Call + Update")
      RNCallKeep.updateDisplay(syncCall.callkitId, fromAlias, "")

      var newSyncCall = syncCall
      newSyncCall.callId = callId
      newSyncCall.receivedStringeeCall = true
      setSyncCall(newSyncCall)
      setCallId(callId)
      setShowCallingView(true)

      call2?.current.initAnswer(callId, (status, code, message) => {
        setInited(status)
        console.log(message)
      })

      answerCallAction()
      return
    }

    console.log("syncCall_syncCall", syncCall)
  }
  const answerCallAction = () => {
    /*
          Voi iOS, Answer StringeeCall khi thoa man cac yeu to:
          1. Da nhan duoc su kien onIncomingCall (có callId)
          2. User da click answer
          3. Chua goi ham answer cua StringeeCall lan nao
          3. AudioSession da active
        **/
    MediaManager.stopMusicBackground()
    RNNotificationCall.hideNotification()
    notifee.cancelAllNotifications()
    if (
      syncCall == null ||
      syncCall.callId === "" ||
      (Platform.OS === "ios" && !isActivateAudioSession) ||
      !syncCall.answered ||
      answeredCall
    ) {
      console.log(
        "Chua du dieu kien de answer call, AudioSessionActived: " +
          isActivateAudioSession +
          " - syncCall: " +
          syncCall +
          " - syncCall.callId: " +
          syncCall.callId +
          " - AnsweredAction: " +
          syncCall.answered +
          " - AnsweredCall: " +
          answeredCall,
      )

      return
    }
    InCallManager.stopRingtone()
    call2?.current.answer(syncCall.callId, (status, code, message) => {
      setAnsweredCall(true)
      console.log("call did answer " + status + " - message: " + message)
      if (status) {
        // Sucess
      } else {
        // Fail
      }
    })
  }
  const endCallAndUpdateView = () => {
    console.log("endCallAndUpdateView::")
    InCallManager.stopRingtone()
    // End callkit call
    if (syncCall != null && syncCall.callkitId != "") {
      RNCallKeep.endCall(syncCall.callkitId)
    }

    // End tat ca ongoing call cho chac
    RNCallKeep.endAllCalls()
    setCallState("Ended")
    // reset trang thai va view

    // Xoa sync call neu can
    deleteSyncCallIfNeed()

    // Show CallScreen them 0.5s de hien thi trang thai ended (Cho giong native call cua ios)
    setTimeout(() => {
      setShowCallingView(false)
      setReceivedLocalStream(false)
      setReceivedRemoteStream(false)
      setIsActivateAudioSession(false)
      setAnsweredCall(false)
      setIsVideoEnable(true)
      setIsSpeaker(true)
      setIsMute(false)
    }, 500)
  }
  useEffect(() => {
    if (iOS) {
      VoipPushNotification.registerVoipToken()

      VoipPushNotification.addEventListener("register", registerListener)
      VoipPushNotification.addEventListener("notification", notificationListener)

      // ===== Step 3: subscribe `didLoadWithEvents` event =====
      VoipPushNotification.addEventListener("didLoadWithEvents", (events) => {
        // --- this will fire when there are events occured before js bridge initialized
        // --- use this event to execute your event handler manually by event type

        if (!events || !Array.isArray(events) || events.length < 1) {
          return
        }
        console.log("events_events", events)
      })
    }
  }, [])

  const clientDidConnect = async ({ userId }) => {
    console.log("clientDidConnect02 - " + userId, client?.current?.getId?.())
    if (iOS) {
      VoipPushNotification.registerVoipToken()
    } else {
      const token = await messaging().getToken()
      setAndroidPushToken(token)
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
    setClientId(client?.current?.getId?.())
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
          setIsSpeaker(speaker)
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

  const callDidChangeSignalingState = ({ callId, code, reason, sipCode, sipReason }) => {
    console.log(
      "callDidChangeSignalingState " +
        "\ncallId-" +
        callId +
        "\ncode-" +
        code +
        "\nreason-" +
        reason +
        "\nsipCode-" +
        sipCode +
        "\nsipReason-" +
        sipReason,
    )
    setSignalingState(code)
    if (syncCall != null) {
      var newSyncCall = syncCall
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
      case 0:
        // Calling
        break
      case 1:
        // Ringing
        break
      case 2:
        // Answered
        if (mediaState === 0 && status !== "started") {
          startCall()
        }
        break
      case 3:
        // Busy
        endCallAndUpdateView()
        break
      case 4:
        // Ended
        endCallAndUpdateView()
        break
    }
  }

  const callDidChangeMediaState = ({ callId, code, description }) => {
    console.log(
      "callDidChangeMediaState" +
        " callId-" +
        callId +
        "code-" +
        code +
        " description-" +
        description,
    )
    setMediaState(code)

    switch (code) {
      case 0:
        if (signalingState === 2 && status !== "started") {
          startCall()
        }
        break
      case 1:
        break
    }
  }

  const callDidReceiveLocalStream = ({ callId }) => {
    console.log("callDidReceiveLocalStream")
    setReceivedLocalStream(true)
  }

  const callDidReceiveRemoteStream = ({ callId }) => {
    console.log("callDidReceiveRemoteStream")
    MediaManager.stopMusicBackground()
    setReceivedRemoteStream(true)
  }

  const callDidReceiveCallInfo = ({ callId, data }) => {
    console.log("didReceiveCallInfo - " + JSON.stringify(data))
    const remoteInfor = JSON.parse(data)
    const isRemoteEnableVideo = remoteInfor?.isVideoEnable
    setIsVideoEnableRemote(isRemoteEnableVideo)
  }

  const callDidHandleOnAnotherDevice = ({ callId, code, description }) => {
    console.log("didHandleOnAnotherDevice " + callId + "***" + code + "***" + description)
    setStatus(description)
    // Cuoc goi da duoc answer, reject hoặc end thi can dismiss view
    if (code !== 1 && isIncoming) {
      dismissCallingView()
    }
  }

  const callDidAudioDeviceChange = ({ selectedAudioDevice, availableAudioDevices }) => {
    console.log(
      "callDidAudioDeviceChange selectedAudioDevice" +
        selectedAudioDevice +
        " availableAudioDevices-" +
        availableAudioDevices,
    )
  }

  const startCall = () => {
    setStatus("started")
    call2.current.setSpeakerphoneOn(callId, isSpeaker, (status, code, message) => {})
  }

  const switchPress = () => {
    call2.current.switchCamera(callId, (status, code, message) => {
      console.log("switch - " + message)
    })
  }

  const mutePress = () => {
    call2.current.mute(callId, !isMute, (status, code, message) => {
      if (status) {
        setIsMute((val) => !val)
        if (syncCall != null && syncCall.callkitId != "") {
          RNCallKeep.setMutedCall(syncCall.callkitId, isMute)
        }
      }
    })
  }

  const speakerPress = () => {
    call2.current.setSpeakerphoneOn(callId, !isSpeaker, (status, code, message) => {
      console.log("setSpeakerphoneOn: " + message)
      if (status) {
        setIsSpeaker((val) => !val)
      }
    })
  }

  const videoPress = () => {
    let obj = JSON.stringify({ isVideoEnable: !isVideoEnable })
    call2.current.sendCallInfo(callId, obj, (status, code, message) => {
      console.log("SENT_INFOR", status, code, message)
    })
    call2.current.enableVideo(callId, !isVideoEnable, (status, code, message) => {
      if (status) {
        setIsVideoEnable((val) => !val)
      }
    })
  }

  console.log("callId_callId", callId)
  const endPress = (isHangup) => {
    if (isHangup) {
      call2.current.hangup(callId, (status, code, message) => {
        console.log("hangup: " + message)
        if (Platform.OS === "android") {
          dismissCallingView()
        }
      })
    } else {
      call2.current.reject(callId, (status, code, message) => {
        console.log("reject: " + message)
        if (Platform.OS === "android") {
          dismissCallingView()
        }
      })
    }
    endCallAndUpdateView()
  }

  const dismissCallingView = async () => {
    RNCallKeep.endAllCalls()
    RNNotificationCall.hideNotification()
    await storage.saveString(storage.KEYSTORAGE.ACTION_FROM_CALLKIT, ActionFromCallKit.NONE)
    // props.navigation.goBack()
  }

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
    unregisterPush,

    call2,
    status,
    isMute,
    isVideoEnable,
    isSpeaker,
    showAnswerBtn,
    receivedLocalStream,
    receivedRemoteStream,
    signalingState,
    mediaState,
    startCall,
    switchPress,
    mutePress,
    speakerPress,
    videoPress,
    endPress,
    dismissCallingView,
    callDidChangeSignalingState,
    callDidChangeMediaState,
    callDidReceiveLocalStream,
    callDidReceiveRemoteStream,
    callDidReceiveCallInfo,
    callDidHandleOnAnotherDevice,
    callDidAudioDeviceChange,
    callId,
    isVideoEnableRemote,
    callUUID,
    showCallingView,
    syncCall,
    callState,
    answeredCall,
    answerCallAction,
    isIncoming,
    setSyncCall,
    clientId,
    from,
  }
}

export default useHookCallKitIOS