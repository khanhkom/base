import { StyleSheet, View, Image, ScrollView } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import FileAttachment from "./Item/FileAttachment"
import ItemSpecialList from "./Item/ItemSpecialList"
import ItemAnswer from "./Item/ItemAnswer"
import ItemInputToolbar from "./Item/InputToolbar"
import ListComment from "./Item/Comment/ListComment"

interface IScreenParams {
  route: {
    params: {}
  }
}
export default function DetailFrequentlyQuestion({ route }: IScreenParams) {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title={"Câu hỏi thường gặp"} backgroundColor={colors.white} />

      <ScrollView>
        <View style={styles.body}>
          <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </Text>
          <Text
            size="ba"
            weight="normal"
            style={{ color: colors.gray_9, marginTop: HEIGHT(spacing.xs) }}
          >
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book.
          </Text>
          <FileAttachment />
          <ItemSpecialList />
        </View>
        <ItemAnswer />
        <ListComment />
      </ScrollView>
      <ItemInputToolbar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
  body: {
    paddingHorizontal: WIDTH(spacing.md),
    backgroundColor: colors.white,
  },
  head: {
    backgroundColor: colors.orange_0,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
    flexDirection: "row",
  },
})