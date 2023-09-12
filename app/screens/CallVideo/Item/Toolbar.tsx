/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import colors from "@app/assets/colors"
const LIST_ACTION = [
  {
    active: "microphone_2",
  },
  {
    active: "microphone_2",
  },
  {
    active: "microphone_2",
  },
  {
    active: "microphone_2",
  },
]
export default function Toolbar() {
  return (
    <View style={styles.container}>
      {LIST_ACTION.map((item, index) => {
        return (
          <View
            style={[styles.boxIcon, index === 3 && { backgroundColor: colors.red_5 }]}
            key={index}
          >
            <Icon icon={item.active} size={WIDTH(28)} />
          </View>
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
