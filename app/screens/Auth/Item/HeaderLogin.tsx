import { StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { IColorsTheme } from "@app/theme/colors"
import { useTheme } from "react-native-paper"
import R from "@app/assets"
export default function HeaderLogin() {
  const { colors }: { colors: IColorsTheme } = useTheme()
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
    height: HEIGHT(231),
    paddingTop: HEIGHT(44),
    flexDirection: "row",
    justifyContent: "space-between",
    width: getWidth(),
  },
  logo: {
    height: HEIGHT(64),
    width: WIDTH(156),
    position: "absolute",
    bottom: HEIGHT(114),
    left: WIDTH(111),
  },
  leftImage: {
    width: WIDTH(134),
    height: HEIGHT(187),
    marginLeft: -WIDTH(12),
  },
  rightImage: {
    width: WIDTH(143),
    height: HEIGHT(200),
    marginRight: -WIDTH(12),
  },
})
