import { View, StyleSheet, FlatList } from "react-native"
import React, { useState } from "react"
import { useSelector } from "@app/redux/reducers"
import { List, Searchbar } from "react-native-paper"
import { Screen } from "@app/components/Screen"
import { spacing } from "@app/theme/spacing"
import { searchClient } from "@app/utils/algolia"
import { TextPaper } from "@app/components/text-paper"
import Highlight from "./Highlight"
import { navigate } from "@app/navigators/navigationUtilities"
const limit = 10

export default function Home() {
  const user = useSelector((state) => state.userReducers)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [loading, setLoading] = useState<boolean>(true)
  const indexSearch = searchClient.initIndex("y_khoa")
  const [pageList, setPageList] = useState<number>(0)
  const [hits, setHits] = useState([])

  const onChangeSearch = async (query) => {
    const body = {
      page: pageList,
      hitsPerPage: limit,
    }
    setSearchQuery(query)
    const response = await indexSearch.search(query, body)
    if (response?.hits) {
      setLoading(false)
      const data = response?.hits
      setHits(data)
    }
  }
  console.log("user_user", hits)
  return (
    <Screen style={{ flex: 1, paddingTop: 40, paddingHorizontal: spacing.md }}>
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
      <FlatList
        data={hits}
        extraData={hits}
        ListHeaderComponent={() => (
          <TextPaper style={{ marginTop: spacing.sm }}>Kết quả:</TextPaper>
        )}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              onPress={() => {
                navigate("DetailSick", {
                  item,
                })
              }}
              title={() => (
                <View>
                  <TextPaper
                    color="onSurface"
                    variant="bodyLarge"
                    style={{ marginBottom: spacing.xxs }}
                  >
                    {item.name}
                  </TextPaper>
                  <TextPaper color="onSurfaceVariant" variant="bodySmall">
                    <Highlight hit={item} />
                  </TextPaper>
                </View>
              )}
            />
          )
        }}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
