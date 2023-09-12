import { StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import TitleInfor from "../Item/TitleInfor"
import CalendarPicker from "./Item/CalendarPicker"
const DATA_EXPLAIN = [
  {
    title: "Hôm nay",
    type: 0,
  },
  {
    title: "Còn trống",
    type: 1,
  },
  {
    title: "Không thể đặt",
    type: 2,
  },
]
export default function DocterInformation() {
  const [selectedValue, setSelectedValue] = useState(new Date())

  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn ngày khám" backgroundColor={colors.white} />
      <TitleInfor title="Thông tin lịch khám" data={DATA_EXPLAIN} />
      <CalendarPicker onConfirm={setSelectedValue} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
