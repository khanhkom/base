import { StyleSheet, View, Image, ScrollView } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ItemAnswer from "./Item/ItemAnswer"
import { QuestionAnswer } from "@app/interface/faq"

interface IScreenParams {
  route: {
    params: {
      data: QuestionAnswer
    }
  }
}
export default function DetailFrequentlyQuestion({ route }: IScreenParams) {
  const { data } = route.params
  console.log("data_data::", data)
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title={"Câu hỏi thường gặp"} backgroundColor={colors.white} />

      <ScrollView>
        <View style={styles.body}>
          <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
            {data?.patientQuestion}
          </Text>
        </View>
        <ItemAnswer answer={data?.doctorAnswer} />
      </ScrollView>
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
})
