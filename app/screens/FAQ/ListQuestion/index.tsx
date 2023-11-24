import { StyleSheet, View, Image } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { translate } from "@app/i18n/translate"
import { FlatList } from "react-native-gesture-handler"
import ItemQuestion from "../CommunityFAQ/Item/ItemQuestion"

interface IScreenParams {
  route: {
    params: {}
  }
}
export default function ListQuestion({ route }: IScreenParams) {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title={"Danh sách câu hỏi"} backgroundColor={colors.gray_1} />
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item, index }) => {
          return <ItemQuestion isAnswered={true} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
