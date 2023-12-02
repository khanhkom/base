import { FlatList, StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react"
import { List } from "react-native-paper"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import { WIDTH } from "@app/config/functions"
import ItemQuestion from "./ItemQuestion"
import { navigate } from "@app/navigators/navigationUtilities"
import { getQuestionFilter } from "@app/services/api/functions/question"
import ItemPlaceholder from "@app/components/ItemPlaceholder"

export default function LastQuestion() {
  const [questionRecent, setQuestionRecent] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function getRecentQuestion() {
      const body = { page: 1, perPage: 5, sortByCreatedAt: 1 }
      setLoading(true)
      const questionRes = await getQuestionFilter(body)
      console.log("questionRes_questionRes", questionRes?.data?.items)
      setQuestionRecent(questionRes?.data?.items ?? [])
      setLoading(false)
    }
    getRecentQuestion()
  }, [])
  if (loading) {
    return (
      <View>
        <ItemPlaceholder />
        <ItemPlaceholder />
        <ItemPlaceholder />
      </View>
    )
  }
  return (
    <View>
      <List.Item
        title={() => {
          return (
            <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
              Câu hỏi mới nhất
            </Text>
          )
        }}
        right={() => {
          return (
            <Icon
              onPress={() => {
                navigate("ListQuestion")
              }}
              icon="arrow_circle_right_bold"
              size={WIDTH(24)}
            />
          )
        }}
      />
      <FlatList
        data={questionRecent}
        renderItem={({ item, index }) => {
          return <ItemQuestion item={item} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
