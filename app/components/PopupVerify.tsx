import { StyleSheet, View } from "react-native"
import React from "react"
import { Button, Modal } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { Text } from "./Text"
interface ItemProps {
  visible: boolean
  setVisible: (val: boolean) => void
  title?: string
  desc?: string
  leftText?: string
  rightText?: string
  onRightPress: () => void
  onLeftPress: () => void
}
export default function PopupVerify({
  visible,
  setVisible,
  desc,
  title,
  leftText,
  rightText,
  onRightPress,
  onLeftPress,
}: ItemProps) {
  const hideModal = () => setVisible(false)
  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
      <Text style={styles.title} size="xxl" weight="semiBold">
        {title}
      </Text>
      <Text weight="normal" size="ba" style={styles.textTitle}>
        {desc}
      </Text>
      <View style={styles.bottomView}>
        <Button
          onPress={hideModal}
          mode="contained"
          style={styles.buttonLeft}
          textColor={colors.black}
        >
          {leftText || "Đóng"}
        </Button>
        <Button onPress={onRightPress} mode="contained" style={styles.buttonRight}>
          {rightText || "OK"}
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
  title: {
    marginTop: HEIGHT(spacing.md),
    color: colors.gray_9,
    textAlign: "center",
  },
  textTitle: {
    paddingHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.xs),
    textAlign: "center",
    color: colors.gray_7,
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
})
