import { useEffect, useState } from "react"
import { QuestionAnswer } from "@app/interface/faq"
import { IQuestion } from "@app/interface/question"
import { getQuestionFilter } from "@app/services/api/functions/question"
const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
}
interface IReponseData {
  data?: Array<QuestionAnswer>
  page?: number
  limit?: number
  total?: number
}
const limit = 10
const useHookSearchFAQ = (keyword: string) => {
  const [listData, setListData] = useState<IQuestion[]>([])
  const [refreshState, setRefreshState] = useState<number>(RefreshState.Idle)
  const [pageList, setPageList] = useState<number>(1)
  const [pagingRes, setPagingRes] = useState<IReponseData>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [isLimited, setIsLimited] = useState<boolean>(false)

  useEffect(() => {
    onHeaderRefresh()
    setIsLimited(false)
  }, [keyword])

  async function getList(isLoadMore = false, page = pageList) {
    if (isLoadMore && isLimited) return
    // if (keyword?.trim() === "") {
    //   loadDataKeywordEmpty()
    //   return
    // }
    const body = {
      page: page,
      perPage: limit,
      query: keyword,
      sortByCreatedAt: -1,
    }
    isLoadMore
      ? setRefreshState(RefreshState.FooterRefreshing)
      : setRefreshState(RefreshState.HeaderRefreshing)
    console.log("BODY", body)
    try {
      const response = await getQuestionFilter(body)
      if (response?.data?.items) {
        setLoading(false)
        const data = response?.data?.items
        var dataListRes: IQuestion[] = data || []
        var dataListOld: IQuestion[] = listData ?? []
        if (isLoadMore) {
          dataListOld = dataListOld.concat(dataListRes)
        } else dataListOld = dataListRes
        setListData(dataListOld)
        const nextPage = page + 1
        setPagingRes({
          page: pageList,
          limit: limit,
          //   total: response?.hea,
          data: data,
        })
        if (data && Number(data?.length) < Number(limit)) {
          setIsLimited(true)
          return
        }
        setPageList(nextPage)
      } else {
        setLoading(false)
      }
    } catch (err) {
      console.log("err", err)
      setLoading(false)
      setRefreshState(RefreshState.Failure)
      return
    }
  }
  function onHeaderRefresh() {
    getList(false, 1)
  }

  function onFooterRefresh() {
    console.log("ZAAAAA")
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
        pagingRes && listData.length == pagingRes?.total
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

export default useHookSearchFAQ
