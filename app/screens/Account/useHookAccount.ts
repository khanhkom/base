import { getMyProfile } from "@app/redux/actions"
import { useSelector } from "@app/redux/reducers"
import { deleteOAuth, loginSocial, updateOAuth } from "@app/services/api/functions/users"
import { EToastType, showToastMessage } from "@app/utils/library"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useState } from "react"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"
import { useDispatch } from "react-redux"

const useHookAccount = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducers.user)
  const isLinkedGoogle = !!user?.gmail
  const isLinkedFacebook = !!user?.fbId

  const linkAccountWithGoogle = async () => {
    try {
      if (!isLinkedGoogle) {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        })
        const userInfo = await GoogleSignin.signIn()
        console.log("userInfo", userInfo)
        setLoading(false)
        _handleLinkAccountApi({
          token: userInfo.serverAuthCode,
          base: "google",
        })
      } else {
        _handleUnLinkAccountApi({ base: "google" })
      }
    } catch (error) {
      console.warn("error_error", error)
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      // Sentry.captureException(error)
    }
  }
  const linkAccountWithFacebook = () => {
    if (!isLinkedFacebook) {
      LoginManager.logInWithPermissions(["public_profile"])
        .then(
          (result) => {
            if (result.isCancelled) {
              console.log("isCancelled")
            } else {
              AccessToken.getCurrentAccessToken().then(async (data) => {
                console.log("data_facebook", data)
                _handleLinkAccountApi({
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
    } else {
      _handleUnLinkAccountApi({ base: "facebook" })
    }
  }

  const _handleLinkAccountApi = async (body) => {
    try {
      setLoading(true)
      const resLink = await updateOAuth(body)
      setLoading(false)
      const dataLinked = resLink?.data
      if (resLink?.status === 200) {
        showToastMessage("Liên kết thành công", EToastType.SUCCESS)
        dispatch(getMyProfile())
      } else {
        showToastMessage("Liên kết thất bại", EToastType.ERROR)
      }
      console.log("_handleLinkAccountApi::", dataLinked)
    } catch (error) {
      setLoading(false)
      showToastMessage("Liên kết thất bại", EToastType.ERROR)
    }
  }

  const _handleUnLinkAccountApi = async (body) => {
    try {
      setLoading(true)
      const resLink = await deleteOAuth(body)
      console.log("resLink::", resLink)
      setLoading(false)
      if (resLink?.status === 200) {
        showToastMessage("Hủy liên kết thành công", EToastType.SUCCESS)
        dispatch(getMyProfile())
      } else {
        showToastMessage("Hủy liên kết thất bại", EToastType.ERROR)
      }
    } catch (error) {
      setLoading(false)
      showToastMessage("Hủy liên kết thất bại", EToastType.ERROR)
    }
  }
  return { linkAccountWithGoogle, linkAccountWithFacebook }
}
export default useHookAccount
