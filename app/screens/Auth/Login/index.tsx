import { Keyboard, Platform, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Screen } from "@app/components/Screen"
import HeaderLogin from "../Item/HeaderLogin"
import { HEIGHT, WIDTH, getHeight, getWidth } from "@app/config/functions"
import R from "@app/assets"
import { spacing } from "@app/theme/spacing"
import ButtonTab from "@app/components/ButtonTab"
import InputPhone from "../Item/InputPhone"
import colors from "@app/assets/colors"
import FooterLogin from "../Item/FooterLogin"
import PopupVerify from "../Item/PopupVerify"
import { Button } from "react-native-paper"
import { Text } from "@app/components/Text"
import { EToastType, showToastMessage } from "@app/utils/library"
import { getOtp, login } from "@app/services/api/functions/users"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { updateUserField } from "@app/redux/actions"
import { Toggle } from "@app/components/Toggle"
import ItemOTPMethod from "../Item/ItemOTPMethod"

export default function Login() {
  const [indexTab, setIndexTab] = useState(0)
  const [otpMethod, setOTPMethod] = useState(0)
  const [countryCode, setCountryCode] = useState("+84")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [visible, setVisible] = React.useState(false)
  const [isNewUser, setNewUser] = React.useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const dispatch = useDispatch()

  const onSubmit = async () => {
    // showModal()
    Keyboard.dismiss()
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
          if (indexTab === 0) {
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
    <Screen
      preset="auto"
      safeAreaEdges={["bottom"]}
      contentContainerStyle={Platform.OS === "ios" ? { height: getHeight() } : { flex: 1 }}
    >
      <HeaderLogin />
      <View style={styles.body}>
        <Text preset="xxxlsemibold">Chào mừng bạn,</Text>
        <View style={styles.tab}>
          <ButtonTab
            text="ĐĂNG KÝ"
            isActive={indexTab === 0}
            onPress={() => {
              setIndexTab(0)
            }}
          />
          <ButtonTab
            text="ĐĂNG NHẬP"
            isActive={indexTab === 1}
            onPress={() => {
              setIndexTab(1)
            }}
          />
        </View>
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
        <Text preset="baRegular" style={{ marginTop: HEIGHT(spacing.lg), color: colors.gray_7 }}>
          Bằng việc tiếp tục, bạn sẽ đồng ý với{" "}
          <Text preset="baSemibold" style={{ color: colors.primary }}>
            Điều khoản dịch vụ và Chính sách bảo mật
          </Text>{" "}
          của SDoctor
        </Text>
      </View>
      <FooterLogin setLoading={setLoading} />
      <PopupVerify
        visible={visible}
        setVisible={setVisible}
        isNewUser={isNewUser}
        phone={countryCode + phoneNumber}
      />
      {loading && <LoadingOpacity />}
    </Screen>
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
  tab: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: HEIGHT(spacing.sm),
  },
  buttonNext: {
    width: WIDTH(343),
    borderRadius: 8,
    marginTop: HEIGHT(spacing.lg),
    height: HEIGHT(spacing.xxl),
  },
})
