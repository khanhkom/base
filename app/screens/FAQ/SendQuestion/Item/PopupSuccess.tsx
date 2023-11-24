import { Image, StyleSheet, View } from "react-native"
import React from "react"
import { Button, Modal } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import { Text } from "@app/components/Text"
interface ItemProps {
  visible: boolean
  setVisible: (val: boolean) => void
  title?: string
  desc?: string
  rightText?: string
}
export default function PopupSuccess({ visible, setVisible, desc, title }: ItemProps) {
  const hideModal = () => setVisible(false)
  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
      <Image
        source={R.images.sent_faq_success}
        resizeMode="contain"
        style={{ height: HEIGHT(96), width: WIDTH(96) }}
      />
      <Text style={styles.title} size="xxl" weight="semiBold">
        {title}
      </Text>
      <Text weight="normal" size="ba" style={styles.textTitle}>
        {desc}
      </Text>
      <View style={styles.bottomView}>
        <Button onPress={hideModal} mode="contained" style={styles.buttonRight}>
          {"Đóng"}
        </Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.white,
    width: WIDTH(343),
    // marginLeft: WIDTH(spacing.md),
    alignItems: "center",
    borderRadius: 16,
    alignSelf: "center",
    paddingTop: HEIGHT(spacing.md),
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
  buttonRight: {
    flex: 1,
    borderRadius: 0,
    borderRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: HEIGHT(spacing.xxxs),
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH(343),
    marginTop: HEIGHT(spacing.lg),
  },
})
