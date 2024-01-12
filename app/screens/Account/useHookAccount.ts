import { loginSocial } from "@app/services/api/functions/users"
import { showToastMessage } from "@app/utils/library"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useState } from "react"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"

const useHookAccount = () => {
  const [loading, setLoading] = useState(false)
  const linkAccountWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
      const userInfo = await GoogleSignin.signIn()
      console.log("userInfo", userInfo)
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
  const linkAccountWithFacebook = () => {
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
    // const resLogin = await loginSocial(body)
    setLoading(false)
    // const dataLogin = resLogin?.data
    // console.log("_hanldeLoginServer::", dataLogin)
  }
  return { linkAccountWithGoogle, linkAccountWithFacebook }
}
export default useHookAccount
