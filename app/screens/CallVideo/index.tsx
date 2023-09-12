import { StyleSheet, Text, View, ImageBackground, Image } from "react-native"
import React from "react"
import R from "@app/assets"
import Toolbar from "./Item/Toolbar"
import { Icon } from "@app/components/Icon"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"

export default function CallVideo() {
  return (
    <ImageBackground source={R.images.docter_bgr} style={styles.container}>
      <Toolbar />
      <View style={styles.wrapperUserTarget}>
        <Image source={R.images.client} style={styles.userTarget} />
        <View style={styles.iconSwith}>
          <Icon icon="switch_camera" size={WIDTH(20)} />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderWidth: 3,
    borderColor: colors.white,
  },
})
