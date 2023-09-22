import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useRef } from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import SearchFilter from "@app/components/SearchFilter"
import ItemSchedule from "./Item/ItemSchedule"
import { HEIGHT } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ModalFilter from "./Item/ModalFilter"
import { useSelector } from "@app/redux/reducers"
import { useDispatch } from "react-redux"
import { getOrderHistory } from "@app/redux/actions/actionOrder"

export default function History() {
  const refModal = useRef(null)
  const orderHistory = useSelector((state) => state.orderReducers.orderHistory)
  const loading = useSelector((state) => state.orderReducers.loading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderHistory())
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
      {loading && <ActivityIndicator size="small" color={colors.gray_4} />}
      <FlatList
        data={orderHistory}
        style={{ marginTop: HEIGHT(spacing.sm) }}
        renderItem={({ item, index }) => {
          return <ItemSchedule item={item} />
        }}
      />
      <ModalFilter ref={refModal} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_2,
  },
})
