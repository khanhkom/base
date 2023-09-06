import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import React from "react"
import { Button, Modal } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"

export default function PopupVerify({ visible, setVisible }) {
  const hideModal = () => setVisible(false)
  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
      <Text
        style={{
          paddingHorizontal: WIDTH(spacing.md),
          marginTop: HEIGHT(spacing.md),
          textAlign: "center",
        }}
      >
        Số điện thoại <Text style={{ color: colors.black, fontWeight: "500" }}>0123456789</Text> đã
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
        <Button onPress={hideModal} mode="contained" style={styles.buttonRight}>
          Đăng nhập
        </Button>
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
})
