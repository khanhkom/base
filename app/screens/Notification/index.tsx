import React, { useEffect } from "react"
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native"
import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import { HEIGHT } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ItemEmpty from "./Item/ItemEmpty"
import { RefreshState } from "@app/components/refresh-list"
import { translate } from "@app/i18n/translate"
import { Text } from "@app/components/Text"
import { FlashList } from "@shopify/flash-list"
import ItemNotification from "./Item/ItemNotification"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import { useHookHistory } from "./useHookHistory"
import { Screen } from "@app/components/Screen"

export default function HistoryScreen() {
  const { refreshState, listData, loading, onHeaderRefresh, onFooterRefresh } = useHookHistory()

  const renderFooter = () => {
    let footer = <></>
    switch (refreshState) {
      case RefreshState.FooterRefreshing: {
        footer = (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color={colors.gray_6} />
            <Text size="ba" weight="normal">
              {translate("common.loading")}
            </Text>
          </View>
        )
        break
      }
      case RefreshState.NoMoreData: {
        footer = (
          <View style={styles.wraper}>
            <Text size="ba" weight="normal">
              {translate("common.its_over")}
            </Text>
          </View>
        )
        break
      }
    }
    return footer
  }

  useEffect(() => {
    onHeaderRefresh()
  }, []) // Run once when component mounts

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header
        leftIcon="arrow_left"
        title={translate("notification.noti")}
        backgroundColor={colors.gray_1}
      />
      <FlashList
        data={listData}
        contentContainerStyle={{ paddingTop: HEIGHT(spacing.sm) }}
        renderItem={({ item, index }) => {
          return <ItemNotification item={item} />
        }}
        ListEmptyComponent={() => {
          return <ItemEmpty />
        }}
        onRefresh={onHeaderRefresh}
        onMomentumScrollEnd={onFooterRefresh}
        keyExtractor={(item, index) => String(index)}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        extraData={listData}
        ListFooterComponent={renderFooter}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
  footerContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: HEIGHT(spacing.lg),
    justifyContent: "center",
  },
  wraper: {
    alignItems: "center",
    flexDirection: "row",
    height: HEIGHT(spacing.xl),
    justifyContent: "center",
    marginVertical: HEIGHT(spacing.md),
  },
})
