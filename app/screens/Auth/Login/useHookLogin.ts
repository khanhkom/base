import { translate } from "@app/i18n/translate"
import { navigate } from "@app/navigators/navigationUtilities"
import { updateUserField } from "@app/redux/actions"
import { getStringeeToken } from "@app/redux/actions/stringee"
import { api } from "@app/services/api"
import { getOtp, loginSocial } from "@app/services/api/functions/users"
import { EToastType, showToastMessage } from "@app/utils/library"
import { KEYSTORAGE, save } from "@app/utils/storage"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useState } from "react"
import { Keyboard } from "react-native"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"
import { useDispatch } from "react-redux"

const useHookLogin = (setCustomLoading?: (val: boolean) => void) => {
  const [indexTab, setIndexTab] = useState(0)
  const [otpMethod, setOTPMethod] = useState(0)
  const [countryCode, setCountryCode] = useState("+84")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isNewUser, setNewUser] = useState(false)

  const dispatch = useDispatch()

  const showModal = () => setVisible(true)

  const onSubmit = async () => {
    // showModal();
    Keyboard.dismiss()
    if (phoneNumber === "") {
      showToastMessage(translate("common.provide_complete_information"), EToastType.ERROR)
    } else {
      try {
        const body = {
          phone: countryCode + phoneNumber,
        }
        setLoading(true)
        setError(false)
        const resLogin = await getOtp(body)

        console.log("resLogin_resLogin", resLogin?.data)
        if (resLogin?.status === 201) {
          dispatch(
            updateUserField({
              phone: countryCode + phoneNumber,
            }),
          )
          const isRegisterTab = indexTab === 0
          setNewUser(resLogin?.data?.isNewUser)
          if (isRegisterTab) {
            if (resLogin?.data?.isNewUser) {
              navigate("VerifyOTP", {
                phone: countryCode + phoneNumber,
              })
            } else {
              showModal()
            }
          } else {
            if (resLogin?.data?.isNewUser) {
              showModal()
            } else {
              navigate("VerifyOTP", {
                phone: countryCode + phoneNumber,
              })
            }
          }
        } else {
          setError(true)
          showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
        }
        console.log("resLogin_resLogin", body, resLogin?.data)
        setLoading(false)
      } catch (error) {
        showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
        setError(true)
        setLoading(false)
      }
    }
  }
  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
      const userInfo = await GoogleSignin.signIn()
      setCustomLoading(false)
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
    setCustomLoading(true)
    const resLogin = await loginSocial(body)
    setCustomLoading(false)
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
      showToastMessage(translate("common.oops_error"), EToastType.ERROR)
    }
  }
  return {
    indexTab,
    setIndexTab,
    otpMethod,
    setOTPMethod,
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    loading,
    setLoading,
    error,
    visible,
    setVisible,
    isNewUser,
    onSubmit,
    loginWithGoogle,
    loginWithFacebook,
  }
}
export default useHookLogin