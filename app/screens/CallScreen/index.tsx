/* eslint-disable react-native/no-unused-styles */
import { Icon } from "@app/components/Icon"
import React, { Component, useEffect, useState } from "react"
import { StyleSheet, View, Alert, Image, Dimensions, Platform, Pressable } from "react-native"

import { StringeeCall2, StringeeVideoView } from "stringee-react-native"
import Toolbar from "../CallVideo/Item/Toolbar"
import colors from "@app/assets/colors"
import BottomButton from "../CallVideo/Item/BottomButton"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Header } from "@app/components/Header"
import { goBack } from "@app/navigators/navigationUtilities"
import RNCallKeep from "react-native-callkeep"
import ItemUserTarget from "./Item/ItemUserTarget"
import useHookCall from "./useHookCall"
import R from "@app/assets"
const CallScreen = ({ route }) => {
  const params = route.params
  const { isVideoCall, isIncoming, detailOrder, callId, clientId, from, to } = params
  const {
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
    callDidChangeSignalingState,
    callDidChangeMediaState,
    callDidReceiveLocalStream,
    callDidReceiveRemoteStream,
    callDidReceiveCallInfo,
    callDidHandleOnAnotherDevice,
    callDidAudioDeviceChange,
  } = useHookCall(callId, isIncoming, from, to)
  console.log("STATUS_", status, isVideoCall, callId, receivedRemoteStream)
  console.log("STATUS_1", status, isVideoCall, callId, receivedLocalStream)

  return (
    <View style={styles.container}>
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
      {isVideoCall && callId !== "" && receivedRemoteStream && (
        <StringeeVideoView
          style={styles.remoteView}
          callId={callId}
          local={false}
          overlay={false}
        />
      )}

      {receivedLocalStream && callId !== "" && isVideoCall && (
        <View style={styles.wrapperUserTarget}>
          <StringeeVideoView
            style={styles.userTarget}
            callId={callId}
            local={true}
            overlay={true}
          />
          {!isVideoEnable && <Image source={R.images.client} style={styles.userTargetDefault} />}
          <Pressable onPress={switchPress} style={styles.iconSwith}>
            <Icon icon="switch_camera" size={WIDTH(20)} />
          </Pressable>
        </View>
      )}
      {!receivedRemoteStream && <ItemUserTarget isIncoming={isIncoming} from={from} />}

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
              endPress(!showAnswerBtn)
            }}
          />
        </View>
      )}
      {showAnswerBtn && (
        <View style={styles.bottomContainer}>
          <BottomButton
            onAccept={answerCall}
            onCancel={() => {
              RNCallKeep.endAllCalls()
              endPress(!showAnswerBtn)
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
    </View>
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

  remoteView: {
    backgroundColor: colors.gray_5,
    position: "absolute",
    top: 0,
    left: 0,
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
