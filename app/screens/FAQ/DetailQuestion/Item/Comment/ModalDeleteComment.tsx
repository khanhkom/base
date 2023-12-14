import { Modal, Pressable, ScrollView, StatusBar, StyleSheet, View } from "react-native"
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { HEIGHT, WIDTH, getHeight } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Button, Divider } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import * as Animatable from "react-native-animatable"

type Props = {
  onPress?: () => void
}

const ModalDeleteComment = forwardRef((props: Props, ref) => {
  const { onPress } = props
  const [visible, setVisible] = useState(false)

  const hide = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true)
    },
    hide() {
      hide()
    },
  }))
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        hide()
      }}
      transparent
      animationType="fade"
    >
      <StatusBar backgroundColor={colors.backdrop} />
      <Pressable style={styles.backdrop} onPress={hide} />
      <Animatable.View animation={"fadeInUp"} duration={500} style={styles.container}>
        <Button
          onPress={onPress}
          textColor={colors.red_6}
          mode="contained"
          style={styles.buttonDel}
        >
          Xóa bình luận
        </Button>
        <Button
          textColor={colors.primary}
          mode="contained"
          onPress={hide}
          style={styles.buttonExit}
        >
          Hủy
        </Button>
      </Animatable.View>
    </Modal>
  )
})
export default ModalDeleteComment
ModalDeleteComment.displayName = "ModalDeleteComment"

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.backdrop,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },

  buttonDel: {
    borderRadius: 12,
    width: WIDTH(343),
    marginBottom: HEIGHT(spacing.md),
    backgroundColor: colors.white,
  },
  buttonExit: {
    borderRadius: 12,
    width: WIDTH(343),
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    position: "absolute",
    bottom: HEIGHT(32),
    left: WIDTH(spacing.md),
  },
  spacing: { height: 100 },
})
