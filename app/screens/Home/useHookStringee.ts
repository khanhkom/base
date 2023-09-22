import { navigate } from "@app/navigators/navigationUtilities"
import { useRef, useState } from "react"
import { PermissionsAndroid } from "react-native"

const useHookStringee = (updateClientId) => {
  const client = useRef(null)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [callData, setCallData] = useState({
    userId: "",
    to: "",
    connected: false,
    clientId: "",
  })
  //Event
  // The client connects to Stringee server
  const clientDidConnect = ({ userId }) => {
    console.log("clientDidConnect02 - " + userId, client?.current?.getId?.())
    setCallData({
      ...callData,
      userId: userId,
      connected: true,
    })
    updateClientId(client?.current?.getId?.())
  }
  // The client disconnects from Stringee server
  const clientDidDisConnect = () => {
    console.log("clientDidDisConnect")
    client?.current?.disconnect()
    setCallData({
      ...callData,
      userId: "Disconnected",
      connected: false,
    })
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

    navigate("Call2Screen", {
      callId: callId,
      clientId: client?.current?.getId(),
      isVideoCall: isVideoCall,
      from: from,
      to: callData.userId,
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
  }
}
export default useHookStringee
