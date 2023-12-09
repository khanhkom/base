import { translate } from "@app/i18n/translate"
import { navigate } from "@app/navigators/navigationUtilities"
import { updateUserField } from "@app/redux/actions"
import { getStringeeToken } from "@app/redux/actions/stringee"
import { api } from "@app/services/api"
import {
  checkUserFirebase,
  getOtp,
  getOtpLogin,
  getOtpRegister,
  loginSocial,
} from "@app/services/api/functions/users"
import { EToastType, showToastMessage } from "@app/utils/library"
import { KEYSTORAGE, save } from "@app/utils/storage"
import { validatePhoneNumber } from "@app/utils/validate"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useState } from "react"
import { Keyboard } from "react-native"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"
import { useDispatch } from "react-redux"
import DeviceInfo from "react-native-device-info"
import { TYPE_MESSAGE_LOGIN } from "@app/services/api/apiErrorMessage"
import auth from "@react-native-firebase/auth"
import { handleErrorOTPFirebase } from "@app/config/functions"

export const OTP_TYPE = {
  ZNS: 0,
  PHONE: 1,
}

const useHookLogin = (setCustomLoading?: (val: boolean) => void) => {
  const [indexTab, setIndexTab] = useState(0)
  const [otpMethod, setOTPMethod] = useState(OTP_TYPE.ZNS)
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
    const isValidNumber = validatePhoneNumber(phoneNumber)
    const isLogin = indexTab === 0
    Keyboard.dismiss()
    if (phoneNumber === "") {
      showToastMessage(translate("common.provide_complete_information"), EToastType.ERROR)
    } else if (!isValidNumber) {
      setError(true)
    } else {
      try {
        const result = phoneNumber.replace(/^0+/, "")
        const deviceId = await DeviceInfo.getUniqueId()
        setPhoneNumber(result)
        const body = {
          phone: countryCode + result,
          otpMethod: otpMethod === 0 ? "ZNS" : "PHONE",
          deviceId,
        }
        setLoading(true)
        setError(false)
        if (isLogin) {
          handleCaseLogin(body)
        } else {
          handleCaseRegister(body)
        }
      } catch (error) {
        showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
        setError(true)
        setLoading(false)
      }
    }
  }
  const handleCaseLogin = async (body: { phone: string; otpMethod: string; deviceId: string }) => {
    console.log("resLogin::::", isNewUser)
    let resLogin = null
    if (otpMethod === OTP_TYPE.ZNS) {
      resLogin = await getOtpLogin(body)
    } else {
      // resLogin = await getOtp(body)
      onLoginWithSMS()
      return
    }
    setLoading(false)
    //1. check if not exist in db
    if (resLogin?.status === 201) {
      navigate("VerifyOTP", {
        phone: body.phone,
        otpMethod,
        type: "LOGIN",
      })
    } else {
      if (resLogin?.status === 400) {
        setNewUser(true)
        showModal()
      } else {
        setError(true)
        showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
      }
    }
    console.log("resLogin_resLogin", resLogin)
  }
  const handleCaseRegister = async (body: {
    phone: string
    otpMethod: string
    deviceId: string
  }) => {
    console.log("resRegister::::", isNewUser)
    let resRegister = null
    if (otpMethod === OTP_TYPE.ZNS) {
      resRegister = await getOtpRegister(body)
    } else {
      // resRegister = await getOtp(body)
      onRegisterWithSMS()
      return
    }
    setLoading(false)
    //1. check if not exist in db
    if (resRegister?.status === 201) {
      navigate("VerifyOTP", {
        phone: body.phone,
        otpMethod,
        type: "REGISTER",
      })
    } else {
      // check error;
      const message = resRegister?.data?.message
      if (message === TYPE_MESSAGE_LOGIN.PHONE_EXIST) {
        setNewUser(false)
        showModal()
      } else if (message === TYPE_MESSAGE_LOGIN.ZALO_NOT_FOUND) {
        setError(true)
        showToastMessage("Tài khoản Zalo không tồn tại!", EToastType.ERROR)
      } else {
        setError(true)
        showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
      }
    }
    console.log("resRegister_resRegister:::", resRegister)
  }
  const onModalConfirm = async () => {
    setVisible(false)
    setIndexTab(indexTab ? 0 : 1)
    const result = phoneNumber.replace(/^0+/, "")
    const deviceId = await DeviceInfo.getUniqueId()
    setPhoneNumber(result)
    const body = {
      phone: countryCode + result,
      otpMethod: otpMethod === 0 ? "ZNS" : "PHONE",
      deviceId,
    }
    setLoading(true)
    setError(false)
    if (!isNewUser) {
      handleCaseLogin(body)
    } else {
      handleCaseRegister(body)
    }
  }
  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
      const userInfo = await GoogleSignin.signIn()
      console.log("userInfo", userInfo)
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
    console.log("_hanldeLoginServer::", dataLogin)
    const isNeedUpdatePhone = dataLogin?.isNeedUpdatePhone
    if (resLogin.data.accessToken) {
      if (resLogin.data.isNewUser || !resLogin.data?.isVerified) {
        api.apisauce.setHeader("access-token", resLogin.data.accessToken)
        navigate("VerifyPhoneNumber", { isNeedUpdatePhone })
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

  const onLoginWithSMS = async () => {
    try {
      const result = phoneNumber.replace(/^0+/, "")
      const body = {
        phone: countryCode + result,
      }
      const checkUserFi = await checkUserFirebase(body)
      if (!checkUserFi.data) {
        setError(true)
        showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
      } else {
        const confirmation = await auth().signInWithPhoneNumber(`${body.phone}`)
        console.log("confirmation_confirmation", confirmation)
        if (confirmation.verificationId) {
          navigate("VerifyOTP", {
            phone: body.phone,
            otpMethod,
            type: "LOGIN",
            confirmation,
          })
        } else {
          setError(true)
          showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
        }
        console.log("confirmation::", confirmation.verificationId)
      }
      setLoading(false)
    } catch (error) {
      handleErrorOTPFirebase(error)
      console.warn(error)
      setLoading(false)
    }
  }

  const onRegisterWithSMS = async () => {
    try {
      const result = phoneNumber.replace(/^0+/, "")
      const body = {
        phone: countryCode + result,
      }
      const checkUserFi = await checkUserFirebase(body)
      if (!checkUserFi.data) {
        setError(true)
        showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
      } else {
        const confirmation = await auth().signInWithPhoneNumber(`${body.phone}`)
        console.log("confirmation_confirmation", confirmation)
        if (confirmation.verificationId) {
          navigate("VerifyOTP", {
            phone: body.phone,
            otpMethod,
            type: "REGISTER",
            confirmation,
          })
        } else {
          setError(true)
          showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
        }
        console.log("confirmation::", confirmation.verificationId)
      }
      setLoading(false)
    } catch (error) {
      handleErrorOTPFirebase(error)
      console.warn(error)
      setLoading(false)
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
    onModalConfirm,
  }
}
export default useHookLogin
