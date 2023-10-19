import { FlatList, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import { Icon } from "@app/components/Icon"
const DATA_FAKE = [
  {
    title: "Các triệu chứng của sốt xuất huyết",
    desc: "Hỏi đáp cộng đồng",
  },
  {
    title: "Chứng biếng ăn khi trẻ mọc răng",
    desc: "Hỏi đáp cộng đồng",
  },
  {
    title: "Các bệnh cúm mùa hay gặp ở trẻ nhỏ",
    desc: "Hỏi đáp cộng đồng",
  },
]
export default function ItemRecent() {
  return (
    <View style={styles.container}>
      <Text size="md" weight="semiBold" style={{ color: colors.gray_9 }}>
        Gần đây
      </Text>
      <FlatList
        data={DATA_FAKE}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              style={styles.item}
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
              right={() => {
                return (
                  <View style={{ alignSelf: "center" }}>
                    <Icon icon="x_close" size={WIDTH(20)} color={colors.gray_5} />
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
})
