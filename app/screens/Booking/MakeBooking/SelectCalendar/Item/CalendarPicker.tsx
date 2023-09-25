import * as React from "react"
import { View, StyleSheet } from "react-native"
import R from "@app/assets"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { Calendar } from "react-native-calendars"
import moment from "moment"
import { IColorsTheme } from "@app/theme"
import { Button, Card, Divider, useTheme } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/index"
import ItemYearPicker from "./ItemYearPicker"
import { DatePickerInput } from "react-native-paper-dates"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { updateSeletedDateOrder } from "@app/redux/actions/actionOrder"
export interface ItemTagetDayProps {
  markedDate: object
  userhabitid: any
}

const CalendarPicker = ({ preScreen }) => {
  const { colors }: { colors: IColorsTheme } = useTheme()
  const [selectedValue, setSelectedValue] = React.useState(new Date())

  const Theme = {
    backgroundColor: R.colors.white,
    calendarBackground: R.colors.white,
    textSectionTitleColor: colors.onSurfaceVariant,
    textSectionTitleDisabledColor: colors.onSurfaceVariant,
    selectedDayBackgroundColor: R.colors.primary,
    selectedDayTextColor: R.colors.white,
    todayTextColor: R.colors.primary,
    dayTextColor: R.colors.gray_9,
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
    stylesheet: {
      calendar: {
        day: {
          period: {
            borderRadius: 20,
          },
        },
      },
    },
  }
  var currentDate = moment()
  const [markedDateMonth, setMarkedDateMonth] = React.useState<any>({
    [currentDate.add(0, "days").format("YYYY-MM-DD")]: {
      dotColor: R.colors.primary,
      color: R.colors.white,
      textColor: R.colors.primary,
      endingDay: true,
      startingDay: true,
      customContainerStyle: {
        borderWidth: 1,
        borderColor: R.colors.primary,
      },
    },
    [currentDate.add(3, "days").format("YYYY-MM-DD")]: {
      dotColor: R.colors.gray_5,
      color: R.colors.gray_5,
      textColor: "white",
      endingDay: true,
      startingDay: true,
    },
    [currentDate.add(4, "days").format("YYYY-MM-DD")]: {
      marked: true,
      dotColor: R.colors.gray_5,
      color: R.colors.gray_5,
      textColor: "white",
      endingDay: true,
      startingDay: true,
    },
    [currentDate.add(5, "days").format("YYYY-MM-DD")]: {
      marked: true,
      dotColor: R.colors.primary,
      color: R.colors.primary,
      textColor: "white",
      endingDay: true,
      startingDay: true,
    },
  })
  const dispatch = useDispatch()
  return (
    <Card style={[styles.container, { backgroundColor: R.colors.white }]}>
      <View style={styles.viewCalendar}>
        <Text
          size="ba"
          weight="normal"
          style={{ color: R.colors.gray_9, marginLeft: WIDTH(4), marginTop: HEIGHT(4) }}
        >
          Select date
        </Text>
        <View style={styles.textInput}>
          <DatePickerInput
            locale="vi"
            mode="outlined"
            label="Nhập ngày"
            value={selectedValue}
            onChange={(d) => setSelectedValue(d)}
            inputMode="start"
            withModal={false}
          />
        </View>
        <Divider
          style={{
            width: WIDTH(343),
            marginLeft: -WIDTH(spacing.sm),
            marginTop: HEIGHT(spacing.sm),
          }}
        />

        <Calendar
          // disableArrowRight={currentMonth == moment().format("MM/YYYY")}
          markingType={"period"}
          onDayPress={(value) => {
            console.log("value", value)
            setSelectedValue(new Date(value.dateString))
          }}
          minDate={moment(new Date()).format("YYYY-MM-DD")}
          enableSwipeMonths={false}
          headerStyle={[styles.headerCalendar, { borderColor: colors.outlineVariant }]}
          renderHeader={() => {
            return (
              <ItemYearPicker selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
            )
          }}
          current={moment(selectedValue).format("YYYY-MM-DD")}
          hideArrows
          key={moment(selectedValue).format("YYYY-MM-DD")}
          markedDates={{
            ...markedDateMonth,
            [moment(selectedValue).format("YYYY-MM-DD")]: {
              marked: true,
              dotColor: R.colors.primary,
              color: R.colors.primary,
              textColor: "white",
              endingDay: true,
              startingDay: true,
            },
          }}
          theme={Theme}
          style={styles.calendar}
        />
      </View>
      <View style={styles.flexRow}>
        <Button>Cancel</Button>
        <Button
          onPress={() => {
            dispatch(updateSeletedDateOrder(moment(selectedValue).format("YYYY-MM-DD")))
            if (preScreen) {
              goBack()
            } else {
              navigate("SelectTimeBooking")
            }
          }}
        >
          OK
        </Button>
      </View>
    </Card>
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
    borderRadius: 28,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: HEIGHT(spacing.xs),
  },
  textInput: {
    justifyContent: "center",
    height: HEIGHT(60),
    alignItems: "center",
    marginTop: HEIGHT(spacing.md),
    marginLeft: WIDTH(4),
    width: WIDTH(311),
  },
  viewCalendar: {
    width: WIDTH(343),
  },
  calendar: {
    // height: getWidth() * 0.8,
    width: WIDTH(325),
  },

  headerCalendar: {
    marginBottom: HEIGHT(spacing.md),
  },
})
