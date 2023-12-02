import { useEffect, useState } from "react"
import { searchClient } from "@app/utils/algolia"
import { useSelector } from "@app/redux/reducers"
import { QuestionAnswer } from "@app/interface/faq"
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
const usCallApiAlgoliaByIndex = (keyword: string, indexName: string) => {
  const indexSearch = searchClient.initIndex(indexName)

  const [listData, setListData] = useState<Array<QuestionAnswer[]>>([])
  const [refreshState, setRefreshState] = useState<number>(RefreshState.Idle)
  const [pageList, setPageList] = useState<number>(0)
  const [pagingRes, setPagingRes] = useState<IReponseData>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [isLimited, setIsLimited] = useState<boolean>(false)

  const loadDataKeywordEmpty = async () => {
    const headers = {
      "X-Algolia-API-Key": "6c67068b71b6533274ae1a44496e2e44",
      "X-Algolia-Application-Id": "NF05OPFGOI",
    }
    setLoading(true)

    fetch("https://NF05OPFGOI-dsn.algolia.net/1/indexes/faqs", { headers })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData_responseData", responseData?.hits)
        setListData(responseData?.hits ?? [])
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }
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
      hitsPerPage: limit,
    }
    isLoadMore
      ? setRefreshState(RefreshState.FooterRefreshing)
      : setRefreshState(RefreshState.HeaderRefreshing)
    console.log("BODY", body)
    try {
      const response = await indexSearch.search(keyword, body)
      if (response?.hits) {
        setLoading(false)
        const data = response?.hits
        var dataListRes: QuestionAnswer[] = data || []
        var dataListOld: QuestionAnswer[] = listData ?? []
        if (isLoadMore) {
          dataListOld = dataListOld.concat(dataListRes)
        } else dataListOld = dataListRes
        setListData(dataListOld)
        const nextPage = page + 1
        setPagingRes({
          page: pageList,
          limit: limit,
          total: response?.nbHits,
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
    getList(false, 0)
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

export default usCallApiAlgoliaByIndex
