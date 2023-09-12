import { StyleSheet, View } from "react-native"
import React, { useCallback } from "react"
import { Button, IconButton, Menu } from "react-native-paper"
import { iconRegistry } from "@app/components/Icon"
import colors from "@app/assets/colors"
import { WIDTH } from "@app/config/functions"
import moment from "moment"

export default function ItemYearPicker({ selectedValue, setSelectedValue }) {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)
  const getNewSelectedDate = useCallback(
    (date, shouldAdd) => {
      const newMonth = new Date(date).getMonth()
      const month = shouldAdd ? newMonth + 1 : newMonth - 1
      const newDate = new Date(selectedValue.setMonth(month))
      const newSelected = new Date(newDate.setDate(1))
      return newSelected
    },
    [selectedValue],
  )
  const onPressArrowLeft = useCallback(
    (month) => {
      const newDate = getNewSelectedDate(month, false)
      setSelectedValue(newDate)
    },
    [getNewSelectedDate],
  )

  const onPressArrowRight = useCallback(
    (month) => {
      const newDate = getNewSelectedDate(month, true)
      setSelectedValue(newDate)
    },
    [getNewSelectedDate],
  )

  return (
    <View>
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              onPress={openMenu}
              icon={"menu-down"}
              textColor={colors.gray_9}
              contentStyle={{ flexDirection: "row-reverse" }}
            >
              {moment(selectedValue).format("MM/YYYY")}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSelectedValue(new Date(`${moment().add(0, "years").format("YYYY-MM-DD")}`))
              closeMenu()
            }}
            title={moment().add(0, "years").format("YYYY")}
          />
          <Menu.Item
            onPress={() => {
              setSelectedValue(new Date(`${moment().add(1, "years").format("YYYY")}-01-01`))
              closeMenu()
            }}
            title={moment().add(1, "years").format("YYYY")}
          />
          <Menu.Item
            onPress={() => {
              setSelectedValue(new Date(`${moment().add(2, "years").format("YYYY")}-01-01`))
              closeMenu()
            }}
            title={moment().add(2, "years").format("YYYY")}
          />
        </Menu>
        <View style={styles.flexRow}>
          <IconButton
            onPress={() => onPressArrowLeft(selectedValue)}
            disabled={moment(selectedValue).format("YYYY-MM") === moment().format("YYYY-MM")}
            icon={iconRegistry.navigate_before}
          />
          <IconButton
            onPress={() => onPressArrowRight(selectedValue)}
            icon={iconRegistry.navigate_next}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH(311),
    paddingVertical: 0,
    marginLeft: -WIDTH(16),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  flexRow: { flexDirection: "row", alignItems: "center", alignSelf: "center" },
})
