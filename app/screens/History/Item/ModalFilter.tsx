import { StyleSheet, View } from "react-native"
import React, { forwardRef, useImperativeHandle, useState } from "react"
import Modal from "react-native-modal"
import { HEIGHT, WIDTH, getHeight } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Button, Divider, List, Searchbar } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { Toggle } from "@app/components/Toggle"
import { iconRegistry } from "@app/components/Icon"
import ItemDatePicker from "./ItemDatePicker"

type Props = {
  onPress: () => void
}
const LIST_SPECIALIST = ["Tất cả", "Đã đặt khám", "Đã khám", "Đã hủy"]
const SORTBY = ["Hôm nay", "Tuần này", "Tháng này", "Chọn thời gian"]
const DATA_SESSION = [
  {
    title: "Trạng thái lịch khám",
    data: LIST_SPECIALIST,
  },
  {
    title: "Thời gian",
    data: SORTBY,
  },
]
const ModalFilter = forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false)
  const [statusFilter, setStatusFilter] = useState(0)
  const [timeFilter, setTimeFilter] = useState(0)
  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
  }))
  const hide = () => {
    setVisible(false)
  }
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
        margin: 0,
      }}
      coverScreen={true}
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
        {DATA_SESSION.map((item, id) => {
          return (
            <View key={id}>
              <View style={styles.session}>
                <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
                  {item.title}:
                </Text>
                {item.data.map((item, index) => {
                  const isActive = id === 0 ? statusFilter === index : timeFilter === index
                  return (
                    <Toggle
                      onPress={() => {
                        if (id === 0) {
                          setStatusFilter(index)
                        } else {
                          setTimeFilter(index)
                        }
                      }}
                      key={index}
                      variant="radio"
                      label={item}
                      value={isActive}
                      containerStyle={{ marginTop: HEIGHT(12) }}
                    />
                  )
                })}
              </View>
              {id === 0 && <Divider />}
            </View>
          )
        })}
        {timeFilter === 3 && (
          <View>
            <ItemDatePicker title="Từ ngày" />
            <ItemDatePicker title="Đến ngày" />
          </View>
        )}

        <View style={styles.bottomButton}>
          <Button textColor={colors.gray_7} icon={iconRegistry.rotate_left}>
            Đặt lại
          </Button>
          <Button
            onPress={hide}
            mode="contained"
            icon={iconRegistry.rotate_left}
            style={{ borderRadius: 8 }}
          >
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
    width: WIDTH(295),
    backgroundColor: colors.white,
    height: getHeight(),
    flex: 1,
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
    backgroundColor: colors.white,
  },
})
