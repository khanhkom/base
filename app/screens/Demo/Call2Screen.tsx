/* eslint-disable react-native/no-unused-styles */
import { Icon } from "@app/components/Icon"
import React, { Component } from "react"
import { StyleSheet, View, Alert, Image, Dimensions, Platform, Pressable } from "react-native"

import { StringeeCall2, StringeeVideoView } from "stringee-react-native"
import Toolbar from "../CallVideo/Item/Toolbar"
import colors from "@app/assets/colors"
import BottomButton from "../CallVideo/Item/BottomButton"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import { Header } from "@app/components/Header"
import { goBack } from "@app/navigators/navigationUtilities"
import MediaManager from "@app/utils/MediaManager"
export default class Call2Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      callId: props.route.params.callId !== undefined ? props.route.params.callId : "",
      clientId: props.route.params.clientId,
      from: props.route.params.from,
      to: props.route.params.to,
      isVideoCall: props.route.params.isVideoCall,
      isIncoming: props.route.params.isIncoming,
      detailOrder: props.route.params.detailOrder,
      isMute: false,
      isVideoEnable: props.route.params.isVideoCall,
      isSpeaker: props.route.params.isVideoCall,
      showAnswerBtn: props.route.params.isIncoming,
      receivedLocalStream: false,
      receivedRemoteStream: false,
      signalingState: -1,
      mediaState: -1,
    }
    this.call2 = React.createRef()
    this.callEvents = {
      onChangeSignalingState: this.callDidChangeSignalingState,
      onChangeMediaState: this.callDidChangeMediaState,
      onReceiveLocalStream: this.callDidReceiveLocalStream,
      onReceiveRemoteStream: this.callDidReceiveRemoteStream,
      onReceiveCallInfo: this.callDidReceiveCallInfo,
      onHandleOnAnotherDevice: this.callDidHandleOnAnotherDevice,
      onAudioDeviceChange: this.callDidAudioDeviceChange, ///only available on android
    }
  }

  componentWillUnmount(): void {
    MediaManager.stopMusicBackground()
  }

  componentDidMount(): void {
    console.log("AAAAAA", this.props.route.params.clientId)
    MediaManager.initSound("messenger_ringtone.mp3", true, () => {})
    if (this.state.isIncoming) {
      MediaManager.playMusicBackGround("messenger_ringtone.mp3", true)
      this.call2.current.initAnswer(this.state.callId, (status, code, message) => {
        console.log("initAnswer " + message)
      })
    }
    // Make new call
    else {
      const callParams = JSON.stringify({
        from: this.state.from,
        to: this.state.to,
        isVideoCall: this.state.isVideoCall,
        videoResolution: "NORMAL",
      })
      console.log("ZZZZZZZZ", callParams)
      this.call2.current.makeCall(callParams, (status, code, message, callId) => {
        console.log(
          "status-" + status + " code-" + code + " message-" + message + " callId-" + callId,
        )
        if (status) {
          this.setState({
            callId: callId,
            status: "Outgoing Call",
          })
          MediaManager.playMusicBackGround("phone_call.mp3", true)
        } else {
          Alert.alert("Make call fail: " + message)
        }
      })
    }
  }

  /// MARK: - CALL EVENT HANDLER
  // Invoked when the call signaling state changes
  callDidChangeSignalingState = ({ callId, code, reason, sipCode, sipReason }) => {
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

    this.setState({
      status: reason,
      signalingState: code,
    })

    switch (code) {
      case 0:
        // Calling
        break
      case 1:
        // Ringing
        break
      case 2:
        // Answered
        if (this.state.mediaState === 0 && this.state.status !== "started") {
          this.startCall()
        }
        break
      case 3:
        // Busy
        this.dismissCallingView()
        break
      case 4:
        // Ended
        this.dismissCallingView()
        break
    }
  }

  // Invoked when the call media state changes
  callDidChangeMediaState = ({ callId, code, description }) => {
    console.log(
      "callDidChangeMediaState" +
        " callId-" +
        callId +
        "code-" +
        code +
        " description-" +
        description,
    )
    this.setState({
      mediaState: code,
    })
    switch (code) {
      case 0:
        if (this.state.signalingState === 2 && this.state.status !== "started") {
          this.startCall()
        }
        break
      case 1:
        break
    }
  }

  // Invoked when the local stream is available
  callDidReceiveLocalStream = ({ callId }) => {
    console.log("callDidReceiveLocalStream")
    this.setState({
      receivedLocalStream: true,
    })
  }

  // Invoked when the remote stream is available
  callDidReceiveRemoteStream = ({ callId }) => {
    console.log("callDidReceiveRemoteStream")
    MediaManager.stopMusicBackground()
    if (this.state.receivedRemoteStream) {
      this.setState({ receivedRemoteStream: false })
      this.setState({ receivedRemoteStream: true })
    } else {
      this.setState({ receivedRemoteStream: true })
    }
  }

  // Invoked when the add video track
  callDidAddVideoTrack = (videoTrack) => {
    console.log("callDidAddVideoTrack - " + JSON.stringify(videoTrack))

    if (videoTrack.isLocal) {
      this.setState({
        localTrackId: videoTrack.trackId,
      })
    } else {
      this.setState({
        remoteTrackId: videoTrack.trackId,
      })
    }
  }

  // Invoked when the remove video track
  callDidRemoveVideoTrack = (videoTrack) => {
    console.log("handleRemoveVideoTrack - " + JSON.stringify(videoTrack))

    if (videoTrack.isLocal) {
      this.setState({
        localTrackId: "",
      })
    } else {
      this.setState({
        remoteTrackId: "",
      })
    }
  }

  // Invoked when receives info from other clients
  callDidReceiveCallInfo = ({ callId, data }) => {
    console.log("didReceiveCallInfo - " + JSON.stringify(data))
  }

  // Invoked when the call is handled on another device
  callDidHandleOnAnotherDevice = ({ callId, code, description }) => {
    console.log("didHandleOnAnotherDevice " + callId + "***" + code + "***" + description)
    this.setState({ status: description })

    // Cuoc goi da duoc answer, reject hoặc end thi can dismiss view
    if (code != 1) {
      this.dismissCallingView()
    }
  }

  // Invoked when audio device has change
  callDidAudioDeviceChange = ({ selectedAudioDevice, availableAudioDevices }) => {
    console.log(
      "didHandleOnAnotherDevice selectedAudioDevice" +
        selectedAudioDevice +
        " availableAudioDevices-" +
        availableAudioDevices,
    )
  }

  startCall = () => {
    this.setState({ status: "started" })

    this.call2.current.setSpeakerphoneOn(
      this.state.callId,
      this.state.isSpeaker,
      (status, code, message) => {},
    )
  }

  switchPress = () => {
    this.call2.current.switchCamera(this.state.callId, (status, code, message) => {
      console.log("switch - " + message)
    })
  }

  mutePress = () => {
    this.call2.current.mute(this.state.callId, !this.state.isMute, (status, code, message) => {
      if (status) {
        this.setState({
          isMute: !this.state.isMute,
        })
      }
    })
  }

  speakerPress = () => {
    this.call2.current.setSpeakerphoneOn(
      this.state.callId,
      !this.state.isSpeaker,
      (status, code, message) => {
        console.log("setSpeakerphoneOn: " + message)
        if (status) {
          this.setState({ isSpeaker: !this.state.isSpeaker })
        }
      },
    )
  }

  videoPress = () => {
    this.call2.current.enableVideo(
      this.state.callId,
      !this.state.isVideoEnable,
      (status, code, message) => {
        if (status) {
          this.setState({
            isVideoEnable: !this.state.isVideoEnable,
          })
        }
      },
    )
  }

  answerCall = () => {
    console.log("AAAAAAAA", this.state.callId)
    this.call2.current.answer(this.state.callId, (status, code, message) => {
      console.log("answer: " + message)
      if (status) {
        this.setState({
          showAnswerBtn: false,
          signalingState: 2,
        })
      } else {
        this.endPress(false)
      }
    })
  }

  endPress = (isHangup: boolean) => {
    if (isHangup) {
      this.call2.current.hangup(this.state.callId, (status, code, message) => {
        console.log("hangup: " + message)
        if (Platform.OS === "android") {
          this.dismissCallingView()
        }
      })
    } else {
      this.call2.current.reject(this.state.callId, (status, code, message) => {
        console.log("reject: " + message)
        if (Platform.OS === "android") {
          this.dismissCallingView()
        }
      })
    }
  }

  dismissCallingView = () => {
    // this.props.navigation.goBack()
  }

  render(): React.ReactNode {
    return (
      <View style={this.styles.container}>
        <Header
          title="Cuộc gọi"
          backgroundColor={colors.primary_8}
          leftIcon="arrow_left"
          onLeftPress={() => {
            this.endPress(!this.state.showAnswerBtn)
            goBack()
          }}
          leftIconColor={colors.white}
          titleStyle={{ color: colors.white }}
        />
        {this.state.isVideoCall && this.state.callId !== "" && this.state.receivedRemoteStream && (
          <StringeeVideoView
            style={this.styles.remoteView}
            callId={this.state.callId}
            local={false}
            overlay={false}
          />
        )}

        {this.state.receivedLocalStream && this.state.callId !== "" && this.state.isVideoCall && (
          <View style={this.styles.wrapperUserTarget}>
            <StringeeVideoView
              style={this.styles.userTarget}
              callId={this.state.callId}
              local={true}
              overlay={true}
            />
            <Pressable onPress={this.switchPress} style={this.styles.iconSwith}>
              <Icon icon="switch_camera" size={WIDTH(20)} />
            </Pressable>
          </View>
        )}
        {!this.state.receivedRemoteStream && (
          <View>
            <Image source={R.images.call_avatar} style={this.styles.imageCalling} />
            {!this.state.isIncoming ? (
              <View>
                <Text
                  size="xxl"
                  weight="semiBold"
                  style={{ color: colors.white, textAlign: "center" }}
                >
                  B.n {this.state.detailOrder?.patient?.name}
                </Text>
                <Text
                  size="sm"
                  weight="normal"
                  style={{
                    color: colors.gray_3,
                    textAlign: "center",
                    marginTop: HEIGHT(spacing.md),
                  }}
                >
                  Đang kết nối...
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  size="xxl"
                  weight="semiBold"
                  style={{ color: colors.white, textAlign: "center" }}
                >
                  B.s {this.state.detailOrder?.doctor?.name}
                </Text>
                <Text
                  size="sm"
                  weight="normal"
                  style={{
                    color: colors.gray_3,
                    textAlign: "center",
                    marginTop: HEIGHT(spacing.md),
                  }}
                >
                  Đang gọi cho bạn
                </Text>
              </View>
            )}
          </View>
        )}

        {/* <Text style={this.styles.status}>{this.state.status}</Text> */}

        {!this.state.showAnswerBtn && (
          <View style={this.styles.bottomContainer}>
            <Toolbar
              isMute={this.state.isMute}
              isSpeaker={this.state.isSpeaker}
              mutePress={this.mutePress}
              speakerPress={this.speakerPress}
              isVideoEnable={this.state.isVideoEnable}
              videoPress={this.videoPress}
              endPress={() => {
                this.endPress(!this.state.showAnswerBtn)
              }}
            />
          </View>
        )}
        {this.state.showAnswerBtn && (
          <View style={this.styles.bottomContainer}>
            <BottomButton
              onAccept={this.answerCall}
              onCancel={() => {
                this.endPress(!this.state.showAnswerBtn)
                goBack()
              }}
            />
          </View>
        )}

        <StringeeCall2
          clientId={this.state.clientId}
          ref={this.call2}
          eventHandlers={this.callEvents}
        />
      </View>
    )
  }

  styles = StyleSheet.create({
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
    btnSwitch: {
      top: 10,
      left: 10,
      position: "absolute",
      zIndex: 1,
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

    status: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 20,
    },

    localView: {
      backgroundColor: "black",
      position: "absolute",
      top: 40,
      right: 20,
      width: 100,
      height: 150,
      zIndex: 1,
    },

    remoteView: {
      backgroundColor: "black",
      position: "absolute",
      top: 0,
      left: 0,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
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
      backgroundColor: colors.black,
    },
  })
}
