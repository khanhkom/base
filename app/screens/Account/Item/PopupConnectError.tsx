import { StyleSheet, View, TouchableOpacity, Image } from "react-native"
import React from "react"
import { Button, Modal } from "react-native-paper"
import { HEIGHT, WIDTH, getHeight, getWidth } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { navigate } from "@app/navigators/navigationUtilities"
import { translate } from "@app/i18n/translate"
import { Text } from "@app/components/Text"
import R from "@app/assets"
interface ItemProps {
  visible: boolean
  setVisible: (val: boolean) => void
  indexSocial: number
}
export default function PopupConnectError({ visible, setVisible, indexSocial }: ItemProps) {
  const hideModal = () => setVisible(false)
  return (
    <Modal visible={visible} onDismiss={hideModal}>
      <View style={styles.containerStyle}>
        <Image
          source={indexSocial ? R.images.facebook_error : R.images.google_error}
          style={styles.logo}
        />
        <Text style={styles.textTitle} size="xxl" weight="semiBold">
          Liên kết không thành công
        </Text>
        <Text style={styles.desc} size="ba" weight="normal">
          Tài khoản {indexSocial ? "Facebook" : "Google"} đã chọn đang được liên kết với số điện
          thoại khác!{" "}
        </Text>
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              hideModal()
            }}
            mode="contained"
            style={styles.buttonRight}
          >
            Đóng
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
    marginTop: HEIGHT(26),
    width: WIDTH(343),
  },
  buttonRight: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderRadius: 0,
    flex: 1,
  },
  logo: {
    width: WIDTH(96),
    height: WIDTH(96),
  },
  containerStyle: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginLeft: WIDTH(spacing.md),
    width: WIDTH(343),
    alignItems: "center",
    paddingTop: HEIGHT(spacing.md),
  },
  textPhone: { color: colors.black, fontWeight: "500" },
  textTitle: {
    marginTop: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    textAlign: "center",
    color: colors.gray_9,
  },
  desc: {
    color: colors.gray_7,
    marginTop: HEIGHT(spacing.xs),
    textAlign: "center",
    marginHorizontal: WIDTH(spacing.md),
  },
  touch_group: {
    backgroundColor: colors.gray_9,
    height: getHeight(),
    opacity: 0.75,
    position: "absolute",
    width: getWidth(),
  },
})
