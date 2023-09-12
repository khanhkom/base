import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
import TitleInfor from "../Item/TitleInfor"
import { DatePickerModal } from "react-native-paper-dates"
import { CustomDatePicker } from "./CustomDatePicker"
import CalendarPicker from "./CalendarPicker"

export default function DocterInformation() {
  const [open, setOpen] = React.useState(true)
  const [date, setDate] = React.useState(undefined)
  const onDismissSingle = React.useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false)
      setDate(params.date)
    },
    [setOpen, setDate],
  )

  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn ngày khám" backgroundColor={colors.white} />
      <TitleInfor />
      <CalendarPicker date={date} onConfirm={onConfirmSingle} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
