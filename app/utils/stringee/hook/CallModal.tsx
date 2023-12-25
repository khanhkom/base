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
} from "react-native"
import KeepAwake from "react-native-keep-awake"

import { StringeeCall2, StringeeVideoView } from "stringee-react-native"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Header } from "@app/components/Header"
import { goBack } from "@app/navigators/navigationUtilities"
import R from "@app/assets"
import { Screen } from "@app/components/Screen"
import Toolbar from "@app/screens/CallScreen/Item/Toolbar"
import BottomButton from "@app/screens/CallScreen/Item/BottomButton"
import ItemUserTarget from "@app/screens/CallScreen/Item/ItemUserTarget"
interface ScreenProps {
  hasLocalStream: boolean
  hasRemoteStream: boolean
  stringeeCallId: string
  isAnswered: boolean
  isIncoming: boolean
  callState: string
  isVideoEnableRemote: boolean
  from: string
  endButtonHandler: () => void
  rejectButtonHandler: () => void
  acceptButtonHandler: () => void
  switchCameraHandler: () => void
  isSpeaker: boolean
  speakerButtonHandler: () => void
  isMute: boolean
  muteButtonHandler: () => void
  enableVideo: boolean
  enableVideoButtonHandler: () => void
}
const CallScreen = ({
  hasLocalStream,
  hasRemoteStream,
  stringeeCallId,
  isAnswered,
  callState,
  endButtonHandler,
  rejectButtonHandler,
  acceptButtonHandler,
  switchCameraHandler,
  isSpeaker,
  speakerButtonHandler,
  isMute,
  muteButtonHandler,
  enableVideo,
  enableVideoButtonHandler,
  isVideoEnableRemote,
  isIncoming,
  from,
}: ScreenProps) => {
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
          endButtonHandler()
          goBack()
        }}
        leftIconColor={colors.white}
        titleStyle={{ color: colors.white }}
      />
      {stringeeCallId !== "" && hasRemoteStream && (
        <View style={styles.wrapperRemoteView}>
          <StringeeVideoView
            style={styles.remoteView}
            callId={stringeeCallId}
            local={false}
            overlay={false}
          />
          {!isVideoEnableRemote && (
            <Image source={R.images.avatar_docter_rec} style={styles.userDoctorDefault} />
          )}
        </View>
      )}

      {hasLocalStream && stringeeCallId !== "" && (
        <View style={styles.wrapperUserTarget}>
          <StringeeVideoView
            style={styles.userTarget}
            callId={stringeeCallId}
            local={true}
            overlay={true}
          />
          {!enableVideo && <Image source={R.images.client} style={styles.userTargetDefault} />}
          <Pressable onPress={switchCameraHandler} style={styles.iconSwith}>
            <Icon icon="switch_camera" size={WIDTH(20)} />
          </Pressable>
        </View>
      )}
      {!hasRemoteStream && (
        <ItemUserTarget isIncoming={isIncoming} from={from} doctorName={"doctor"} />
      )}

      {isAnswered && (
        <View style={styles.bottomContainer}>
          <Toolbar
            isMute={isMute}
            isSpeaker={isSpeaker}
            mutePress={muteButtonHandler}
            speakerPress={speakerButtonHandler}
            isVideoEnable={enableVideo}
            videoPress={enableVideoButtonHandler}
            endPress={() => {
              endButtonHandler()
            }}
          />
        </View>
      )}
      {!isAnswered && (
        <View style={styles.bottomContainer}>
          <BottomButton onAccept={acceptButtonHandler} onCancel={rejectButtonHandler} />
        </View>
      )}
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
