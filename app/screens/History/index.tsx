import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import SearchFilter from "@app/components/SearchFilter"
import ItemSchedule from "./Item/ItemSchedule"
import { HEIGHT, returnStartEndDate } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ModalFilter, { LIST_SPECIALIST } from "./Item/ModalFilter"
import { useSelector } from "@app/redux/reducers"
import ItemEmpty from "@app/components/ItemEmpty"
import { useDispatch } from "react-redux"
import moment from "moment"
import { RefreshState } from "@app/components/refresh-list"
import { IOrderHistory } from "@app/interface/order"
import { getListOrder } from "@app/services/api/functions/order"
import { translate } from "@app/i18n/translate"
import { Text } from "@app/components/Text"
import { FlashList } from "@shopify/flash-list"
import ItemPlaceholderCommon from "@app/components/placeholder/ItemCalendar"
const limit = 5

export default function History() {
  const refModal = useRef(null)
  const orderHistory = useSelector((state) => state.orderReducers.orderHistory)
  // const loading = useSelector((state) => state.bookingHistoryReducers.loading)
  const [isFiltered, setFiltered] = useState(false)
  const [refreshState, setRefreshState] = useState<number>(RefreshState.Idle)
  const [pagingRes, setPagingRes] = useState({})
  const [pageList, setPageList] = useState<number>(1)
  const [isLimited, setIsLimited] = useState<boolean>(false)
  const [listData, setListData] = useState<Array<IOrderHistory>>([])
  const [loading, setLoading] = useState<boolean>(true)

  const dateStartEnd = returnStartEndDate()
  const filterSelected = useRef({
    statusFilter: 0,
    timeFilter: -1,
    startDate: new Date(),
    endDate: new Date(),
  })
  const [keyword, setKeyword] = useState("")
  let timerId
  const returnBody = () => {
    const { statusFilter, timeFilter, startDate, endDate } = filterSelected?.current
    let body = {
      timeFrom: dateStartEnd.todayStart,
      timeTo: dateStartEnd.todayEnd,
    }
    if (timeFilter === -1) {
      body = {}
    }
    if (timeFilter === 1) {
      body = {
        timeFrom: dateStartEnd.weekStart,
        timeTo: dateStartEnd.weekEnd,
      }
    } else if (timeFilter === 2) {
      body = {
        timeFrom: dateStartEnd.monthStart,
        timeTo: dateStartEnd.monthEnd,
      }
    } else if (timeFilter === 3) {
      body = {
        timeFrom: startDate.toISOString(),
        timeTo: moment(endDate).endOf("day").toISOString(),
      }
    }
    if (statusFilter !== 0) {
      Object.assign(body, {
        status: LIST_SPECIALIST[statusFilter]?.status,
      })
    }
    Object.assign(body, {
      search: keyword,
    })
    return body
  }
  const onApplyFilter = (dataFilter) => {
    filterSelected.current = dataFilter
    const { statusFilter, timeFilter } = filterSelected?.current
    if (statusFilter > 0 || timeFilter !== -1) {
      setFiltered(true)
    } else {
      setFiltered(false)
    }
    if (limit) {
      setIsLimited(false)
    }
    getList(false, 1)
  }
  function shouldStartFooterRefreshing() {
    if (listData.length === 0) {
      return false
    }

    return refreshState === RefreshState.Idle
  }

  function onHeaderRefresh() {
    getList(false, 1)
  }

  function onFooterRefresh() {
    if (shouldStartFooterRefreshing()) {
      getList(true, pageList)
    }
  }
  async function getList(isLoadMore = false, page = pageList) {
    const bodySearch = returnBody()

    if (isLoadMore && isLimited) return
    const body = {
      ...bodySearch,
      page: page,
      perPage: limit,
    }
    isLoadMore
      ? setRefreshState(RefreshState.FooterRefreshing)
      : setRefreshState(RefreshState.HeaderRefreshing)
    try {
      const response = await getListOrder(body)
      if (response?.data) {
        setLoading(false)
        setRefreshState(RefreshState.Idle)
        const data: any = response?.data
        const dataListRes: any = data?.items ?? []
        let dataListOld: IOrderHistory[] = listData ?? []
        if (isLoadMore) {
          dataListOld = dataListOld.concat(dataListRes)
        } else dataListOld = dataListRes
        setListData(dataListOld)
        const nextPage = page + 1
        setPagingRes({
          page: pageList,
          limit: limit,
          total: data?.total,
          data: data?.items,
        })
        if (data?.items && Number(data?.items?.length) < Number(limit)) {
          setIsLimited(true)
          return
        } else {
          if (isLimited) {
            setIsLimited(false)
          }
        }
        setPageList(nextPage)
      } else {
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      setRefreshState(RefreshState.Failure)
    }
  }
  function bounceToSearch() {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      // Code to trigger the search
      onApplyFilter(filterSelected.current)
    }, 300)
  }
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
    bounceToSearch()
  }, [keyword, orderHistory])
  useEffect(() => {
    ;(function () {
      !orderHistory || orderHistory.length < 1
        ? setRefreshState(RefreshState.EmptyData)
        : setRefreshState(RefreshState.Idle)
    })()
  }, [orderHistory])
  /**
   * ? Hiển thị message khi Load more data: Nếu total data tên server = total data state thì thông báo đã lấy hết data
   */
  useEffect(() => {
    ;(function () {
      if (orderHistory && orderHistory.length > 0) {
        pagingRes && orderHistory.length === pagingRes?.total
          ? setRefreshState(RefreshState.NoMoreData)
          : setRefreshState(RefreshState.Idle)
      }
    })()
  }, [orderHistory, pagingRes])
  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          titleTx="history.booking_history"
          backgroundColor={colors.primary}
          titleStyle={{ color: colors.white }}
        />
        <SearchFilter
          isFiltered={isFiltered}
          onPressFilter={() => {
            refModal?.current?.show()
          }}
          value={keyword}
          onChangeText={(txt) => setKeyword(txt)}
          placeholder={translate("history.search_patient_doctor")}
        />
        <ItemPlaceholderCommon />
        <ItemPlaceholderCommon />
        <ItemPlaceholderCommon />
      </View>
    )
  }
  console.log("listData_listData", listData)
  return (
    <View style={styles.container}>
      <Header
        titleTx="history.booking_history"
        backgroundColor={colors.primary}
        titleStyle={{ color: colors.white }}
      />
      <SearchFilter
        isFiltered={isFiltered}
        onPressFilter={() => {
          refModal?.current?.show()
        }}
        value={keyword}
        onChangeText={(txt) => setKeyword(txt)}
        placeholder={translate("history.search_patient_doctor")}
      />
      <FlashList
        data={listData}
        contentContainerStyle={{ paddingTop: HEIGHT(spacing.sm) }}
        renderItem={({ item, index }) => {
          return <ItemSchedule item={item} />
        }}
        ListEmptyComponent={() => {
          return <ItemEmpty title={translate("history.empty_booking")} />
        }}
        // onEndReached={() => (callOnScrollEnd = true)}
        onRefresh={onHeaderRefresh}
        onMomentumScrollEnd={() => {
          onFooterRefresh()
        }}
        keyExtractor={(item, index) => String(index)}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        extraData={listData}
        ListFooterComponent={renderFooter}
      />
      <ModalFilter ref={refModal} filterSelected={filterSelected} onApplyFilter={onApplyFilter} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: HEIGHT(spacing.lg),
  },
  wraper: {
    flexDirection: "row",
    alignItems: "center",
    height: HEIGHT(spacing.xl),
    marginVertical: HEIGHT(spacing.md),
    justifyContent: "center",
  },
})
