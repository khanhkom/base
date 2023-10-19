import { StyleSheet, View } from "react-native"
import React, { useState } from "react"
import Header from "./Item/Header"
import colors from "@app/assets/colors"
import ItemRecent from "./Item/ItemRecent"
import ItemSuggest from "./Item/ItemSuggest"
import TabResult from "./TabResults/TabResult"
const STATUS_SEARCH = {
  recent: 0,
  suggest: 1,
  searching: 2,
  result: 3,
}

export default function SearchHome() {
  const [keyword, setKeyword] = useState("")
  const [searchStatus, setSearchStatus] = useState(STATUS_SEARCH.recent)
  // const searchStatus = keyword === "" ? STATUS_SEARCH.recent : STATUS_SEARCH.suggest
  const hanldeChangeText = (text: string) => {
    setKeyword(text)
    if (text !== "" && searchStatus !== STATUS_SEARCH.suggest) {
      setSearchStatus(STATUS_SEARCH.suggest)
    }
  }
  const onSubmitSearch = () => {
    setSearchStatus(STATUS_SEARCH.result)
  }
  return (
    <View style={styles.container}>
      <Header keyword={keyword} setKeyword={hanldeChangeText} onSubmitSearch={onSubmitSearch} />
      {searchStatus === STATUS_SEARCH.recent && <ItemRecent />}
      {searchStatus === STATUS_SEARCH.suggest && <ItemSuggest />}
      {searchStatus === STATUS_SEARCH.result && <TabResult />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
