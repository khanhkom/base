import * as React from "react"
import { View, StyleSheet } from "react-native"
import R from "@app/assets"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { Calendar } from "react-native-calendars"
import moment from "moment"
import { translate } from "@app/i18n"
import { IColorsTheme } from "@app/theme"
import { Button, useTheme } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Icon, Text } from "@app/components/index"
export interface ItemTagetDayProps {
  markedDate: object
  userhabitid: any
}

const CalendarPicker = () => {
  const { colors }: { colors: IColorsTheme } = useTheme()
  const Theme = {
    backgroundColor: R.colors.white,
    calendarBackground: R.colors.white,
    textSectionTitleColor: colors.onSurfaceVariant,
    textSectionTitleDisabledColor: colors.onSurfaceVariant,
    selectedDayBackgroundColor: R.colors.primary,
    selectedDayTextColor: R.colors.white,
    todayTextColor: R.colors.primary,
    dayTextColor: colors.onSurfaceVariant,
    textDisabledColor: colors.onSurfaceDisabled,
    dotColor: R.colors.primary,
    selectedDotColor: R.colors.white,
    arrowColor: "orange",
    monthTextColor: colors.onSurfaceVariant,
    indicatorColor: "blue",
    textDayFontWeight: "500",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "500",
    textDayFontSize: 12,
    textMonthFontSize: 14,
    textDayHeaderFontSize: 14,
    weekVerticalMargin: 2,
    textDayStyle: {
      color: colors.onSurfaceVariant,
    },
  }
  var currentDate = moment()
  const [currentMonth, setCurrentMonth] = React.useState(moment().format("MM/YYYY"))
  const [markedDateMonth, setMarkedDateMonth] = React.useState<any>({
    [currentDate.add(3, "days").format("YYYY-MM-DD")]: {
      dotColor: R.colors.gray_5,
      color: R.colors.gray_5,
      textColor: "white",
    },
    [currentDate.add(4, "days").format("YYYY-MM-DD")]: {
      marked: true,
      dotColor: R.colors.gray_5,
      color: R.colors.gray_5,
      textColor: "white",
    },
    [currentDate.add(5, "days").format("YYYY-MM-DD")]: {
      marked: true,
      dotColor: R.colors.primary,
      color: R.colors.primary,
      textColor: "white",
    },
  })

  return (
    <View style={[styles.container, { backgroundColor: R.colors.white }]}>
      <View style={styles.viewCalendar}>
        <Calendar
          // disableArrowRight={currentMonth == moment().format("MM/YYYY")}
          markingType={"period"}
          onMonthChange={(value) => {}}
          enableSwipeMonths={false}
          headerStyle={[styles.headerCalendar, { borderColor: colors.outlineVariant }]}
          renderHeader={() => {
            return (
              <View style={{ flex: 1, backgroundColor: "red" }}>
                <Text>aaaa</Text>
              </View>
            )
          }}
          renderArrow={(direction) => {
            return (
              <Icon
                icon={direction === "left" ? "navigate_before" : "navigate_next"}
                style={{ tintColor: colors.onSurfaceVariant }}
                size={WIDTH(24)}
              />
            )
          }}
          hideArrows
          markedDates={markedDateMonth}
          theme={Theme}
          style={styles.calendar}
        />
      </View>
      <View style={styles.flexRow}>
        <Button>Cancel</Button>
        <Button>OK</Button>
      </View>
    </View>
  )
}
export default CalendarPicker
const styles = StyleSheet.create({
  container: {
    width: getWidth() - WIDTH(spacing.md * 2),
    marginHorizontal: WIDTH(spacing.md),
    justifyContent: "center",
    marginTop: HEIGHT(spacing.sm),
    alignSelf: "center",
    borderRadius: spacing.sm,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: HEIGHT(spacing.xs),
  },

  viewCalendar: {
    // height: getWidth(),
    width: getWidth() - WIDTH(spacing.md * 2 + spacing.md * 2),
  },
  calendar: {
    // height: getWidth() * 0.8,
    width: getWidth() - WIDTH(spacing.md * 2 + spacing.md * 2),
  },

  headerCalendar: {
    borderBottomWidth: 1,
    marginBottom: HEIGHT(spacing.md),
  },
})
