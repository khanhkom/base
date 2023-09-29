import { goBack } from "@app/navigators/navigationUtilities"
import MediaManager from "@app/utils/MediaManager"
import React, { useState, useEffect, useRef } from "react"
import { Platform } from "react-native"
import RNCallKeep from "react-native-callkeep"

const useHookCall = (callId) => {
  const [status, setStatus] = useState("")
  const [isMute, setIsMute] = useState(false)
  const [isVideoEnable, setIsVideoEnable] = useState(true)
  const [isSpeaker, setIsSpeaker] = useState(true)
  const [showAnswerBtn, setShowAnswerBtn] = useState(true)
  const [receivedLocalStream, setReceivedLocalStream] = useState(false)
  const [receivedRemoteStream, setReceivedRemoteStream] = useState(false)
  const [signalingState, setSignalingState] = useState(-1)
  const [mediaState, setMediaState] = useState(-1)
  const call2 = useRef(React.createRef())

  useEffect(() => {
    MediaManager.initSound("messenger_ringtone.mp3", true, () => {})
    MediaManager.playMusicBackGround("messenger_ringtone.mp3", true)
    call2.current.initAnswer(callId, (status, code, message) => {
      console.log("initAnswer " + message)
    })
    return () => MediaManager.stopMusicBackground()
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
    if (receivedRemoteStream) {
      setReceivedRemoteStream(false)
      setReceivedRemoteStream(true)
    } else {
      setReceivedRemoteStream(true)
    }
  }

  const callDidReceiveCallInfo = ({ callId, data }) => {
    console.log("didReceiveCallInfo - " + JSON.stringify(data))
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
    call2.current.enableVideo(callId, !isVideoEnable, (status, code, message) => {
      if (status) {
        setIsVideoEnable((val) => !val)
      }
    })
  }

  const answerCall = () => {
    console.log("AAAAAAAA", callId)
    RNCallKeep.endAllCalls()

    call2.current.answer(callId, (status, code, message) => {
      console.log("answer: " + message)
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
  }

  const dismissCallingView = () => {
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
  }
}

export default useHookCall
