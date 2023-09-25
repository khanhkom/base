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
interface ScreenProps {
  route: {
    params: {
      preScreen?: string
    }
  }
}
export default function DocterInformation({ route }: ScreenProps) {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn ngày khám" backgroundColor={colors.white} />
      <TitleInfor title="Thông tin lịch khám" data={DATA_EXPLAIN} />
      <CalendarPicker preScreen={route?.params?.preScreen} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
