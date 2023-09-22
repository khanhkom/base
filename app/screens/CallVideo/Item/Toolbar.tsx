/* eslint-disable react-native/no-color-literals */
import { Pressable, StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import colors from "@app/assets/colors"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import MediaManager from "@app/utils/MediaManager"
const LIST_ACTION = [
  {
    active: "microphone_2",
    inactive: "microphone_slash",
  },
  {
    active: "ic_call_video",
    inactive: "camera_slash",
  },
  {
    active: "ic_chat_filled",
  },
  {
    active: "ic_call",
  },
]
export default function Toolbar({
  isMute,
  isSpeaker,
  mutePress,
  speakerPress,
  isVideoEnable,
  videoPress,
  endPress,
}) {
  const returnActive = (index) => {
    switch (index) {
      case 0:
        return isMute
      case 1:
        return isVideoEnable
      default:
        return true
    }
  }
  useEffect(() => {
    return () => MediaManager.stopMusicBackground()
  }, [])
  const onPress = (index) => {
    switch (index) {
      case 0:
        mutePress()
        break
      case 1:
        videoPress()
        break
      case 3: {
        endPress()
        // navigate("RatingDocter")
        goBack()

        break
      }
      default:
        return true
    }
  }
  return (
    <View style={styles.container}>
      {LIST_ACTION.map((item, index) => {
        return (
          <Pressable
            onPress={() => onPress(index)}
            style={[styles.boxIcon, index === 3 && { backgroundColor: colors.red_5 }]}
            key={index}
          >
            <Icon icon={returnActive(index) ? item.active : item?.inactive} size={WIDTH(28)} />
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH(240),
    paddingHorizontal: WIDTH(spacing.xs),
    paddingVertical: HEIGHT(spacing.xs),
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    left: WIDTH(68),
    bottom: HEIGHT(spacing.xl),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 100,
  },
  boxIcon: {
    height: WIDTH(44),
    width: WIDTH(44),
    borderRadius: WIDTH(22),
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
})
