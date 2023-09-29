import React, { memo, Dispatch, SetStateAction } from "react"
import isEqual from "react-fast-compare"
import { ActivityIndicator, FlatList, FlatListProps, StyleSheet, View } from "react-native"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { IColorsTheme } from "@app/theme"
import { useTheme } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { translate } from "@app/i18n/translate"
import { Text } from "../Text"
export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
}
let callOnScrollEnd: boolean

interface Props extends FlatListProps<FlatList> {
  onHeaderRefresh?: Dispatch<SetStateAction<number>>
  onFooterRefresh?: Dispatch<SetStateAction<number>>
  refreshState?: number | string
  renderItem: any
  data: object[]
  footerRefreshingComponent?: any
  footerFailureComponent?: any
  footerEmptyDataComponent?: any
  style?: any
  ListHeaderComponent?: any
  extraData?: object[]
  loading?: boolean
  renderCustomFooter?: () => void
}
const RefreshList = (props: Props) => {
  const { colors }: { colors: IColorsTheme } = useTheme()
  function onHeaderRefresh() {
    // log('[RefreshList]  onHeaderRefresh');

    if (shouldStartHeaderRefreshing()) {
      // log('[RefreshList]  onHeaderRefresh');
      props.onHeaderRefresh ? props.onHeaderRefresh(RefreshState.HeaderRefreshing) : null
    }
  }
  function onEndReached() {
    if (shouldStartFooterRefreshing()) {
      // log('[RefreshList]  onFooterRefresh');
      props.onFooterRefresh && props.onFooterRefresh(RefreshState.FooterRefreshing)
    }
  }
  function shouldStartHeaderRefreshing() {
    // log('[RefreshList]  shouldStartHeaderRefreshing');

    if (
      props.refreshState === RefreshState.HeaderRefreshing ||
      props.refreshState === RefreshState.FooterRefreshing
    ) {
      return false
    }

    return true
  }

  function shouldStartFooterRefreshing() {
    const { refreshState, data } = props
    if (data.length === 0) {
      return false
    }

    return refreshState === RefreshState.Idle
  }
  const renderFooter = () => {
    if (props?.renderCustomFooter) {
      return props?.renderCustomFooter()
    }
    let footer: any = null

    const { footerRefreshingComponent } = props
    switch (props.refreshState) {
      case RefreshState.Idle:
        footer = <></>
        break
      case RefreshState.Failure: {
        footer = <></>
        break
      }
      case RefreshState.EmptyData: {
        footer = <></>
        break
      }
      case RefreshState.FooterRefreshing: {
        footer = footerRefreshingComponent || (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color={colors.outline} />
            <Text size="ba" weight="normal" style={styles.footerText}>
              {translate("common.loading")}
            </Text>
          </View>
        )
        break
      }
      case RefreshState.NoMoreData: {
        footer = (
          <View style={styles.wraper}>
            <View style={[styles.line, { backgroundColor: colors.outlineVariant }]} />
            <Text size="ba" weight="normal" style={styles.text}>
              {translate("common.its_over")}
            </Text>
            <View style={[styles.line, { backgroundColor: colors.outlineVariant }]} />
          </View>
        )
        break
      }
    }
    return footer
  }
  return (
    <FlatList
      {...props}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 10,
      }}
      data={props?.data}
      onRefresh={props.onHeaderRefresh ? onHeaderRefresh : null}
      refreshing={props.refreshState === RefreshState.HeaderRefreshing}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.3}
      renderItem={({ item, index }) => props.renderItem(item, index)}
      removeClippedSubviews={true}
      onEndReached={() => (callOnScrollEnd = true)}
      onMomentumScrollEnd={() => {
        callOnScrollEnd && onEndReached()
        callOnScrollEnd = false
      }}
      scrollEventThrottle={50}
      style={props.style}
      ListHeaderComponent={props.ListHeaderComponent}
      extraData={props.extraData}
      keyboardShouldPersistTaps={"always"}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}
const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: HEIGHT(spacing.lg),
  },
  footerText: {
    marginLeft: WIDTH(spacing.xxs),
  },
  text: { marginHorizontal: WIDTH(spacing.xxs) },

  line: {
    flex: 1,
    height: 1,
  },
  wraper: {
    flexDirection: "row",
    alignItems: "center",
    height: HEIGHT(spacing.xl),
    marginVertical: HEIGHT(spacing.md),
    justifyContent: "center",
  },
})

export default memo(RefreshList, isEqual)
