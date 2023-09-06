import { StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { IconButton } from "react-native-paper"
import R from "@app/assets"
import colors from "@app/assets/colors"

export default function FooterLogin() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperLine}>
        <View style={styles.line} />
        <Text style={{ marginHorizontal: WIDTH(spacing.xs) }}>Hoặc đăng ký bằng</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.flexRow}>
        <Image source={R.images.ic_face} style={styles.button} resizeMode="contain" />
        <Image
          source={R.images.ic_google}
          style={[styles.button, { marginLeft: WIDTH(20) }]}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: HEIGHT(spacing.lg),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: WIDTH(spacing.lg),
  },
  line: {
    flex: 1,
    backgroundColor: colors.gray_3,
    height: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: HEIGHT(20),
  },
  button: {
    height: WIDTH(40),
    width: WIDTH(40),
  },
})
