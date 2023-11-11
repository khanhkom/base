/* eslint-disable react-native/no-unused-styles */
import { Icon } from "@app/components/Icon"
import React, { Component, useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Alert,
  Image,
  Dimensions,
  Platform,
  Pressable,
  PermissionsAndroid,
  Vibration,
} from "react-native"
import KeepAwake from "react-native-keep-awake"
import InCallManager from "react-native-incall-manager"

import { StringeeCall2, StringeeVideoView } from "stringee-react-native"
import Toolbar from "../CallVideo/Item/Toolbar"
import colors from "@app/assets/colors"
import BottomButton from "../CallVideo/Item/BottomButton"
import { HEIGHT, WIDTH, getHeight, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Header } from "@app/components/Header"
import { goBack } from "@app/navigators/navigationUtilities"
import RNCallKeep from "react-native-callkeep"
import ItemUserTarget from "./Item/ItemUserTarget"
import useHookCall from "./useHookCall"
import R from "@app/assets"
import { Screen } from "@app/components/Screen"
import { IOrderHistory } from "@app/interface/order"
interface ScreenProps {
  route: {
    params: {
      isVideoCall: boolean

      isIncoming: boolean
      detailOrder?: IOrderHistory
      callId: string
      clientId: string
      from: string
      to: string
    }
  }
}
const CallScreen = ({ route }: ScreenProps) => {
  const params = route.params
  const { isVideoCall, isIncoming, detailOrder, callId, clientId, from, to } = params
  const [permissionGranted, setPermissionGranted] = useState(false)
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

  useEffect(() => {
    requestPermission()
    KeepAwake.activate()
  }, [])
  const {
    call2,
    status,
    callIdNew,
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
    answerCall,
    endPress,
    callDidChangeSignalingState,
    callDidChangeMediaState,
    callDidReceiveLocalStream,
    callDidReceiveRemoteStream,
    callDidReceiveCallInfo,
    callDidHandleOnAnotherDevice,
    callDidAudioDeviceChange,
    isVideoEnableRemote,
    callUUID,
  } = useHookCall(callId, isIncoming, from, to, detailOrder?.patient?.name)
  console.log("STATUS_", status, isVideoCall, callId, receivedRemoteStream)
  console.log("STATUS_1", status, isVideoCall, callId, receivedLocalStream)

  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header
        title="Cuộc gọi"
        backgroundColor={colors.primary_8}
        leftIcon="arrow_left"
        onLeftPress={() => {
          endPress(!showAnswerBtn)
          goBack()
        }}
        leftIconColor={colors.white}
        titleStyle={{ color: colors.white }}
      />
      {isVideoCall && callIdNew !== "" && receivedRemoteStream && (
        <View style={styles.wrapperRemoteView}>
          <StringeeVideoView
            style={styles.remoteView}
            callId={callIdNew}
            local={false}
            overlay={false}
          />
          {!isVideoEnableRemote && (
            <Image source={R.images.avatar_docter_rec} style={styles.userDoctorDefault} />
          )}
        </View>
      )}

      {receivedLocalStream && callIdNew !== "" && isVideoCall && (
        <View style={styles.wrapperUserTarget}>
          <StringeeVideoView
            style={styles.userTarget}
            callId={callIdNew}
            local={true}
            overlay={true}
          />
          {!isVideoEnable && <Image source={R.images.client} style={styles.userTargetDefault} />}
          <Pressable onPress={switchPress} style={styles.iconSwith}>
            <Icon icon="switch_camera" size={WIDTH(20)} />
          </Pressable>
        </View>
      )}
      {!receivedRemoteStream && (
        <ItemUserTarget
          isIncoming={isIncoming}
          from={isIncoming ? from : to}
          doctorName={detailOrder?.doctor?.name}
        />
      )}

      {!showAnswerBtn && (
        <View style={styles.bottomContainer}>
          <Toolbar
            isMute={isMute}
            isSpeaker={isSpeaker}
            mutePress={mutePress}
            speakerPress={speakerPress}
            isVideoEnable={isVideoEnable}
            videoPress={videoPress}
            endPress={() => {
              RNCallKeep.endAllCalls()
              endPress(!showAnswerBtn)
            }}
          />
        </View>
      )}
      {showAnswerBtn && (
        <View style={styles.bottomContainer}>
          <BottomButton
            onAccept={() => {
              Vibration.cancel()
              InCallManager.stopRingback()

              console.log("callUUID_callUUID", callUUID)
              if (Platform.OS === "ios") {
                if (callUUID && callUUID !== "") {
                  RNCallKeep.answerIncomingCall(callUUID)
                }
              } else {
                answerCall(false)
              }
            }}
            onCancel={() => {
              // RNCallKeep.endAllCalls()
              if (showAnswerBtn) {
                endPress(false)
                // RNCallKeep.endCall(callUUID)
                RNCallKeep.endAllCalls()
              } else {
                endPress(true)
              }
              goBack()
            }}
          />
        </View>
      )}

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
    </Screen>
  )
}
export default CallScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_8,
  },
  imageCalling: {
    width: WIDTH(240),
    height: WIDTH(240),
    alignSelf: "center",
    marginTop: HEIGHT(80),
  },
  bottomContainer: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: HEIGHT(0),
    zIndex: 1,
  },
  wrapperRemoteView: {
    backgroundColor: colors.gray_5,
    position: "absolute",
    top: 0,
    left: 0,
  },
  remoteView: {
    width: Dimensions.get("window").width,
    height:
      Platform.OS === "ios"
        ? Dimensions.get("window").height
        : Dimensions.get("window").height + HEIGHT(80),
    zIndex: 0,
  },
  wrapperUserTarget: {
    position: "absolute",
    right: WIDTH(spacing.md),
    top: HEIGHT(spacing.xl),
  },
  iconSwith: {
    width: WIDTH(36),
    height: WIDTH(36),
    borderRadius: WIDTH(36),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main_7,
    alignSelf: "center",
    marginTop: -WIDTH(18),
  },
  userTarget: {
    width: WIDTH(100),
    height: WIDTH(132),
    borderRadius: 24,
    // borderWidth: 3,
    // borderColor: colors.white,
    backgroundColor: colors.gray_2,
  },
  userDoctorDefault: {
    width: getWidth(),
    height:
      Platform.OS === "ios"
        ? Dimensions.get("window").height
        : Dimensions.get("window").height + HEIGHT(80),
    borderRadius: 12,
    backgroundColor: colors.gray_2,
    position: "absolute",
    top: 0,
  },
  userTargetDefault: {
    width: WIDTH(100),
    height: WIDTH(132),
    borderRadius: 12,
    // borderWidth: 3,
    // borderColor: colors.white,
    backgroundColor: colors.gray_2,
    position: "absolute",
    top: 0,
  },
})
