import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "../theme"
import colors from "@app/assets/colors"
import { IconButton, Searchbar } from "react-native-paper"
import { Icon, iconRegistry } from "./Icon"
import R from "@app/assets"
interface ItemProps {
  placeholder?: string
  onPressFilter: () => void
  value?: string
  onChangeText?: (txt: string) => void
  isFiltered?: boolean
}
export default function SearchFilter({
  onPressFilter,
  placeholder,
  onChangeText,
  value,
  isFiltered,
}: ItemProps) {
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
        value={value}
        placeholder={placeholder || "Tìm kiếm bác sĩ"}
        placeholderTextColor={colors.gray_6}
        onChangeText={onChangeText}
      />
      <Pressable
        style={[
          styles.buttonFilter,
          {
            width: height,
            height: height,
          },
        ]}
        onPress={onPressFilter}
      >
        <Icon icon="filter" size={WIDTH(24)} />
        {isFiltered && (
          <View style={styles.icTicked}>
            <Icon icon="tick_circle" size={WIDTH(16)} />
          </View>
        )}
      </Pressable>
      <IconButton
        icon={iconRegistry.filter}
        onPress={onPressFilter}
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
    justifyContent: "center",
    alignItems: "center",
  },
  icTicked: {
    position: "absolute",
    top: 8,
    right: 8,
  },
})
