import { StyleSheet, View } from "react-native"
import React from "react"
import Header from "./Item/Header"
import ListFeatures from "./Item/ListFeatures"
import colors from "@app/assets/colors"

export default function Profile() {
  return (
    <View style={styles.container}>
      <Header />
      <ListFeatures />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
