import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import React from "react"
import { Button, Modal } from "react-native-paper"
import { HEIGHT, WIDTH, getHeight, getWidth } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { navigate } from "@app/navigators/navigationUtilities"
import { translate } from "@app/i18n/translate"
interface ItemProps {
  visible: boolean
  setVisible: (val: boolean) => void
  isNewUser: boolean
  phone: string
}
export default function PopupVerify({ visible, setVisible, isNewUser, phone }: ItemProps) {
  const hideModal = () => setVisible(false)
  return (
    <Modal visible={visible} onDismiss={hideModal}>
      <TouchableOpacity onPress={hideModal} style={styles.touch_group} />
      <View style={styles.containerStyle}>
        <Text style={styles.textTitle}>
          {translate("common.phonenumber")} <Text style={styles.textPhone}>{phone}</Text>{" "}
          {isNewUser ? translate("common.not") : translate("common.has")}{" "}
          {translate("auth.exists_in_our_system")}
        </Text>
        <View style={styles.bottomView}>
          <Button
            onPress={hideModal}
            mode="contained"
            style={styles.buttonLeft}
            textColor={colors.black}
          >
            {translate("common.close")}
          </Button>
          <Button
            onPress={() => {
              hideModal()
              navigate("VerifyOTP", { phone })
            }}
            mode="contained"
            style={styles.buttonRight}
          >
            {isNewUser ? translate("auth.register_now") : translate("auth.log_in_now")}
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bottomView: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: HEIGHT(spacing.lg),
    width: WIDTH(343),
  },
  buttonLeft: {
    backgroundColor: colors.gray_1,
    borderBottomLeftRadius: 16,
    borderRadius: 0,
    flex: 1,
  },
  buttonRight: { borderBottomRightRadius: 16, borderRadius: 0, flex: 1 },
  containerStyle: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginLeft: WIDTH(spacing.md),
    width: WIDTH(343),
  },
  textPhone: { color: colors.black, fontWeight: "500" },
  textTitle: {
    marginTop: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    textAlign: "center",
  },
  touch_group: {
    backgroundColor: colors.gray_9,
    height: getHeight(),
    opacity: 0.75,
    position: "absolute",
    width: getWidth(),
  },
})
