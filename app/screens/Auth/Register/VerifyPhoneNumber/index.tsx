import { StyleSheet, View } from "react-native"
import React, { useRef, useState, useEffect } from "react"
import { Header } from "@app/components/Header"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { getOtp, verifyOTP } from "@app/services/api/functions/users"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { EToastType, showToastMessage } from "@app/utils/library"
import { updateUserField } from "@app/redux/actions"
import InputPhone from "../../Item/InputPhone"
import { Button } from "react-native-paper"
import HeaderLogin from "../../Item/HeaderLogin"
import R from "@app/assets"
import ItemOTPMethod from "../../Item/ItemOTPMethod"
export default function VerifyPhoneNumber() {
  const [countryCode, setCountryCode] = useState("+84")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isNewUser, setNewUser] = React.useState(false)
  const [otpMethod, setOTPMethod] = useState(0)
  const dispatch = useDispatch()
  const onSubmit = async () => {
    // showModal()
    if (phoneNumber === "") {
      showToastMessage("Vui lòng nhập đủ thông tin!", EToastType.ERROR)
    } else {
      try {
        let body = {
          phone: countryCode + phoneNumber,
        }
        setLoading(true)
        setError(false)
        let resLogin = await getOtp(body)

        console.log("resLogin_resLogin", resLogin?.data)
        if (resLogin?.status === 201) {
          dispatch(
            updateUserField({
              phone: countryCode + phoneNumber,
            }),
          )
          setNewUser(resLogin?.data?.isNewUser)
          navigate("VerifyOTP", {
            phone: countryCode + phoneNumber,
          })
        } else {
          setError(true)
          showToastMessage("Vui lòng kiểm tra lại số điện thoại!", EToastType.ERROR)
        }
        console.log("resLogin_resLogin", body, resLogin?.data)
        setLoading(false)
      } catch (error) {
        showToastMessage("Vui lòng kiểm tra lại số điện thoại!", EToastType.ERROR)
        setError(true)
        setLoading(false)
      }
    }
  }

  return (
    <View style={styles.container}>
      <HeaderLogin />
      <View style={styles.body}>
        <Text preset="xxxlsemibold">Chào mừng bạn,</Text>
        <InputPhone
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setCountryCode={setCountryCode}
          countryCode={countryCode}
          error={error}
        />
        <ItemOTPMethod setOTPMethod={setOTPMethod} otpMethod={otpMethod} />

        <Button
          mode="contained"
          style={styles.buttonNext}
          labelStyle={{ color: colors.white }}
          disabled={phoneNumber.length === 0}
          buttonColor={colors.primary_8}
          onPress={onSubmit}
        >
          Tiếp tục
        </Button>
      </View>

      {loading && <LoadingOpacity />}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    width: getWidth(),
    flex: 1,
    marginTop: -HEIGHT(80),
    backgroundColor: R.colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(20),
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  buttonNext: {
    width: WIDTH(343),
    borderRadius: 8,
    marginTop: HEIGHT(spacing.lg),
    position: "absolute",
    bottom: HEIGHT(spacing.md),
    left: WIDTH(spacing.md),
  },
})
