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
      const body = {
        phone: phone,
        code: codeFinal,
        role: "patient",
      }
      let resOTP = await verifyOTP(body)
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
        showToastMessage("Sai mã đăng nhập", EToastType.ERROR)
      }
    } catch (error) {
      showToastMessage("Có lỗi xảy ra! Vui lòng thử lại", EToastType.ERROR)
      setError(true)
      setLoading(false)
      console.warn("_checkCode", error)
    }
  }
  const reSendCode = async () => {
    try {
      let body = {
        phone: phone,
      }
      setLoading(true)
      setCode("")
      const resLogin = await getOtp(body)
      setTime(30)
      if (resLogin?.status === 201) {
        showToastMessage("Gửi mã thành công!", EToastType.SUCCESS)
      } else {
        showToastMessage("Có lỗi xảy ra! Vui lòng thử lại", EToastType.ERROR)
      }
      setLoading(false)
    } catch (error) {
      showToastMessage("Có lỗi xảy ra! Vui lòng thử lại", EToastType.ERROR)
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
      <Text preset="xxxlsemibold">Xác thực OTP</Text>
      <Text preset="mdRegular" style={styles.textDes}>
        Vui lòng nhập mã xác thực được gửi tới số điện thoại <Text preset="mdMedium">{phone}</Text>
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
          Mã xác thực không chính xác, vui lòng nhập lại!
        </Text>
      )}

      <Text
        disabled={time > 0}
        onPress={reSendCode}
        preset="baMedium"
        style={{ marginTop: HEIGHT(40), color: colors.gray_7 }}
      >
        Gửi lại mã{" "}
        {time > 0 && (
          <Text>
            (
            <Text preset="baMedium" style={{ color: colors.main_7 }}>
              {time} giây
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  cellStyle: {
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  cellStyleFocused: {
    borderColor: colors.main_7,
    borderWidth: 1,
  },
  textDes: {
    textAlign: "center",
    marginTop: HEIGHT(spacing.md),
    marginBottom: HEIGHT(spacing.xxl),
  },
  textPin: {
    color: colors.main_6,
    fontWeight: "600",
    fontSize: 18,
  },
  dot_placeholder: {
    width: WIDTH(6),
    height: WIDTH(6),
    borderRadius: 25,
    opacity: 0.3,
    backgroundColor: colors.gray_5,
  },
})
