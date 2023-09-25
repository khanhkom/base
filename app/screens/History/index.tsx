import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import SearchFilter from "@app/components/SearchFilter"
import ItemSchedule from "./Item/ItemSchedule"
import { HEIGHT, returnStartEndDate } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ModalFilter, { LIST_SPECIALIST } from "./Item/ModalFilter"
import { useSelector } from "@app/redux/reducers"
import ItemEmpty from "@app/components/ItemEmpty"
import { useDispatch } from "react-redux"
import { getOrderHistoryFilter } from "@app/redux/actions/actionOrderHistory"
import moment from "moment"

export default function History() {
  const refModal = useRef(null)
  const orderHistoryFilter = useSelector((state) => state.bookingHistoryReducers.orderHistoryFilter)
  const orderHistory = useSelector((state) => state.orderReducers.orderHistory)
  const loading = useSelector((state) => state.bookingHistoryReducers.loading)
  const dispatch = useDispatch()
  const [isFiltered, setFiltered] = useState(false)

  const dateStartEnd = returnStartEndDate()
  const filterSelected = useRef({
    statusFilter: 0,
    timeFilter: -1,
    startDate: new Date(),
    endDate: new Date(),
  })
  const [keyword, setKeyword] = useState("")
  let timerId
  const onApplyFilter = (dataFilter) => {
    filterSelected.current = dataFilter

    const { statusFilter, timeFilter, startDate, endDate } = filterSelected?.current
    if (statusFilter > 0 || timeFilter !== -1) {
      setFiltered(true)
    } else {
      setFiltered(false)
    }
    let body = {
      timeFrom: dateStartEnd.todayStart,
      timeTo: dateStartEnd.todayEnd,
    }
    if (timeFilter === -1) {
      body = {}
    }
    if (timeFilter === 1) {
      body = {
        timeFrom: dateStartEnd.weekStart,
        timeTo: dateStartEnd.weekEnd,
      }
    } else if (timeFilter === 2) {
      body = {
        timeFrom: dateStartEnd.monthStart,
        timeTo: dateStartEnd.monthEnd,
      }
    } else if (timeFilter === 3) {
      body = {
        timeFrom: startDate.toISOString(),
        timeTo: moment(endDate).endOf("day").toISOString(),
      }
    }
    if (statusFilter !== 0) {
      Object.assign(body, {
        status: LIST_SPECIALIST[statusFilter]?.status,
      })
    }
    Object.assign(body, {
      search: keyword,
    })
    console.log("body", body)
    setTimeout(() => {
      dispatch(
        getOrderHistoryFilter({
          ...body,
        }),
      )
    }, 500)
  }

  function bounceToSearch() {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      // Code to trigger the search
      onApplyFilter(filterSelected.current)
      console.log("filterSelected", filterSelected.current)
      console.log("Searching...")
    }, 300)
  }

  useEffect(() => {
    bounceToSearch()
  }, [keyword, orderHistory])

  return (
    <View style={styles.container}>
      <Header
        title="Lịch khám"
        backgroundColor={colors.primary}
        titleStyle={{ color: colors.white }}
      />
      <SearchFilter
        isFiltered={isFiltered}
        onPressFilter={() => {
          refModal?.current?.show()
        }}
        onChangeText={(txt) => setKeyword(txt)}
        placeholder="Tìm tên bệnh nhân, bác sĩ"
      />
      {loading && (
        <ActivityIndicator
          size="small"
          color={colors.gray_4}
          style={{ marginTop: HEIGHT(spacing.sm) }}
        />
      )}
      <FlatList
        data={orderHistoryFilter}
        style={{ marginTop: HEIGHT(spacing.sm) }}
        renderItem={({ item, index }) => {
          return <ItemSchedule item={item} />
        }}
        ListEmptyComponent={() => {
          return <ItemEmpty title="Bạn chưa có lịch khám nào!" />
        }}
      />
      <ModalFilter ref={refModal} filterSelected={filterSelected} onApplyFilter={onApplyFilter} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_2,
  },
})
