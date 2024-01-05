import { StyleSheet, View } from "react-native"
import React, { useRef, useState, useEffect } from "react"
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import { Header } from "@app/components/Header"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH, convertDuration, handleErrorOTPFirebase } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import BackgroundTimer from "react-native-background-timer"
import { navigate, resetRoot } from "@app/navigators/navigationUtilities"
import { api } from "@app/services/api"
import { KEYSTORAGE, save } from "@app/utils/storage"
import { getStringeeToken } from "@app/redux/actions/stringee"
import { useDispatch } from "react-redux"
import {
  createSessionWithFirebase,
  getOtpLogin,
  getOtpRegister,
  getOtpSocial,
  updatePhoneSocial,
  verifyOTPLogin,
  verifyOTPRegister,
  verifyOTPSocial,
} from "@app/services/api/functions/users"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { EToastType, showToastMessage } from "@app/utils/library"
import messaging from "@react-native-firebase/messaging"
import { translate } from "@app/i18n/translate"

import { getHash, startOtpListener, removeListener } from "react-native-otp-verify"
import DeviceInfo from "react-native-device-info"
import { OTP_TYPE } from "../../Login/useHookLogin"
import auth from "@react-native-firebase/auth"

interface ScreenProps {
  route: {
    params: {
      phone: string
      otpMethod: number
      type: "REGISTER" | "LOGIN" | "SOCIAL"
      confirmation?: any
      isNeedUpdatePhone?: any
    }
  }
}
export default function VerifyOTP({ route }: ScreenProps) {
  const phone = route?.params?.phone
  const otpMethod = route?.params?.otpMethod
  const type = route?.params?.type
  const confirmation = route?.params?.confirmation
  const isNeedUpdatePhone = route?.params?.isNeedUpdatePhone
  const pinInput = useRef(null)
  const [code, setCode] = useState("")
  const [resend, setResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [time, setTime] = useState(30)
  const [isBlock, setBlock] = useState(false)
  const [releaseIn, setrReleaseIn] = useState(0)
  const [confirm, setConfirm] = useState(null)
  const userFi = useRef(null)
  const dispatch = useDispatch()
  const tokenFi = useRef("")
  useEffect(() => {
    async function getTokenFi() {
      try {
        const token = await messaging().getToken()
        tokenFi.current = token
      } catch (error) {
        console.warn(error)
      }
    }
    getTokenFi()
  }, [])
  // using methods
  useEffect(() => {
    getHash()
      .then((hash) => {
        console.log("HASHHHHHHHHHH", hash)
        // use this hash in the message.
      })
      .catch(console.log)

    startOtpListener((message) => {
      console.log("message_message", message)
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otp = /(\d{6})/g.exec(message)?.[1]
      setCode(otp)
      _checkCode(otp, true)
      console.log("otp_otp", otp)
    })
    return () => removeListener()
  }, [])
  async function onAuthStateChanged(user) {
    console.log("user_user", user)
    if (user && user?.phoneNumber === phone) {
      userFi.current = user
      const idToken = await auth().currentUser.getIdToken(true)
      const resOTP = await createSessionWithFirebase({
        phone,
        idtoken: idToken,
        fcmToken: tokenFi.current,
      })
      if (isNeedUpdatePhone) {
        await updatePhoneSocial({
          phone,
          idtoken: idToken,
        })
      }
      console.log("resOTP_resOTP", resOTP, idToken)
      handleUiUpdate(resOTP)
      setLoading(false)
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])
  console.log("userFi::", userFi)
  // Function to handle API call verify OTP
  async function handleAPICall(codeFinal, isAuto) {
    try {
      setLoading(true)
      const deviceId = await DeviceInfo.getUniqueId()
      const body = {
        phone,
        otp: codeFinal,
        deviceId,
      }

      if (tokenFi.current !== "") {
        Object.assign(body, {
          fcmToken: tokenFi.current,
        })
      }

      let resOTP = null

      if (otpMethod === OTP_TYPE.ZNS) {
        switch (type) {
          case "LOGIN":
            resOTP = await verifyOTPLogin(body)
            break
          case "REGISTER":
            resOTP = await verifyOTPRegister(body)
            break
          case "SOCIAL":
            resOTP = await verifyOTPSocial(body)
            break
          default:
            break
        }
        console.log("resOTP_resOTP", type, resOTP)
        handleUiUpdate(resOTP)
      } else {
        // if OTP type === firebase
        const newBody = {
          phone,
          code: codeFinal,
        }

        if (tokenFi.current !== "") {
          Object.assign(newBody, {
            fcmToken: tokenFi.current,
          })
        }

        if (
          !(
            (userFi?.current !== null &&
              userFi?.current?.phoneNumber &&
              userFi?.current?.phoneNumber !== phone) ||
            isAuto
          )
        ) {
          console.log("ZO_CONFIRM")
          if (resend) {
            resOTP = await confirm.confirm(codeFinal)
          } else {
            resOTP = await confirmation.confirm(codeFinal)
          }
          const idToken = await auth().currentUser.getIdToken(true)
          resOTP = await createSessionWithFirebase({
            phone,
            idtoken: idToken,
            fcmToken: tokenFi.current,
          })

          if (isNeedUpdatePhone) {
            await updatePhoneSocial({
              phone,
              idtoken: idToken,
            })
          }
        } else {
          return
        }
      }
    } catch (error) {
      handleErrorOTPFirebase(error)
      setLoading(false)
      console.log("Error:", error)
    }
  }

  // Function to handle UI updates and navigation
  async function handleUiUpdate(resOTP) {
    setLoading(false)
    const dataLogin = resOTP?.data
    // if verify code success
    if (resOTP?.data?.accessToken) {
      api.apisauce.setHeader("access-token", dataLogin?.accessToken)
      save(KEYSTORAGE.LOGIN_DATA, dataLogin)
      dispatch(getStringeeToken())

      // if (dataLogin?.isNewUser) {
      if (type === "REGISTER") {
        // navigate("ConfirmName")
        resetRoot({
          index: 0,
          routes: [{ name: "ConfirmName" }],
        })
      } else {
        resetRoot({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        })
        // navigate("TabNavigator")
      }
    } else {
      setCode("")

      if (resOTP?.status === 429) {
        setError(true)
        setBlock(true)
        if (releaseIn === 0) {
          handleBlockOTP(resOTP?.data?.releaseIn)
        }
        showToastMessage("Bạn đã nhập sai quá nhiều lần!", EToastType.ERROR)
        console.log("resOTP_resOTP", resOTP?.data)
      } else {
        setError(true)
        showToastMessage(translate("otp.incorrect_login_code"), EToastType.ERROR)
      }
    }
  }

  // Usage:
  const _checkCode = async (codeFinal, isAuto) => {
    await handleAPICall(codeFinal, isAuto)
  }

  const reSendCode = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId()
      const body = {
        phone,
        otpMethod: otpMethod === 0 ? "ZNS" : "PHONE",
        deviceId,
      }
      setLoading(true)
      setCode("")
      let resLogin = null
      if (otpMethod !== 0) {
        const confirmation = await auth().signInWithPhoneNumber(`${body.phone}`)
        setConfirm(confirmation)
        setResend(true)
        if (confirmation?.verificationId) {
          showToastMessage(translate("otp.code_sent_successfully"), EToastType.SUCCESS)
        } else {
          showToastMessage(translate("common.oops_error"), EToastType.ERROR)
        }
        // resLogin = await getOtp(body)
      } else {
        switch (type) {
          case "LOGIN":
            resLogin = await getOtpLogin(body)
            break
          case "REGISTER":
            resLogin = await getOtpRegister(body)
            break
          case "SOCIAL":
            resLogin = await getOtpSocial(body)
            break
          default:
            break
        }
        if (resLogin?.status === 201) {
          showToastMessage(translate("otp.code_sent_successfully"), EToastType.SUCCESS)
        } else {
          showToastMessage(translate("common.oops_error"), EToastType.ERROR)
        }
      }
      // console.log("resLogin", resLogin)
      setTime(30)

      setLoading(false)
    } catch (error) {
      showToastMessage(translate("common.oops_error"), EToastType.ERROR)
      setLoading(false)
    }
  }
  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      // this will be executed every 200 ms
      // even when app is the the background
      setTime((val) => val - 1)
    }, 1000)
    if (time === 0) {
      BackgroundTimer.clearInterval(intervalId)
    }
    return () => BackgroundTimer.clearInterval(intervalId)
  }, [time])
  const handleBlockOTP = (timeBlockLeft) => {
    setrReleaseIn(timeBlockLeft)
    const intervalId = BackgroundTimer.setInterval(() => {
      // this will be executed every 200 ms
      // even when app is the the background
      setrReleaseIn((val) => val - 1000)
    }, 1000)
    if (time === 0) {
      BackgroundTimer.clearInterval(intervalId)
    }
  }
  const timeBlockConvert = convertDuration(releaseIn)
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" backgroundColor={colors.white} />
      <Text preset="xxxlsemibold">{translate("otp.otpVerificationTitle")}</Text>
      <Text preset="mdRegular" style={styles.textDes}>
        {translate("otp.enterOtpCode")} <Text preset="mdMedium">{phone}</Text>
      </Text>
      <SmoothPinCodeInput
        autoFocus
        ref={pinInput}
        mask="﹡"
        placeholder={<View style={styles.dot_placeholder} />}
        value={code}
        onTextChange={(code) => {
          console.log("error", error)
          setCode(code)
        }}
        onFulfill={(code) => _checkCode(code, false)}
        cellSize={WIDTH(48)}
        codeLength={6}
        cellStyle={styles.cellStyle}
        textStyle={styles.textPin}
        cellStyleFocused={styles.cellStyleFocused}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
      />
      {error && (
        <Text preset="smRegular" style={styles.textError}>
          {isBlock
            ? `Bạn đã nhập sai quá nhiều lần, thử lại sau ${timeBlockConvert.min} phút ${timeBlockConvert?.sed} giây`
            : translate("otp.incorrectCode")}
        </Text>
      )}
      {!isBlock && (
        <Text
          disabled={time > 0}
          onPress={reSendCode}
          preset="baMedium"
          style={{ marginTop: HEIGHT(40), color: colors.gray_7 }}
        >
          {translate("otp.resendCode")}{" "}
          {time > 0 && (
            <Text>
              (
              <Text preset="baMedium" style={{ color: colors.main_7 }}>
                {time} {translate("common.second")}
              </Text>
              )
            </Text>
          )}
        </Text>
      )}

      {loading && <LoadingOpacity />}
    </View>
  )
}

const styles = StyleSheet.create({
  cellStyle: {
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  cellStyleFocused: {
    borderColor: colors.main_7,
    borderWidth: 1,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
  },
  dot_placeholder: {
    backgroundColor: colors.gray_5,
    borderRadius: 25,
    height: WIDTH(6),
    opacity: 0.3,
    width: WIDTH(6),
  },
  textDes: {
    marginBottom: HEIGHT(spacing.xxl),
    marginTop: HEIGHT(spacing.md),
    textAlign: "center",
  },
  textPin: {
    color: colors.main_6,
    fontSize: 18,
    fontWeight: "600",
  },
  textError: {
    color: colors.red_5,
    marginTop: HEIGHT(spacing.sm),
    marginBottom: -HEIGHT(spacing.md),
    textAlign: "center",
  },
})
