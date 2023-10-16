import { useState, useEffect } from "react"
import { RefreshState } from "@app/components/refresh-list"
import { getRatingByOrderDoctorId } from "@app/services/api/functions/rating"
import { IRatingDoctorDetail } from "@app/interface/rating"

const limit = 5

export function useHookRatingDetail(userId, starSelected) {
  const [refreshState, setRefreshState] = useState<number>(RefreshState.Idle)
  const [pagingRes, setPagingRes] = useState({})
  const [pageList, setPageList] = useState<number>(1)
  const [isLimited, setIsLimited] = useState<boolean>(false)
  const [listData, setListData] = useState<IRatingDoctorDetail[]>([])
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
      doctorId: userId,
    }
    if (starSelected > 0) {
      Object.assign(body, {
        score: starSelected,
      })
    }
    isLoadMore
      ? setRefreshState(RefreshState.FooterRefreshing)
      : setRefreshState(RefreshState.HeaderRefreshing)
    try {
      const response = await getRatingByOrderDoctorId(body)
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
  }, [starSelected])

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
