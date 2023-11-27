import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import colors from "@app/assets/colors"
import { IconButton, Searchbar } from "react-native-paper"
import R from "@app/assets"
import { Icon } from "@app/components/Icon"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { navigate } from "@app/navigators/navigationUtilities"
interface ItemProps {
  onPressFilter: () => void
  value?: string
  onChangeText?: (txt: string) => void
}
export default function SearchFilter({ onPressFilter, onChangeText, value }: ItemProps) {
  const [height, setHeight] = useState(WIDTH(48))
  const onLayout = (event: LayoutChangeEvent) => {
    const { height: viewHeight } = event.nativeEvent.layout
    setHeight(viewHeight)
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate("SearchFAQ")
        }}
      >
        <Searchbar
          onLayout={onLayout}
          icon={R.images.search_normal}
          iconColor={colors.primary_3}
          style={[styles.searchContainer, { width: WIDTH(243) }]}
          inputStyle={{ color: colors.white }}
          value={value}
          placeholder={"Tìm vấn đề của bạn"}
          placeholderTextColor={colors.primary_3}
          onChangeText={onChangeText}
          clearIcon={"close"}
          editable={false}
        />
      </Pressable>
      <Pressable
        style={[
          styles.buttonFilter,
          {
            height: height,
          },
        ]}
        onPress={onPressFilter}
      >
        <Icon icon="ic_asked" size={WIDTH(24)} />
        <Text
          size="sm"
          weight="normal"
          style={{ color: colors.white, marginLeft: WIDTH(spacing.xs) }}
        >
          Đã hỏi
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH(spacing.md),
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    paddingVertical: HEIGHT(spacing.sm),
  },
  searchContainer: {
    width: WIDTH(287),
    borderRadius: WIDTH(8),
    backgroundColor: colors.white10,
    color: colors.white,
  },
  buttonFilter: {
    borderRadius: WIDTH(8),
    backgroundColor: colors.primary_9,
    marginLeft: WIDTH(spacing.sm),
    height: WIDTH(44),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: WIDTH(spacing.sm),
  },
})
