import { StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import ItemEmpty from "./Item/ItemEmpty"

export default function Notification() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Thông báo" backgroundColor={colors.gray_1} />
      <ItemEmpty />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
