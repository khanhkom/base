import RNNotificationCall from "react-native-full-screen-notification-incoming-call"
import { goBack } from "@app/navigators/navigationUtilities"
import MediaManager from "@app/utils/MediaManager"
import React, { useState, useEffect, useRef } from "react"
import { Alert, Platform } from "react-native"
import RNCallKeep from "react-native-callkeep"
import notifee from "@notifee/react-native"

const useHookCall = (callId, isIncoming, from, to) => {
  const [status, setStatus] = useState("")
  const [isMute, setIsMute] = useState(false)
  const [isVideoEnable, setIsVideoEnable] = useState(true)
  const [isSpeaker, setIsSpeaker] = useState(true)
  const [showAnswerBtn, setShowAnswerBtn] = useState(isIncoming)
  const [receivedLocalStream, setReceivedLocalStream] = useState(false)
  const [receivedRemoteStream, setReceivedRemoteStream] = useState(false)
  const [isVideoEnableRemote, setIsVideoEnableRemote] = useState(true)
  const [signalingState, setSignalingState] = useState(-1)
  const [mediaState, setMediaState] = useState(-1)
  const [callIdNew, setCallIdNew] = useState(callId || "")
  const call2 = useRef(React.createRef())

  useEffect(() => {
    MediaManager.initSound("messenger_ringtone.mp3", true, () => {})
    MediaManager.playMusicBackGround("messenger_ringtone.mp3", true)
    return () => MediaManager.stopMusicBackground()
  }, [])

  useEffect(() => {
    if (call2.current) {
      if (isIncoming) {
        call2.current.initAnswer(callId, (status, code, message) => {
          console.log("initAnswer " + message)
        })
      } else {
        const callParams = JSON.stringify({
          from: from,
          to: to,
          isVideoCall: true,
          videoResolution: "NORMAL",
        })
        console.log("ZZZZZZZZ", callParams)
        call2.current.makeCall(callParams, (status, code, message, callId) => {
          console.log(
            "status-" + status + " code-" + code + " message-" + message + " callId-" + callId,
          )
          if (status) {
            setCallIdNew(callId)
            MediaManager.playMusicBackGround("phone_call.mp3", true)
          } else {
            Alert.alert("Make call fail: " + message)
          }
        })
      }
    }
  }, [call2])
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
    setStatus(reason)
    setSignalingState(code)

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
        dismissCallingView()
        break
      case 4:
        // Ended
        dismissCallingView()
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
    //   if (receivedRemoteStream) {
    //   setReceivedRemoteStream(false)
    // } else {
    //   setReceivedRemoteStream(true)
    // }
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
    if (code !== 1) {
      dismissCallingView()
    }
  }

  const callDidAudioDeviceChange = ({ selectedAudioDevice, availableAudioDevices }) => {
    console.log(
      "didHandleOnAnotherDevice selectedAudioDevice" +
        selectedAudioDevice +
        " availableAudioDevices-" +
        availableAudioDevices,
    )
  }

  const startCall = () => {
    setStatus("started")
    call2.current.setSpeakerphoneOn(callIdNew, isSpeaker, (status, code, message) => {})
  }

  const switchPress = () => {
    call2.current.switchCamera(callIdNew, (status, code, message) => {
      console.log("switch - " + message)
    })
  }

  const mutePress = () => {
    call2.current.mute(callIdNew, !isMute, (status, code, message) => {
      if (status) {
        setIsMute((val) => !val)
      }
    })
  }

  const speakerPress = () => {
    call2.current.setSpeakerphoneOn(callIdNew, !isSpeaker, (status, code, message) => {
      console.log("setSpeakerphoneOn: " + message)
      if (status) {
        setIsSpeaker((val) => !val)
      }
    })
  }

  const videoPress = () => {
    let obj = JSON.stringify({ isVideoEnable: !isVideoEnable })
    call2.current.sendCallInfo(callIdNew, obj, (status, code, message) => {
      console.log("SENT_INFOR", status, code, message)
    })
    call2.current.enableVideo(callIdNew, !isVideoEnable, (status, code, message) => {
      if (status) {
        setIsVideoEnable((val) => !val)
      }
    })
  }

  const answerCall = () => {
    console.log("AAAAAAAA", callId)
    RNCallKeep.endAllCalls()
    RNNotificationCall.hideNotification()
    MediaManager.stopMusicBackground()
    notifee.cancelAllNotifications()
    call2.current.answer(callId, (status, code, message) => {
      console.log("answer: " + message, status)
      if (status) {
        setShowAnswerBtn(false)
        setSignalingState(2)
      } else {
        endPress(false)
      }
    })
  }

  const endPress = (isHangup) => {
    if (isHangup) {
      call2.current.hangup(callIdNew, (status, code, message) => {
        console.log("hangup: " + message)
        if (Platform.OS === "android") {
          dismissCallingView()
        }
      })
    } else {
      call2.current.reject(callIdNew, (status, code, message) => {
        console.log("reject: " + message)
        if (Platform.OS === "android") {
          dismissCallingView()
        }
      })
    }
  }

  const dismissCallingView = () => {
    RNCallKeep.endAllCalls()
    goBack()
    // props.navigation.goBack()
  }

  return {
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
    answerCall,
    endPress,
    dismissCallingView,
    callDidChangeSignalingState,
    callDidChangeMediaState,
    callDidReceiveLocalStream,
    callDidReceiveRemoteStream,
    callDidReceiveCallInfo,
    callDidHandleOnAnotherDevice,
    callDidAudioDeviceChange,
    callIdNew,
    isVideoEnableRemote,
  }
}

export default useHookCall
