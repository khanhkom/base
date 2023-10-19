import { FlatList, Image, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import R from "@app/assets"
const DATA_FAKE = [
  {
    title: "Các triệu chứng của sốt xuất huyết thường xảy ra ở trẻ sơ sinh",
  },
  {
    title: "Các triệu chứng của sốt xuất huyết thường xảy ra ở trẻ sơ sinh",
  },
  {
    title: "Các triệu chứng của sốt xuất huyết thường xảy ra ở trẻ sơ sinh",
  },
]
export default function Services() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA_FAKE}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              style={styles.item}
              left={() => {
                return <Image source={R.images.package_1} style={styles.image} />
              }}
              title={() => {
                return (
                  <View>
                    <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                      Kiến thức phòng trách sốt xuất huyết
                    </Text>
                    <Text size="ba" weight="semiBold" style={styles.textTime}>
                      120.000 đ
                    </Text>
                  </View>
                )
              }}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
  },
  image: {
    width: WIDTH(48),
    height: WIDTH(48),
    alignSelf: "center",
    marginLeft: WIDTH(spacing.sm),
    borderRadius: 8,
    backgroundColor: colors.green_d7,
  },
  textTime: { color: colors.primary, marginTop: HEIGHT(spacing.xxs) },
})
