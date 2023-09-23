import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import React from "react"
import { Button, Modal } from "react-native-paper"
import { HEIGHT, WIDTH, getHeight, getWidth } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { navigate } from "@app/navigators/navigationUtilities"
interface ItemProps {
  visible: boolean
  setVisible: () => void
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
          Số điện thoại <Text style={styles.textPhone}>{phone}</Text> {isNewUser ? "chưa" : "đã"}{" "}
          tồn tại trong hệ thống của chúng tôi!
        </Text>
        <View style={styles.bottomView}>
          <Button
            onPress={hideModal}
            mode="contained"
            style={styles.buttonLeft}
            textColor={colors.black}
          >
            Đóng
          </Button>
          <Button
            onPress={() => {
              hideModal()
              navigate("VerifyOTP", { phone })
            }}
            mode="contained"
            style={styles.buttonRight}
          >
            {isNewUser ? "Đăng ký ngay" : "Đăng nhập ngay"}
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    width: WIDTH(343),
    marginLeft: WIDTH(spacing.md),
    borderRadius: 16,
  },
  textTitle: {
    paddingHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.md),
    textAlign: "center",
  },
  textPhone: { color: colors.black, fontWeight: "500" },
  buttonLeft: {
    flex: 1,
    borderRadius: 0,
    borderBottomLeftRadius: 16,
    backgroundColor: colors.gray_1,
  },
  buttonRight: { flex: 1, borderRadius: 0, borderBottomRightRadius: 16 },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH(343),
    marginTop: HEIGHT(spacing.lg),
  },
  touch_group: {
    position: "absolute",
    width: getWidth(),
    height: getHeight(),
    opacity: 0.75,
    backgroundColor: colors.gray_9,
  },
})
