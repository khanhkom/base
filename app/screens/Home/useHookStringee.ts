import { navigate } from "@app/navigators/navigationUtilities"
import { useRef, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import VoipPushNotification from "react-native-voip-push-notification"
const iOS = Platform.OS === "ios" ? true : false

const useHookStringee = (updateClientId) => {
  const client = useRef(null)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [currentCallKitId, setCurrentCallKitId] = useState("")
  const [userId, setUserId] = useState("")

  //Event
  // The client connects to Stringee server
  const clientDidConnect = ({ userId }) => {
    console.log("clientDidConnect02 - " + userId, client?.current?.getId?.())

    if (iOS) {
      VoipPushNotification.registerVoipToken()
    }
    setUserId(userId)

    updateClientId(client?.current?.getId?.())
  }
  // The client disconnects from Stringee server
  const clientDidDisConnect = () => {
    console.log("clientDidDisConnect")
    client?.current?.disconnect()
    setUserId("Disconnected")
  }

  // The client fails to connects to Stringee server
  const clientDidFailWithError = ({ code, message }) => {
    console.log("clientDidFailWithError: code-" + code + " message: " + message)
  }

  // IncomingCall2 event
  const clientDidIncomingCall2 = ({
    callId,
    from,
    to,
    fromAlias,
    toAlias,
    callType,
    isVideoCall,
    customDataFromYourServer,
  }) => {
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
    )
    navigate("CallScreenHook", {
      callId: callId,
      clientId: client?.current?.getId(),
      isVideoCall: isVideoCall,
      from: from,
      to: userId,
      isIncoming: true,
    })
  }

  // Access token is expired. A new access token is required to connect to Stringee server
  const clientRequestAccessToken = () => {
    console.log("clientRequestAccessToken")
    // Token để kết nối tới Stringee server đã hết bạn. Bạn cần lấy token mới và gọi connect lại ở đây
  }

  // Receive custom message
  const clientReceiveCustomMessage = ({ data }) => {
    console.log("_clientReceiveCustomMessage: " + data)
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
    currentCallKitId,
    setCurrentCallKitId,
  }
}
export default useHookStringee
