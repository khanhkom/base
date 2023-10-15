import { StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import TitleInfor from "../Item/TitleInfor"
import CalendarPicker from "./Item/CalendarPicker"
import { translate } from "@app/i18n/translate"
const DATA_EXPLAIN = [
  {
    title: translate("booking.today"),
    type: 0,
  },
  {
    title: translate("booking.available"),
    type: 1,
  },
  {
    title: translate("booking.full_order"),
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
      <Header leftIcon="arrow_left" titleTx="booking.select_date" backgroundColor={colors.white} />
      <TitleInfor title={translate("booking.booking_information")} data={DATA_EXPLAIN} />
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
