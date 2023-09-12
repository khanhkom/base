import { StyleSheet, View } from "react-native"
import React, { useRef } from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import SearchFilter from "@app/components/SearchFilter"
import ItemDocter from "./Item/ItemDocter"
import { FlashList } from "@shopify/flash-list"
import { HEIGHT } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ModalFilter from "./Item/ModalFilter"

export default function ConsultNow() {
  const refModal = useRef(null)
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tư vấn ngay" backgroundColor={colors.white} />
      <SearchFilter
        onPressFilter={() => {
          refModal?.current?.show()
        }}
      />
      <FlashList
        data={[1, 2, 3, 4]}
        renderItem={({ item, index }) => {
          return <ItemDocter />
        }}
        ListFooterComponent={() => <View style={{ height: HEIGHT(spacing.lg) }} />}
      />
      <ModalFilter ref={refModal} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
