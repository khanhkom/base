import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import React, { forwardRef, useImperativeHandle, useState } from "react"
import Modal from "react-native-modal"
import { HEIGHT, WIDTH, getHeight } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Button, Divider, List, Searchbar } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { Toggle } from "@app/components/Toggle"
import { iconRegistry } from "@app/components/Icon"

type Props = {
  onPress: () => void
}
const LIST_SPECIALIST = ["Tất cả", "Nhi khoa", "Tai mũi họng"]
const GENDER = ["Nam", "Nữ"]
const SORTBY = ["Đánh giá từ cao đến thấp", "Đánh giá từ thấp đến cao"]
const DATA_SESSION = [
  {
    title: "Chuyên khoa",
    data: LIST_SPECIALIST,
  },
  {
    title: "Giới tính",
    data: GENDER,
  },
  {
    title: "Sắp xếp theo",
    data: SORTBY,
  },
]
const ModalFilter = forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false)
  const hide = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
  }))

  return (
    <Modal
      isVisible={visible}
      avoidKeyboard
      backdropOpacity={0.5}
      onBackButtonPress={() => {
        setVisible(false)
      }}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      style={{
        alignItems: "flex-end",
      }}
      coverScreen={false}
      onBackdropPress={() => {
        setVisible(false)
      }}
    >
      <View style={styles.container}>
        <View style={styles.head}>
          <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
            Bộ lọc
          </Text>
        </View>
        {DATA_SESSION.map((item, index) => {
          return (
            <View key={index}>
              <View style={styles.session}>
                <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
                  {item.title}:
                </Text>
                {item.data.map((item, index) => {
                  return (
                    <Toggle
                      key={index}
                      variant="radio"
                      label={item}
                      value={index === 0}
                      containerStyle={{ marginTop: HEIGHT(12) }}
                    />
                  )
                })}
              </View>
              <Divider />
            </View>
          )
        })}
        <View style={styles.bottomButton}>
          <Button textColor={colors.gray_7} icon={iconRegistry.rotate_left}>
            Đặt lại
          </Button>
          <Button mode="contained" icon={iconRegistry.rotate_left} style={{ borderRadius: 8 }}>
            Áp dụng
          </Button>
        </View>
      </View>
    </Modal>
  )
})
export default ModalFilter
ModalFilter.displayName = "ModalFilter"

const styles = StyleSheet.create({
  container: {
    width: WIDTH(300),
    backgroundColor: colors.white,
    height: getHeight(),
    flex: 1,
    marginRight: -WIDTH(32),
  },
  head: {
    backgroundColor: colors.gray_0,
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(32),
    paddingBottom: HEIGHT(spacing.md),
  },
  session: {
    paddingVertical: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: WIDTH(280),
    paddingTop: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.md),
    paddingBottom: HEIGHT(spacing.md),
  },
})
