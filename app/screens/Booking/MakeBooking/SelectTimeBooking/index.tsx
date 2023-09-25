import { StyleSheet, View, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { Header, Text } from "@app/components/index"
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
interface ScreenProps {
  route: {
    params: {
      preScreen?: string
    }
  }
}
export default function SelectTimeBooking({ route }: ScreenProps) {
  const [timeSelected, setTimeSelected] = useState({ id: -1 })
  const [dataCalendar, setDataCalendar] = useState<IDoctorCalendar[]>([])
  const [loading, setLoading] = useState(false)
  const docter = useSelector((state) => state.orderReducers?.docter)
  const selectedDate = useSelector((state) => state.orderReducers?.selectedDate)
  console.log("selectedDate", selectedDate)
  console.log("docter", docter)
  const dispatch = useDispatch()
  const getDoctorCalendarAvailable = async () => {
    setLoading(true)
    let resCal = await getDocterCalendar(docter.id, {
      date: selectedDate,
    })
    setDataCalendar(resCal?.data?.calendar ?? [])
    setLoading(false)
    console.log("resCal", resCal?.data?.calendar)
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
    } else if (dataCalendar.length > 0) {
      const valueFrom = dataCalendar?.find((item) => item.timeRange.from === from)
      return valueFrom?.isOrder ?? false
    } else {
      return false
    }
  }
  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn giờ khám" backgroundColor={colors.white} />
      <TitleInfor
        title="Thông tin giờ khám"
        data={DATA_EXPLAIN}
        styleStatus={{ width: WIDTH(220) }}
      />
      <FlatList
        data={DATA_TIME}
        renderItem={({ item }) => {
          return (
            <Card style={styles.card} mode="contained">
              <Text size="md" weight="medium" style={{ color: colors.black }}>
                {item.title}
              </Text>
              <View style={styles.wrapperTime}>
                {item.data.map((item, index) => {
                  const isFull = checkIsFull(item?.from)
                  return (
                    <ButtonTime
                      onPress={() => setTimeSelected(item)}
                      title={item.time}
                      isFull={isFull}
                      status={item.status}
                      key={index}
                      selected={timeSelected.id === item.id}
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
        disabled={timeSelected.id === -1}
        mode="contained"
        style={{ marginBottom: HEIGHT(spacing.md), marginHorizontal: WIDTH(spacing.md) }}
      >
        Tiếp theo
      </Button>
    </View>
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
