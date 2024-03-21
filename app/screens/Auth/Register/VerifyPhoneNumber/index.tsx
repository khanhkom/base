import { StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH, getWidth, handleErrorOTPFirebase } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { getOtp, getOtpSocial } from "@app/services/api/functions/users"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { EToastType, showToastMessage } from "@app/utils/library"
import { updateUserField } from "@app/redux/actions"
import InputPhone from "../../Item/InputPhone"
import { Button } from "react-native-paper"
import HeaderLogin from "../../Item/HeaderLogin"
import R from "@app/assets"
import ItemOTPMethod from "../../Item/ItemOTPMethod"
import { translate } from "@app/i18n/translate"
import { validatePhoneNumber } from "@app/utils/validate"
import DeviceInfo from "react-native-device-info"
import { OTP_TYPE } from "../../Login/useHookLogin"
import auth from "@react-native-firebase/auth"
interface IScreenParams {
  route: {
    params: {
      isNeedUpdatePhone: boolean
    }
  }
}
export default function VerifyPhoneNumber({ route }: IScreenParams) {
  const [countryCode, setCountryCode] = useState("+84")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [otpMethod, setOTPMethod] = useState(0)
  const dispatch = useDispatch()
  const { isNeedUpdatePhone } = route.params
  const onSubmit = async () => {
    // showModal()
    const isValidNumber = validatePhoneNumber(phoneNumber)
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
          deviceId,
          otpMethod: otpMethod === 0 ? "ZNS" : "PHONE",
        }
        setLoading(true)
        setError(false)
        let resLogin = null
        if (otpMethod === OTP_TYPE.ZNS) {
          resLogin = await getOtpSocial(body)
          console.log("resVerify_resVerify", resLogin?.data)
          if (resLogin?.status === 201) {
            dispatch(
              updateUserField({
                phone: countryCode + result,
              }),
            )
            navigate("VerifyOTP", {
              phone: countryCode + result,
              type: "SOCIAL",
              otpMethod,
              isNeedUpdatePhone,
            })
          } else {
            const message = resLogin?.data?.message
            setError(true)
            if (message === "Phone existed in system") {
              const msgError = "Số điện thoại đã được liên kết!"
              setErrorText(msgError)
              showToastMessage(msgError, EToastType.ERROR)
            } else if (resLogin?.data?.descriptions === "Zalo account not existed") {
              const msgError = "Tài khoản Zalo không tồn tại!"
              setErrorText(msgError)
              showToastMessage("Tài khoản Zalo không tồn tại!", EToastType.ERROR)
            } else {
              const msgError = translate("auth.verify_telephone_number_again")
              setErrorText(msgError)
              showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
            }
          }
        } else {
          // resLogin = await getOtp(body)
          const confirmation = await auth().signInWithPhoneNumber(`${body.phone}`)

          if (confirmation.verificationId) {
            navigate("VerifyOTP", {
              phone: body.phone,
              otpMethod,
              type: "LOGIN",
              confirmation,
              isNeedUpdatePhone,
            })
          } else {
            setError(true)
            showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
          }
        }

        console.log("resLogin_resLogin", body, resLogin?.data)
        setLoading(false)
      } catch (error) {
        // showToastMessage(translate("auth.verify_telephone_number_again"), EToastType.ERROR)
        handleErrorOTPFirebase(error)

        setError(true)
        setLoading(false)
      }
    }
  }

  return (
    <View style={styles.container}>
      <HeaderLogin />
      <View style={styles.body}>
        <Text preset="xxxlsemibold">{translate("auth.greetings_to_you")}</Text>
        <InputPhone
          phoneNumber={phoneNumber}
          setPhoneNumber={(number) => {
            setPhoneNumber(number.replace(/[^0-9]/g, ""))
          }}
          setCountryCode={setCountryCode}
          countryCode={countryCode}
          error={error}
          autoFocus
          textError={errorText}
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
          {translate("common.continue")}
        </Button>
      </View>

      {loading && <LoadingOpacity />}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: R.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    marginTop: -HEIGHT(80),
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(20),
    width: getWidth(),
  },
  buttonNext: {
    borderRadius: 8,
    marginTop: HEIGHT(spacing.lg),
    width: WIDTH(343),
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
  },
})
