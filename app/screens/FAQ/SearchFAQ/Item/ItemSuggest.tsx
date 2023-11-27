import { FlatList, StyleSheet, View, Image } from "react-native"
import React, { useEffect, useState } from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import { searchClient } from "@app/utils/algolia"
import R from "@app/assets"
import { debounce } from "lodash"

export default function ItemSuggest({ keyword }) {
  const [hits, setHits] = useState([])
  useEffect(() => {
    const fetchResults = debounce(() => {
      const queries = [
        {
          indexName: "faqs",
          query: keyword,
          params: {
            hitsPerPage: 5,
          },
        },
      ]

      searchClient
        .multipleQueries(queries)
        .then(({ results }) => {
          setHits([...results[0].hits])
        })
        .catch((err) => {
          console.log(err)
        })
    }, 100)

    fetchResults()
    return fetchResults.cancel
  }, [keyword])
  console.log("results_results", hits)

  return (
    <View style={styles.container}>
      <FlatList
        data={hits}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              style={styles.item}
              left={() => {
                return <Image source={R.images.ic_question} style={styles.icon} />
              }}
              title={() => {
                return (
                  <View>
                    <Text
                      size="ba"
                      weight="medium"
                      style={{ color: colors.gray_9, marginBottom: HEIGHT(spacing.xs) }}
                    >
                      {item.patientQuestion}
                    </Text>
                    <Text
                      size="xs"
                      weight="normal"
                      style={{ color: colors.gray_6, fontStyle: "italic" }}
                    >
                      {/* {item.desc} */}
                      Hỏi đáp cộng đồng
                    </Text>
                  </View>
                )
              }}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.md),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
    alignSelf: "center",
    marginLeft: WIDTH(spacing.sm),
  },
})
