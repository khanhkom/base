import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import SearchFilter from "@app/components/SearchFilter"
import ItemSchedule from "./Item/ItemSchedule"
import { HEIGHT, returnStartEndDate } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ModalFilter from "./Item/ModalFilter"
import { useSelector } from "@app/redux/reducers"
import ItemEmpty from "@app/components/ItemEmpty"
import { useDispatch } from "react-redux"
import { getOrderHistoryFilter } from "@app/redux/actions/actionOrderHistory"

export default function History() {
  const refModal = useRef(null)
  const orderHistoryFilter = useSelector((state) => state.bookingHistoryReducers.orderHistoryFilter)
  const loading = useSelector((state) => state.bookingHistoryReducers.loading)
  const dispatch = useDispatch()
  const filterSelected = useRef({
    statusFilter: 0,
    timeFilter: 2,
  })

  useEffect(() => {
    const dateStartEnd = returnStartEndDate()
    dispatch(
      getOrderHistoryFilter({
        timeFrom: dateStartEnd.monthStart,
        timeTo: dateStartEnd.monthEnd,
      }),
    )
  }, [])
  return (
    <View style={styles.container}>
      <Header
        title="Lịch khám"
        backgroundColor={colors.primary}
        titleStyle={{ color: colors.white }}
      />
      <SearchFilter
        onPressFilter={() => {
          refModal?.current?.show()
        }}
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
      <ModalFilter ref={refModal} filterSelected={filterSelected} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_2,
  },
})
