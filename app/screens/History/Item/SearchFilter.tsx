import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Searchbar } from "react-native-paper"
import R from "@app/assets"
import moment from "moment"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import { spacing } from "@app/theme/spacing"
interface ItemProps {
  placeholder?: string
  onPressFilter: () => void
  keyword?: string
  setKeyword?: (txt: string) => void
}
export default function SearchFilter({
  onPressFilter,
  placeholder,
  setKeyword,
  keyword,
  date,
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
        style={[styles.searchContainer, { width: WIDTH(200) }]}
        inputStyle={{ minHeight: 0 }}
        value={keyword}
        placeholder={placeholder || "Tìm kiếm bác sĩ"}
        placeholderTextColor={colors.gray_6}
        onChangeText={setKeyword}
      />
      <Pressable
        onPress={onPressFilter}
        style={{ flexDirection: "row", alignItems: "center" }}
        onPointerEnter={onPressFilter}
      >
        <Text size="ba" weight="normal" style={{ color: colors.gray_7, marginRight: WIDTH(8) }}>
          {date === moment().format("DD/MM/YYYY") ? "Hôm nay" : date}
        </Text>
        <View
          style={[
            styles.boxIcon,
            {
              width: height,
              height: height,
            },
          ]}
        >
          <Icon icon={"ic_calendar_active"} size={WIDTH(24)} color={colors.primary} />
        </View>
      </Pressable>
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
  boxIcon: {
    height: WIDTH(32),
    width: WIDTH(32),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue_0,
  },
})
