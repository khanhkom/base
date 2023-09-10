import { PermissionsAndroid, Platform, StyleSheet, Clipboard, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Header } from "@app/components/Header"
import { Button, List, Menu, TextInput } from "react-native-paper"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { Icon } from "@app/components/Icon"
import { spacing } from "@app/theme/spacing"
import { StringeeClient, StringeeServerAddress } from "stringee-react-native"
import { navigate } from "@app/navigators/navigationUtilities"
import { getStringeeToken } from "@app/redux/actions/stringee"
import { useDispatch } from "react-redux"
import { useSelector } from "@app/redux/reducers"
import { EToastType, showToastMessage } from "@app/utils/library"
import messaging from "@react-native-firebase/messaging"
export default function Video({ route }) {
  const [callData, setCallData] = useState({
    userId: "",
    to: "64e77211e020af1b026e1d2c",
    connected: false,
    clientId: "",
  })
  const dispatch = useDispatch()
  const session = useSelector((state) => state.stringeeReducers.session)
  console.log("session_session", session)

  const [permissionGranted, setPermissionGranted] = useState(false)
  const [visible, setVisible] = React.useState(false)

  useEffect(() => {
    dispatch(getStringeeToken())
  }, [])
  const client = React.useRef()
  React.useEffect(() => {
    if (!permissionGranted) {
      if (Platform.OS === "android") {
        requestPermission()
      }
    }
  }, [])
  useEffect(() => {
    if (session?.access_token !== "") {
      client?.current?.connect(session?.access_token)
    }
  }, [session?.access_token])
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
  const makeCall = (isCall: boolean, isVideoCall: boolean) => {
    if (permissionGranted || Platform.OS === "ios") {
      if (callData.to.trim() !== "") {
        if (isCall) {
          navigate("CallScreen", {
            callId: "",
            clientId: client?.current?.getId?.(),
            isVideoCall: isVideoCall,
            from: callData.userId,
            to: callData.to,
            isIncoming: false,
          })
        } else {
          navigate("Call2Screen", {
            callId: "",
            clientId: client?.current?.getId?.(),
            isVideoCall: isVideoCall,
            from: callData.userId,
            to: callData.to,
            isIncoming: false,
          })
        }
      }
    } else {
      console.log("Need require permission")
    }
  }
  //Event
  // The client connects to Stringee server
  const clientDidConnect = ({ userId }) => {
    console.log("clientDidConnect - " + userId)
    setCallData({
      ...callData,
      userId: userId,
      connected: true,
    })
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

  // IncomingCall event
  const clientDidIncomingCall = ({
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
      "clientDidIncomingCall-" +
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

    navigate("CallScreen", {
      callId: callId,
      clientId: client?.current?.getId(),
      isVideoCall: isVideoCall,
      from: from,
      to: callData.userId,
      isIncoming: true,
    })
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
  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)
  return (
    <View>
      <Header leftIcon="menu" />
      <Button
        onPress={() => {
          Clipboard.setString(callData?.userId)
          // showToastMessage({
          //   customMessage: "Coppy mã thành công!",
          // })
          showToastMessage("Coppy thành công!", EToastType.INFO)
        }}
      >
        {" "}
        Coppy User ID: {callData?.userId}
      </Button>
      <TextInput
        mode="outlined"
        label={"Target user id"}
        style={{ marginHorizontal: 16, marginVertical: 16 }}
        onChangeText={(text) => {
          setCallData({
            ...callData,
            to: text,
          })
        }}
        value={callData?.to}
        placeholder={"To"}
      />

      <List.Item
        title="Call video"
        style={styles.item}
        onPress={() => {
          makeCall(true, true)
        }}
        right={() => {
          return <Icon icon="arrow_right" size={20} />
        }}
      />
      <List.Item
        title="Call voice"
        style={styles.item}
        onPress={() => {
          makeCall(true, false)
        }}
        right={() => {
          return <Icon icon="arrow_right" size={20} />
        }}
      />
      <List.Item
        title="Call phone"
        style={styles.item}
        onPress={() => {
          if (callData.to?.length !== 11) {
            showToastMessage("Số phải có dạng 84123456789", EToastType.ERROR)
          } else {
            navigate("CallScreen", {
              callId: "",
              clientId: client?.current?.getId?.(),
              isVideoCall: false,
              from: callData.userId,
              to: callData.to,
              isIncoming: false,
              isCall: true,
            })
          }
        }}
        right={() => {
          return <Icon icon="arrow_right" size={20} />
        }}
      />
      <List.Item
        title="Chat"
        style={styles.item}
        onPress={() => {
          navigate("Conversations", {
            token: session?.access_token,
          })
        }}
        right={() => {
          return <Icon icon="arrow_right" size={20} />
        }}
      />
      <StringeeClient
        ref={client}
        eventHandlers={{
          onConnect: clientDidConnect,
          onDisConnect: clientDidDisConnect,
          onFailWithError: clientDidFailWithError,
          onIncomingCall: clientDidIncomingCall,
          onIncomingCall2: clientDidIncomingCall2,
          onRequestAccessToken: clientRequestAccessToken,
          onCustomMessage: clientReceiveCustomMessage,
        }}
        // If you use a premise server, put your host and port here to connect
        // serverAddresses={new StringeeServerAddress('host', port)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    marginHorizontal: WIDTH(16),
    borderRadius: 8,
    marginBottom: HEIGHT(spacing.md),
  },
})
