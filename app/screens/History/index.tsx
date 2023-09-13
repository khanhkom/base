import { FlatList, StyleSheet, Text, View } from "react-native"
import React, { useRef } from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import SearchFilter from "@app/components/SearchFilter"
import ItemSchedule from "./Item/ItemSchedule"
import { HEIGHT } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ModalFilter from "./Item/ModalFilter"
import { useSelector } from "@app/redux/reducers"

export default function History() {
  const refModal = useRef(null)
  const history = useSelector((state) => state.bookingHistoryReducers.history)
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
      <FlatList
        data={history}
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
