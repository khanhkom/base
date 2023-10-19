import { FlatList, Image, StyleSheet, View } from "react-native"
import React, { memo } from "react"
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
export default function Doctor() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA_FAKE}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              style={styles.item}
              left={() => {
                return <Image source={R.images.avatar_docter} style={styles.image} />
              }}
              title={() => {
                return (
                  <View>
                    <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                      Nguyễn Văn A
                    </Text>
                    <Text size="xs" weight="normal" style={styles.textTime}>
                      Tai - Mũi -Họng
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
  textTime: { color: colors.gray_6, marginTop: HEIGHT(spacing.xxs) },
})
