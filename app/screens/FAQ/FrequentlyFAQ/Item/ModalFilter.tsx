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
import { translate } from "@app/i18n/translate"

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
            {translate("common.filter")}
          </Text>
        </View>
        <ScrollView>
          <View>
            <View style={styles.session}>
              <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
                Chuyên khoa
              </Text>
              <Toggle
                variant="radio"
                label={translate("common.all")}
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
          </View>
          <View style={styles.spacing} />
        </ScrollView>
        <View style={styles.bottomButton}>
          <Button onPress={onReset} textColor={colors.gray_7} icon={iconRegistry.rotate_left}>
            {translate("common.reset")}
          </Button>
          <Button onPress={onHandlApply} mode="contained" style={styles.buttonApply}>
            {translate("common.apply")}
          </Button>
        </View>
      </Animatable.View>
    </Modal>
  )
})
export default ModalFilter
ModalFilter.displayName = "ModalFilter"

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.backdrop,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  bottomButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(spacing.sm),
    position: "absolute",
    width: WIDTH(280),
  },
  buttonApply: { borderRadius: 8, width: WIDTH(120) },
  container: {
    alignSelf: "flex-end",
    backgroundColor: colors.white,
    flex: 1,
    height: getHeight(),
    width: WIDTH(295),
  },
  head: {
    backgroundColor: colors.gray_0,
    paddingBottom: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(32),
  },
  session: {
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.md),
  },
  spacing: { height: 100 },
})
