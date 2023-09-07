import { Dimensions, StyleSheet, Image, View, FlatList } from "react-native"
import React, { useState } from "react"
import Carousel from "react-native-reanimated-carousel"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { Icon } from "@app/components/Icon"
import { Divider, List } from "react-native-paper"
const Item = () => {
  return (
    <List.Item
      style={styles.item}
      left={() => {
        return <Image source={R.images.new_1} style={styles.wrapperImage} />
      }}
      title={() => {
        return (
          <View>
            <Text weight="medium" size="ba" style={{ color: colors.gray_9 }}>
              Ăn gì trước khi uống rượu để tránh tình trạng say xỉn?
            </Text>
            <Text weight="normal" size="sm" style={{ color: colors.gray_6 }}>
              Ăn quả bơ, chuối, các loại hạt giàu protein,
            </Text>
          </View>
        )
      }}
    />
  )
}
export default function HotNews() {
  return (
    <View style={styles.container}>
      <View style={styles.itemHead}>
        <Text weight="semiBold" size="xl">
          Gói dịch vụ nổi bật
        </Text>
        <Icon icon="arrow_circle_right" size={WIDTH(24)} />
      </View>
      <FlatList
        data={[...new Array(3).keys()]}
        renderItem={({ item, index }) => <Item />}
        ItemSeparatorComponent={() => <Divider />}
        style={{ paddingHorizontal: WIDTH(spacing.md) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.md),
    backgroundColor: colors.gray_0,
    paddingTop: HEIGHT(spacing.md),
  },

  itemHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: WIDTH(343),
    marginHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(12),
  },
  item: {
    width: WIDTH(343),
    paddingLeft: WIDTH(spacing.sm),
    borderRadius: 12,
  },
  wrapperImage: {
    width: WIDTH(72),
    height: WIDTH(72),
    borderRadius: 8,
    backgroundColor: colors.primary_2,
  },
})
