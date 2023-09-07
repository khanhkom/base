import { ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import HeaderHome from "./Item/Header"
import { Screen } from "@app/components/Screen"
import ItemUtilities from "./Item/ItemUtilities"
import BannerCarousel from "./Item/BannerCarousel"
import TopDocter from "./Item/TopDocter"
import TopPackage from "./Item/TopPackage"
import HotNews from "./Item/HotNews"
import colors from "@app/assets/colors"

export default function HomeScreen() {
  return (
    <Screen preset="scroll" style={styles.container}>
      <HeaderHome />
      <ItemUtilities />
      <BannerCarousel />
      <TopDocter />
      <TopPackage />
      <HotNews />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
