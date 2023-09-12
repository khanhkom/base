import { StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import SearchFilter from "@app/components/SearchFilter"
import ItemDocter from "./Item/ItemDocter"
import { FlashList } from "@shopify/flash-list"
import { HEIGHT } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"

export default function ConsultNow() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tư vấn ngay" backgroundColor={colors.white} />
      <SearchFilter />
      <FlashList
        data={[1, 2, 3, 4]}
        renderItem={({ item, index }) => {
          return <ItemDocter />
        }}
        ListFooterComponent={() => <View style={{ height: HEIGHT(spacing.lg) }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
