import { StyleSheet, Image, View, FlatList, ActivityIndicator } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/index"
import { HEIGHT } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="" backgroundColor={colors.gray_1} />
      <ActivityIndicator size="small" color={colors.gray_6} style={styles.item} />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginTop: HEIGHT(spacing.sm),
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
