import { StyleSheet, View, Image, Pressable } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { translate } from "@app/i18n/translate"
import useHookLogin from "../Login/useHookLogin"

export default function FooterLogin({ setLoading }) {
  const { loginWithGoogle, loginWithFacebook } = useHookLogin(setLoading)

  return (
    <View style={styles.container}>
      <View style={styles.wrapperLine}>
        <View style={styles.line} />
        <Text
          preset="baRegular"
          style={{ marginHorizontal: WIDTH(spacing.xs), color: colors.gray_7 }}
        >
          {translate("auth.or_register_by")}
        </Text>
        <View style={styles.line} />
      </View>
      <View style={styles.flexRow}>
        <Pressable onPress={loginWithFacebook}>
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
  button: {
    height: WIDTH(40),
    width: WIDTH(40),
  },
  container: {
    alignItems: "center",
    bottom: HEIGHT(spacing.lg),
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: HEIGHT(20),
  },
  line: {
    backgroundColor: colors.gray_3,
    flex: 1,
    height: 1,
  },
  wrapperLine: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: WIDTH(spacing.lg),
  },
})
