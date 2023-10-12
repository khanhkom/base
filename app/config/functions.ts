import { Dimensions } from "react-native"
import { initialWindowMetrics } from "react-native-safe-area-context"
const moment = require("moment")

const { width, height } = Dimensions.get("window")
const deviceHeight = height - (initialWindowMetrics?.insets.top ?? 0)
export const responsiveHeight = (h: number): number => height * (h / 100)
export const responsiveWidth = (w: number): number => width * (w / 100)
export const WIDTH = (w: number): number => width * (w / 375)
export const HEIGHT = (h: number): number => height * (h / 812)
export const randomID = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min
export const responsiveWidthComponent = (widthComponent: number, w: number): number =>
  widthComponent * (w / 100)
export const responsiveFontFigmar = (f: number): number => f + 2

export const getHeight = (): number => height
export const getWidth = (): number => width

export const getFont = (f: number): number => f

export const getNumber = (val): number => {
  if (val && val !== null && val !== "") return parseFloat(val)
  else return 0
}
export function roundNumber(num, scale) {
  var p = Math.pow(10, scale)
  var p1 = Math.round(num * p)
  return p1 / p
}
export function RFValue(fontSize) {
  const heightPercent =
    (((initialWindowMetrics?.insets.top ?? 0) > 20 ? fontSize : fontSize - 2) *
      (deviceHeight ?? 0)) /
    getHeight()
  return Math.round(heightPercent)
}

export const getLineHeight = (f: number): number => f

export function convertDuration(milliseconds): {
  day: number
  hour: number
  min: number
} {
  let days = 0
  let hours = 0
  let minutes = 0
  if (milliseconds) {
    const duration = moment.duration(milliseconds)

    days = Math.floor(duration.asDays())
    hours = Math.floor(duration.asHours()) % 24
    minutes = Math.floor(duration.asMinutes()) % 60
  }

  return {
    day: days,
    hour: hours,
    min: minutes,
  }
}
export function returnStartEndDate(): {
  todayStart: string
  todayEnd: string
  weekStart: string
  weekEnd: string
  monthStart: string
  monthEnd: string
} {
  const moment = require("moment")

  // Start and End of Today
  const todayStart = moment().startOf("day").toISOString()
  const todayEnd = moment().endOf("day").toISOString()

  // Start and End of This Week
  const weekStart = moment().startOf("week").toISOString()
  const weekEnd = moment().endOf("week").toISOString()

  // Start and End of This Month
  const monthStart = moment().startOf("month").toISOString()
  const monthEnd = moment().endOf("month").toISOString()
  return {
    todayStart,
    todayEnd,
    weekStart,
    weekEnd,
    monthStart,
    monthEnd,
  }
}
export const TYPE_TIME_CALL = {
  CHUA_DEN: 0,
  DA_DEN: 1,
  QUA_GIO: 2,
}
export function getTypeTimeInRangeCall(timeFrom, timeTo) {
  const currentTime = new Date()
  const parsedTimeFrom = new Date(timeFrom)
  const parsedTimeTo = new Date(timeTo)

  const rangeBefore = new Date(parsedTimeFrom.getTime())
  const rangeAfter = new Date(parsedTimeTo.getTime())
  if (currentTime < rangeBefore) return TYPE_TIME_CALL.CHUA_DEN
  if (currentTime > rangeAfter) return TYPE_TIME_CALL.QUA_GIO
  else return TYPE_TIME_CALL.DA_DEN
  // return currentTime >= rangeBefore && currentTime <= rangeAfter
}
export function convertTimeToAgo(date) {
  const currentTime = new Date()
  const pastTime = new Date(date)

  const timeDifference = currentTime.getTime() - pastTime.getTime()
  const secondsAgo = Math.floor(timeDifference / 1000)
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)
  const daysAgo = Math.floor(hoursAgo / 24)
  const weeksAgo = Math.floor(daysAgo / 7)

  let convertedTime

  if (weeksAgo > 0) {
    convertedTime = `${weeksAgo} tuần trước`
  } else if (daysAgo > 0) {
    convertedTime = `${daysAgo} ngày trước`
  } else if (hoursAgo > 0) {
    convertedTime = `${hoursAgo} giờ trước`
  } else if (minutesAgo > 0) {
    convertedTime = `${minutesAgo} phút trước`
  } else {
    convertedTime = `${secondsAgo} giây trước`
  }

  return convertedTime
}
