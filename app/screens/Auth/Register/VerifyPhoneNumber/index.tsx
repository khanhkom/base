import { StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { getOtp } from "@app/services/api/functions/users"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { EToastType, showToastMessage } from "@app/utils/library"
import { updateUserField } from "@app/redux/actions"
import InputPhone from "../../Item/InputPhone"
import { Button } from "react-native-paper"
import HeaderLogin from "../../Item/HeaderLogin"
import R from "@app/assets"
import ItemOTPMethod from "../../Item/ItemOTPMethod"
import { translate } from "@app/i18n/translate"
export default function VerifyPhoneNumber() {
  const [countryCode, setCountryCode] = useState("+84")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [otpMethod, setOTPMethod] = useState(0)
  const dispatch = useDispatch()
  const onSubmit = async () => {
    // showModal()
    if (phoneNumber === "") {
      showToastMessage(translate("common.provide_complete_information"), EToastType.ERROR)
    } else {
      try {
        const result = phoneNumber.replace(/^0+/, "")
        setPhoneNumber(result)
        const body = {
          phone: countryCode + result,
        }
        setLoading(true)
        setError(false)
        const resLogin = await getOtp(body)

        console.log("resLogin_resLogin", resLogin?.data)
        if (resLogin?.status === 201) {
          dispatch(
            updateUserField({
              phone: countryCode + result,
            }),
          )
          navigate("VerifyOTP", {
            phone: countryCode + result,
          })
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

  return (
    <View style={styles.container}>
      <HeaderLogin />
      <View style={styles.body}>
        <Text preset="xxxlsemibold">{translate("auth.greetings_to_you")}</Text>
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
