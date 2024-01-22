import { StyleSheet, View, FlatList, Platform } from "react-native"
import React, { useEffect, useState } from "react"
import { Header, Screen, Text } from "@app/components/index"
import colors from "@app/assets/colors"
import TitleInfor from "../Item/TitleInfor"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { Button, Card } from "react-native-paper"
import ButtonTime from "./Item/ButtonTime"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import { DATA_EXPLAIN, DATA_TIME } from "./Data"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { updateSelectedTimeOrder } from "@app/redux/actions/actionOrder"
import { useSelector } from "@app/redux/reducers"
import { getDocterCalendar } from "@app/services/api/functions/docter"
import { IDoctorCalendar } from "@app/interface/docter"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import moment from "moment"
import { translate } from "@app/i18n/translate"
interface ScreenProps {
  route: {
    params: {
      preScreen?: string
    }
  }
}
export default function SelectTimeBooking({ route }: ScreenProps) {
  const [timeSelected, setTimeSelected] = useState({ id: "-1" })
  const [dataCalendarConvert, setDataCalendarConvert] = useState<
    { title: string; data: IDoctorCalendar[] }[]
  >([])
  const [loading, setLoading] = useState(false)
  const docter = useSelector((state) => state.orderReducers?.docter)
  const selectedDate = useSelector((state) => state.orderReducers?.selectedDate)
  const dispatch = useDispatch()
  const getDoctorCalendarAvailable = async () => {
    try {
      setLoading(true)
      let resCal = await getDocterCalendar(docter.id, {
        date: selectedDate,
      })
      console.log("resCal::", resCal?.data?.calendar)
      const listCalendar = resCal?.data?.calendar ?? []
      const morningList = []
      const afternoonList = []
      const nightList = []

      listCalendar.forEach((item) => {
        const fromTime = parseInt(item.timeRange.from.split(":")[0])
        if (fromTime >= 0 && fromTime < 12) {
          morningList.push(item)
        } else if (fromTime >= 12 && fromTime < 18) {
          afternoonList.push(item)
        } else if (fromTime >= 18 && fromTime <= 23) {
          nightList.push(item)
        }
      })

      const resultList = [
        { title: "Buổi sáng", data: morningList },
        { title: "Buổi chiều", data: afternoonList },
        { title: "Buổi tối", data: nightList },
      ]
      setDataCalendarConvert(resultList)
      console.log("resultList::", resultList)
      setLoading(false)
    } catch (error) {
      console.warn("getDoctorCalendarAvailable", error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getDoctorCalendarAvailable()
  }, [])
  const checkIsFull = (from: string) => {
    const today = new Date()
    const selectDate = new Date(selectedDate)
    const checkTimeHour = moment(from.valueOf(), "HH:mm") < new Date().getTime()
    const checkDate = selectDate.getTime() > today.getTime()
    if (checkTimeHour && !checkDate) {
      return true
    } else {
      return false
    }
  }
  console.log("DATA_TIME", DATA_TIME)
  if (loading) return <LoadingScreen />
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header
        leftIcon="arrow_left"
        title={translate("booking.select_time")}
        backgroundColor={colors.white}
      />
      <TitleInfor
        title={translate("booking.time_exam_information")}
        data={DATA_EXPLAIN}
        styleStatus={{ width: WIDTH(220) }}
      />
      <FlatList
        data={dataCalendarConvert}
        renderItem={({ item }) => {
          return (
            <Card style={styles.card} mode="contained">
              <Text size="md" weight="medium" style={{ color: colors.black }}>
                {item.title}
              </Text>
              <View style={styles.wrapperTime}>
                {(item?.data ?? []).map((item, index) => {
                  const isFull = item?.isOrder || checkIsFull(item?.timeRange?.from)
                  return (
                    <ButtonTime
                      onPress={() => setTimeSelected(item?.timeRange)}
                      title={`${item?.timeRange?.from} - ${item?.timeRange?.to}`}
                      isFull={isFull}
                      key={index}
                      selected={timeSelected.id === item?.timeRange?.id}
                    />
                  )
                })}
              </View>
            </Card>
          )
        }}
        extraData={timeSelected}
        contentContainerStyle={styles.flatlist}
      />
      <Button
        onPress={() => {
          dispatch(updateSelectedTimeOrder(timeSelected))
          if (route?.params?.preScreen) {
            goBack()
          } else {
            navigate("CompleteBooking")
          }
        }}
        disabled={timeSelected.id === "-1"}
        mode="contained"
        style={{ marginBottom: HEIGHT(spacing.md), marginHorizontal: WIDTH(spacing.md) }}
      >
        {translate("common.continue")}
      </Button>
    </Screen>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: R.colors.white,
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
  flatlist: { paddingBottom: 10 },
  wrapperTime: { flexDirection: "row", flexWrap: "wrap" },
})
