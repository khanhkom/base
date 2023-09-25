import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native"
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { HEIGHT, WIDTH, getHeight } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Button, Divider } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { Toggle } from "@app/components/Toggle"
import { iconRegistry } from "@app/components/Icon"
import { ISpecialList } from "@app/interface/docter"
import * as Animatable from "react-native-animatable"
import { useSelector } from "@app/redux/reducers"
const GENDER = [
  {
    name: "Nam",
    code: "male",
  },
  {
    name: "Nữ",
    code: "female",
  },
]
const SORTBY = [
  {
    name: "Đánh giá từ cao đến thấp",
    code: -1,
  },
  {
    name: "Đánh giá từ thấp đến cao",
    code: 1,
  },
]
interface IFilter {
  specialist: string
  gender: string
  sortByRatings: number
}
type Props = {
  onPress?: () => void
  onApply?: (val: IFilter) => void
  speciallist?: ISpecialList
  filterData: IFilter
}

const ModalFilter = forwardRef((props: Props, ref) => {
  const { filterData, onApply } = props
  const [visible, setVisible] = useState(false)
  const [filterDataTemp, setFilterDataTemp] = useState({
    specialist: "",
    gender: "",
    sortByRatings: 0,
  })
  const specialList = useSelector((state) => state.doctorReducers.listSpecialList)

  const hide = () => {
    setVisible(false)
  }
  useEffect(() => {
    setFilterDataTemp(filterData)
  }, [visible])
  const onReset = () => {
    setFilterDataTemp({
      specialist: "",
      gender: "",
      sortByRatings: 0,
    })
  }
  const onHandlApply = () => {
    hide()
    onApply(filterDataTemp)
  }
  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true)
    },
    hide() {
      hide()
    },
    returnData() {
      return filterDataTemp
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
      <Pressable style={styles.backdrop} onPress={hide} />
      <Animatable.View animation={"slideInRight"} duration={500} style={styles.container}>
        <View style={styles.head}>
          <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
            Bộ lọc
          </Text>
        </View>
        <ScrollView>
          <View>
            <View style={styles.session}>
              <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
                Chuyên khoa:
              </Text>
              <Toggle
                variant="radio"
                label={"Tất cả"}
                value={filterDataTemp.specialist === ""}
                onPress={() => {
                  setFilterDataTemp({
                    ...filterDataTemp,
                    specialist: "",
                  })
                }}
                containerStyle={{ marginTop: HEIGHT(12) }}
              />
              {specialList.map((itemm, indx) => {
                return (
                  <Toggle
                    key={indx}
                    variant="radio"
                    label={itemm?.name}
                    onPress={() => {
                      setFilterDataTemp({
                        ...filterDataTemp,
                        specialist: itemm?.code,
                      })
                    }}
                    value={filterDataTemp?.specialist === itemm?.code}
                    containerStyle={{ marginTop: HEIGHT(12) }}
                  />
                )
              })}
            </View>
            <Divider />
          </View>
          <View>
            <View style={styles.session}>
              <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
                Giới tính:
              </Text>
              {GENDER.map((itemm, indx) => {
                return (
                  <Toggle
                    onPress={() => {
                      setFilterDataTemp({
                        ...filterDataTemp,
                        gender: itemm?.code,
                      })
                    }}
                    key={indx}
                    variant="radio"
                    label={itemm?.name}
                    value={filterDataTemp?.gender === itemm?.code}
                    containerStyle={{ marginTop: HEIGHT(12) }}
                  />
                )
              })}
            </View>
            <Divider />
          </View>
          <View>
            <View style={styles.session}>
              <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
                Sắp xếp theo:
              </Text>
              {SORTBY.map((itemm, indx) => {
                return (
                  <Toggle
                    onPress={() => {
                      setFilterDataTemp({
                        ...filterDataTemp,
                        sortByRatings: itemm?.code,
                      })
                    }}
                    key={indx}
                    variant="radio"
                    label={itemm?.name}
                    value={filterDataTemp?.sortByRatings === itemm?.code}
                    containerStyle={{ marginTop: HEIGHT(12) }}
                  />
                )
              })}
            </View>
            <Divider />
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
        <View style={styles.bottomButton}>
          <Button onPress={onReset} textColor={colors.gray_7} icon={iconRegistry.rotate_left}>
            Đặt lại
          </Button>
          <Button
            onPress={onHandlApply}
            mode="contained"
            icon={iconRegistry.rotate_left}
            style={{ borderRadius: 8 }}
          >
            Áp dụng
          </Button>
        </View>
      </Animatable.View>
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
    alignSelf: "flex-end",
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
  backdrop: {
    backgroundColor: colors.backdrop,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
