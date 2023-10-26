import { Platform, StyleSheet, View } from "react-native"
import React from "react"
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
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import ItemOTPMethod from "../Item/ItemOTPMethod"
import { translate } from "@app/i18n/translate"
import useHookLogin from "./useHookLogin"

export default function Login() {
  const {
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
  } = useHookLogin()

  return (
    <Screen
      preset="auto"
      safeAreaEdges={Platform.OS === "android" && ["bottom"]}
      contentContainerStyle={Platform.OS === "ios" ? { height: getHeight() } : styles.container}
    >
      <HeaderLogin />
      <View style={styles.body}>
        <Text preset="xxxlsemibold">{translate("auth.greetings_to_you")}</Text>
        <View style={styles.tab}>
          <ButtonTab
            text={translate("auth.login")}
            isActive={indexTab === 0}
            onPress={() => {
              setIndexTab(0)
            }}
          />
          <ButtonTab
            text={translate("auth.register")}
            isActive={indexTab === 1}
            onPress={() => {
              setIndexTab(1)
            }}
          />
        </View>
        <InputPhone
          phoneNumber={phoneNumber}
          setPhoneNumber={(number) => {
            setPhoneNumber(number.replace(/[^0-9]/g, ""))
          }}
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
          {translate("auth.continue")}
        </Button>
        <Text preset="baRegular" style={{ marginTop: HEIGHT(spacing.lg), color: colors.gray_7 }}>
          {translate("auth.by_proceeding")}
          <Text preset="baSemibold" style={{ color: colors.primary }}>
            {translate("auth.terms_of_service")}
          </Text>{" "}
          {translate("auth.of_sdoctor")}
        </Text>
      </View>
      <FooterLogin setLoading={setLoading} isRegister={indexTab === 1} />
      <PopupVerify
        visible={visible}
        setVisible={setVisible}
        isNewUser={isNewUser}
        phone={countryCode + phoneNumber.replace(/^0+/, "")}
      />
      {loading && <LoadingOpacity text=" " />}
    </Screen>
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
  container: { flex: 1 },
  tab: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: HEIGHT(spacing.sm),
  },
})
