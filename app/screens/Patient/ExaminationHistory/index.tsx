import { StyleSheet, View, FlatList } from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import ItemHistory from "./Item/ItemHistory"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemEmpty from "./Item/ItemEmpty"

export default function ExaminationHistory() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Lịch sử khám" backgroundColor={colors.gray_1} />
      {/* <ItemEmpty /> */}
      <FlatList
        data={[1, 2, 3]}
        renderItem={({ item, index }) => {
          return (
            <ItemHistory
              index={index}
              onPress={() => {
                navigate("DetailExamination")
              }}
            />
          )
        }}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
