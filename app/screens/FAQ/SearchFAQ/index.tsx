import { StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react"
import Header from "./Item/Header"
import colors from "@app/assets/colors"
import ItemRecent from "./Item/ItemRecent"
import ItemSuggest from "./Item/ItemSuggest"
import TabResult from "./Item/FAQ"
import { KEYSTORAGE, load, save } from "@app/utils/storage"

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

  // const searchStatus = keyword === "" ? STATUS_SEARCH.recent : STATUS_SEARCH.suggest
  const hanldeChangeText = (text: string) => {
    setKeyword(text)
    if (text !== "" && searchStatus !== STATUS_SEARCH.suggest) {
      setSearchStatus(STATUS_SEARCH.suggest)
    }
  }
  const saveSearchHistory = async () => {
    if (!historySearch.includes(keyword)) {
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
    setSearchStatus(STATUS_SEARCH.result)
    saveSearchHistory()
  }
  return (
    <View style={styles.container}>
      <Header keyword={keyword} setKeyword={hanldeChangeText} onSubmitSearch={onSubmitSearch} />
      {searchStatus === STATUS_SEARCH.recent && (
        <ItemRecent
          data={historySearch}
          onRemove={onRemoveHistory}
          onPressItem={onPressItemRecent}
        />
      )}
      {searchStatus === STATUS_SEARCH.suggest && <ItemSuggest keyword={keyword} />}
      {searchStatus === STATUS_SEARCH.result && <TabResult keyword={keyword} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
