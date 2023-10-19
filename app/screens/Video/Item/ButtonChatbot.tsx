import { StyleSheet, Text, View, Image, Pressable } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import R from "@app/assets"
import { spacing } from "@app/theme/spacing"
import { Button, Menu } from "react-native-paper"
import colors from "@app/assets/colors"
export default function ButtonChatbot({ onPress }) {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={R.images.chatbot} style={styles.icon} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: WIDTH(spacing.md),
    bottom: HEIGHT(spacing.md),
  },
  icon: {
    height: WIDTH(56),
    width: WIDTH(56),
  },
})
