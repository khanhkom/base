import { StyleSheet, View } from "react-native"
import React, { forwardRef, useImperativeHandle, useState } from "react"
import Modal from "react-native-modal"
import { HEIGHT, WIDTH, getHeight } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Button, Divider } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { Toggle } from "@app/components/Toggle"
import { iconRegistry } from "@app/components/Icon"
import ItemDatePicker from "./ItemDatePicker"
import { STATUS_ORDER } from "@app/interface/order"
import { translate } from "@app/i18n/translate"

type Props = {
  filterSelected: any
  onApplyFilter: (val) => void
}
export const LIST_SPECIALIST = [
  {
    title: translate("history.all"),
    status: "",
  },
  {
    title: translate("history.verified"),
    status: STATUS_ORDER.verified,
  },
  {
    title: translate("history.done"),
    status: STATUS_ORDER.done,
  },
  {
    title: translate("history.cancel"),
    status: STATUS_ORDER.cancel,
  },
]
const SORTBY = [
  {
    title: translate("history.today"),
  },
  {
    title: translate("history.this_week"),
  },
  {
    title: translate("history.this_month"),
  },
  { title: translate("history.select_date_custom") },
]
const DATA_SESSION = [
  {
    title: translate("history.order_status"),
    data: LIST_SPECIALIST,
  },
  {
    title: translate("history.time"),
    data: SORTBY,
  },
]
const ModalFilter = forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false)
  const filterSelected = props?.filterSelected
  const [statusFilter, setStatusFilter] = useState(0)
  const [timeFilter, setTimeFilter] = useState(-1)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
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
  const onApplyFilter = () => {
    hide()
    props?.onApplyFilter({
      statusFilter: statusFilter,
      timeFilter: timeFilter,
      startDate,
      endDate,
    })
  }
  return (
    <Modal
      isVisible={visible}
      avoidKeyboard
      backdropOpacity={0.5}
      onBackButtonPress={() => {
        setVisible(false)
        setStatusFilter(filterSelected.current.statusFilter)
        setTimeFilter(filterSelected.current.timeFilter)
      }}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      style={styles.modal}
      coverScreen={true}
      onBackdropPress={() => {
        setVisible(false)
        setStatusFilter(filterSelected.current.statusFilter)
        setTimeFilter(filterSelected.current.timeFilter)
      }}
    >
      <View style={styles.container}>
        <View style={styles.head}>
          <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
            {translate("common.filter")}
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
                      label={item?.title}
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
            <ItemDatePicker
              title={translate("history.from_date")}
              onChangeDate={setStartDate}
              date={startDate}
            />
            <ItemDatePicker
              title={translate("history.to_date")}
              onChangeDate={setEndDate}
              minDate={startDate}
              date={endDate}
            />
          </View>
        )}

        <View style={styles.bottomButton}>
          <Button
            textColor={colors.gray_7}
            onPress={() => {
              hide()
              setStatusFilter(0)
              setTimeFilter(-1)
              props?.onApplyFilter({
                statusFilter: 0,
                timeFilter: -1,
                startDate: new Date(),
                endDate: new Date(),
              })
            }}
            icon={iconRegistry.rotate_left}
          >
            {translate("common.reset")}
          </Button>
          <Button
            onPress={onApplyFilter}
            mode="contained"
            style={{ borderRadius: 8, width: WIDTH(120) }}
          >
            {translate("common.apply")}
          </Button>
        </View>
      </View>
    </Modal>
  )
})
export default ModalFilter
ModalFilter.displayName = "ModalFilter"

const styles = StyleSheet.create({
  modal: {
    alignItems: "flex-end",
    margin: 0,
  },
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
