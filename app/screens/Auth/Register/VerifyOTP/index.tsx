import { StyleSheet, View } from "react-native"
import React, { useRef, useState, useEffect } from "react"
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import { Header } from "@app/components/Header"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import BackgroundTimer from "react-native-background-timer"
import { navigate } from "@app/navigators/navigationUtilities"
import { api } from "@app/services/api"
import { KEYSTORAGE, save } from "@app/utils/storage"
import { getStringeeToken } from "@app/redux/actions/stringee"
import { useDispatch } from "react-redux"
import { getOtp, verifyOTP } from "@app/services/api/functions/users"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { EToastType, showToastMessage } from "@app/utils/library"
import messaging from "@react-native-firebase/messaging"
import { translate } from "@app/i18n/translate"
interface ScreenProps {
  route: {
    params: {
      phone: string
    }
  }
}
export default function VerifyOTP({ route }: ScreenProps) {
  const phone = route?.params?.phone
  const pinInput = useRef(null)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [time, setTime] = useState(30)
  const dispatch = useDispatch()
  const _checkCode = async (codeFinal) => {
    try {
      setLoading(true)
      const tokenFi = await messaging().getToken()

      const body = {
        phone,
        code: codeFinal,
        fcmToken: tokenFi,
      }
      const resOTP = await verifyOTP(body)
      console.log("body", body)
      const dataLogin = resOTP?.data
      setLoading(false)
      if (resOTP?.data?.accessToken) {
        api.apisauce.setHeader("access-token", dataLogin?.accessToken)
        save(KEYSTORAGE.LOGIN_DATA, dataLogin)
        dispatch(getStringeeToken())
        if (dataLogin?.isNewUser) {
          navigate("ConfirmName")
        } else {
          navigate("TabNavigator")
        }
      } else {
        setError(true)
        showToastMessage(translate("otp.incorrect_login_code"), EToastType.ERROR)
      }
    } catch (error) {
      showToastMessage(translate("otp.code_sent_successfully"), EToastType.ERROR)
      setError(true)
      setLoading(false)
      console.warn("_checkCode", error)
    }
  }
  const reSendCode = async () => {
    try {
      const body = {
        phone,
      }
      setLoading(true)
      setCode("")
      const resLogin = await getOtp(body)
      setTime(30)
      if (resLogin?.status === 201) {
        showToastMessage(translate("otp.code_sent_successfully"), EToastType.SUCCESS)
      } else {
        showToastMessage(translate("common.oops_error"), EToastType.ERROR)
      }
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
        // placeholder="•"
        placeholder={<View style={styles.dot_placeholder} />}
        value={code}
        onTextChange={(code) => setCode(code)}
        onFulfill={(code) => _checkCode(code)}
        cellSize={WIDTH(48)}
        codeLength={6}
        cellStyle={styles.cellStyle}
        textStyle={styles.textPin}
        cellStyleFocused={styles.cellStyleFocused}
      />
      {error && (
        <Text
          preset="smRegular"
          style={{
            color: colors.red_5,
            marginTop: HEIGHT(spacing.sm),
            marginBottom: -HEIGHT(spacing.md),
          }}
        >
          {translate("otp.incorrectCode")}
        </Text>
      )}

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
})
