import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "../theme"
import colors from "@app/assets/colors"
import { IconButton, Searchbar } from "react-native-paper"
import { iconRegistry } from "./Icon"
import R from "@app/assets"
export default function SearchFilter() {
  const [keyword, setKeyword] = useState("")
  const [height, setHeight] = useState(WIDTH(48))
  const onLayout = (event: LayoutChangeEvent) => {
    const { height: viewHeight } = event.nativeEvent.layout
    setHeight(viewHeight)
  }

  return (
    <View style={styles.container}>
      <Searchbar
        onLayout={onLayout}
        icon={R.images.search_normal}
        iconColor={colors.gray_5}
        style={[styles.searchContainer, { width: getWidth() - height - WIDTH(44) }]}
        value={keyword}
        placeholder="Tìm kiếm bác sĩ"
        placeholderTextColor={colors.gray_6}
        onChangeText={setKeyword}
      />
      <IconButton
        icon={iconRegistry.filter}
        style={[
          styles.buttonFilter,
          {
            width: height,
            height: height,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH(spacing.md),
    backgroundColor: colors.white,
    justifyContent: "space-between",
    paddingVertical: HEIGHT(spacing.sm),
  },
  searchContainer: {
    width: WIDTH(287),
    borderRadius: WIDTH(8),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray_3,
  },
  buttonFilter: {
    borderRadius: WIDTH(8),
    backgroundColor: colors.gray_1,
    marginLeft: WIDTH(spacing.sm),
    width: WIDTH(44),
    height: WIDTH(44),
  },
})