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

export default function VerifyOTP() {
  const pinInput = useRef(null)
  const [code, setCode] = useState("")
  const [time, setTime] = useState(30)
  const _checkCode = () => {
    console.log("CODE_", code)
    navigate("ConfirmName")
  }
  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      // this will be executed every 200 ms
      // even when app is the the background
      setTime((val) => val - 1)
    }, 1000)
    console.log("ZOOO", time)
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
        Vui lòng nhập mã xác thực được gửi tới số điện thoại{" "}
        <Text preset="mdMedium">0123456789</Text>
      </Text>
      <SmoothPinCodeInput
        ref={pinInput}
        mask="﹡"
        placeholder="•"
        value={code}
        onTextChange={(code) => setCode(code)}
        onFulfill={_checkCode}
        cellSize={WIDTH(48)}
        codeLength={6}
        cellStyle={styles.cellStyle}
        cellStyleFocused={styles.cellStyleFocused}
      />
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
      <Text preset="baMedium" style={{ marginTop: HEIGHT(40), color: colors.gray_7 }}>
        Gửi lại mã (
        <Text preset="baMedium" style={{ color: colors.main_7 }}>
          {time} giây
        </Text>
        )
      </Text>
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
  pinCode: {
    marginTop: HEIGHT(spacing.xxl),
  },
})
