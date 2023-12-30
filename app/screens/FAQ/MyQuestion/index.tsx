import { StyleSheet, View, FlatList, Platform } from "react-native"
import React, { useEffect, useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { translate } from "@app/i18n/translate"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import { useCallApiMyQuestion } from "./useCallApiMyQuestion"
import ItemEmpty from "@app/components/ItemEmpty"
import { RefreshState } from "@app/components/refresh-list"
import { HEIGHT } from "@app/config/functions"
import ItemQuestion from "./ItemQuestion"
import { Screen } from "@app/components/Screen"

interface IScreenParams {
  route: {
    params: {}
  }
}
export default function MyQuestion({ route }: IScreenParams) {
  const { refreshState, listData, loading, onHeaderRefresh, onFooterRefresh } =
    useCallApiMyQuestion()
  if (loading) {
    return <LoadingScreen />
  }
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header leftIcon="arrow_left" title={"Câu hỏi của tôi"} backgroundColor={colors.gray_1} />
      <FlatList
        data={listData}
        renderItem={({ item, index }) => {
          return <ItemQuestion item={item} />
        }}
        ListFooterComponent={<View style={{ height: HEIGHT(32) }} />}
        ListEmptyComponent={() => {
          return <ItemEmpty title={"Không có câu hỏi nào!"} />
        }}
        onRefresh={onHeaderRefresh}
        onMomentumScrollEnd={onFooterRefresh}
        keyExtractor={(item, index) => String(index)}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
