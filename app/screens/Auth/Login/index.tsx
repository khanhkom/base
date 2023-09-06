import { StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Screen } from "@app/components/Screen"
import HeaderLogin from "../Item/HeaderLogin"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import R from "@app/assets"
import { TextPaper } from "@app/components/text-paper"
import { spacing } from "@app/theme/spacing"
import ButtonTab from "@app/components/ButtonTab"
import InputPhone from "../Item/InputPhone"
import colors from "@app/assets/colors"
import FooterLogin from "../Item/FooterLogin"
import PopupVerify from "../Item/PopupVerify"
import { Button } from "react-native-paper"
import { Text } from "@app/components/Text"

export default function Login() {
  const [indexTab, setIndexTab] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [visible, setVisible] = React.useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const onSubmit = () => {
    showModal()
  }
  return (
    <Screen preset="auto" safeAreaEdges={["bottom"]} contentContainerStyle={{ flex: 1 }}>
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
        <InputPhone phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        <Button
          mode="contained"
          style={styles.buttonNext}
          disabled={phoneNumber.length === 0}
          onPress={onSubmit}
        >
          Tiếp tục
        </Button>
        <Text preset="baRegular" style={{ marginTop: HEIGHT(spacing.lg) }}>
          Bằng việc tiếp tục, bạn sẽ đồng ý với{" "}
          <Text preset="baSemibold" style={{ color: colors.primary }}>
            Điều khoản dịch vụ và Chính sách bảo mật
          </Text>{" "}
          của SDoctor
        </Text>
      </View>
      <FooterLogin />
      <PopupVerify visible={visible} setVisible={setVisible} />
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
    marginTop: HEIGHT(spacing.md),
  },
})
