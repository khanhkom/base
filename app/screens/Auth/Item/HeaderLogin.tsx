import { StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { IColorsTheme } from "@app/theme/colors"
import { useTheme } from "react-native-paper"
import R from "@app/assets"
export default function HeaderLogin() {
  return (
    <View style={[styles.container, { backgroundColor: R.colors.primary }]}>
      <Image source={R.images.flower_left} style={styles.leftImage} resizeMode="contain" />
      <Image source={R.images.logowhite} style={styles.logo} resizeMode="contain" />
      <Image source={R.images.flower_right} style={styles.rightImage} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: HEIGHT(231),
    justifyContent: "space-between",
    paddingTop: HEIGHT(44),
    width: getWidth(),
  },
  leftImage: {
    height: HEIGHT(187),
    marginLeft: -WIDTH(12),
    width: WIDTH(134),
  },
  logo: {
    bottom: HEIGHT(114),
    height: HEIGHT(64),
    left: WIDTH(111),
    position: "absolute",
    width: WIDTH(156),
  },
  rightImage: {
    height: HEIGHT(200),
    marginRight: -WIDTH(12),
    width: WIDTH(143),
  },
})
