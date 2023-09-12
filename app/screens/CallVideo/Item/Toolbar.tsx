/* eslint-disable react-native/no-color-literals */
import { Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import colors from "@app/assets/colors"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
const LIST_ACTION = [
  {
    active: "microphone_2",
  },
  {
    active: "ic_call_video",
  },
  {
    active: "ic_chat_filled",
  },
  {
    active: "ic_call",
  },
]
export default function Toolbar() {
  return (
    <View style={styles.container}>
      {LIST_ACTION.map((item, index) => {
        return (
          <Pressable
            onPress={() => {
              navigate("RatingDocter")
            }}
            style={[styles.boxIcon, index === 3 && { backgroundColor: colors.red_5 }]}
            key={index}
          >
            <Icon icon={item.active} size={WIDTH(28)} />
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
