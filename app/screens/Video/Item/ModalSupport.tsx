import React, { forwardRef, useImperativeHandle, useState } from "react"
import {
  StyleSheet,
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native"
import { WIDTH, HEIGHT, getWidth } from "@app/config/functions"

import { Divider, List } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import R from "@app/assets"
type Props = {
  onPress: (index: number) => void
}

const ModalSupport = forwardRef((props: Props, _ref) => {
  const [visible, setVisible] = useState(false)
  useImperativeHandle(_ref, () => ({
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
  }))
  const hide = () => {
    console.log("press")
    setVisible(false)
  }
  return (
    <Modal transparent visible={visible} onDismiss={hide} animationType="fade">
      <StatusBar backgroundColor={colors.backdrop} />
      <View style={styles.wrapperModal}>
        <TouchableOpacity
          style={[styles.background, { backgroundColor: colors.backdrop }]}
          activeOpacity={1}
          onPress={hide}
        />
        <View style={styles.viewContai}>
          <View style={styles.wraperItem}>
            <List.Item
              onPress={() => {
                hide()
                props?.onPress(0)
              }}
              title={() => {
                return (
                  <Text size="md" weight="normal" style={{ color: colors.gray_9 }}>
                    Hỗ trợ khách hàng
                  </Text>
                )
              }}
              left={() => {
                return <Icon icon="ic_chat_support" size={WIDTH(24)} />
              }}
            />
            <Divider />
            <List.Item
              style={{ paddingRight: 0 }}
              onPress={() => {
                hide()
                props?.onPress(1)
              }}
              title={() => {
                return (
                  <Text size="md" weight="normal" style={{ color: colors.gray_9 }}>
                    Hotline: 0123 456 789
                  </Text>
                )
              }}
              left={() => {
                return <Icon icon="call_calling" size={WIDTH(24)} />
              }}
            />
          </View>
        </View>
        <Pressable style={styles.buttonChat} onPress={hide}>
          <Image source={R.images.chatbot} style={styles.icon} />
        </Pressable>
      </View>
    </Modal>
  )
})
export default ModalSupport
ModalSupport.displayName = "ModalSupport"
const styles = StyleSheet.create({
  wrapperModal: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  viewContai: {
    marginHorizontal: WIDTH(spacing.md),
    borderRadius: WIDTH(12),
    backgroundColor: colors.white,
    width: WIDTH(240),
    position: "absolute",
    bottom: HEIGHT(80),
    right: WIDTH(70),
  },
  wraperItem: {
    paddingHorizontal: WIDTH(spacing.md),
  },
  background: {
    position: "absolute",
    width: getWidth(),
    height: "100%",
  },
  buttonChat: {
    position: "absolute",
    right: WIDTH(spacing.md),
    bottom: HEIGHT(94),
  },
  icon: {
    height: WIDTH(56),
    width: WIDTH(56),
  },
})
