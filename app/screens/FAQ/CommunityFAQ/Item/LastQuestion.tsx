import { FlatList, StyleSheet, View } from "react-native"
import React from "react"
import { List } from "react-native-paper"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import { WIDTH } from "@app/config/functions"
import ItemQuestion from "./ItemQuestion"
import { navigate } from "@app/navigators/navigationUtilities"

export default function LastQuestion() {
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
        data={[1, 2, 3]}
        renderItem={({ item, index }) => {
          return <ItemQuestion />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
