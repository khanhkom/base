import { WIDTH } from "@app/config/functions"
import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { Text } from "../Text"
import colors from "@app/assets/colors"
interface ItemProps {
  style?: ViewStyle
  size: "small" | "medium" | "large"
  name: string
}
const randomColor = () => {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255

  return {
    background: `rgb(${red}, ${green}, ${blue})`,
    text: luminance > 0.5 ? "#000000" : "#ffffff",
  }
}
const AvatarDefault = ({ style, size, name }: ItemProps) => {
  let avatarSize
  switch (size) {
    case "small":
      avatarSize = styles.small
      break
    case "medium":
      avatarSize = styles.medium
      break
    case "large":
      avatarSize = styles.large
      break
    default:
      avatarSize = styles.medium
      break
  }

  return (
    <View style={[styles.container, avatarSize, { backgroundColor: colors.primary }, style]}>
      <Text style={{ color: colors.white }}>
        {(name || "A").toString().toUpperCase().slice(0, 2)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  small: {
    width: WIDTH(24),
    height: WIDTH(24),
  },
  medium: {
    width: WIDTH(32),
    height: WIDTH(32),
  },
  large: {
    width: WIDTH(40),
    height: WIDTH(40),
  },
})

export default AvatarDefault
