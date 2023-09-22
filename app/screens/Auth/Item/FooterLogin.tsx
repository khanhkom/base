import { StyleSheet, View, Image, Pressable } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"
import { loginSocial } from "@app/services/api/functions/users"
import { api } from "@app/services/api"
import { navigate } from "@app/navigators/navigationUtilities"
import { EToastType, showToastMessage } from "@app/utils/library"
import { KEYSTORAGE, save } from "@app/utils/storage"
import { getStringeeToken } from "@app/redux/actions/stringee"
import { useDispatch } from "react-redux"

export default function FooterLogin({ setLoading }) {
  const dispatch = useDispatch()
  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
      const userInfo = await GoogleSignin.signIn()
      setLoading(false)
      _hanldeLoginServer({
        token: userInfo.serverAuthCode,
        base: "google",
      })
    } catch (error) {
      console.warn("error_error", error)
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      // Sentry.captureException(error)
    }
  }
  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile"])
      .then(
        (result) => {
          if (result.isCancelled) {
            console.log("isCancelled")
          } else {
            AccessToken.getCurrentAccessToken().then(async (data) => {
              console.log("data_facebook", data)
              _hanldeLoginServer({
                token: data.accessToken,
                base: "facebook",
              })
            })
          }
        },
        function (error: string) {
          // Sentry.captureException(error)
          console.log("error_error", error)
        },
      )
      .catch((error) => {
        console.log("error_error", error)
        // Sentry.captureException(error)
      })
  }
  const _hanldeLoginServer = async (body) => {
    setLoading(true)
    let resLogin = await loginSocial(body)
    setLoading(false)
    const dataLogin = resLogin?.data
    console.log("resLogin_resLogin", resLogin)
    if (resLogin.data.accessToken) {
      if (resLogin.data.isNewUser) {
        api.apisauce.setHeader("access-token", resLogin.data.accessToken)
        navigate("VerifyPhoneNumber")
      } else {
        api.apisauce.setHeader("access-token", dataLogin?.accessToken)
        save(KEYSTORAGE.LOGIN_DATA, dataLogin)
        dispatch(getStringeeToken())
        navigate("TabNavigator")
      }
    } else {
      showToastMessage("Có lỗi xảy ra! Vui lòng thử lại", EToastType.ERROR)
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
