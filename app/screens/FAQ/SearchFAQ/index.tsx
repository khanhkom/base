import { Keyboard, Platform, StyleSheet, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import Header from "./Item/Header"
import colors from "@app/assets/colors"
import ItemRecent from "./Item/ItemRecent"
import ItemSuggest from "./Item/ItemSuggest"
import TabResult from "./Item/FAQ"
import { KEYSTORAGE, load, save } from "@app/utils/storage"
import ModalFilter from "./Item/ModalFilter"
import { Screen } from "@app/components/Screen"

const STATUS_SEARCH = {
  recent: 0,
  suggest: 1,
  searching: 2,
  result: 3,
}

export default function SearchFAQ() {
  const [keyword, setKeyword] = useState("")
  const [historySearch, setHistorySearch] = useState([])
  const [searchStatus, setSearchStatus] = useState(STATUS_SEARCH.recent)
  const [searchText, setSearchText] = useState("")
  const [isFiltered, setFiltered] = useState(false)
  const [facetFilters, setFacetFilters] = useState(-1)
  const refModal = useRef(null)

  // const searchStatus = keyword === "" ? STATUS_SEARCH.recent : STATUS_SEARCH.suggest
  const hanldeChangeText = (text: string) => {
    setKeyword(text)
    if (text !== "" && searchStatus !== STATUS_SEARCH.suggest) {
      setSearchStatus(STATUS_SEARCH.suggest)
    }
  }
  const saveSearchHistory = async () => {
    if (!historySearch.includes(keyword) && keyword?.trim() !== "") {
      const newHis = [...historySearch, keyword]
      setHistorySearch(newHis)
      await save(KEYSTORAGE.FAQ_SEARCH_HISTORY, newHis)
    }
  }
  const onRemoveHistory = async (item) => {
    const newHis = historySearch.filter((it) => it !== item)
    setHistorySearch(newHis)
    await save(KEYSTORAGE.FAQ_SEARCH_HISTORY, newHis)
  }
  const onPressItemRecent = (item: string) => {
    console.log("item", item)
    setKeyword(item)
    setSearchStatus(STATUS_SEARCH.result)
  }

  useEffect(() => {
    async function getHistorySearch() {
      const history = await load(KEYSTORAGE.FAQ_SEARCH_HISTORY)
      if (history && history !== null) {
        setHistorySearch(history)
      }
    }
    getHistorySearch()
  }, [])
  const onSubmitSearch = () => {
    console.log("onSubmitSearch")
    setSearchStatus(STATUS_SEARCH.result)
    saveSearchHistory()
  }
  useEffect(() => {
    let typingTimeout

    const handleSearch = () => {
      setSearchText(keyword)
      saveSearchHistory()
    }
    if (keyword !== searchText) {
      clearTimeout(typingTimeout)
      typingTimeout = setTimeout(handleSearch, 300)
    }

    return () => {
      clearTimeout(typingTimeout)
    }
  }, [keyword])
  const onApplyFilter = (dataFilter) => {
    setFacetFilters(dataFilter)
    console.log("dataFilter", dataFilter)
    if (dataFilter !== -1) {
      setFiltered(true)
    } else {
      setFiltered(false)
    }
  }
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header
        keyword={keyword}
        setKeyword={hanldeChangeText}
        onSubmitSearch={onSubmitSearch}
        isShowFilter={searchStatus !== STATUS_SEARCH.recent}
        isFiltered={isFiltered}
        onPressFilter={() => {
          Keyboard.dismiss()
          refModal?.current?.show()
        }}
      />
      {searchStatus === STATUS_SEARCH.recent && (
        <ItemRecent
          data={historySearch}
          onRemove={onRemoveHistory}
          onPressItem={onPressItemRecent}
        />
      )}
      {/* {searchStatus === STATUS_SEARCH.suggest && <ItemSuggest keyword={keyword} />} */}
      {searchStatus !== STATUS_SEARCH.recent && (
        <TabResult keyword={searchText} specialistCode={facetFilters} />
      )}
      <ModalFilter onApply={onApplyFilter} filterData={facetFilters} ref={refModal} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
