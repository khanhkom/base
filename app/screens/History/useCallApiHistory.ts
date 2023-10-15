import { useEffect, useState } from "react"
import { getListOrder } from "@app/services/api/functions/order"
import { IOrderHistory } from "@app/interface/order"
import { returnStartEndDate } from "@app/config/functions"
import moment from "moment"
import { LIST_SPECIALIST } from "./Item/ModalFilter"
const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
}
interface IReponseData {
  data?: Array<object>
  page?: number
  limit?: number
  total?: number
}
const limit = 10
interface IApiCallBody {
  search: string
  statusFilter: number
  timeFilter: number
  startDate: Date
  endDate: Date
}
const dateStartEnd = returnStartEndDate()

const useCallApiHistory = (bodySendReq?: IApiCallBody) => {
  const [listData, setListData] = useState<Array<IOrderHistory>>([])
  const [refreshState, setRefreshState] = useState<number>(RefreshState.Idle)
  const [pageList, setPageList] = useState<number>(1)
  const [pagingRes, setPagingRes] = useState<IReponseData>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [isLimited, setIsLimited] = useState<boolean>(false)
  const { search, statusFilter, timeFilter, startDate, endDate } = bodySendReq
  useEffect(() => {
    onHeaderRefresh()
  }, [bodySendReq])

  const returnBody = () => {
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
      search: search,
    })
    return body
  }
  const bodySearch = returnBody()

  async function getList(isLoadMore = false, page = pageList) {
    if (isLimited) return
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
        const data: any = response?.data
        var dataListRes: any = data?.items ?? []
        var dataListOld: IOrderHistory[] = listData ?? []
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
        }
        setPageList(nextPage)
      } else {
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      setRefreshState(RefreshState.Failure)
      return
    }
  }
  function onHeaderRefresh() {
    getList(false, 1)
  }

  function onFooterRefresh() {
    getList(true)
  }
  /**
   * ? Hiển thị message khi refresh data: Không có data thì thông báo no data
   */

  useEffect(() => {
    ;(function () {
      !listData || listData.length < 1
        ? setRefreshState(RefreshState.EmptyData)
        : setRefreshState(RefreshState.Idle)
    })()
  }, [listData])
  /**
   * ? Hiển thị message khi Load more data: Nếu total data tên server = total data state thì thông báo đã lấy hết data
   */
  useEffect(() => {
    ;(function () {
      if (listData && listData.length > 0) {
        pagingRes && listData.length === pagingRes?.total
          ? setRefreshState(RefreshState.NoMoreData)
          : setRefreshState(RefreshState.Idle)
      }
    })()
  }, [listData, pagingRes])

  return {
    listData,
    onFooterRefresh,
    onHeaderRefresh,
    refreshState,
    pagingRes,
    loading,
  }
}

export default useCallApiHistory
