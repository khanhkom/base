import { FlatList, StyleSheet, View, Image } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import { Icon } from "@app/components/Icon"
import R from "@app/assets"
const DATA_FAKE = [
  {
    title: "Các triệu chứng của sốt xuất huyết",
    desc: "Hỏi đáp cộng đồng",
    icon: R.images.ic_question,
  },
  {
    title: "Chứng biếng ăn khi trẻ mọc răng",
    desc: "Tin tức",
    icon: R.images.ic_news,
  },
  {
    title: "Các bệnh cúm mùa hay gặp ở trẻ nhỏ",
    desc: "Kiến thức cấp cứu",
    icon: R.images.ic_know,
  },
]
export default function ItemSuggest() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA_FAKE}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              style={styles.item}
              left={() => {
                return <Image source={item.icon} style={styles.icon} />
              }}
              title={() => {
                return (
                  <View>
                    <Text
                      size="ba"
                      weight="medium"
                      style={{ color: colors.gray_9, marginBottom: HEIGHT(spacing.xs) }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      size="xs"
                      weight="normal"
                      style={{ color: colors.gray_6, fontStyle: "italic" }}
                    >
                      {item.desc}
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
    paddingVertical: HEIGHT(spacing.md),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
    alignSelf: "center",
    marginLeft: WIDTH(spacing.sm),
  },
})
