import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"
import React, { memo, useEffect, useRef, useState } from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import ItemSchedule from "./Item/ItemSchedule"
import { HEIGHT, WIDTH, returnStartEndDate } from "@app/config/functions"
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
import SearchFilter from "./Item/SearchFilter"
import DateTimePicker from "@react-native-community/datetimepicker"
import DatePickerIOS from "react-native-date-picker"
// import SearchFilter from "@app/components/SearchFilter"
import useDebounce from "@app/hooks/search"
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
  const [status, setStatus] = useState(0)

  const dateStartEnd = returnStartEndDate()
  const filterSelected = useRef({
    statusFilter: 0,
    timeFilter: -1,
    startDate: new Date(),
    endDate: new Date(),
  })
  const [keyword, setKeyword] = useState("")
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())

  let timerId
  const returnBody = () => {
    const todayStart = moment(date).startOf("day").toISOString()
    const todayEnd = moment(date).endOf("day").toISOString()

    let body = {
      timeFrom: todayStart,
      timeTo: todayEnd,
      search: keyword,
    }

    if (status > 0) {
      Object.assign(body, {
        status: LIST_SPECIALIST[status]?.status,
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
  useDebounce(
    () => {
      onApplyFilter(filterSelected.current)
    },
    [keyword],
    300,
  )

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
    getList(false, 1)
  }, [orderHistory, status, date])
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
  // eslint-disable-next-line react/display-name
  const ItemFilterHead = memo(() => {
    return (
      <View style={styles.wrapperFilter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {LIST_SPECIALIST.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  setStatus(index)
                }}
                style={[styles.button, index !== status && { backgroundColor: colors.main_7 }]}
                key={index}
              >
                <Text
                  size="ba"
                  weight="normal"
                  style={{ color: index !== status ? colors.primary_2 : colors.primary_8 }}
                >
                  {item.title}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>
      </View>
    )
  })
  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          titleTx="history.booking_history"
          backgroundColor={colors.primary}
          titleStyle={{ color: colors.white }}
        />
        <ItemFilterHead />
        <SearchFilter
          keyword={keyword}
          setKeyword={setKeyword}
          onPressFilter={() => {
            setOpen(true)
          }}
          date={moment(date).format("DD/MM/YYYY")}
          placeholder="Tên bệnh nhân"
        />
        <ItemPlaceholderCommon />
        <ItemPlaceholderCommon />
        <ItemPlaceholderCommon />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Header
        titleTx="history.booking_history"
        backgroundColor={colors.primary}
        titleStyle={{ color: colors.white }}
      />
      <ItemFilterHead />
      <SearchFilter
        keyword={keyword}
        setKeyword={setKeyword}
        onPressFilter={() => {
          setOpen(true)
        }}
        date={moment(date).format("DD/MM/YYYY")}
        placeholder="Tên bệnh nhân"
      />

      <FlashList
        data={listData}
        contentContainerStyle={{ paddingTop: HEIGHT(spacing.sm) }}
        renderItem={({ item, index }) => {
          return <ItemSchedule item={item} reloadData={onHeaderRefresh} />
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
      {Platform.OS == "android" ? (
        open && (
          <DateTimePicker
            mode="date"
            value={date}
            onChange={(event, date) => {
              setOpen(false)
              if (event.type === "set") {
                setDate(date)
              }
            }}
          />
        )
      ) : (
        <DatePickerIOS
          modal
          date={new Date(date) ?? new Date()}
          // maximumDate={new Date()}
          mode="date"
          is24hourSource="device"
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          locale="vi"
          open={open}
          onCancel={() => {
            setOpen(false)
          }}
        />
      )}
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
  wrapperFilter: {
    backgroundColor: colors.primary_8,
    paddingVertical: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.md),
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: WIDTH(10),
    paddingVertical: HEIGHT(6),
    borderRadius: 30,
    backgroundColor: colors.white,
    marginRight: WIDTH(spacing.sm),
  },
})
