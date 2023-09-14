import { StyleSheet, View, Image, Pressable } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { IconButton } from "react-native-paper"
import R from "@app/assets"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

export default function FooterLogin() {
  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
      const userInfo = await GoogleSignin.signIn()

      console.log("1111111111", {
        token: userInfo ?? "",
      })
    } catch (error) {
      console.warn("error_error", error)
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      // Sentry.captureException(error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrapperLine}>
        <View style={styles.line} />
        <Text
          preset="baRegular"
          style={{ marginHorizontal: WIDTH(spacing.xs), color: colors.gray_7 }}
        >
          Hoặc đăng ký bằng
        </Text>
        <View style={styles.line} />
      </View>
      <View style={styles.flexRow}>
        <Pressable>
          <Image source={R.images.ic_face} style={styles.button} resizeMode="contain" />
        </Pressable>

        <Pressable onPress={loginWithGoogle}>
          <Image
            source={R.images.ic_google}
            style={[styles.button, { marginLeft: WIDTH(20) }]}
            resizeMode="contain"
          />
        </Pressable>
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
