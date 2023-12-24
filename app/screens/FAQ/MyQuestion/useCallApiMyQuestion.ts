import { useState, useEffect } from "react"
import { RefreshState } from "@app/components/refresh-list"
import { getMyQuestion } from "@app/services/api/functions/question"
import { IQuestion } from "@app/interface/question"

const limit = 10

export function useCallApiMyQuestion() {
  const [refreshState, setRefreshState] = useState<number>(RefreshState.Idle)
  const [pagingRes, setPagingRes] = useState({})
  const [pageList, setPageList] = useState<number>(1)
  const [isLimited, setIsLimited] = useState<boolean>(false)
  const [listData, setListData] = useState<IQuestion[]>([])
  const [loading, setLoading] = useState<boolean>(true)

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
    if (isLoadMore && isLimited) return
    const body = {
      page: page,
      perPage: limit,
      isMine: true,
      sortByCreatedAt: -1,
    }

    isLoadMore
      ? setRefreshState(RefreshState.FooterRefreshing)
      : setRefreshState(RefreshState.HeaderRefreshing)
    try {
      const response = await getMyQuestion(body)
      if (response?.data) {
        setLoading(false)
        setRefreshState(RefreshState.Idle)
        const data: any = response?.data
        const dataListRes: any = data?.items ?? []
        let dataListOld = listData ?? []
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

  useEffect(() => {
    onHeaderRefresh()
  }, [])

  useEffect(() => {
    ;(function () {
      !listData || listData.length < 1
        ? setRefreshState(RefreshState.EmptyData)
        : setRefreshState(RefreshState.Idle)
    })()
  }, [listData])

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
    refreshState,
    listData,
    loading,
    onHeaderRefresh,
    onFooterRefresh,
  }
}
