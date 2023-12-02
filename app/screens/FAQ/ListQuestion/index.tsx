import { StyleSheet, View, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { translate } from "@app/i18n/translate"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import { useCallApiListQuestion } from "./useCallApiListQuestion"
import ItemEmpty from "@app/components/ItemEmpty"
import { RefreshState } from "@app/components/refresh-list"
import { HEIGHT } from "@app/config/functions"
import ItemQuestion from "./ItemQuestion"

interface IScreenParams {
  route: {
    params: {
      query?: any
    }
  }
}
export default function ListQuestion({ route }: IScreenParams) {
  const { refreshState, listData, loading, onHeaderRefresh, onFooterRefresh } =
    useCallApiListQuestion(route?.params?.query ?? {})
  if (loading) {
    return <LoadingScreen />
  }
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title={"Danh sách câu hỏi"} backgroundColor={colors.gray_1} />
      <FlatList
        data={listData}
        renderItem={({ item, index }) => {
          return <ItemQuestion item={item} />
        }}
        ListFooterComponent={<View style={{ height: HEIGHT(32) }} />}
        ListEmptyComponent={() => {
          return <ItemEmpty title={translate("doctor.rating.empty")} />
        }}
        onRefresh={onHeaderRefresh}
        onMomentumScrollEnd={onFooterRefresh}
        keyExtractor={(item, index) => String(index)}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
